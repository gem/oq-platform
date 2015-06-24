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

$('#perArea').hide();
$( document ).ready(function() {
    $('#updateBtn').css('display', 'block');
});


$('#defineCostSelect').change(function() {
    var defineCost = $('#defineCostSelect').val();
    if (defineCost == 'none') {
        //continue;
        $('#perArea').hide();
    } else if (defineCost == 'aggregated') {
        // type="aggregated"
        $('#perArea').hide();
    } else if (defineCost == 'perBuilding') {
        // type="per_asset"
        $('#perArea').hide();
    } else if (defineCost == 'perArea') {
        // type="per_area"
        // <area type="aggregated" unit="square meters"/>
        // OR
        // <area type="per_asset" unit="square meters"/>
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
    var header = ['longitude', 'latitude', 'taxonomy', 'number'];

    function checkForValue (argument) {
        if (argument != 'none') {
            header.push(argument);
        }
    }

    // Get info from form
    $('#economicCheckBoxes input:checked').each(function() {
        header.push($(this).attr('value'));
    });

    checkForValue($('#limitSelect option:selected').val());
    checkForValue($('#deductibleSelect option:selected').val());
    var perAreaVisible = $('#perArea:visible').length;
    if (perAreaVisible === 1) {
        header.push('area', 'value');
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


});


