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
//var costTypesType;
//var costTypesAreaType;
var header;

$('#perArea').hide();
$( document ).ready(function() {
    $('#updateBtn').css('display', 'block');
});

// Manage the visibility of the perArea selection menu
$('#defineCostSelect').change(function() {
    var defineCost = $('#defineCostSelect').val();
    if (defineCost == 'none') {
        $('#perArea').hide();
    } else if (defineCost == 'aggregated') {
        $('#perArea').hide();
    } else if (defineCost == 'perBuilding') {
        $('#perArea').hide();
    } else if (defineCost == 'perArea') {
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

/*
    function checkForValue (argument) {
        if (argument != 'none') {
            header.push(argument);
        }
    }
*/
    // Get info from da form an build the table header
    $('#economicCheckBoxes input:checked').each(function() {
        header.push($(this).attr('value'));
    });

    //checkForValue($('#limitSelect option:selected').val());
    //checkForValue($('#deductibleSelect option:selected').val());

    var defineCostSelect = $('#defineCostSelect option:selected').val();
    if (defineCostSelect != 'none') {
        header.push('value');
    }

    var perAreaVisible = $('#perArea:visible').length;
    if (perAreaVisible === 1) {
        header.push('area');
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
    $('#outPut').empty();
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
        return header.indexOf(argument);
    }

    var asset = '';
    var latitude = 'latitude';
    var longitude = 'longitude';
    var taxonomy = 'taxonomy';
    var number = 'number';
    var area = 'area';
    var value = 'value';
    var structural = 'structural';
    var non_structural = 'non_structural';
    var contents = 'contents';
    var business = 'business';
    var day = 'day';
    var night = 'night';
    var transit = 'transit';
    var insuranceLimit = '';
    var deductible = '';

    // Get the the index for each header element
    var latitudeInx = checkHeaderMatch(latitude);
    var longitudeInx = checkHeaderMatch(longitude);
    var taxonomyInx = checkHeaderMatch(taxonomy);
    var numberInx = checkHeaderMatch(number);
    var areaInx = checkHeaderMatch(area);
    var valueInx = checkHeaderMatch(value);
    var structuralInx = checkHeaderMatch(structural);
    var non_structuralInx = checkHeaderMatch(non_structural);
    var contentsInx = checkHeaderMatch(contents);
    var businessInx = checkHeaderMatch(business);
    var dayInx = checkHeaderMatch(day);
    var nightInx = checkHeaderMatch(night);
    var transitInx = checkHeaderMatch(transit);

    // Create the asset
    for (var i = 0; i < data.length -1; i++) {
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

        // Economic Cost
        if (structuralInx > -1 ) {
            costTypes += '\t\t\t\t<costType name="structural" type="per_asset" unit="USD" />\n';
            costs += '\t\t\t\t\t<cost type="structural" value="'+ data[i][structuralInx]+'"/>\n';
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
            occupancies += '\t\t\t\t\t<occupancy period="'+ data[i][dayInx]+'"/>\n';
        }
        if (nightInx > -1 ) {
            occupancies += '\t\t\t\t\t<occupancy period="'+ data[i][nightInx]+'"/>\n';
        }
        if (transitInx > -1 ) {
            occupancies += '\t\t\t\t\t<occupancy period="'+ data[i][transitInx]+'"/>\n';
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
            '\t<exposureModel id="ex1" category="buildings" taxonomySource="GEM taxonomy"> \n' +
                '\t\t<description>exposure model</description> \n' +
                '\t\t<conversions> \n' +
                    '\t\t\t<area type="aggregated" unit="SQM" /> \n' +
                    costTypes +
                    insuranceLimit +
                    deductible +
                '\t\t</conversions> \n' +
                '\t\t<assets> \n' +
                    asset +
                '\t\t</assets> \n' +
            '\t</exposureModel> \n' +
        '</nrml>';

    console.log('NRML:');
    console.log(NRML);

    // Provide the user with the xml output
    $('#outPut').empty();
    $('#outPut').append('<textarea style="width: 600px;  height: 700px;>'+NRML+'</textarea>');
});

