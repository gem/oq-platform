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
    var fFormat = $('#format').val();

    // Setup the header
    if (fFormat == 'discrete') {
        header = ['damage state', 'poes'];
    } else if (fFormat == 'continuous') {
        header = ['damage state', 'mean', 'stddev'];
    }

    var headerLength = header.length;

    // Get info from the form and build the table header
    var limitStates = $('#limitStates').val();
    limitStates = limitStates.split(',');


    // Create the table containers, as many as the user wants
    count += 1;
    activeTables.push('table'+count);
    $('#tables').append(
        '<div id="table'+count+'">' +
            '<button id="'+count+'" class="btn-danger btn destroyTable">Remove</button>' +
            '<br><br>' +
        '</div>'
    );

    var container = document.getElementById('table'+count);


    //////////////////////
    /// Table Settings ///
    //////////////////////

    table = new Handsontable(container, {
        colHeaders: header,
        rowHeaders: true,
        contextMenu: true,
        startCols: headerLength,
        maxCols: headerLength,
        startRows: 1
    });

    activeTablesObj[count] = table;

    $('#outPut').empty();
    $('#saveBtn').css('display', 'block');

    // Logic to remove a table
    $('.destroyTable').click(function() {
        $('#table'+this.id).remove();
        var removedTable = 'table'+this.id;
        var index = $.inArray(removedTable, activeTables);
        if (index>=0) activeTables.splice(index, 1);
        console.log('activeTables:');
        console.log(activeTables);
    });

}

$('#saveBtn').click(function() {

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
    var functionDescription = $('#functionDescription');
    var taxonomy = 'taxonomy';

    // Get the the index for each header element
    var taxonomyInx = checkHeaderMatch(taxonomy);


    // Create the asset
    for (var i = 0; i < data.length; i++) {
        var costTypes = '\t\t\t<costTypes> \n';
        var costs ='\t\t\t\t<costs>\n';
        var occupancies = '\t\t\t\t<occupancies>\n';

        if (numberInx > -1 ) {
            number = 'number="'+ data[i][numberInx]+'"';
        } else {
            number = '';
        }
        if (latitudeInx > -1 ) {
            latitude = 'lat="'+ data[i][latitudeInx]+'"';
        } else {
            latitude = '';
        }
        if (longitudeInx > -1 ) {
            longitude = 'lon="'+ data[i][longitudeInx]+'"';
        } else {
            longitude = '';
        }
        if (taxonomyInx > -1 ) {
            taxonomy = 'taxonomy="'+ data[i][taxonomyInx]+'"';
        } else {
            taxonomy = '';
        }
        if (areaInx > -1 ) {
            area = 'area="'+ data[i][areaInx]+'"';
        } else {
            area = '';
        }
        if (valueInx > -1 ) {
            value = 'value="'+ data[i][valueInx]+'"';
        } else {
            value = '';
        }

        // Cost Type
        var costTypeSelection = $('#defineCostSelect option:selected').val();
        var costTypePerAreaSelection = $('#perAreaSelect option:selected').val();
        if (costTypeSelection == 'aggregated') {
            costTypes += '\t\t\t\t<costType name="structural" type="aggregated" unit="EUR"/>\n' +
                '\t\t\t</costTypes>\n';
        } else if (costTypeSelection == 'perBuilding') {
            costTypes += '\t\t\t\t<costType name="structural" type="per_asset" unit="EUR"/>\n' +
                '\t\t\t</costTypes>\n';
        } else if (costTypeSelection == 'perArea' && costTypePerAreaSelection == 'aggregated') {
            costTypes +=
                '\t\t\t\t<costType name="structural" type="per_area" unit="EUR"/>\n' +
                    '\t\t\t\t\t<area type="aggregated" unit="square meters"/>\n' +
                '\t\t\t</costTypes>\n';
        } else if (costTypeSelection == 'perArea' && costTypePerAreaSelection == 'perArea') {
            costTypes +=
                '\t\t\t\t<costType name="structural" type="per_area" unit="EUR"/>\n' +
                    '\t\t\t\t\t<area type="per_asset" unit="square meters"/>\n' +
                '\t\t\t</costTypes>\n';
        } else if (costTypeSelection == 'none') {
            costTypes = '';
        }

        // Insurance Limit
        var limitState = $('#limitSelect option:selected').val();
        if (limitState == 'absolute') {
            insuranceLimit = '\t\t\t<insuranceLimit isAbsolute="true"/>\n';
        } else if (limitState == 'relative') {
            insuranceLimit = '\t\t\t<insuranceLimit isAbsolute="false"/>\n';
        }

        // deductibleSelect
        var deductibleState = $('#deductibleSelect option:selected').val();
        if (deductibleState == 'absolute') {
            deductible = '\t\t\t<deductible isAbsolute="true"/>\n';
        } else if (deductibleState == 'relative') {
            deductible = '\t\t\t<deductible isAbsolute="false"/>\n';
        }

        // Retrofitted
        var retrofittingSelect = $('#retrofittingSelect input:checked').val();
        if (retrofittingSelect == 'retrofitting') {
            retrofitting = 'retrofitted="'+data[i][retrofittingInx]+'"';
        }

        // limit value
        var limitSelect = $('#limitSelect input:checked').val();
        if (limitSelect == 'retrofitting') {
            limit = 'insuranceLimit="'+data[i][limitInx]+'"';
        }

        // Economic Cost
        if (structuralInx > -1 ) {
            costTypes += '\t\t\t\t<costType name="structural" type="per_asset" unit="USD" />\n';
            costs += '\t\t\t\t\t<cost type="structural" value="'+ data[i][structuralInx]+'" '+retrofitting+'/>\n';
        }
        if (non_structuralInx > -1 ) {
            costs += '\t\t\t\t\t<cost type="non_structural" value="'+ data[i][non_structuralInx]+'"/>\n';
        }
        if (contentsInx > -1 ) {
            costs += '\t\t\t\t\t<cost type="contents" value="'+ data[i][contentsInx]+'"/>\n';
        }
        if (businessInx > -1 ) {
            costs += '\t\t\t\t\t<cost type="business" value="'+ data[i][businessInx]+'"/>\n';
        }

        // Occupancies
        if (dayInx > -1 ) {
            occupancies += '\t\t\t\t\t<occupancy occupants="'+ data[i][dayInx]+'" period="day"/>\n';
        }
        if (nightInx > -1 ) {
            occupancies += '\t\t\t\t\t<occupancy occupants="'+ data[i][nightInx]+'" period="night"/>\n';
        }
        if (transitInx > -1 ) {
            occupancies += '\t\t\t\t\t<occupancy occupants="'+ data[i][transitInx]+'" period="transit"/>\n';
        }

        costs += '\t\t\t\t</costs>\n';
        occupancies += '\t\t\t\t</occupancies>\n';

        asset +=
            '\t\t\t<asset id="'+i+'" '+number+' '+area+' '+taxonomy+' > \n' +
                '\t\t\t\t<location '+longitude+' '+latitude+' />\n' +
                costs +
                occupancies +
            '\t\t\t</asset>\n';
    }

    // Create a NRML element
    var NRML =
        '<?xml version="1.0" encoding="UTF-8"?> \n' +
        '<nrml xmlns="http://openquake.org/xmlns/nrml/0.4"> \n' +
            '\t<fragilityModel id="'+functionId+'" assetCategory="'+assetCategory+'"> \n' +
                '\t\t<description>'+functionDescription+'</description> \n' +
                '\t\t<limitStates> \n' +
                    // TODO make these dynamic based on form input
                    '\t\t\t slight damage \n' +
                    '\t\t\t moderate damage \n' +
                    '\t\t\t collapse \n' +
                '\t\t</limitStates> \n' +

                '\t\t<assets> \n' +
                    asset +
                '\t\t</assets> \n' +
            '\t</exposureModel> \n' +
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








