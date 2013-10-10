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

var app = new OQLeaflet.OQLeafletApp(BASE_MAP_URL);

var startApp = function() {
    app.createMap();

    var showDialog = function(divTarget) {
        var options = {};
        options.modal = true;
        options.title = 'Run calculation';
        options.close = function () {
            var theForm = $('#calc-form-wrapper');
            if (theForm.size()) {
                console.log('removing a calc-form-wrapper');
                theForm.remove();
            }
        };
        $(divTarget).dialog(options);
    };


    // TODO: hook into the submit button and don't go to another page
    // on form submission.
    $('#button-new-hazard-calc').click(function() {
        /*
        var theForm = $('#calc-form-wrapper');
        if (theForm.size()) {
            console.log('removing a calc-form-wrapper');
            theForm.remove();
        }
        */

        $.ajax({
            type: 'GET',
            url: 'http://localhost:11888/v1/calc/hazard/run',
            success: function(data, textStatus, jqXHR) {
                var formDiv = $(data).filter('#calc-form-wrapper')[0];
                $('#oq-calc-dialog').html(formDiv);

                $('#add-input-model').click(
                    function() {
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
                    }
                );
                showDialog('#calc-form-wrapper');
            }
        });
    });

};

app.initialize(startApp);
