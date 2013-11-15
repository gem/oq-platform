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

(function($, Backbone, _) {
   var dialog = (function () {
    var pleaseWaitDiv = $('<div class="modal hide" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-header"><h1>Processing...</h1></div><div class="modal-body"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div></div>');
    return {
        showPleaseWait: function() {
            pleaseWaitDiv.modal();
        },
        hidePleaseWait: function () {
            pleaseWaitDiv.modal('hide');
        }
    };
})();

   var CalculationTable = Backbone.View.extend(
     {
       el: $('#tab3'),

       initialize: function(options) {
         _.bindAll(this, 'render');
         this.calculations = options.calculations;
         this.calculations.bind('reset', this.render);
         this.calculations.bind('add', this.render);
         this.calculations.bind('remove', this.render);
         this.render();
       },

       events: {
         "click .btn-danger": "remove_calculation"
       },

       remove_calculation: function(e) {
         var calc_id = $(e.target).attr('data-calc-id');
         var view = this;
         dialog.showPleaseWait();
         $.post('/icebox/remove_calculation/' + calc_id).success(
           function(response) {
             view.calculations.remove([view.calculations.get(calc_id)]);
           }).error(
             function() { alert("Can't not remove calculation") }).always(
               function() { dialog.hidePleaseWait(); });
       },

       render: function() {
         this.$el.html(_.template($('#calculation-table-template').html(),
                                    { calculations: this.calculations.models }));
       }
     });

    var Calculation = Backbone.Model.extend({
        defaults: {
          map: null,
          layers: []
        }
    });

   var Calculations = Backbone.Collection.extend(
     { 
       model: Calculation,
       url: '/icebox/calculations'
     });
   var calculations = new Calculations();


   var OutputTable = Backbone.View.extend(
     {
       el: $('#tab4'),

       initialize: function(options) {
         _.bindAll(this, 'render');
         this.outputs = options.outputs;
         this.outputs.bind('reset', this.render);
         this.outputs.bind('add', this.render);
         this.render();
       },

       render: function() {
         this.$el.html(_.template($('#output-table-template').html(),
                                    { outputs: this.outputs.models }));
       }
     });

   var Output = Backbone.Model.extend(
     {
       calc: function() {
         return calculations.get(this.get('calculation'));
       }
     });

   var Outputs = Backbone.Collection.extend(
     { 
       model: Output,
       url: '/icebox/outputs'
     });
   var outputs = new Outputs();


   /* classic event management */   

   $(document).ready(
     function() {
       var calculation_table = new CalculationTable({ calculations: calculations });
       calculations.fetch({reset: true});
       setInterval(function() { calculations.fetch({reset: true}) }, 5000);

       var output_table = new OutputTable({ outputs: outputs });
       outputs.fetch({reset: true});

       /* TODO. output collection should observe the calculation one */
       setInterval(function() { outputs.fetch({reset: true}) }, 10000);

       /* TODO (lp) avoid hardcoding urls */
       $('.calc-form').submit(
         function(e) {
           e.preventDefault();
           dialog.showPleaseWait();
           var form = this;
           $.post('/icebox/calculations', {calculation_type: $(form).attr('data-calc-type')}).success(
             function(data) {
               dialog.hidePleaseWait();
               $('a[href=#tab3]').tab('show');
               calculations.add(new Calculation({id: data.id }));
               $("input[name=callback_url]", form).val(
                 'http://localhost:8000/icebox/calculation/' + data.id);
               $("input[name=foreign_calculation_id]", form).val(data.id);
               $(form).ajaxSubmit();
             }).error(function() {
                        alert("Openquake Engine Server Failed. Please contact the website administrator");
                      });
         });
     });
 })($, Backbone, _);