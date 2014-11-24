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
    myService.getCountryList().then(function(data) {
        $scope.data = data;

        console.log('getCountryList:');
        console.log(data);

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
    });

    $scope.changeSelection = function(study) {
        if (study.num_l1_studies <= 1) {
            $("#ragionTable").hide();
            $('#selectionForm').empty();
            $('#selectionForm').append(
                '<form id="exposure-building-form" class="exposure_export_form">'+
                    '<h3>Study: '+study.country_name+' '+study.study_name+'</h3></br>'+
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
        } else if (study.num_l1_studies > 1) {
            $('#ragionTable h3').empty();
            $('#ragionTable').prepend('<h3>Study: '+study.country_name+' '+study.study_name+'</h3>');
            $('#selectionForm').empty();
            // Populate the table
            createRegionList(study);
            // Show html elements for the table
            $("#ragionTable").show();
        }
    }; // end changeSelection
});


app.controller('ExposureRegionList', function($scope, $filter, myService, ngTableParams)  {
    createRegionList = function(study) {
        myService.getRegionList(study.iso).then(function(bar) {
            console.log('bar:');
            console.log(bar);

            $scope.tableParams2 = new ngTableParams({
                page: 1,            // show first page
                count: 10           // count per page
            }, {
                total: bar.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.sorting() ?
                            $filter('orderBy')(bar, params.orderBy()) :
                            bar;
                    orderedData = params.filter() ?
                            $filter('filter')(orderedData, params.filter()) :
                            orderedData;

                    params.total(orderedData.length);
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        });
    }; // end createRegionList

    $scope.changeSelection = function(study) {
        console.log('study:');
        console.log(study);
        $('#radioSubRegionForm').append(
            '<form id="exposure-building-form" class="exposure_export_form">'+
                '<h3>Study: '+study.g1name+' '+study.study_name+'</h3></br>'+
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
    };
});


app.factory('myService', function($http, $q) {
    return {
        getCountryList: function() {
            var deferred = $q.defer();
            $http.get('../exposure/get_all_studies').success(function(data) {
                deferred.resolve(data);
            }).error(function(){
                deferred.reject();
            });
            return deferred.promise;
        },
        getRegionList: function(iso) {
            var deferred = $q.defer();
            $http.get('get_studies_by_country?iso='+iso+'&level_filter=subnational').success(function(data) {
                deferred.resolve(data);
            }).error(function(){
                deferred.reject();
            });
            return deferred.promise;
        }
    };
});


