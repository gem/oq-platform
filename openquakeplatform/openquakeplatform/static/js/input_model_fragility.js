/*
   Copyright (c) 2015, GEM Foundation.

      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU Affero General Public License as
      published by the Free Software Foundation, either version 3 of the
      License, or (at your option) any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Affero General Public License for more details.

      You should have received a copy of the GNU Affero General Public License
      along with this program.  If not, see <https://www.gnu.org/licenses/agpl.html>.
*/

var table;
var header = [];
var activeTablesObj = {};
var limitStates;
// Fragility function set ids
var ffsIds = {};

$('#outputDiv').hide();

$('#addFfsDiscrete').click(function() {
    var fFormat = 'discrete';
    updateTable(fFormat);
    $('#outputDiv').css('display', 'none');
});

$('#addFfsContinuous').click(function() {
    var fFormat = 'continuous';
    updateTable(fFormat);
    $('#outputDiv').css('display', 'none');
});

var count = 0;
function updateTable (fFormat) {

    // disable the fragility function form
    $('#limitStates').prop('disabled', true);

    // Setup the header
    if (fFormat == 'discrete') {
        header = ['damage state', 'poes'];
    } else if (fFormat == 'continuous') {
        header = ['damage state', 'mean', 'stddev'];
    }

    var headerLength = header.length;

    // Get info from the form and build the table header
    limitStates = $('#limitStates').val();
    limitStates = limitStates.split(',');
    var limitStateLength = limitStates.length;

    // Create the table containers, as many as the user wants
    count += 1;

    var imls;
    // Imls value needs to be an array for discrete functions,
    // and minIML & maxIML for continuous
    if (fFormat == 'discrete') {
        imls =
            '<label>IML: </label>' +
            '<input id="'+count+'" class="imls ffsTable" placeholder="imls array" type="text">';
    } else if (fFormat == 'continuous') {
        imls =
            '<label> MinIML: </label>' +
            '<input id="'+count+'" class="minImls ffsTable" type="text"><br>' +
            '<label> MaxIML: </label>' +
            '<input id="'+count+'" class="maxImls ffsTable" type="text">';
    }

    // Create the fragility function set (ffs)
    $('#tables').append(
        '<div id="table'+count+'" class="ffsTableDiv panel panel-default">' +
        '<h3 class="ffsTitle">'+fFormat.toUpperCase()+' <button id="'+count+'" class="btn-danger btn destroyTable">Remove</button> </h3> <br>' +
            '<div class="ffsForm" >' +
                '<label> IMT: </label>' +
                '<input id="'+count+'" class="imt ffsTable" type="text"><br>' +
                '<label> DamageLimit: </label>' +
                '<input id="'+count+'" class="noDamageLimit ffsTable" type="text"><br>' +
                imls +
                '<input id="'+count+'" type="hidden" class="fFormat ffsTable" value="'+fFormat+'" >' +
                '<br>' +
            '</div>'+
            '<div id="tableDiv'+count+'" class="theTable"></div><br><br>' +
            '<br><br>' +
        '</div>'
    );

    // force bootstrap style
    $('.btn-danger').css({'background-color': '#da4f49'});

    var container = document.getElementById('tableDiv'+count);


    //////////////////////
    /// Table Settings ///
    //////////////////////

    table = new Handsontable(container, {
        colHeaders: header,
        startCols: headerLength,
        maxCols: headerLength,
        startRows: limitStateLength,
        colWidthsArray: 300
    });

    activeTablesObj[count] = table;

    $('#outPut').empty();
    $('#saveBtn').css('display', 'block');

    // Logic to remove a table
    $('.destroyTable').click(function() {
        $('#table'+this.id).remove();
        var removedTable = this.id;
        delete activeTablesObj[removedTable];
    });
}

$('#saveBtn').click(function() {

    // Get the fFormat types
    var fFormatObj = {};
    $(".fFormat").each(function() {
        fFormatObj[this.id] = ($(this).val());
    });

    // Get all the imt values
    var imtObj = {};
    $(".imt").each(function() {
        imtObj[this.id] = ($(this).val());
    });

    // Get all the noDamageLimit values
    var noDamageLimitObj = {};
    $(".noDamageLimit").each(function() {
        noDamageLimitObj[this.id] = ($(this).val());
    });

    // Loop through the function format object and get discrete and continuous values
    for(var k in fFormatObj) {
        if (fFormatObj[k] == 'discrete') {
            // Get all the imls values
            var imlsObj = {};
            $(".imls").each(function() {
                imlsObj[this.id] = ($(this).val());
            });
        } else if (fFormatObj[k] == 'continuous') {
            // Get all the minIML values
            var minImlObj = {};
            $(".minImls").each(function() {
                minImlObj[this.id] = ($(this).val());
            });
            // Get all the maxIML values
            var maxImlObj = {};
            $(".maxImls").each(function() {
                maxImlObj[this.id] = ($(this).val());
            });
        }
    }

    var data = {};
    // get the data for each table
    for(var k in activeTablesObj) {
        data[k] = activeTablesObj[k].getData();
    }

    // Check for null values
    for(var k in data) {
        for (var i = 0; i < data[k].length; i++) {
            for (var j = 0; j < data[k][i].length; j++) {
                if (data[k][i][j] === null) {
                    alert("whoops, there seem to be some empty cells");
                    return;
                }
            }
        }
    }

    var functionId = $('#functionId').val();
    var assetCategory = $('#assetCategory').val();
    var functionDescription = $('#functionDescription').val();

    /////////////////////////////
    // Create limit state list //
    /////////////////////////////

    // Opening limit state tag
    var limitStatesXML = '\t\t<limitStates> ';

    for (var i = 0; i < limitStates.length; i++) {
        // Dynamic limit state tag(s)
        limitStatesXML += limitStates[i];
    }

    // Closing limit state tag
    limitStatesXML += '</limitStates> \n';

    ////////////////
    // Create ffs //
    ////////////////

    var fragilityFunction = '';
    // Create the ffs elements
    for (var k in data) {
        // Opening ffs tag
        if (fFormatObj == 'discrete') {
            var ffs = '\t\t<fragilityFunction id="ff'+[k]+'" format="'+fFormatObj[k]+'">\n';
        } else if (fFormatObj == 'continuous') {
            var ffs = '\t\t<fragilityFunction id="'+ffsIds[k]+'" format="'+fFormatObj[k]+'" shape="logncdf">\n';
        }
        // Create the imls tag
        var imlsTag;
        if (fFormatObj[k] == 'discrete') {
            imlsTag = '\t\t\t<imls imt="'+imtObj[k]+'" noDamageLimit="'+noDamageLimitObj[k]+'">'+imlsObj[k]+'</imls>\n';
        } else if (fFormatObj[k] == 'continuous') {
            imlsTag = '\t\t\t<imls imt="'+imtObj[k]+'" noDamageLimit="'+noDamageLimitObj[k]+'" minIML="'+minImlObj[k]+'" maxIML="'+maxImlObj[k]+'">\n';
        }
        // Dynamic imls tag
        ffs += imlsTag;

        // Loop through the table rows and create the poes tags
        for (var i = 0; i < data[k].length; i++) {
            // Dynamic ffs tag(s)
            if (fFormatObj[k] == 'discrete') {
                ffs += '\t\t\t<poes ls="'+limitStates[i]+'">'+data[k][i][1]+'</poes>\n';
            } else if (fFormatObj[k] == 'continuous') {
                ffs += '\t\t\t<params ls="'+limitStates[i]+'" mean="'+data[k][i][1]+'" stddev="'+data[k][i][2]+'"/>\n';
            }
        }
        // Closing ffs tags
        ffs += '\t\t</fragilityFunction>\n';
        fragilityFunction += ffs;
    }

    // Create a NRML element
    var NRML =
        '<?xml version="1.0" encoding="UTF-8"?> \n' +
        '<nrml xmlns="http://openquake.org/xmlns/nrml/0.5"> \n' +
            '\t<fragilityModel id="'+functionId+'" assetCategory="'+assetCategory+'"> \n' +
                '\t\t<description>'+functionDescription+'</description> \n' +
                limitStatesXML +
                fragilityFunction +
            '\t</fragilityModel> \n' +
        '</nrml>';

    // Provide the user with the xml output
    $('#outPut').empty();
    $('#outPut').append('<textarea id="textarea" style="width: 600px;  height: 700px;>'+NRML+'</textarea>');
    $('#outputDiv').css('display', 'block');
    selectAllText();
});

$('#selectAll').click(function() {
    var textBox = document.getElementById("textarea");
    textBox.select();
});

function selectAllText () {
    var textBox = document.getElementById("textarea");
    textBox.onfocus = function() {
        textBox.select();

        // Work around Chrome's little problem
        textBox.onmouseup = function() {
            // Prevent further mouseup intervention
            textBox.onmouseup = null;
            return false;
        };
    };
}

