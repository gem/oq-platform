/*
   Copyright (c) 2015-2016, GEM Foundation.

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

var ex_obj = {
    tbl: {},
    tbl_idx: 0,
    nrml: "",
    header: [],

    // perAreaRefCount is used to keep track of any time perArea is selected
    perAreaRefCount: {
        costStruc : false,
        costNonStruc : false,
        costContent : false,
        costBusiness : false
    },

    perAreaUpdate: function(selectedValue, element) {
        // Manage all define cost elements that are using perArea
        if (selectedValue == 'per_area') {
            this.perAreaRefCount[element] = true;
        }
        else {
            this.perAreaRefCount[element] = false;
        }
    },

    perAreaIsVisible: function() {
        // If perAreaRefCountManager returnes false then we can hide the area
        // option from the form

        for(var k in this.perAreaRefCount) {
            if (this.perAreaRefCount[k] === true) {
                return true;
            }
        }
        return false;
    },

    perAreaManager: function(selectedValue, element) {
        // Manage all define cost elements that are using perArea
        this.perAreaUpdate(selectedValue, element);

        if (this.perAreaIsVisible())
            $('.ex_gid #perArea').show();
        else
            $('.ex_gid #perArea').hide();
    }
};

$('.ex_gid #costStruc').change(function() {
    // There is a bug in the handsontable lib where one can not
    // paste values into the table when the user has made a selection
    // from a dropdown menu. The reason for this error is that the focus
    // remains on the menu.
    // The workaround for this is to un-focus the selection menu with blur()
    // More info: https://github.com/handsontable/handsontable/issues/2973
    $(this).blur();
    ex_obj.perAreaManager($(this).val(), $(this).context.id);
    if ($(this).val() != 'none') {
        $('.ex_gid #structural_costs_units_div').show();
        $('.ex_gid #retrofittingSelect').show();
        $('.ex_gid #limitDiv').show();
        $('.ex_gid #deductibleDiv').show();
    } else {
        $('.ex_gid #structural_costs_units_div').hide();
        $('.ex_gid #retrofittingSelect').hide();
        $('.ex_gid #limitDiv').hide();
        $('.ex_gid #deductibleDiv').hide();
        // Uncheck retrofitting
        $('.ex_gid #retroChbx').attr('checked', false);
        // Unselect the limit & deductible
        $(".ex_gid #limitSelect").val('0');
        $(".ex_gid #deductibleSelect").val('0');
    }
});

$('.ex_gid #costNonStruc').change(function() {
    // unfocus the selection menu, see the note at the costStruc change event
    $(this).blur();

    if ($(this).val() != 'none') {
        $('.ex_gid #nonstructural_costs_units_div').show();
    }
    else {
        $('.ex_gid #nonstructural_costs_units_div').hide();
    }
    ex_obj.perAreaManager($(this).val(), $(this).context.id);
});

$('.ex_gid #costContent').change(function() {
    if ($(this).val() != 'none') {
        $('.ex_gid #contents_costs_units_div').show();
    }
    else {
        $('.ex_gid #contents_costs_units_div').hide();
    }
    // unfocus the selection menu, see the note at the costStruc change event
    $(this).blur();
    ex_obj.perAreaManager($(this).val(), $(this).context.id);
});

$('.ex_gid #costBusiness').change(function() {
    if ($(this).val() != 'none') {
        $('.ex_gid #busi_inter_costs_units_div').show();
    }
    else {
        $('.ex_gid #busi_inter_costs_units_div').hide();
    }

    // unfocus the selection menu, see the note at the costStruc change event
    $(this).blur();
    ex_obj.perAreaManager($(this).val(), $(this).context.id);
});

$('.ex_gid #form').change(function() {
    // unfocus the selection menu, see the note at the costStruc change event
    $(this).blur();
    ex_updateTable();
    $('.ex_gid #outputDiv').hide();
});

function checkForValueInHeader(header, argument) {
    var inx = ex_obj.header.indexOf(argument);
    return inx;
}

function ex_updateTable() {
    // Remove any existing table, if already exists
    $('.ex_gid #table').handsontable('destroy');

    // Default columns
    ex_obj.header = ['id', 'longitude', 'latitude', 'taxonomy', 'number'];

    function checkForValue (argument, valueArg) {
        // Modify the table header only when the menu is altered
        // This constraint will allow Limit, Deductible and Occupant elements to be
        // added to the header
        if (argument != 'none' && valueArg === undefined) {
            if (checkForValueInHeader(ex_obj.header, argument) == -1) {
                ex_obj.header.push(argument);
            }
        // This constraint will allow structural, non-structural, contents and business
        // costs to be added to the header
        } else if (argument != 'none' && valueArg !== undefined) {
            if (checkForValueInHeader(ex_obj.header, valueArg) == -1) {
                ex_obj.header.push(valueArg);
            }
        }
    }

    // Get info from the expsure form and use it to build the table header
    $('.ex_gid #costStruc option:selected').each(function() {
        checkForValue($(this).attr('value'), 'structural');
    });

    $('.ex_gid #costNonStruc option:selected').each(function() {
        checkForValue($(this).attr('value'), 'non-structural');
    });

    $('.ex_gid #costContent option:selected').each(function() {
        checkForValue($(this).attr('value'), 'contents');
    });

    $('.ex_gid #costBusiness option:selected').each(function() {
        checkForValue($(this).attr('value'), 'business');
    });

    $('.ex_gid #limitSelect option:selected').each(function() {
        checkForValue($(this).attr('value'), 'limit');
    });

    $('.ex_gid #deductibleSelect option:selected').each(function() {
        checkForValue($(this).attr('value'), 'deductible');
    });

    var perAreaVisible = $('.ex_gid #perArea:visible').length;
    if (perAreaVisible === 1) {
        ex_obj.header.push('area');
    }

    $('.ex_gid #occupantsCheckBoxes input:checked').each(function() {
        ex_obj.header.push($(this).attr('value'));
        // unfocus the selection menu, see the note at the exposure costStruc change event
        $(this).blur();
    });

    $('.ex_gid #retrofittingSelect input:checked').each(function() {
        ex_obj.header.push($(this).attr('value'));
        // unfocus the selection menu, see the note at the exposure costStruc change event
        $(this).blur();
    });

    var headerLength = ex_obj.header.length;

    // Create the table
    var container = document.getElementById('table');

    ///////////////////////////////
    /// Exposure Table Settings ///
    ///////////////////////////////
    $('.ex_gid #table').handsontable({
        colHeaders: ex_obj.header,
        rowHeaders: true,
        contextMenu: true,
        startRows: 3,
        startCols: headerLength,
        maxCols: headerLength,
        className: "htRight"
    });
    ex_obj.tbl = $('.ex_gid #table').handsontable('getInstance');

    $('.ex_gid #outputText').empty();
    $('.ex_gid #convertBtn').show();
}

$('.ex_gid #downloadBtn').click(function() {
    sendbackNRML(ex_obj.nrml, 'ex');
});

$('.ex_gid #convertBtn').click(function() {
    // Get the values from the table
    var data = ex_obj.tbl.getData();

    // Check for null values
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            var s = data[i][j] + " ";
            if (data[i][j] === null || data[i][j].toString().trim() == "") {
                output_manager('ex', "empty cell at coords (" + (i+1) + ", " + (j+1) + ")", null, null);
                return;
            }
        }
    }

    // Check for header match
    function checkHeaderMatch (argument) {
        return ex_obj.header.indexOf(argument);
    }

    var description = $('.ex_gid #description').val();

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

    // Pre area selection
    var areaType = "";
    var areaTypeSelected = $('.ex_gid #perAreaSelect').val();
    if ($('.ex_gid #perArea').is(":visible")) {
        areaType += '\t\t\t<area type="'+areaTypeSelected+'" unit="' + $('.ex_gid #area_units').val() + '" />\n';
    }

    // Cost Type
    var costType= '';
    var costTypeStruc = $('.ex_gid #costStruc option:selected').val();
    if (costTypeStruc !== 'none') {
        costType += '\t\t\t\t<costType name="structural" type="'+costTypeStruc+'" unit="' + $('.ex_gid #structural_costs_units').val() + '"/>\n';
    }

    var costTypeNonStruc = $('.ex_gid #costNonStruc option:selected').val();
    if (costTypeNonStruc !== 'none') {
        costType += '\t\t\t\t<costType name="nonstructural" type="'+costTypeNonStruc+'" unit="' + $('.ex_gid #nonstructural_costs_units').val() + '"/>\n';
    }

    var costTypeContent = $('.ex_gid #costContent option:selected').val();
    if (costTypeContent !== 'none') {
        costType += '\t\t\t\t<costType name="contents" type="'+costTypeContent+'" unit="' + $('.ex_gid #contents_costs_units').val() + '"/>\n';
    }

    var costTypeBusiness = $('.ex_gid #costBusiness option:selected').val();
    if (costTypeBusiness !== 'none') {
        costType += '\t\t\t\t<costType name="business_interruption" type="'+costTypeBusiness+'" unit="' + $('.ex_gid #busi_inter_costs_units').val() + '"/>\n';
    }

    var limitState = $('.ex_gid #limitSelect option:selected').val();
    if (limitState == 'absolute') {
        insuranceLimit = '\t\t\t<insuranceLimit isAbsolute="true"/>\n';
    } else if (limitState == 'relative') {
        insuranceLimit = '\t\t\t<insuranceLimit isAbsolute="false"/>\n';
    }

    var deductibleState = $('.ex_gid #deductibleSelect option:selected').val();
    if (deductibleState == 'absolute') {
        deductible = '\t\t\t<deductible isAbsolute="true"/>\n';
    } else if (deductibleState == 'relative') {
        deductible = '\t\t\t<deductible isAbsolute="false"/>\n';
    }

    var retrofittingSelect = $('.ex_gid #retrofittingSelect input:checked').val();

    // Create the asset
    for (var i = 0; i < data.length; i++) {
        var costTypes = '\t\t\t<costTypes>\n';
        var costs ='\t\t\t\t<costs>\n';
        var occupancies_header = '\t\t\t\t<occupancies>\n';
        var occupancies = occupancies_header;

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

        // Insurance Limit
        var limitValue = '';
        if (limitState == 'absolute') {
            limitValue = ' insuranceLimit="'+data[i][limitInx]+'"';
        } else if (limitState == 'relative') {
            limitValue = ' insuranceLimit="'+data[i][limitInx]+'"';
        }

        // Retrofitted
        if (retrofittingSelect == 'retrofitting') {
            retrofitting = ' retrofitted="'+data[i][retrofittingInx]+'"';
        }

        // deductibleSelect
        var deductibleValue = '';
        if (deductibleState == 'absolute') {
            deductibleValue = ' deductible="'+data[i][deductibleInx]+'"';
        } else if (deductibleState == 'relative') {
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
        if (occupancies != occupancies_header) {
            occupancies += '\t\t\t\t</occupancies>\n';
        }
        else {
            occupancies = "";
        }

        asset +=
            '\t\t\t<asset id="'+id+'" '+number+' '+area+' '+taxonomy+' >\n' +
                '\t\t\t\t<location '+longitude+' '+latitude+' />\n' +
                costs +
                occupancies +
            '\t\t\t</asset>\n';
    }

    // Create a NRML element
    var nrml =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<nrml xmlns="http://openquake.org/xmlns/nrml/0.4">\n' +
            '\t<exposureModel id="ex1" category="buildings" taxonomySource="GEM taxonomy">\n' +
                '\t\t<description>' + description + '</description>\n' +
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

    validateAndDisplayNRML(nrml, 'ex', ex_obj);
});

// tab initialization
$(document).ready(function () {
    /////////////////////////////////////////////////////////
    // Manage the visibility of the perArea selection menu //
    /////////////////////////////////////////////////////////
    $('.ex_gid #perArea').hide();

    $('.ex_gid #retrofittingSelect').hide();
    $('.ex_gid #limitDiv').hide();
    $('.ex_gid #deductibleDiv').hide();
    $('.ex_gid #structural_costs_units_div').hide();
    $('.ex_gid #nonstructural_costs_units_div').hide();
    $('.ex_gid #contents_costs_units_div').hide();
    $('.ex_gid #busi_inter_costs_units_div').hide();
    ex_updateTable();
    $('.ex_gid #new_row_add').click(function() {
        ex_obj.tbl.alter('insert_row');
    });
    $('.ex_gid #outputDiv').hide();
    $('#absoluteSpinner').hide();
});
