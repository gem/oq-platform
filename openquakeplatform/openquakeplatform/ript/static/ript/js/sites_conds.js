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

var sc_obj = {
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
            $('.sc_gid #perArea').show();
        else
            $('.sc_gid #perArea').hide();
    }
};

$('.sc_gid #costStruc').change(function() {
    // There is a bug in the handsontable lib where one can not
    // paste values into the table when the user has made a selection
    // from a dropdown menu. The reason for this error is that the focus
    // remains on the menu.
    // The workaround for this is to un-focus the selection menu with blur()
    // More info: https://github.com/handsontable/handsontable/issues/2973
    $(this).blur();
    sc_obj.perAreaManager($(this).val(), $(this).context.id);
    if ($(this).val() != 'none') {
        $('.sc_gid #structural_costs_units_div').show();
        $('.sc_gid #retrofittingSelect').show();
        $('.sc_gid #limitDiv').show();
        $('.sc_gid #deductibleDiv').show();
    } else {
        $('.sc_gid #structural_costs_units_div').hide();
        $('.sc_gid #retrofittingSelect').hide();
        $('.sc_gid #limitDiv').hide();
        $('.sc_gid #deductibleDiv').hide();
        // Uncheck retrofitting
        $('.sc_gid #retroChbx').attr('checked', false);
        // Unselect the limit & deductible
        $(".sc_gid #limitSelect").val('0');
        $(".sc_gid #deductibleSelect").val('0');
    }
});

$('.sc_gid #costNonStruc').change(function() {
    // unfocus the selection menu, see the note at the costStruc change event
    $(this).blur();

    if ($(this).val() != 'none') {
        $('.sc_gid #nonstructural_costs_units_div').show();
    }
    else {
        $('.sc_gid #nonstructural_costs_units_div').hide();
    }
    sc_obj.perAreaManager($(this).val(), $(this).context.id);
});

$('.sc_gid #costContent').change(function() {
    if ($(this).val() != 'none') {
        $('.sc_gid #contents_costs_units_div').show();
    }
    else {
        $('.sc_gid #contents_costs_units_div').hide();
    }
    // unfocus the selection menu, see the note at the costStruc change event
    $(this).blur();
    sc_obj.perAreaManager($(this).val(), $(this).context.id);
});

$('.sc_gid #costBusiness').change(function() {
    if ($(this).val() != 'none') {
        $('.sc_gid #busi_inter_costs_units_div').show();
    }
    else {
        $('.sc_gid #busi_inter_costs_units_div').hide();
    }

    // unfocus the selection menu, see the note at the costStruc change event
    $(this).blur();
    sc_obj.perAreaManager($(this).val(), $(this).context.id);
});

$('.sc_gid #form').change(function() {
    // unfocus the selection menu, see the note at the costStruc change event
    $(this).blur();
    sc_updateTable();
    $('.sc_gid #outputDiv').hide();
});

function checkForValueInHeader(header, argument) {
    var inx = sc_obj.header.indexOf(argument);
    return inx;
}

function sc_updateTable() {
    // Remove any existing table, if already exists
    $('.sc_gid #table').handsontable('destroy');

    // Default columns
    sc_obj.header = [ 'Longitude', 'Latitude', 'Vs30', 'Vs30 Type', 'Depth 1 km/s', 'Depth 2.5 km/s'];

    function checkForValue (argument, valueArg) {
        // Modify the table header only when the menu is altered
        // This constraint will allow Limit, Deductible and Occupant elements to be
        // added to the header
        if (argument != 'none' && valueArg === undefined) {
            if (checkForValueInHeader(sc_obj.header, argument) == -1) {
                sc_obj.header.push(argument);
            }
        // This constraint will allow structural, non-structural, contents and business
        // costs to be added to the header
        } else if (argument != 'none' && valueArg !== undefined) {
            if (checkForValueInHeader(sc_obj.header, valueArg) == -1) {
                sc_obj.header.push(valueArg);
            }
        }
    }

    // Get info from the expsure form and use it to build the table header
    $('.sc_gid #costStruc option:selected').each(function() {
        checkForValue($(this).attr('value'), 'structural');
    });

    $('.sc_gid #costNonStruc option:selected').each(function() {
        checkForValue($(this).attr('value'), 'non-structural');
    });

    $('.sc_gid #costContent option:selected').each(function() {
        checkForValue($(this).attr('value'), 'contents');
    });

    $('.sc_gid #costBusiness option:selected').each(function() {
        checkForValue($(this).attr('value'), 'business');
    });

    $('.sc_gid #limitSelect option:selected').each(function() {
        checkForValue($(this).attr('value'), 'limit');
    });

    $('.sc_gid #deductibleSelect option:selected').each(function() {
        checkForValue($(this).attr('value'), 'deductible');
    });

    var perAreaVisible = $('.sc_gid #perArea:visible').length;
    if (perAreaVisible === 1) {
        sc_obj.header.push('area');
    }

    $('.sc_gid #occupantsCheckBoxes input:checked').each(function() {
        sc_obj.header.push($(this).attr('value'));
        // unfocus the selection menu, see the note at the exposure costStruc change event
        $(this).blur();
    });

    $('.sc_gid #retrofittingSelect input:checked').each(function() {
        sc_obj.header.push($(this).attr('value'));
        // unfocus the selection menu, see the note at the exposure costStruc change event
        $(this).blur();
    });

    var headerLength = sc_obj.header.length;

    // Create the table
    var container = document.getElementById('table');

    ///////////////////////////////
    /// Exposure Table Settings ///
    ///////////////////////////////
    $('.sc_gid #table').handsontable({
        colHeaders: sc_obj.header,
        rowHeaders: true,
        contextMenu: true,
        startRows: 3,
        startCols: headerLength,
        maxCols: headerLength,
        className: "htRight"
    });
    sc_obj.tbl = $('.sc_gid #table').handsontable('getInstance');

    $('.sc_gid #outputText').empty();
    $('.sc_gid #convertBtn').show();
}

$('.sc_gid #downloadBtn').click(function() {
    sendbackNRML(sc_obj.nrml, 'sc');
});

$('.sc_gid #convertBtn').click(function() {
    // Get the values from the table
    var data = sc_obj.tbl.getData();

    var sites = '';
    // Check for null values
    for (var i = 0; i < data.length; i++) {
        sites += '\t<site lon="' + data[i][0] + '" lat="' + data[i][1] + '" vs30="' + data[i][2] +
             '" vs30Type="' + data[i][3] + '" z1pt0="' + data[i][4] + '" z2pt5="' + data[i][5] +'"/>\n';
    }

// <?xml version="1.0" encoding="utf-8"?>
// <nrml xmlns:gml="http://www.opengis.net/gml"
//   xmlns="http://openquake.org/xmlns/nrml/0.4">
//     <siteModel>
//        <site lon="-9.9958" lat="35.004" vs30="590" vs30Type="inferred" z1pt0="19.36719673" z2pt5="0.588625072" />
//        <site lon="-9.9623" lat="35.004" vs30="590" vs30Type="inferred" z1pt0="19.36719673" z2pt5="0.588625072" />
//        <site lon="-9.9288" lat="35.004" vs30="590" vs30Type="inferred" z1pt0="19.36719673" z2pt5="0.588625072" />
//        <site lon="-9.8953" lat="35.004" vs30="590" vs30Type="inferred" z1pt0="19.36719673" z2pt5="0.588625072" />
//        <site lon="-9.8618" lat="35.004" vs30="590" vs30Type="inferred" z1pt0="19.36719673" z2pt5="0.588625072" />
//     </siteModel>
// </nrml>




    // Create a NRML element
    var nrml = '<?xml version="1.0" encoding="utf-8"?>\n' +
            '<nrml xmlns:gml="http://www.opengis.net/gml" xmlns="http://openquake.org/xmlns/nrml/0.4">\n' +
            '  <siteModel>\n' +
            sites +
            '  </siteModel>\n' +
        '</nrml>\n';

    validateAndDisplayNRML(nrml, 'sc', sc_obj);
});

// tab initialization
$(document).ready(function () {
    /////////////////////////////////////////////////////////
    // Manage the visibility of the perArea selection menu //
    /////////////////////////////////////////////////////////
    sc_updateTable();
    $('.sc_gid #new_row_add').click(function() {
        sc_obj.tbl.alter('insert_row');
    });
    $('.sc_gid #outputDiv').hide();
    $('#absoluteSpinner').hide();
});
