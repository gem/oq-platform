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



$(document).ready(
  function() {
    /* TODO(lp): refactor this to use javascript templates */
    var addInputModel = function(e) {
      e.preventDefault();
      var modelCount = $('input[id^="id_model_"]').length;
      modelCount++;

      var newID = 'id_model_' + modelCount;
      var modelLabel = '<label for="' + newID
        + '">Input model ' + modelCount + '</label>';
      var modelField = '<input type="file" name="input_model_'
        + modelCount + '" id="' + newID + '" />';
      $('.additional-fields', $(this).parent()).append(
        '<p>' + modelLabel + modelField + '</p>'
      );
    };

    /* TODO (lp) avoid hardcoding urls */
    $('#haz-calc-form').submit(
      function(e) {
        e.preventDefault();
        var form = this;
        $.post('/icebox/calculations', {calculation_type: 'hazard'}).success(
          function(data) {
            $("input[name=migration_callback_url]", form).val(
              'http://localhost:8000/icebox/calculation/' + data.id);
            $("input[name=foreign_calculation_id]", form).val(data.id);
            $(form).ajaxSubmit(
              {url: OQ_ENGINE_SERVER_URLS.run_hazard_calc_form});
          }).error(function() {
                       alert("Openquake Engine Server Failed. Please contact the website administrator");
                       console.log(arguments);
                     });
      });
    $('.add-input-model').click(addInputModel);
});