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

var ff_obj = { tbl: {},
               tbl_idx: 0,
               nrml: "",
               limitStates: []
             };

function ff_sh2full(funcType)
{
    if (funcType == 'cont')
        return 'continuous';
    else if (funcType == 'discr')
        return 'discrete';
}

function ff_sh2long(funcType)
{
    if (funcType == 'cont')
        return 'continuous function';
    else if (funcType == 'discr')
        return 'discrete function';
}


var activeTablesObj = {};

function ff_updateTable (funcType) {
    var table;
    var format_name = ff_sh2long(funcType);

    // Get info from the form and build the table header
    ff_obj.limitStates = $('.ff_gid #limitStates').val().split(',');
    var limitStatesHeader = [];
    for (var i = 0; i < ff_obj.limitStates.length; i++) {
        limitStatesHeader.push(ff_obj.limitStates[i]);
    }

    limitStatesHeader.unshift('intensity measure');
    var limitStateLength = ff_obj.limitStates.length;

    var colWidth;
    // disable the fragility function form
    $('.ff_gid #limitStates').prop('disabled', true);
    // Setup the header
    if (funcType == 'discr') {
        header = limitStatesHeader;
        limitStateLength = 1;
    } else if (funcType == 'cont') {
        header = ['damage state', 'mean', 'stddev'];
        colWidth = 100;
    }

    var headerLength = header.length;

    // Create the table containers, as many as the user wants
    ff_obj.tbl_idx += 1;
    var tbl_idx = ff_obj.tbl_idx;

    var imls;
    // Imls value needs to be an array for discrete functions,
    // and minIML & maxIML for continuous
    if (funcType == 'discr') {
        imls = '';
    } else if (funcType == 'cont') {
        imls =
            '<label> MinIML: </label>' +
            '<input name="min-impls" class="ffsTable" type="text"><br>' +
            '<label> MaxIML: </label>' +
            '<input name="max-impls" class="ffsTable" type="text">';
    }

    // Create the fragility function set (ffs)
    $('.ff_gid #tables').append(
        '<div id="table'+ff_obj.tbl_idx+'" class="tables_gid table'+ff_obj.tbl_idx+'_id ffsTableDiv panel panel-default" '+
            'data-gem-func-type="'+ funcType + '">' +
          '<strong class="ffsTitle">' + format_name.toUpperCase() + '</strong><button name="destroy_table" class="destroyTable btn-danger btn">Remove</button><br>' +
            '<div class="ffsForm" >' +
                '<label> Function Id: </label>' +
                '<input name="id" class="ffsTable" type="text"><br>' +
                '<label> IMT: </label>' +
                '<input name="imt" class="ffsTable" type="text" placeholder="PGA"><br>' +
                '<label> Damage Limit: </label>' +
                '<input name="no-damage-limit" class="ffsTable" type="text"><br>' +
                imls +
                '<br>' +
            '</div>'+
            '<div style="width: 45%; float: right;">' +
              '<div name="tableDiv'+ff_obj.tbl_idx+'" class="theTable"></div><br>' +
            (funcType == 'discr' ?
              '<button id="new_row_add" style="clear: right; float: right; margin-top: 4px;" class="btn">Add Row</button><br>' :
             '') +
           '</div>' +
         '</div>'
    );

    // force bootstrap style
    $('.ff_gid .btn-danger').css({'background-color': '#da4f49'});


    ////////////////////////////////
    /// fragility Table Settings ///
    ////////////////////////////////

    var handson_params = {
        colHeaders: header,
        startCols: headerLength,
        maxCols: headerLength,
        startRows: limitStateLength,
        colWidths: colWidth
    }

    if (funcType == 'discr') {
        handson_params.rowHeaders = true;
        handson_params.contextMenu = true;
        handson_params.manualColumnResize = true;
        handson_params.manualRowResize = true;
    }
    else if (funcType == 'cont') {
        handson_params.rowHeaders = false;
        handson_params.contextMenu = false;
        handson_params.manualColumnResize = false;
        handson_params.manualRowResize = false;
        handson_params.maxRows = ff_obj.limitStates.length;
        handson_params.columns = [
            {readOnly: true,
             className: "htLeft"},
            {className: "htRight"},
            {className: "htRight"}
        ],

        handson_params.cells = function(r,c, prop) {
            var cellProperties = {};
            if (c===0) cellProperties.readOnly = true;
            return cellProperties;
        }
    }

    $('.ff_gid [name="tableDiv'+ff_obj.tbl_idx+'"]').handsontable(handson_params);
    ff_obj.tbl[ff_obj.tbl_idx] = $('.ff_gid [name="tableDiv'+ff_obj.tbl_idx+'"]').handsontable("getInstance");
    table = ff_obj.tbl[ff_obj.tbl_idx];

    // Populate the table with limit states
    if (funcType == 'cont') {
        for (var i = 0; i < ff_obj.limitStates.length; i++) {
            table.setDataAtCell(i, 0, ff_obj.limitStates[i]);
        }
    }

    $('.ff_gid #outputText').empty();
    $('.ff_gid #convertBtn').show();

    // use tbl_idx to fix with a closure the idx value inside click and change callbacks
    var tbl_idx = ff_obj.tbl_idx;

    // Logic to remove a table
    $('.ff_gid .table' + tbl_idx + '_id [name="destroy_table"]').click(function() {
        $('.ff_gid #table' + tbl_idx).remove();
        delete ff_obj.tbl[tbl_idx];
        if (Object.keys(ff_obj.tbl).length == 0) {
            $('.ff_gid #limitStates').prop('disabled', false);
            $('.ff_gid #convertBtn').hide();
            $('.ff_gid #outputDiv').hide();
        }
    });

    // Logic to manage newRow button
    $('.ff_gid .table' + tbl_idx + '_id #new_row_add').click(function() {
        var table;
        table = $('.ff_gid [name="tableDiv'+ff_obj.tbl_idx+'"]').handsontable("getInstance");
        table.alter('insert_row', table.countRows());
    });

    // Increase the ffs panel when many limit states are defined
    if (limitStateLength > 5) {
        $('.ff_gid .ffsTableDiv').height(240 + (limitStateLength * 1.5));
    }

}

$('.ff_gid #downloadBtn').click(function() {
    sendbackNRML(ff_obj.nrml, 'ff');
});

$('.ff_gid #convertBtn').click(function() {
    var tabs_data = {};

    // get the data for each table
    for(var k in ff_obj.tbl) {
        tabs_data[k] = ff_obj.tbl[k].getData();
    }

    for(var k in tabs_data) {
        var pfx = '.ff_gid .table'+k+'_id';
        var tab_data = tabs_data[k];

        for (var i = 0; i < tab_data.length; i++) {
            for (var j = 0; j < tab_data[i].length; j++) {
                if (tab_data[i][j] === null || tab_data[i][j].toString().trim() == "") {
                    var funcType = $(pfx).attr('data-gem-func-type');
                    var funcId = $(pfx+' [name="id"]').val();
                    var error_msg = "empty cell detected at coords (" + (i+1) + ", " + (j+1) + ") of " +
                        ff_sh2long(funcType)+ " with ID " + funcId;

                    output_manager('ff', error_msg, null, null);
                    return;
                }
            }
        }
    }

    var functionId = $('.ff_gid #functionId').val();
    var assetCategory = $('.ff_gid #assetCategory').val();
    var lossCategory = $('.ff_gid #lossCategory').val();
    var functionDescription = $('.ff_gid #functionDescription').val();

    // Opening limit state tag
    var limitStatesXML = '\t\t<limitStates> ';

    for (var i = 0; i < ff_obj.limitStates.length; i++) {
        // Dynamic limit state tag(s)
        limitStatesXML += ff_obj.limitStates[i];
    }

    // Closing limit state tag
    limitStatesXML += '</limitStates>\n';

    ////////////////
    // Create ffs //
    ////////////////

    var fragilityFunction = '';
    // Create the ffs elements
    for (var k in ff_obj.tbl) {
        var pfx = '.ff_gid .table'+k+'_id';
        var tab_data = tabs_data[k];
        var funcType = $(pfx).attr('data-gem-func-type');

        var ffs;
        // Opening ffs tag
        if (funcType == 'discr') {
            ffs = '\t\t<fragilityFunction id="'+$(pfx+' [name="id"]').val()+'" format="'+
                ff_sh2full(funcType)+'">\n';
        } else if (funcType == 'cont') {
            ffs = '\t\t<fragilityFunction id="'+$(pfx+' [name="id"]').val()+'" format="'+
                ff_sh2full(funcType)+'" shape="logncdf">\n';
        }
        // Create the imls tag
        var imlsTag;
        if (funcType == 'discr') {
            // Opening IML tag
            imlsTag = '\t\t\t<imls imt="'+$(pfx+' [name="imt"]').val()+'" noDamageLimit="'+
                $(pfx+' [name="no-damage-limit"]').val()+'">';

            for (var i = 0; i < tab_data.length; i++) {
                // IML values
                imlsTag += (i == 0 ? "" : " ") + tab_data[i][0];
            }
            // Closing IML tag
            imlsTag += '</imls>\n';
        } else if (funcType == 'cont') {
            imlsTag = '\t\t\t<imls imt="'+$(pfx+' [name="imt"]').val()+
                '" noDamageLimit="'+$(pfx+' [name="no-damage-limit"]').val()+
                '" minIML="'+$(pfx+' [name="min-impls"]').val()+
                '" maxIML="'+$(pfx+' [name="max-impls"]').val()+
                '"/>\n';
        }
        // Dynamic imls tag
        ffs += imlsTag;

        // Dynamic ffs tag(s)
        if (funcType == 'discr') {
            for (var i = 0 ; i < ff_obj.limitStates.length ; i++) {
                // Opening poes tag
                ffs += '\t\t\t<poes ls="'+ff_obj.limitStates[i].replace(/ /g,'')+'">';
                for (var j = 0; j < tab_data.length; j++) {
                    // The intensity measure is the first column in the table,
                    // so we need to shift one column to the right ( i + 1 )
                    ffs += (j == 0 ? "" : " ") + tab_data[j][i + 1];
                }
                // Closing poes tag
                ffs += '</poes>\n';
            }

        } else if (funcType == 'cont') {
            for (var i = 0; i < ff_obj.limitStates.length; i++) {
                ffs += '\t\t\t<params ls="'+ff_obj.limitStates[i].replace(/ /g,'')+
                    '" mean="'+tab_data[i][1]+
                    '" stddev="'+tab_data[i][2]+'"/>\n';
                }
            }

        // Closing ffs tags
        ffs += '\t\t</fragilityFunction>\n';
        fragilityFunction += ffs;
    }

    // Create a NRML element
    var nrml =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<nrml xmlns="http://openquake.org/xmlns/nrml/0.5">\n' +
            '\t<fragilityModel id="'+functionId+'" assetCategory="'+assetCategory+'" lossCategory="'+lossCategory+'">\n' +
                '\t\t<description>'+functionDescription+'</description>\n' +
                limitStatesXML +
                fragilityFunction +
            '\t</fragilityModel>\n' +
        '</nrml>';

    validateAndDisplayNRML(nrml, 'ff', ff_obj);
});


// initialization function
$(document).ready(function (){
    $('.ff_gid #outputDiv').hide();

    $('.ff_gid #addDiscrFunc').click(function() {
        var funcType = 'discr';
        ff_updateTable(funcType);
        $('.ff_gid #outputDiv').hide();
    });

    $('.ff_gid #addContFunc').click(function() {
        var funcType = 'cont';
        ff_updateTable(funcType);
        $('.ff_gid #outputDiv').hide();
    });

});

