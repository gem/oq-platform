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
var activeTables = [];
var activeTablesObj = {};
var limitStates;
// Fragility function set ids
var ffsIds = {};
var fFormat;

$('#addFFS').click(function() {
    updateTable();
    $('#outputDiv').css('display', 'none');
});

var count = 0;
function updateTable () {

    // disable the fragility function form
    $('#format').prop('disabled', true);
    $('#limitStates').prop('disabled', true);

    // Get the fragility format
    fFormat = $('#format').val();

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
        imls = 'IML: ' +
            '<input id="'+count+'" class="imls" placeholder="imls array" type="text">';
    } else if (fFormat == 'continuous') {
        imls = 'minIML: ' +
            '<input id="'+count+'" class="minImls" type="text"><br>' +
            'maxIML: ' +
            '<input id="'+count+'" class="maxImls" type="text">';
    }

    //activeTables.push('table'+count);
    $('#tables').append(
        '<div id="table'+count+'" class="panel panel-default">' +
            '<div>' +
                'Fragility Function Id: ' +
                '<input id="'+count+'" class="ffsIds" type="text"><br>' +
                'IMT: ' +
                '<input id="'+count+'" class="imt" type="text"><br>' +
                'No DamageLimit: ' +
                '<input id="'+count+'" class="noDamageLimit" type="text"><br>' +
                imls +
            '</div>'+
            '<button id="'+count+'" class="btn-danger btn destroyTable">Remove</button>' +
            '<br><br>' +
        '</div>'
    );

    // force bootstrap style
    $('.btn-danger').css({'background-color': '#da4f49'});

    var container = document.getElementById('table'+count);
    console.log('limitStateLength:');
    console.log(limitStateLength);


    //////////////////////
    /// Table Settings ///
    //////////////////////

    table = new Handsontable(container, {
        colHeaders: header,
        startCols: headerLength,
        maxCols: headerLength,
        startRows: limitStateLength
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

    // Get all the ffs Ids
    var ffsIds = {};
    $(".ffsIds").each(function() {
        ffsIds[this.id] = ($(this).val());
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

    if (fFormat == 'discrete') {
        // Get all the imls values
        var imlsObj = {};
        $(".imls").each(function() {
            imlsObj[this.id] = ($(this).val());
        });
    } else if (fFormat == 'continuous') {
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

    var data = {};
    // get the data for each table
    for(var k in activeTablesObj) {
        data[k] = activeTablesObj[k].getData();
    }

    console.log('data:');
    console.log(data);

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

    // Check for header match
    function checkHeaderMatch (argument) {
        return header.indexOf(argument);
    }

    var functionId = $('#functionId').val();
    var assetCategory = $('#assetCategory').val();
    var functionDescription = $('#functionDescription').val();
    var taxonomy = 'taxonomy';

    // Get the the index for each header element
    var taxonomyInx = checkHeaderMatch(taxonomy);

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

    var ffsContainer;
    console.log('data:');
    console.log(data);

    var fragilityFunction = '';
    // Create the ffs elements
    for (var k in data) {
        // Opening ffs tag
        var ffs = '\t\t<fragilityFunction id="'+ffsIds[k]+'" format="'+fFormat+'">\n';

        // Create the imls tag
        var imlsTag;
        if (fFormat == 'discrete') {
            imlsTag = '\t\t\t<imls imt="'+imtObj[k]+'" noDamageLimit="'+noDamageLimitObj[k]+'">'+imlsObj[k]+'</imls>\n';
        } else if (fFormat == 'continuous') {
            imlsTag = '\t\t\t<imls imt="'+imtObj[k]+'" noDamageLimit="'+noDamageLimitObj[k]+'" minIML="'+minImlObj[k]+'" maxIML="'+maxImlObj[k]+'">\n';
        }
        // Dynamic imls tag
        ffs += imlsTag;

        // Loop through the table rows and create the poes tags
        for (var i = 0; i < data[k].length; i++) {
            // Dynamic ffs tag(s)
            ffs += '\t\t\t<poes ls="'+limitStates[i]+'">'+data[k][i][1]+'</poes>\n';
        }
        // Closing ffs tags
        ffs += '\t\t</fragilityFunction>\n';
        fragilityFunction += ffs;
    }

    console.log('fragilityFunction:');
    console.log(fragilityFunction);

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








