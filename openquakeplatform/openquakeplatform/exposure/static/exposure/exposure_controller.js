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
var sr_id, outputType, residential;

var activateDrawTool = function() {
    // draw tool
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
    activateDrawFunction();
};

var downloadFractions = function() {
    $('#dwellingFractionsDownload').button().click(function() {
        var sr_id = $('#dwellingFractionsDownload').val();

        $.ajax({
            type: 'get',
            url: 'export_fractions_by_study_region_id?sr_id='+sr_id,
            success: function(data, textStatus, jqXHR) {
                console.log('jqXHR:');
                console.log(jqXHR);
                if (navigator.appName != 'Microsoft Internet Explorer') {
                    window.open('data:text/csv;charset=utf-8,' + escape(data));
                } else {
                    var popup = window.open('','csv','');
                    popup.document.body.innerHTML = '<pre>' + data + '</pre>';
                }
            }
        });
    });
};

// Generic jquery error dialog, which renders to the '#error-dialog' div
var showErrorDialog = function(message, options) {
    // Options are optional
    if (typeof options === 'undefined') {
        options = {};
    }
    options.modal = true;
    options.close = function(event, ui) {
        $("#error-dialog").empty();
    };
    if (typeof options.title === 'undefined') {
        // Use a default title
        options.title = 'Woops!';
    }
    $("#error-dialog").append(message);
    $("#error-dialog").dialog(options);
};

app.controller('ExposureCountryList', function($scope, $filter, myService, ngTableParams) {
    myService.getAllStudies().then(function(data) {
        $scope.nationalData = data;
        // National level selection form
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 9,          // count per page
            filter: {
                country_name: ''       // initial filter
            }
        }, {
            total: $scope.nationalData.length, // length of data
            getData: function($defer, params) {
                var currentData = $scope.nationalData;
                // use build-in angular filter
                var filteredData = params.filter() ?
                    $filter('filter')(currentData, params.filter()) :
                    currentData;
                var orderedData = params.filter() ?
                       $filter('filter')(currentData, params.filter()) :
                       currentData;

                $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                params.total(orderedData.length); // set total for recalc pagination
                $defer.resolve($scope.users);
            }
        });
    });

    // National level building exposure download form
    function nationalForm(study) {
        return '<form id="exposure-building-form"'+
                '<p><b>Download Dwelling Fractions:</b></p><button id="dwellingFractionsDownload" type="button" value="'+study.study_id+'">Download</button></br></br>'+
                '<b>Building Exposure Download Form:</b></br>'+
                '<p><label for="id_residential_0">Residential:</label></br>'+
                '<label for="id_residential_0"><input class="exposure_export_widget" id="id_residential_0" name="residential" type="radio" value="residential" /> Residential</label></br>'+
                '<label for="id_residential_1"><input class="exposure_export_widget" id="id_residential_1" name="residential" type="radio" value="non-residential" /> Non-Residential</label></br>'+
                '</p>'+
                '<p><label for="id_outputType_0">Output Type:</label></br>'+
                '<label for="id_outputType_0"><input class="exposure_export_widget" id="id_outputType_0" name="outputType" type="radio" value="csv" /> CSV</label></br>'+
                //'<label for="id_outputType_1"><input class="exposure_export_widget" id="id_outputType_1" name="outputType" type="radio" value="nrml" /> NRML</label></br>'+
                '</p>'+
                '<input type="hidden" name="study" value="'+study.study_id+'">'+
                '<br>'+
            '</form>';
    }

    var selectedRow;

    // Watch for a selection from the national list
    $scope.changeSelection = function(study) {
        if (selectedRow) {
            selectedRow.$selected = false;
            selectedRow = selection;
        }

        // Restet vars to null
        sr_id = (function () { return; })();
        outputType = (function () { return; })();
        residential = (function () { return; })();

        // Remove the drawing tool
        try {
            map.removeControl(drawControl);
        } catch (e) {
            // continue
        }

        if (study.num_l1_studies <= 1) {
            // The user has selected a national study
            // Call API to get selected region grid count & b-box
            myService.getNationalGridCount(study.iso, study.study_id).then(function(data) {
                $scope.selectedRegion = data;

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
                if ( $scope.selectedRegion[0].tot_grid_count < 300000) {
                    $('#exposure-building-form').append(
                        '<button id="nationalExposureBldgDownload" type="button">Download</button>'
                    );
                } else {
                    $('#exposure-building-form').append(
                        '<p>The selected study region is too larger to be downloaded in it`s entirety. To proceed you will need to '+
                        'draw a bounding box over the map to make a sub-selection of the region</p>'+
                        '<button id="selectBbox" type="button">Proceed</button>'
                    );
                }

                downloadFractions();

                $('#selectBbox').button().click(function() {
                    // Focus the map on the selected region
                    map.fitBounds(L.latLngBounds(L.latLng($scope.selectedRegion[0].ymax, $scope.selectedRegion[0].xmax), L.latLng($scope.selectedRegion[0].ymin, $scope.selectedRegion[0].xmin)));

                    // Gather the selected options into global vars
                    sr_id = $('[name="study"]').val();
                    outputType = $('input[name="outputType"]:checked', '#exposure-building-form').val();
                    residential = $('input[name="residential"]:checked', '#exposure-building-form').val();

                    // Check that the form has been filled in
                    if (outputType === undefined || residential === undefined) {
                        var errorMsg = 'The form has not been completed';
                        showErrorDialog(errorMsg);
                    } else{
                        // Close the dialog box
                        $('#countriesListDialog').dialog('close');
                        // Activate the drawing tool
                        activateDrawTool();
                    }
                });

                $('#nationalExposureBldgDownload').button().click(function() {
                    // Gather the selected options into global vars
                    sr_id = $('[name="study"]').val();
                    outputType = $('input[name="outputType"]:checked', '#exposure-building-form').val();
                    residential = $('input[name="residential"]:checked', '#exposure-building-form').val();

                    var url =
                        '/exposure/export_exposure?'+
                        'output_type='+outputType+
                        '&sr_id='+sr_id+
                        '&occupancy_filter='+residential;
                    exposureExport(url);
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
            populateSubNationalList(study.iso);
            //createRegionList(study);
            // Show html elements for the table
            $("#ragionTable").show();
        }
    }; // end changeSelection
});


app.controller('ExposureRegionList', function($scope, $filter, $http, myService, ngTableParams)  {

    $scope.subNationalData = [];

    populateSubNationalList = function (iso) {
        var url = 'get_studies_by_country?iso='+iso+'&level_filter=subnational';
        $http.get(url).success(function (data) {
            $scope.subNationalData = data;
            $scope.tableParams2.reload();
        });
    };

    $scope.tableParams2 = new ngTableParams({
        page: 1,            // show first page
        count: 9           // count per page
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
        return '<form id="sub-exposure-building-form" class="exposure_export_form">'+
                '<p><b>Download Dwelling Fractions:</b></p><button id="dwellingFractionsDownload" type="button" value="'+study.study_region_id+'">Download</button></br></br>'+
                '<b>Sub-National Building Exposure Download Form</b></br>'+
                '<p><label for="id_residential_0">Residential:</label></br>'+
                '<label for="id_residential_0"><input class="exposure_export_widget" id="id_residential_0" name="sub-residential" type="radio" value="residential" /> Residential</label></br>'+
                '<label for="id_residential_1"><input class="exposure_export_widget" id="id_residential_1" name="sub-residential" type="radio" value="non-residential" /> Non-Residential</label></br>'+
                '</p>'+
                '<p><label for="id_outputType_0">Output Type:</label></br>'+
                '<label for="id_outputType_0"><input class="exposure_export_widget" id="id_outputType_0" name="sub-outputType" type="radio" value="csv" /> CSV</label></br>'+
                //'<label for="id_outputType_1"><input class="exposure_export_widget" id="id_outputType_1" name="sub-outputType" type="radio" value="nrml" /> NRML</label></br>'+
                '</p>'+
                '<input type="hidden" name="sub-study" value="'+study.study_region_id+'">'+
                '<br>'+
            '</form>';
    }

    var selectedRow;

    $scope.changeSelection = function(study) {

        $scope.selectedSubRegion = study;

        if (selectedRow) {
            selectedRow.$selected = false;
            selectedRow = selection;
        }

        // Restet vars to null
        sr_id = (function () { return; })();
        outputType = (function () { return; })();
        residential = (function () { return; })();

        // Remove the drawing tool
        try {
            map.removeControl(drawControl);
        } catch (e) {
            // continue
        }

        $('#countriesListDialog').dialog('option', 'title', 'Study: '+study.g1name+' '+study.study_name);
        $('#sub-exposure-building-form').empty();
        $('#subRegionForm').show();
        $('#subRegionFormBack').show();
        $('#subRegionList').insertAfter('#subRegionForm');
        $('#subRegionList').hide();
        $('#subRegionForm').prepend(subNationalForm(study));

        // check the grid count
        if (study.tot_grid_count < 300000) {
            $('#sub-exposure-building-form').append(
                '<button id="subNationalExposureBldgDownload" type="button">Download</button>'
            );
        } else {
            $('#sub-exposure-building-form').append(
                '<p>The selected study region is too larger to be downloaded in it`s entirety. To proceed you will need to '+
                'draw a bounding box over the map to make a sub-selection of the region</p>'+
                '<button id="subSelectBbox" type="button">Proceed</button>'
            );
        }

        $('#subNationalExposureBldgDownload').button().click(function() {
            // Gather the selected options into global vars
            sr_id = $('[name="sub-study"]').val();
            outputType = $('input[name="sub-outputType"]:checked', '#sub-exposure-building-form').val();
            residential = $('input[name="sub-residential"]:checked', '#sub-exposure-building-form').val();

            var url =
                '/exposure/export_exposure?'+
                'output_type='+outputType+
                '&sr_id='+sr_id+
                '&occupancy_filter='+residential;
            exposureExport(url);
        });

        $('#subSelectBbox').button().click(function() {
            // Focus the map on the selected region
            map.fitBounds(L.latLngBounds(L.latLng($scope.selectedSubRegion.ymax, $scope.selectedSubRegion.xmax), L.latLng($scope.selectedSubRegion.ymin, $scope.selectedSubRegion.xmin)));
            // Gather the selected options into global vars
            sr_id = $('[name="sub-study"]').val();
            outputType = $('input[name="sub-outputType"]:checked', '#sub-exposure-building-form').val();
            residential = $('input[name="sub-residential"]:checked', '#sub-exposure-building-form').val();
            // Check that the form has been filled in
            if (outputType === undefined || residential === undefined) {
                var errorMsg = 'The form has not been completed';
                showErrorDialog(errorMsg);
            } else{
                // Close the dialog box
                $('#countriesListDialog').dialog('close');
                // Activate the drawing tool
                activateDrawTool();
            }
        });

        downloadFractions();
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

var selectArea = function(topLeft, bottomRight) {
    latlonTopLeft = topLeft;
    latlonBottomRight = bottomRight;
    var rectBounds = [[topLeft.lat, topLeft.lng],
                      [bottomRight.lat, bottomRight.lng]];
    var rect = new L.rectangle(rectBounds);
    rect.options.color = DRAW_TOOL_COLOR;
    // Clear drawn layer
    drawnItems.clearLayers();
    // Add the new selection
    drawnItems.addLayer(rect);
};

var onRectangleDraw = function(e) {
    // Record the bounds of the bounding box
    latlonBottomRight = e.rect._latlngs[1];
    latlonTopLeft = e.rect._latlngs[3];
    selectArea(latlonTopLeft, latlonBottomRight);

    var latDiff = Math.abs(e.rect._latlngs[0].lat - e.rect._latlngs[1].lat);
    var lonDiff = Math.abs(e.rect._latlngs[1].lng - e.rect._latlngs[2].lng);
    var LatLngBox = latDiff + lonDiff;

    if (LatLngBox > 8) {
        var msg = 'The selected area is to large.';
        showErrorDialog(msg);
    } else {
        var url =
            '/exposure/export_exposure?'+
            'output_type='+outputType+
            '&sr_id='+sr_id+
            '&occupancy_filter='+residential+
            '&lng1='+latlonBottomRight.lng+
            '&lat1='+latlonBottomRight.lat+
            '&lng2='+latlonTopLeft.lng+
            '&lat2='+latlonTopLeft.lat;

        exposureExport(url);
    }
};

$("#cover").css("display", "none");

var exposureExport = function(url) {
    var host = window.location.host;
    var path = host+url;
    window.open("http://"+path);
};

var activateDrawFunction = function() {
    map.on('draw:rectangle-created', onRectangleDraw);
};



