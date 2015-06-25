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

var hot;
var costTypesType;
var costTypesAreaType;
var header;

$('#perArea').hide();
$( document ).ready(function() {
    $('#updateBtn').css('display', 'block');
});


$('#defineCostSelect').change(function() {
    var defineCost = $('#defineCostSelect').val();
    if (defineCost == 'none') {
        //continue;
        // WARNING no costTypesType set here!!!
        $('#perArea').hide();
    } else if (defineCost == 'aggregated') {
        costTypesType = 'type="aggregated"';
        $('#perArea').hide();
    } else if (defineCost == 'perBuilding') {
        costTypesType = 'type="per_asset"';
        $('#perArea').hide();
    } else if (defineCost == 'perArea') {
        costTypesType = 'type="per_area"';
        $('#perArea').show();
    }
});

$('#updateBtn').click(function() {
    // Remove any existing table
    try {
        hot.destroy();
    } catch (e) {
        // continue
    }

    // Default columns
    header = ['longitude', 'latitude', 'taxonomy', 'number'];

    function checkForValue (argument) {
        if (argument != 'none') {
            header.push(argument);
        }
    }

    // Get info from da form
    $('#economicCheckBoxes input:checked').each(function() {
        header.push($(this).attr('value'));
    });


    checkForValue($('#limitSelect option:selected').val());
    checkForValue($('#deductibleSelect option:selected').val());
    var perAreaVisible = $('#perArea:visible').length;
    if (perAreaVisible === 1) {
        header.push('area', 'value');
    }

    var perArea = $('#perAreaSelect').val();
    if (perArea == 'aggregated') {
        costTypesAreaType = '<area type="aggregated" unit="square meters"/>';
    } else if (perArea == 'perArea') {
        costTypesAreaType = '<area type="per_asset" unit="square meters"/>';
    }

    $('#occupantsCheckBoxes input:checked').each(function() {
        header.push($(this).attr('value'));
    });

    $('#retrofittingSelect input:checked').each(function() {
        header.push($(this).attr('value'));
    });

    var headerLength = header.length;
    console.log('header:');
    console.log(header);

    // Create the table
    var container = document.getElementById('hot');
    hot = new Handsontable(container,
    {
        //data: data,
        colHeaders: header,
        rowHeaders: true,
        minSpareRows: 1,
        //colHeaders: true,
        contextMenu: true,
        startCols: headerLength,
        maxCols: headerLength
    });

    $('#saveBtn').css('display', 'block');
});

$('#saveBtn').click(function() {
    // Get the values from the table
    var data = hot.getData();
    console.log('data:');
    console.log(data);

    // Check for null values
    for (var i = 0; i < data.length -1 ; i++) {
        for (var j = 0; j < data[i].length; j++) {
            if (data[i][j] === null) {
                alert("whoops, there seem to be some empty cells");
                return;
            }
        }
    }

    // Check for header match
    function checkHeaderMatch (argument) {
        // Get the the index for each header element
        return header.indexOf(argument);
    }

    var asset = '';
    var latitude = 'latitude';
    var longitude = 'longitude';
    var taxonomy = 'taxonomy';
    var number = 'number';
    var area = 'area';

    // Get the the index for each header element
    /*
    latitude = header.indexOf(latitude);
    longitude = header.indexOf(longitude);
    taxonomy = header.indexOf(taxonomy);
    number = header.indexOf(number);
    area = header.indexOf(area);
*/
    latitudeInx = checkHeaderMatch(latitude);
    longitudeInx = checkHeaderMatch(longitude);
    taxonomyInx = checkHeaderMatch(taxonomy);
    numberInx = checkHeaderMatch(number);
    areaInx = checkHeaderMatch(area);

    // Create the asset
    for (var i = 0; i < data.length -1; i++) {
        if (numberInx > -1 ) {
            number = 'number="'+ data[i][numberInx]+'"';
        } else {
            number = '';
        }
        if (latitudeInx > -1 ) {
            latitude = 'latitude="'+ data[i][latitudeInx]+'"';
        } else {
            latitude = '';
        }
        if (longitudeInx > -1 ) {
            longitude = 'longitude="'+ data[i][longitudeInx]+'"';
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
        asset += '\t\t\t<asset id="'+i+'" '+number+' '+area+' '+taxonomy+' > \n';
    }

    //Create a NRML element
    var NRML =
        '<?xml version="1.0" encoding="UTF-8"?> \n' +
        '<nrml xmlns="http://openquake.org/xmlns/nrml/0.4"> \n' +
            '\t<exposureModel id="ex1" \n' +
                '\t\tcategory="buildings" \n' +
                '\t\ttaxonomySource="GEM taxonomy"> \n' +
                '\t\t<description>exposure model</description> \n' +
                '\t\t<conversions> \n' +
                    '\t\t\t<area type="aggregated" unit="SQM" /> \n' +
                    '\t\t\t<costTypes> \n' +
                        //'<costType name="nonstructural" '+costTypesType+' unit="USD" /> \n' +
                    '\t\t\t</costTypes> \n' +
                '\t\t</conversions> \n' +
                '\t\t<assets> \n' +
                    asset +
                '\t\t</assets> \n' +
            '\t</exposureModel> \n' +
        '</nrml>';

    console.log('NRML:');
    console.log(NRML);
    var collength = (data.length * 30) + 60;

    $('#outPut').empty();
    $('#outPut').append('<textarea style="width: 500px;  height: '+collength+'px; rows="'+collength+'" cols="70">'+NRML+'</textarea>');
});

