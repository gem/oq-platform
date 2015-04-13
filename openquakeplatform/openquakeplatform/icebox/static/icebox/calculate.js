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
   var progressHandlingFunction = function(progress) {
	   var percent = progress.loaded / progress.total * 100;
 	   $('.bar').css('width', percent + '%');
	   if (percent == 100) {
       dialog.hidePleaseWait();
	   }
   };

   var dialog = (function ()
                 {
                   var pleaseWaitDiv = $('<div class="modal hide" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-header"><h1>Processing...</h1></div><div class="modal-body"><div class="progress progress-striped active"><div class="bar" style="width: 0%;"></div></div></div></div>');
                   return {
                     showPleaseWait: function(msg, progress) {
	                     $('h1', pleaseWaitDiv).text(msg);
	                     if (progress) {
		                     progressHandlingFunction({loaded: 0, total: 1});
	                     } else {
		                     progressHandlingFunction({loaded: 1, total: 1});
	                     }
                       pleaseWaitDiv.modal();
                     },
                     hidePleaseWait: function () {
                       pleaseWaitDiv.modal('hide');
                     }
                   };
                 })();

   var CalculationTable = Backbone.View.extend(
     {
       /* the html element where the table is rendered */
       el: $('#my-calculations'),
       
       initialize: function(options) {

         /* whatever happens to any calculation, re-render the table */
         _.bindAll(this, 'render');
         this.calculations = options.calculations;
         this.calculations.bind('reset', this.render);
         this.calculations.bind('add', this.render);
         this.calculations.bind('remove', this.render);

         /* if false, it prevents the table to be refreshed */
         this.can_be_rendered = true;

         this.render();
       },

       events: {
         "click .btn-danger": "remove_calculation",
         "click .btn-file": "on_run_risk_clicked",
         "change .btn-file input": "on_run_risk_queued"
       },

       /* When an input dialog is opened, it is very important to not re-render the table */
       on_run_risk_clicked: function(e) {
         /* if a file input dialog has been opened do not refresh the calc table */
         this.can_be_rendered = false;
       },

       on_run_risk_queued: function(e) {
         this.can_be_rendered = true;
       },

       remove_calculation: function(e) {
         e.preventDefault();
         var calc_id = $(e.target).attr('data-calc-id');
         var view = this;
         dialog.showPleaseWait('Removing calculation');
         $.post('/icebox/remove_calculation/' + calc_id).success(
           function(response) {
             view.calculations.remove([view.calculations.get(calc_id)]);
           }).error(
             function() { alert("Can't not remove calculation") }).always(
               function() { dialog.hidePleaseWait(); });
       },

       render: function() {
         if (!this.can_be_rendered) {
           return;
         };
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
       el: $('#tab2'),

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
         return calculations.get(this.get('calculation')) || new Output({ 'calculation_type': undefined });
       }
     });

   var Outputs = Backbone.Collection.extend(
     { 
       model: Output,
       url: '/icebox/outputs'
     });
   var outputs = new Outputs();

   var refresh_calcs;

   function setTimer() {
       refresh_calcs = setInterval(function() { calculations.fetch({reset: true}) }, 5000);
   }

   /* classic event management */   

   $(document).ready(
     function() {
       var calculation_table = new CalculationTable({ calculations: calculations });
       calculations.fetch({reset: true});
       setTimer();

       var output_table = new OutputTable({ outputs: outputs });
       outputs.fetch({reset: true});

       /* TODO. output collection should observe the calculation one */
       setInterval(function() { outputs.fetch({reset: true}) }, 10000);

       /* XXX. Reset the input file value to ensure the change event
        will be always triggered */
       $(document).on("click", 'input[name=calc_archive]',
                      function(e) { this.value = null; });

       $(document).on("change", 'input[name=calc_archive]',
                      function(e) {
                        dialog.showPleaseWait('Uploading calculation', true);
                        var input = $(e.target);
                        var form = input.parents('form')[0];

	                      $(form).ajaxSubmit(
                          {
		                        xhr: function() {  // custom xhr to add progress bar management
                              var myXhr = $.ajaxSettings.xhr();
                              if(myXhr.upload){ // if upload property exists
                                myXhr.upload.addEventListener('progress', progressHandlingFunction, false);
                              }
                              return myXhr;
                            },
		                        success: function(data) {
                              calculations.add(new Calculation(data));
                            },
		                        error: function(xhr) { 
                              dialog.hidePleaseWait();
                              alert(xhr.responseText);
		                        }});
                      });
      $(document).on('click', 'button[id=open_trace]',
                function(e) {
                        clearInterval(refresh_calcs);
                      });
      $(document).on('hidden.bs.modal', 'div[id^=traceback-]',
                function(e) {
                        setTimer();
                      });
     });
 })($, Backbone, _);
