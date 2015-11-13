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

var fragilityTable;
var header = [];
var activeTablesObj = {};
var limitStates;
var NRML;
var functionId;

$('#outputFFDiv').hide();

$('#addFfsDiscrete').click(function() {
    var fFormat = 'discrete';
    updateFfsTable(fFormat);
    $('#outputFFDiv').css('display', 'none');
});

$('#addFfsContinuous').click(function() {
    var fFormat = 'continuous';
    updateFfsTable(fFormat);
    $('#outputFFDiv').css('display', 'none');
});

var count = 0;
function updateFfsTable (fFormat) {

    // Get info from the form and build the table header
    limitStates = $('#limitStates').val();
    limitStates = limitStates.split(',');
    var limitStatesHeader = [];
    for (var i = 0; i < limitStates.length; i++) {
        limitStatesHeader.push(limitStates[i]);
    }

    limitStatesHeader.unshift('intensity measure');
    var limitStateLength = limitStates.length;

    var colWidth;
    // disable the fragility function form
    $('#limitStates').prop('disabled', true);

    // Setup the header
    if (fFormat == 'discrete') {
        header = limitStatesHeader;
    } else if (fFormat == 'continuous') {
        header = ['damage state', 'mean', 'stddev'];
        colWidth = 100;
    }

    var headerLength = header.length;

    // Create the table containers, as many as the user wants
    count += 1;

    var imls;
    // Imls value needs to be an array for discrete functions,
    // and minIML & maxIML for continuous
    if (fFormat == 'discrete') {
        imls = '';
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
        '<strong class="ffsTitle">'+fFormat.toUpperCase()+'</strong><button id="'+count+'" class="btn-danger btn destroyTable">Remove</button><br>' +
            '<div class="ffsForm" >' +
                '<label> Function Id: </label>' +
                '<input id="'+count+'" class="ffsIds ffsTable" type="text"><br>' +
                '<label> IMT: </label>' +
                '<input id="'+count+'" class="imt ffsTable" type="text" placeholder="PGA"><br>' +
                '<label> Damage Limit: </label>' +
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


    ////////////////////////////////
    /// fragility Table Settings ///
    ////////////////////////////////

    fragilityTable = new Handsontable(container, {
        colHeaders: header,
        startCols: headerLength,
        maxCols: headerLength,
        startRows: limitStateLength,
        colWidths: colWidth,
    });

    // Populate the table with limit states
    if (fFormat == 'continuous') {
        for (var i = 0; i < limitStates.length; i++) {
        fragilityTable.setDataAtCell(i, 0, limitStates[i]);
        }
    }

    activeTablesObj[count] = fragilityTable;

    $('#outPutFF').empty();
    $('#saveBtnFF').show();

    // Logic to remove a table
    $('.destroyTable').click(function() {
        $('#table'+this.id).remove();
        var removedTable = this.id;
        delete activeTablesObj[removedTable];
    });

    // Increase the ffs panel when many limit states are defined
    if (limitStateLength > 5) {
        $('.ffsTableDiv').height(240 + (limitStateLength * 1.5));
    }

}

$('#saveBtnFF').click(function() {
    // Expose the download button
    $('#downloadBtnFF').show();

    // Get all the ffs Ids
    var ffsIds = {};
    $(".ffsIds").each(function() {
        ffsIds[this.id] = ($(this).val());
    });

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

    var dataFF = {};
    // get the data for each table
    for(var k in activeTablesObj) {
        dataFF[k] = activeTablesObj[k].getData();
    }

    // Check for null values
    for(var k in dataFF) {
        for (var i = 0; i < dataFF[k].length; i++) {
            for (var j = 0; j < dataFF[k][i].length; j++) {
                if (dataFF[k][i][j] === null) {
                    alert("whoops, there seem to be some empty cells");
                    return;
                }
            }
        }
    }

    functionId = $('#functionId').val();
    var assetCategory = $('#assetCategory').val();
    var lossCategory = $('#lossCategory').find(":selected").val();
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
    limitStatesXML += '</limitStates>\n';

    ////////////////
    // Create ffs //
    ////////////////

    var fragilityFunction = '';
    // Create the ffs elements
    for (var k in dataFF) {
        var ffs;
        // Opening ffs tag
        if (fFormatObj[k] == 'discrete') {
            ffs = '\t\t<fragilityFunction id="'+ffsIds[k]+'" format="'+fFormatObj[k]+'">\n';
        } else if (fFormatObj[k] == 'continuous') {
            ffs = '\t\t<fragilityFunction id="'+ffsIds[k]+'" format="'+fFormatObj[k]+'" shape="logncdf">\n';
        }
        // Create the imls tag
        var imlsTag;
        if (fFormatObj[k] == 'discrete') {
            // Opening IML tag
            imlsTag = '\t\t\t<imls imt="'+imtObj[k]+'" noDamageLimit="'+noDamageLimitObj[k]+'">';

            for (var i = 0; i < dataFF[k].length; i++) {
                // IML values
                if (i !== (dataFF[k].length - 1)) {
                    imlsTag += dataFF[k][i][0]+' ';
                } else {
                    // Avoid trailing whitespace
                    imlsTag += dataFF[k][i][0];
                }
            }
            // Closing IML tag
            imlsTag += '</imls>\n';
        } else if (fFormatObj[k] == 'continuous') {
            imlsTag = '\t\t\t<imls imt="'+imtObj[k]+'" noDamageLimit="'+noDamageLimitObj[k]+'" minIML="'+minImlObj[k]+'" maxIML="'+maxImlObj[k]+'"/>\n';
        }
        // Dynamic imls tag
        ffs += imlsTag;

            // Dynamic ffs tag(s)
            if (fFormatObj[k] == 'discrete') {
                for (var i = 0; i < limitStates.length; i++) {
                    // Opening poes tag
                    ffs += '\t\t\t<poes ls="'+limitStates[i].replace(/ /g,'')+'">';
                    for (var j = 0; j < dataFF[k].length; j++) {
                        if (j !== (dataFF[k].length - 1)) {
                            // The intensity measure is the first column in the table,
                            // so we need to shift one column to the right ( i + 1 )
                            ffs += dataFF[k][j][i + 1]+' ';
                        } else {
                            // Avoid trailing whitespace
                            ffs += dataFF[k][j][i + 1];
                        }
                    }
                    // Closing poes tag
                    ffs += '</poes>\n';
                }

            } else if (fFormatObj[k] == 'continuous') {
                for (var i = 0; i < limitStates.length; i++) {
                    ffs += '\t\t\t<params ls="'+limitStates[i].replace(/ /g,'')+'" mean="'+dataFF[k][i][1]+'" stddev="'+dataFF[k][i][2]+'"/>\n';
                }
            }

        // Closing ffs tags
        ffs += '\t\t</fragilityFunction>\n';
        fragilityFunction += ffs;
    }

    // Create a NRML element
    NRML =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<nrml xmlns="http://openquake.org/xmlns/nrml/0.5">\n' +
            '\t<fragilityModel id="'+functionId+'" assetCategory="'+assetCategory+'" lossCategory="'+lossCategory+'">\n' +
                '\t\t<description>'+functionDescription+'</description>\n' +
                limitStatesXML +
                fragilityFunction +
            '\t</fragilityModel>\n' +
        '</nrml>';

    // Provide the user with the xml output
    $('#outPutFF').empty();
    $('#outPutFF').append('<textarea id="textarea">'+NRML+'</textarea>');
    $('#outputFFDiv').css('display', 'block');
    selectAllFFText();
});

$('#downloadBtnFF').click(function() {
    var textToSave = NRML;

    var hiddenElement = document.createElement('a');

    hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    hiddenElement.target = '_blank';
    // Check for user input function id
    if (functionId === '' || functionId === undefined) {
        // If no idea is provided, make one
        functionId = 'my_new_fragility_function';
    }
    hiddenElement.download = functionId+'.xml';
    hiddenElement.click();
});

$('#selectAllFF').click(function() {
    var textBox = document.getElementById("textarea");
    textBox.select();
});

function selectAllFFText () {
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

