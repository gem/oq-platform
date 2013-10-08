/*
Copyright (c) 2013, GEM Foundation.

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

var app = new OQLeaflet.OQLeafletApp(THIRD_PARTY_URLS.leaflet_base_map);

var DIALOG_HEIGHT = {min: 320, max: 480};
var DIALOG_WIDTH = {min: 416, max: 640};

var startApp = function() {
    app.createMap();

    var showDialog = function(divTarget) {
        var options = {
            modal: true,
            title: 'Run calculation',
            minHeight: DIALOG_HEIGHT.min,
            maxHeight: DIALOG_HEIGHT.max,
            minWidth: DIALOG_WIDTH.min,
            maxWidth: DIALOG_WIDTH.max,
            resizable: false,
            draggable: false
        };
        options.close = function () {
            var theForm = $('#calc-form-wrapper');
            if (theForm.size()) {
                theForm.remove();
            }
        };
        $(divTarget).dialog(options);
    };

    var newCalculation = function(calcFormUrl) {
        return function () {
            $.ajax({
                type: 'GET',
                url: calcFormUrl,
                success: function(data, textStatus, jqXHR) {
                    var formDiv = $(data).filter('#calc-form-wrapper')[0];
                    prepCalcForm(formDiv);
                    $('#oq-calc-dialog').append(formDiv);
                    $('#add-input-model').click(addInputModel);
                    // prevent a page redirect on form submit
                    $('#calc-form').submit(function() {
                        // TODO(LB): If we wanted to get the calculation ID
                        // here, we should beable to get it from the ajaxSubmit
                        // by adding a 'success' handler.
                        $(this).ajaxSubmit();
                        $('#oq-calc-dialog').dialog('close');
                        return false;
                    });
                    showDialog('#oq-calc-dialog');
                }
            });
        };
    };


    // Shamelessly copied from the oq-engine-server run calc template.
    var addInputModel = function() {
        var modelCount = $('input[id^="id_model_"]').length;
        modelCount++;

        var newID = 'id_model_' + modelCount;
        var modelLabel = '<label for="' + newID
            + '">Input model ' + modelCount + '</label>';
        var modelField = '<input type="file" name="input_model_'
            + modelCount + '" id="' + newID + '" />';
        $('#additional-fields').append(
            '<p>' + modelLabel + modelField + '</p>'
        );
    };

    // Auto-populate the callback url and user fields,
    // and then hide the elements.
    // We don't want to expose this sort of thing to the user.
    var prepCalcForm = function(formDiv) {
        $(formDiv)
            .find('input[id=id_migration_callback_url]')
            .val(ICEBOX_URLS.artifacts_import)
            .parent()
            .hide();
        $(formDiv)
            .find('input[id=id_owner_user]')
            .val(CURRENT_USER)
            .parent()
            .hide();
    };

    $('#button-new-hazard-calc').click(
        newCalculation(OQ_ENGINE_SERVER_URLS.run_hazard_calc_form)
    );
    $('#button-new-risk-calc').click(
        newCalculation(OQ_ENGINE_SERVER_URLS.run_risk_calc_form)
    );
};

app.initialize(startApp);
