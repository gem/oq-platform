/*
   Copyright (c) 2014, GEM Foundation.

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

var app = angular.module('exposureApp', ['ngTable']);
var data = [];

app.controller('ExposureCountryList', function($scope, $filter, myService, ngTableParams)  {
    myService.getFoo().then(function(data) {
        $scope.data = data;

        console.log('data:');
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            if (data[i].num > 1) {
                data[i]["level"] = "Sub-National";
            } else if (data[i].num <= 1) {
                data[i]["level"] =  "National";
            }
            if (data[i].has_nonres == null) {
                data[i].has_nonres = false;
            }
        }

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            filter: {
                country_name: ''       // initial filter
            }
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var filteredData = params.filter() ?
                    $filter('filter')(data, params.filter()) :
                    data;
                var orderedData = params.filter() ?
                       $filter('filter')(data, params.filter()) :
                       data;

                $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                params.total(orderedData.length); // set total for recalc pagination
                $defer.resolve($scope.users);
            }
        });

        $scope.changeSelection = function(study) {
            console.info(study);
            if (study.level == "National") {
                $http.get("../exposure/get_studies_by_country?iso="+study.iso+"&level_filter=national").success(function(data, status) {
                    console.log('data:');
                    console.log(data);
                    $('#radioSubRegionList').append(
                        '<form id="exposure-building-form" class="exposure_export_form">'+
                            '<h3>Study: '+study.name+' '+study.study+'</h3></br>'+
                            '<p><b><label for="id_timeOfDay_0">Time of Day:</label></br></b>'+
                            '<label for="id_timeOfDay_0"><input class="exposure_export_widget" id="id_timeOfDay_0" name="timeOfDay" type="radio" value="day" /> Day</label></br></b>'+
                            '<label for="id_timeOfDay_1"><input class="exposure_export_widget" id="id_timeOfDay_1" name="timeOfDay" type="radio" value="night" /> Night</label></br></b>'+
                            '<label for="id_timeOfDay_2"><input class="exposure_export_widget" id="id_timeOfDay_2" name="timeOfDay" type="radio" value="transit" /> Transit</label></br></b>'+
                            '<label for="id_timeOfDay_3"><input class="exposure_export_widget" id="id_timeOfDay_3" name="timeOfDay" type="radio" value="all" /> All</label></br></b>'+
                            '<label for="id_timeOfDay_4"><input class="exposure_export_widget" id="id_timeOfDay_4" name="timeOfDay" type="radio" value="off" /> Off</label></br></b>'+
                            '</p>'+
                            '<p><label for="id_residential_0">Residential:</label></br>'+
                            '<label for="id_residential_0"><input class="exposure_export_widget" id="id_residential_0" name="residential" type="radio" value="res" /> Residential</label></br>'+
                            '<label for="id_residential_1"><input class="exposure_export_widget" id="id_residential_1" name="residential" type="radio" value="non-res" /> Non-Residential</label></br>'+
                            '<label for="id_residential_2"><input class="exposure_export_widget" id="id_residential_2" name="residential" type="radio" value="both" /> Both</label></br>'+
                            '</p>'+
                            '<p><label for="id_outputType_0">Output Type:</label></br>'+
                            '<label for="id_outputType_0"><input class="exposure_export_widget" id="id_outputType_0" name="outputType" type="radio" value="csv" /> CSV</label></br>'+
                            '<label for="id_outputType_1"><input class="exposure_export_widget" id="id_outputType_1" name="outputType" type="radio" value="nrml" /> NRML</label></br>'+
                            '</p>'+
                            '<input type="hidden" name="iso" value="'+study.iso+'">'+
                            '<input type="hidden" name="study" value="'+study.study+'">'+
                            '<br>'+
                            '<button id="exposure-bldg-download-button" type="button">Download</button>'+
                            '<img id="download-button-spinner" src="/static/img/ajax-loader.gif" style="display: none;" />'+
                        '</form>'
                    );
                    // Build the national selection form

                });
            } else if (study.level == "Sub-National") {
                $http.get("../exposure/get_studies_by_country?iso="+study.iso+"&level_filter=subnational").success(function(data, status) {
                    console.log('data:');
                    console.log(data);
                    // Build the sub-national selection form
                });
            }
        }; // end changeSelection
    });
});

app.factory('myService', function($http, $q) {
   return {
     getFoo: function() {
       var deferred = $q.defer();
       $http.get('../exposure/get_countries_and_studies').success(function(data) {
          deferred.resolve(data);
       }).error(function(){
          deferred.reject();
       });
       return deferred.promise;
     }
   }
});


