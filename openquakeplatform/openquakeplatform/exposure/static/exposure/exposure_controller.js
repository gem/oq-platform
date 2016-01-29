/*
   Copyright (c) 2010-2015, GEM Foundation.

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

var downloadFractions = function(srId) {
    $.ajax({
        type: 'get',
        url: 'export_fractions_by_study_region_id?sr_id='+srId,
        success: function(data, textStatus, jqXHR) {
            if (navigator.appName != 'Microsoft Internet Explorer') {
                window.open('data:text/csv;charset=utf-8,' + escape(data));
            } else {
                var popup = window.open('','csv','');
                popup.document.body.innerHTML = '<pre>' + data + '</pre>';
            }
        }
    });
};

app.controller('ExposureCountryList', function($scope, $filter, myService, ngTableParams, $http) {

    // Set up the templates
    $scope.templates = [
    {
        name: 'template1',
        url: '/static/exposure/sub_region_adminl1.html'
    },{
        name: 'template2',
        url: '/static/exposure/sub_region_adminl2.html'
    },{
        name: 'empty template',
        url: '/static/exposure/sub_region_empty.html'
    }];
    $scope.template = $scope.templates[0];

    myService.getAllStudies().then(function(data) {
        // change the has_nonres flag to be more human readable
        for (var k in data) {
            if (data[k].has_nonres) {
                data[k].has_nonres = 'yes';
            } else {
                data[k].has_nonres = 'no';
            }
        }
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
                $('#national-spinner').hide();
                var currentData = $scope.nationalData;
                // use build-in angular filter
                var orderedData = params.filter() ?
                    $filter('filter')(currentData, params.filter()) :
                    currentData;

                $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                params.total(orderedData.length); // set total for recalc pagination
                $defer.resolve($scope.users);
            }
        });
    });

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

        if (study.num_studies <= 1) {
            // The user has selected a national study
            // Call API to get selected region grid count & b-box
            myService.getNationalGridCount(study.iso, study.study_id).then(function(data) {
                $scope.selectedRegion = data;
                $('#drawBoundingMsg').hide();
                $('#nationalExposureBldgDownload').hide();
                $('#countriesListDialog').dialog('option', 'title', 'Study: '+study.study_name+'');
                $('#ragionTable').hide();
                $('#countryList').hide();
                $('#subRegionListBack').hide();
                $('#subRegionFormBack').hide();
                $scope.selectedStudy = $scope.selectedRegion[0];
                $('#selectionFormBack').show();
                $('#nationalForm').show();

                // deactivate residential option as needed
                if (study.has_nonres != 'yes') {
                    $('#id_residential_1').attr("disabled", "disabled");
                    $('#id_residential_1_text').css({'color': 'gray', 'opacity': '0.8'});
                }

                // Check the grid count
                if ( $scope.selectedRegion[0].tot_grid_count < EXPOSURE_MAX_TOT_GRID_COUNT ) {
                    $('#exposure-building-form').show();
                    $('#nationalExposureBldgDownload').show();
                    $('#drawBoundingMsg').hide();
                } else {
                    $('#drawBoundingMsg').show();
                    $('#exposure-building-form').show();
                    $('#nationalExposureBldgDownload').hide();
                }

                $('#dwellingFractionsDownload').button().click(function() {
                    downloadFractions($scope.selectedStudy.study_region_id);
                });

                $('#selectBbox').button().click(function() {
                    // Focus the map on the selected region
                    map.fitBounds(L.latLngBounds(L.latLng($scope.selectedRegion[0].ymax, $scope.selectedRegion[0].xmax), L.latLng($scope.selectedRegion[0].ymin, $scope.selectedRegion[0].xmin)));

                    // Gather the selected options into global vars
                    sr_id = $scope.selectedStudy.study_region_id;
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
                    sr_id = $scope.selectedStudy.study_region_id;
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
        } else if (study.num_studies > 1) {
            $('#countryList').hide();

            // The user has selected a sub-national study
            $('#countriesListDialog').dialog('option', 'title', 'Admin Level 1 Selection Table');
            $('#ragionTable h3').empty();
            $('#countryList').hide();
            $('#subRegionListBack').show();
            $('#subRegionList').show();
            $('#countryList').insertAfter('#subRegionList');
            $('#ragionTable').prepend('<h3>Study: '+study.country_name+' '+study.study_name+'</h3>');

            // Get the subnational list
            var url = 'get_studies_by_country?iso='+study.iso+'&level_filter=subnational';
            $http.get(url).success(function (data) {
                // Set the template
                if (data[0].g2name === null) {
                    $scope.template = $scope.templates[0];
                } else {
                    $scope.template = $scope.templates[1];
                }

                var template = $scope.template;

                // Pass the data and template to the next scope
                populateSubNationalList(data, template);

                // Show html elements for the table
                $("#ragionTable").show();
            });
        }
    }; // end changeSelection

    $scope.emptySubRegionTable = function() {
        // Empty the sub region table each time user navigates away from the sub region table
        data = [{
            g1name: "",
            g2name: ""
        }];
        populateSubNationalList(data, $scope.template);
    };
});


app.controller('ExposureRegionList', function($scope, $filter, myService, ngTableParams)  {

    $scope.subNationalData = [];

    populateSubNationalList = function (data, template) {
        $scope.template = template;
        $scope.subNationalData = data;

        $scope.tableParams2.reload();
    };

    $scope.tableParams2 = new ngTableParams({
        page: 1,            // show first page
        count: 9           // count per page
    }, {
        total: $scope.subNationalData.length,
        getData: function($defer, params) {
            $scope.page = params.$params;
            var currentData = $scope.subNationalData;
            // use build-in angular filter
            var orderedData = params.filter() ?
                    $filter('filter')(currentData, params.filter()) :
                    currentData;
            params.total(orderedData.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

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
        $('#subRegionFormBack').show();
        $('#subRegionList').insertAfter('#subNationalForm');
        $('#subRegionList').hide();

        $scope.selectedSubStudy = study.study_region_id;
        $('#subNationalForm').show();

        // deactivate residential option as needed
        if (study.has_nonres != true) {
            $('#id_residential_1').attr("disabled", "disabled");
            $('#id_residential_1_text').css({'color': 'gray', 'opacity': '0.8'});
        }

        // check the grid count
        if (study.tot_grid_count < EXPOSURE_MAX_TOT_GRID_COUNT) {
            $('#subNationalRegionTooLarge').hide();
            $('#drawBoundingMsg').hide();
            $('#sub-exposure-building-form-too-large').hide();
            $('#subNationalExposureBldgDownload').show();
            $('#sub-exposure-building-form').show();
        } else {
            $('#subNationalExposureBldgDownload').hide();
            $('#subNationalRegionTooLarge').show();
        }

        $('#subNationalExposureBldgDownload').button().click(function() {
            // Gather the selected options into global vars
            outputType = $('input[name="sub-outputType"]:checked', '#sub-exposure-building-form').val();
            residential = $('input[name="sub-residential"]:checked', '#sub-exposure-building-form').val();

            var url =
                '/exposure/export_exposure?'+
                'output_type='+outputType+
                '&sr_id='+$scope.selectedSubStudy+
                '&occupancy_filter='+residential;
            exposureExport(url);
        });

        $('#subSelectBox').button().click(function() {
            // Focus the map on the selected region
            map.fitBounds(L.latLngBounds(L.latLng($scope.selectedSubRegion.ymax, $scope.selectedSubRegion.xmax), L.latLng($scope.selectedSubRegion.ymin, $scope.selectedSubRegion.xmin)));
            // Gather the selected options into global vars
            sr_id = $scope.selectedSubStudy;
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

        $('#subDwellingFractionsDownload').button().click(function() {
            downloadFractions(study.study_region_id);
        });

    };

    // Back button logic
    $('#subRegionListBack').button().click(function() {
        // Reset the page number to 1 each time the user moves back to the Admin level 0 table
        $scope.page.page = 1;

        $('#countriesListDialog').dialog('option', 'title', 'Admin Level 0 Selection Table');
        $('#subRegionList').hide();
        $('#countryList').show();
    });
}); // End controller


$('#subRegionFormBack').button().click(function() {
    $('#countriesListDialog').dialog('option', 'title', 'Admin Level 1 Selection Table');
    $('#subNationalForm').hide();
    $('#subRegionFormBack').hide();
    $('#nationalForm').hide();
    $('#exposure-building-form').hide();
    $('#subRegionList').show();
});

$('#selectionFormBack').button().click(function() {
    $('#drawBoundingMsg').hide();
    $('#exposure-building-form').hide();
    $('#countriesListDialog').dialog('option', 'title', 'Admin Level 0 Selection Table');
    $('#selectionFormBack').hide();
    $('#countryList').show();
});

$('#subNationalForm').hide();
$('#subRegionListBack').hide();
$('#subRegionFormBack').hide();
$('#selectionFormBack').hide();
$('#nationalForm').hide();
$('#drawBoundingMsg').hide();
$('#nationalExposureBldgDownload').hide();


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

    if (LatLngBox > EXPOSURE_MAX_EXPORT_AREA_SQ_DEG) {
        var msg = 'The selected area is to large.';
        showErrorDialog(msg);
    } else {
        if (outputType != undefined && residential != undefined && sr_id != undefined ) {
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
    }
};

$("#cover").hide();
$('#absoluteSpinner').hide();

var exposureExport = function(url) {
    var host = window.location.host;
    var path = host+url;
    window.open("http://"+path);
    var msg = 'The download is underway, please allow the download to complete before making new requests.';
    showErrorDialog(msg, {title: 'Download'});
};

var activateDrawFunction = function() {
    map.on('draw:rectangle-created', onRectangleDraw);
};



