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

var activateDrawTool = function() {
    // draw tool
    console.log('hi, im the draw tool:');
    drawControl = new L.Control.Draw({
        position: 'topleft',
        rectangle: {
        title: 'Selection Tool',
            allowIntersection: false,
            shapeOptions: {
                color: DRAW_TOOL_COLOR
            }
        }
    });
    map.addControl(drawControl);
};

app.controller('ExposureCountryList', function($scope, $filter, myService, ngTableParams)  {
    myService.getAllStudies().then(function(data) {
        // National level selection form
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

    // National level building exposure download form
    function nationalForm(study) {
        return '<form id="exposure-building-form"'+
                    '<h3>Building Exposure Download Form</h3></br>'+
                    '<p><label for="id_timeOfDay_0">Time of Day:</label></br>'+
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
                '</form>';
    }

    // Watch for a selection from the national list
    $scope.changeSelection = function(study) {
        if (study.num_l1_studies <= 1) {
            // The user has selected a national study
            console.log('study:');
            console.log(study);
            // Call API to get selected region grid count & b-box
            myService.getNationalGridCount(study.iso, study.study_id).then(function(data) {
                console.log('data:');
                console.log(data);
                // Focus the map on the selected region
                map.fitBounds(L.latLngBounds(L.latLng(data[0].ymax, data[0].xmax), L.latLng(data[0].ymin, data[0].xmin)));

                $('#countriesListDialog').dialog('option', 'title', 'Study: '+study.country_name+' '+study.study_name+'');
                $('#ragionTable').hide();
                $('#countrySelectionForm').insertAfter('#countryList');
                $('#countryList').hide();
                $('#countrySelectionForm').empty();
                $('#countrySelectionForm').show();
                $('#selectionFormBack').show();
                $('#subRegionListBack').hide();
                $('#subRegionFormBack').hide();
                $('#countrySelectionForm').append(nationalForm(study));

                // Check the grid count
                if (data[0].tot_grid_count < 300000) {
                    $('#exposure-building-form').append(
                        '<button id="nationalExposureBldgDownload" type="button">Download</button>'
                    );
                } else{
                    console.log('hi there:');
                    $('#exposure-building-form').append(
                        '<p>The selected study region is too larger to be downloaded in it`s entirety. To proceed you will need to '+
                        'draw a bounding box over the map to make a sub-selection of the region</p>'+
                        '<button id="selectBbox" type="button">Proceed</button>'
                    );
                }

                $('#nationalExposureBldgDownload').button().click(function() {
                    console.log('download click:');
                    //myService.getSubNationalBuildingFractions(study.iso).then(function(bar) {
                        // ..
                    //});
                });

                $('#selectBbox').button().click(function() {
                    $('#countriesListDialog').dialog('close');
                    activateDrawTool();
                });
            });
        } else if (study.num_l1_studies > 1) {
            // The user has selected a sub-national study
            $('#countriesListDialog').dialog('option', 'title', 'Admin Level 1 Selection Table');
            $('#subRegionListBack').show();
            $('#subRegionList').show();
            $('#ragionTable h3').empty();
            $('#countryList').hide();
            $('#countryList').insertAfter('#subRegionList');
            $('#ragionTable').prepend('<h3>Study: '+study.country_name+' '+study.study_name+'</h3>');
            $('#countrySelectionForm').empty();
            // Populate the table
            lookupAddress(study.iso);
            //createRegionList(study);
            // Show html elements for the table
            $("#ragionTable").show();
        }
    }; // end changeSelection
});


app.controller('ExposureRegionList', function($scope, $filter, $http, myService, ngTableParams)  {

    $scope.subNationalData = [];

    lookupAddress = function (iso) {
        var url = 'get_studies_by_country?iso='+iso+'&level_filter=subnational';
        $http.get(url).success(function (data) {
            console.log('data:');
            console.log(data);
            $scope.subNationalData = data;
            $scope.tableParams2.reload();
        });
    };

    $scope.tableParams2 = new ngTableParams({
        page: 1,            // show first page
        count: 10           // count per page
    }, {
        total: $scope.subNationalData.length, // length of data
        getData: function($defer, params) {
            var currentData = $scope.subNationalData;
            // use build-in angular filter
            var orderedData = params.sorting() ?
                    $filter('orderBy')(currentData, params.orderBy()) :
                    currentData;
            orderedData = params.filter() ?
                    $filter('filter')(orderedData, params.filter()) :
                    orderedData;
            params.total(orderedData.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    // Sub-national level building exposure download form
    function subNationalForm(study) {
        return '<form id="exposure-building-form" class="exposure_export_form">'+
                '<h3>Sub-National Building Exposure Download Form</h3></br>'+
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
            '</form>';
    }

    $scope.changeSelection = function(study) {
        console.log('study:');
        console.log(study);
        // Focus the map on the selected region
        map.fitBounds(L.latLngBounds(L.latLng(study.ymax, study.xmax), L.latLng(study.ymin, study.xmin)));

        $('#countriesListDialog').dialog('option', 'title', 'Study: '+study.g1name+' '+study.study_name);
        $('#exposure-building-form').empty();
        $('#subRegionForm').show();
        $('#subRegionFormBack').show();
        $('#subRegionList').insertAfter('#subRegionForm');
        $('#subRegionList').hide();
        $('#subRegionForm').prepend(subNationalForm(study));
        if (study.tot_grid_count < 300000) {
            $('#exposure-building-form').append(
                '<button id="subNationalExposureBldgDownload" type="button">Download</button>'+
                '<img id="download-button-spinner" src="/static/img/ajax-loader.gif" style="display: none;" />'
            );
        } else {
            $('#exposure-building-form').append(
                '<p>The selected study region is too larger to be downloaded in it`s entirety. To proceed you will need to '+
                'draw a bounding box over the map to make a sub-selection of the region</p>'
            );
        }
        $('#subNationalExposureBldgDownload').button().click(function() {
            console.log('download click:');
            //myService.getSubNationalBuildingFractions(study.iso).then(function(bar) {
                // ..
            //});
        });
    };
});

// Back button logic
$('#subRegionListBack').button().click(function() {
    $('#countriesListDialog').dialog('option', 'title', 'Admin Level 0 Selection Table');
    $('#subRegionList').hide();
    $('#countryList').show();
});

$('#subRegionFormBack').button().click(function() {
    $('#countriesListDialog').dialog('option', 'title', 'Admin Level 1 Selection Table');
    $('#subRegionForm').hide();
    $('#subRegionList').show();
});

$('#selectionFormBack').button().click(function() {
    $('#countriesListDialog').dialog('option', 'title', 'Admin Level 0 Selection Table');
    $('#countrySelectionForm').hide();
    $('#countryList').show();
    $('#selectionFormBack').hide();
});

$('#subRegionListBack').hide();
$('#subRegionFormBack').hide();
$('#selectionFormBack').hide();


app.factory('myService', function($http, $q) {
    return {
        getAllStudies: function() {
            var deferred = $q.defer();
            $http.get('../exposure/get_all_studies').success(function(data) {
                deferred.resolve(data);
            }).error(function(){
                deferred.reject();
            });
            return deferred.promise;
        },
        getNationalGridCount: function(iso, study_id) {
            var deferred = $q.defer();
            $http.get('get_studies_by_country?iso='+iso+'&study_filter='+study_id+'&level_filter=national').success(function(data) {
                deferred.resolve(data);
            }).error(function(){
                deferred.reject();
            });
            return deferred.promise;
        },
        getSubNationalBuildingFractions: function(iso) {
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


