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

var exposureTable;
var header;
var showArea = false;
var NRML;

$( document ).ready(function() {
    updateTable();
    $('#outputDiv').css('display', 'none');
    $('#absoluteSpinner').hide();
});

$('#retrofittingSelect').hide();
$('#limitDiv').hide();
$('#deductibleDiv').hide();

/////////////////////////////////////////////////////////
// Manage the visibility of the perArea selection menu //
/////////////////////////////////////////////////////////
$('#perArea').hide();

$('#defineCostStruc').change(function() {
    // There is a bug in the handsontable lib where one can not
    // paste values into the table when the user has made a selection
    // from a dropdown menu. The reason for this error is that the focus
    // remains on the menu.
    // The workaround for this is to un-focus the selection menu with blur()
    // More info: https://github.com/handsontable/handsontable/issues/2973
    $(this).blur();
    defineCost($(this).val());
    if ($(this).val() != 'none') {
        $('#retrofittingSelect').show();
        $('#limitDiv').show();
        $('#deductibleDiv').show();
    } else {
        $('#retrofittingSelect').hide();
        $('#limitDiv').hide();
        $('#deductibleDiv').hide();
        // Uncheck retrofitting
        $('#retroChbx').attr('checked', false);
        // Unselect the limit & deductible
        $("#limitSelect").val('0');
        $("#deductibleSelect").val('0');
    }
});

$('#defineCostNonStruc').change(function() {
    // unfocus the selection menu, see the note at the defineCostStruc change event
    $(this).blur();
    defineCost($(this).val(), $(this).context.id);
});

$('#defineCostContent').change(function() {
    // unfocus the selection menu, see the note at the defineCostStruc change event
    $(this).blur();
    defineCost($(this).val());
});

$('#defineCostBusiness').change(function() {
    // unfocus the selection menu, see the note at the defineCostStruc change event
    $(this).blur();
    defineCost($(this).val());
});

// costTrackerObj is used to keep track of any time perArea is selected
var costTrackerObj = {
    defineCostStruc : 'false',
    defineCostNonStruc : 'false',
    defineCostContent : 'false',
    defineCostBusiness : 'false'
};

function defineCost(selectedValue, element) {
    // Manage all define cost elements that are using perArea
    if (selectedValue == 'per_area') {
        costTrackerObj[element] = true;
        $('#perArea').show();
        showArea = true;
    }

    // Manage all define cost elements that are using perArea continued
    if (selectedValue != 'per_area') {
        costTrackerObj[element] = false;

        // If costTrackerManager returnes false then we can hide the area
        // option from the form
        if (costTrackerManager()) {
            return;
        } else {
            $('#perArea').hide();
            showArea = false;
        }
    }
}

// Check the costTrackerObj for any accurances of true
function costTrackerManager () {
    for(var k in costTrackerObj) {
        if (costTrackerObj[k] === true) {
            return true;
        }
    }
}
// End the visibility of the perArea selection menu

$('#exposureForm').change(function() {
    // unfocus the selection menu, see the note at the defineCostStruc change event
    $(this).blur();
    updateTable();
    $('#outputDiv').css('display', 'none');
});

function checkForValueInHeader(header, argument) {
    var inx = header.indexOf(argument);
    return inx;
}

function updateTable() {
    // Remove any existing table
    try {
        exposureTable.destroy();
    } catch (e) {
        // continue
    }

    // Default columns
    header = ['id', 'longitude', 'latitude', 'taxonomy', 'number'];

    function checkForValue (argument, valueArg) {
        // Modify the table header only when the menu is altered
        // This constraint will allow Limit, Deductible and Occupant elements to be
        // added to the header
        if (argument != 'none' && valueArg === undefined) {
            if (checkForValueInHeader(header, argument) == -1) {
                header.push(argument);
            }
        // This constraint will allow structural, non-structural, contents and business
        // costs to be added to the header
        } else if (argument != 'none' && valueArg !== undefined) {
            if (checkForValueInHeader(header, valueArg) == -1) {
                header.push(valueArg);
            }
        }
    }

    // Get info from the expsure form and use it to build the table header
    $('#defineCostStruc option:selected').each(function() {
        checkForValue($(this).attr('value'), 'structural');
    });

    $('#defineCostNonStruc option:selected').each(function() {
        checkForValue($(this).attr('value'), 'non-structural');
    });

    $('#defineCostContent option:selected').each(function() {
        checkForValue($(this).attr('value'), 'contents');
    });

    $('#defineCostBusiness option:selected').each(function() {
        checkForValue($(this).attr('value'), 'business');
    });

    $('#limitSelect option:selected').each(function() {
        checkForValue($(this).attr('value'), 'limit');
    });

    $('#deductibleSelect option:selected').each(function() {
        checkForValue($(this).attr('value'), 'deductible');
    });

    var perAreaVisible = $('#perArea:visible').length;
    if (perAreaVisible === 1) {
        header.push('area');
    }

    $('#occupantsCheckBoxes input:checked').each(function() {
        header.push($(this).attr('value'));
        // unfocus the selection menu, see the note at the exposure defineCostStruc change event
        $(this).blur();
    });

    $('#retrofittingSelect input:checked').each(function() {
        header.push($(this).attr('value'));
        // unfocus the selection menu, see the note at the exposure defineCostStruc change event
        $(this).blur();
    });

    var headerLength = header.length;

    // Create the table
    var container = document.getElementById('table');

    ///////////////////////////////
    /// Exposure Table Settings ///
    ///////////////////////////////


    exposureTable = new Handsontable(container, {
        colHeaders: header,
        rowHeaders: true,
        contextMenu: true,
        startCols: headerLength,
        maxCols: headerLength,
        startRows: 1
    });

    // insert new row using keyboard input
    $(document).keyup(function(e) {
        // This will watch for keys Ctl + Shift + n
        if (e.shiftKey && e.ctrlKey && e.keyCode == 78) {
            var rowIndex = $('.currentRow').parent().index();

            exposureTable.alter("insert_row", rowIndex);
        }
    });

    $('#outPut').empty();
    $('#saveBtn').show();

}

$('#saveBtn').click(function() {
    // Expose the download button
    $('#downloadBtn').show();

    // Get the values from the table
    var data = exposureTable.getData();

    // Check for null values
    for (var i = 0; i < data.length; i++) {
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
    var structural = 'structural';
    var non_structural = 'non-structural';
    var contents = 'contents';
    var business = 'business';
    var day = 'day';
    var night = 'night';
    var transit = 'transit';
    var insuranceLimit = '';
    var deductible = '';
    var retrofitting = '';
    var limit = '';
    var assetId = 'id';

    // Get the the index for each header element
    var latitudeInx = checkHeaderMatch(latitude);
    var longitudeInx = checkHeaderMatch(longitude);
    var taxonomyInx = checkHeaderMatch(taxonomy);
    var numberInx = checkHeaderMatch(number);
    var areaInx = checkHeaderMatch(area);
    var structuralInx = checkHeaderMatch(structural);
    var non_structuralInx = checkHeaderMatch(non_structural);
    var contentsInx = checkHeaderMatch(contents);
    var businessInx = checkHeaderMatch(business);
    var dayInx = checkHeaderMatch(day);
    var nightInx = checkHeaderMatch(night);
    var transitInx = checkHeaderMatch(transit);
    var retrofittingInx = checkHeaderMatch('retrofitting');
    var limitInx = checkHeaderMatch('limit');
    var deductibleInx = checkHeaderMatch('deductible');
    var assetIdInx = checkHeaderMatch(assetId);

    // Create the asset
    for (var i = 0; i < data.length; i++) {
        var costTypes = '\t\t\t<costTypes>\n';
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
        if (assetIdInx > -1 ) {
            id = data[i][assetIdInx];
        } else {
            id = '';
        }

        // Pre area selection
        var areaType = "";
        var areaTypeSelected = $('#perAreaSelect').val();
        if (showArea == true) {
            areaType += '\t\t\t<area type="'+areaTypeSelected+'" unit="SQM" />\n';
        }

        // Cost Type
        var costType= '';
        var costTypeStruc = $('#defineCostStruc option:selected').val();
        if (costTypeStruc !== 'none') {
            costType += '\t\t\t\t<costType name="structural" type="'+costTypeStruc+'" unit="EUR"/>\n';
        }

        var costTypeNonStruc = $('#defineCostNonStruc option:selected').val();
        if (costTypeNonStruc !== 'none') {
            costType += '\t\t\t\t<costType name="nonstructural" type="'+costTypeNonStruc+'" unit="EUR"/>\n';
        }

        var costTypeContent = $('#defineCostContent option:selected').val();
        if (costTypeContent !== 'none') {
            costType += '\t\t\t\t<costType name="contents" type="'+costTypeContent+'" unit="EUR"/>\n';
        }

        var costTypeBusiness = $('#defineCostBusiness option:selected').val();
        if (costTypeBusiness !== 'none') {
            costType += '\t\t\t\t<costType name="business_interruption" type="'+costTypeBusiness+'" unit="EUR"/>\n';
        }

        // Insurance Limit
        var limitValue = '';
        var limitState = $('#limitSelect option:selected').val();
        if (limitState == 'absolute') {
            insuranceLimit = '\t\t\t<insuranceLimit isAbsolute="true"/>\n';
            limitValue = ' insuranceLimit="'+data[i][limitInx]+'"';
        } else if (limitState == 'relative') {
            insuranceLimit = '\t\t\t<insuranceLimit isAbsolute="false"/>\n';
            limitValue = ' insuranceLimit="'+data[i][limitInx]+'"';
        }

        // Retrofitted
        var retrofittingSelect = $('#retrofittingSelect input:checked').val();
        if (retrofittingSelect == 'retrofitting') {
            retrofitting = ' retrofitted="'+data[i][retrofittingInx]+'"';
        }

        // deductibleSelect
        var deductibleValue = '';
        var deductibleState = $('#deductibleSelect option:selected').val();
        if (deductibleState == 'absolute') {
            deductible = '\t\t\t<deductible isAbsolute="true"/>\n';
            deductibleValue = ' deductible="'+data[i][deductibleInx]+'"';
        } else if (deductibleState == 'relative') {
            deductible = '\t\t\t<deductible isAbsolute="false"/>\n';
            deductibleValue = ' deductible="'+data[i][deductibleInx]+'"';
        }

        // Economic Cost
        if (structuralInx > -1 ) {
            costTypes += '\t\t\t\t<costType name="structural" type="per_asset" unit="USD" />\n';
            costs += '\t\t\t\t\t<cost type="structural" value="'+ data[i][structuralInx]+'"'+retrofitting+deductibleValue+limitValue+'/>\n';
        }
        if (non_structuralInx > -1 ) {
            costs += '\t\t\t\t\t<cost type="nonstructural" value="'+ data[i][non_structuralInx]+'"/>\n';
        }
        if (contentsInx > -1 ) {
            costs += '\t\t\t\t\t<cost type="contents" value="'+ data[i][contentsInx]+'"/>\n';
        }
        if (businessInx > -1 ) {
            costs += '\t\t\t\t\t<cost type="business_interruption" value="'+ data[i][businessInx]+'"/>\n';
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
            '\t\t\t<asset id="'+id+'" '+number+' '+area+' '+taxonomy+' >\n' +
                '\t\t\t\t<location '+longitude+' '+latitude+' />\n' +
                costs +
                occupancies +
            '\t\t\t</asset>\n';
    }

    // Create a NRML element
    NRML =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<nrml xmlns="http://openquake.org/xmlns/nrml/0.4">\n' +
            '\t<exposureModel id="ex1" category="buildings" taxonomySource="GEM taxonomy">\n' +
                '\t\t<description>exposure model</description>\n' +
                '\t\t<conversions>\n' +
                    areaType +
                    '\t\t\t<costTypes>\n' +
                    costType +
                    '\t\t\t</costTypes>\n' +
                    insuranceLimit +
                    deductible +
                '\t\t</conversions>\n' +
                '\t\t<assets>\n' +
                    asset +
                '\t\t</assets>\n' +
            '\t</exposureModel>\n' +
        '</nrml>';

    // Provide the user with the xml output
    $('#outPut').empty();
    $('#outPut').append('<textarea id="textarea" style="width: 600px;  height: 700px;>'+NRML+'</textarea>');
    $('#outputDiv').css('display', 'block');
    selectAllText();
});

$('#downloadBtn').click(function() {
    var textToSave = NRML;

    var hiddenElement = document.createElement('a');

    hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'myFile.xml';
    hiddenElement.click();
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



