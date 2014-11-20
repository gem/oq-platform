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

// vars for storing lon/lat of the bounding box selection
var latlonTopLeft;
var latlonBottomRight;
var regionSelection;

var drawnItems;
var drawControl;
var baseMapUrl = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png');
var DRAW_TOOL_COLOR = '#FFA54F';
var AJAX_SPINNER = '/static/img/ajax-loader.gif';

var objToUrlParams = function(obj) {
    var url;

    var params = [];
    for (var key in obj) {
        params.push(key + '=' + obj[key]);
    }
    url = params.join('&');
    return url;
};

var app = new OQLeaflet.OQLeafletApp(THIRD_PARTY_URLS.leaflet_base_map);

var startApp = function() {
    drawnItems = new L.LayerGroup();
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

    // create a dropdown list of all the countries
    var winH = $(window).height() - 200;
    var winW = $(window).width() - 200;
    $('#countriesListDialog').dialog({
        autoOpen: false,
        height: winH,
        width: winW,
        modal: true,
        position: [100,150]
    });

    $('#map-tools').append('<button type="button" id="countries-list">Load Data by Region</button>');
    $('#countries-list').button().click(function() {
        $('#countriesListDialog').dialog('open');
    });
/*
    $('#countriesListDialog').append(
        '<form>'+
            '<div id="radioCountryList" style="width:'+(winW / 4)+'px"></div>'+
        '</form>'+
        '<div id="radioSubRegionList"></div>'+
        '<div id="exposureExportForm"></div>'
    );

    $.ajax({
        type: 'get',
        url: '/exposure/get_country_list/',
        success: function(data, textStatus, jqXHR) {
            // TODO set constraint if the country is too big, field in db yet to come...
            for (var i = 0; i < data.length; i++) {
                $('#radioCountryList').append(
                    '<input type="radio" id="radio'+i+'" value="'+data[i][0]+'" name="countryRadio"><label for="radio'+i+'">'+data[i][1]+'</label><br>'
                );
            }
            $( "#radioCountryList" ).buttonset();
        },
        complete: function(data) {

        },
    });

    // country selection process
    $('#radioCountryList').change(function() {
        $('#radioSubRegionList').empty();
        var isoSelection = $('input:radio[name=countryRadio]:checked').val();
        console.log('isoSelection:');
        console.log(isoSelection);
        $.ajax({
            type: 'get',
            url: '/exposure/get_geographic_regions_by_iso?iso=' + isoSelection,
            success: function(data) {
                console.log('data:');
                console.log(data);
                // TODO set this constraint based on new field in db ~ yet to come...
                for (var j = 0; j < data.length; j++) {
                    if (data.length <= 1) {
                        $('#radioSubRegionList').append('There are no sub-regional studies available for this country');
                        // continue with form to get building info...
                    } else{
                        $('#radioSubRegionList').append(
                            '<input type="radio" id="radio'+data[j]+'" value="'+data[j][0]+'" name="region1Radio"><label for="radio'+data[j]+'">'+data[j][1]+'</label><br>'
                        );
                    }
                }
                $("#countriesListDialog ").scrollTop(0);
                $( "#radioSubRegionList" ).buttonset();
            }
        });
    });

    $('#radioSubRegionList').change(function() {
        // start the form workflow using the selected region
        regionSelection = $('input:radio[name=region1Radio]:checked').val();
        console.log('regionSelection:');
        console.log(regionSelection);
        $('#exposureExportForm').append(
            '<br />' +
            '<div id="export_options">' +
            'Export Options:' +
            '<ul>' +
            '<li><a href="#" id="export_building_region">Building exposure</a></li>' +
            '<li><a href="#" id="export_population_region">Population exposure</a></li>' +
            '</ul></div>' +
            '<img id="export_button_spinner"' +
            ' src="' + AJAX_SPINNER +'"' +
            ' style="display: none;" />'
        );
        // Hook the export links click functionality:
        //$('#export_building_region').click(exportBuildingRegionClick);

        $('#export_building_region').click(function() {
            //var requestType = "regional";
            exportBuildingRegionClick();
        });
        $('#export_population_region').click(exportPopulationClick);
    });
*/

    // TODO remove this hack. This hack has been implemented in order to
    // temporarily remove the left side panel and should be remove once
    // the left side panel is completed
    $("#oq-body-sidebar").remove();
    var width = $(window).width();
    $("#oq-body-content").width(width - 30);

    // Leaflet popup for the map-interactive export function
    var exportPopup;

    /******************
     * Overlay layers *
     ******************/

    var hazus1 = L.tileLayer(TS_URL + '/v2/ged-hazus-level1/{z}/{x}/{y}.png');
    var hazus_bf = L.tileLayer(TS_URL + '/v2/ged_hazus_US_building_fractions_black/{z}/{x}/{y}.png');
    var unh1 = L.tileLayer(TS_URL + '/v2/ph-unh1-bc-ge10-z10/{z}/{x}/{y}.png');

    var grump_rural = L.tileLayer(TS_URL + '/v2/gdal-custom-rural/{z}/{x}/{y}.png');
    var grump_urban = L.tileLayer(TS_URL + '/v2/gdal-custom-urban/{z}/{x}/{y}.png',{opacity: 0.8});
    var df_admin0 = L.tileLayer(
        TS_URL + '/v2/dwelling-fractions/{z}/{x}/{y}.png',
        {wax: TS_URL + '/v2/dwelling-fractions.json'}
    );

    var overlays = {
        "Dwelling Fractions PAGER" : df_admin0,
        "GRUMP Urban" : grump_urban,
        "GRUMP Rural" : grump_rural,
        "HAZUS Level 1 Building Counts" : hazus1,
        "HAZUS Level 1 Building Fractions" : hazus_bf,
        "UN Habitat Level 1 Building Counts" : unh1
    };

    map = new L.Map('map', {
        minZoom: 2,
        attributionControl: false,
        maxBounds: new L.LatLngBounds(new L.LatLng(-90, -180), new L.LatLng(90, 180)),
    });
    map.setView(new L.LatLng(10, -10), 2).addLayer(baseMapUrl);
    map.addLayer(drawnItems);

    map.addControl(drawControl);
    L.control.layers(app.baseLayers, overlays).addTo(map).setPosition("topleft");

    // Add Wax support
    L.wax(map);
    L.control.coordinates({
        position: "bottomleft",
        labelTemplateLat: "Latitude: {y}",
        labelTemplateLng: "Longitude: {x}",
        enableUserInput: false,
    }).addTo(map);

    /*
     * Sliding side panel animation functions:
     */
    var legendSlidingPanel = function() {
        $('#panelHandle-leg').hover(
            function() {
                $('#sidePanel-leg').stop(true, false).animate(
                    {left: '0px'}, 900
                );
            },
            function() {
                // Do nothing
            }
        );

        $('#sidePanel-leg').hover(
            function() {
                // Do nothing
            },
            function() {
                $('#sidePanel-leg').animate(
                    { left: '-201px' }, 800
                );
            }
        );
    };
    var dwellingFractionSlidingPanel = function() {
        $('#panelHandle-dwel').hover(
            function() {
                $('#sidePanel-dwel').stop(true, false).animate(
                    {left: '0px'}, 900
                );
            },
            function() {
                // Do nothing
            }
        );

        $('#sidePanel-dwel').hover(
            function() {
                // Do nothing
            },
            function() {
                $('#sidePanel-dwel').animate(
                    {left: '-328px'}, 800
                );
            }
        );
    };

    $(document).ready(dwellingFractionSlidingPanel);
    $(document).ready(legendSlidingPanel);

    var showExportButtonPopup = function(popupLatLng) {
        var expButton = (
            '<br />' +
            '<div id="export_options">' +
            'Export Options:' +
            '<ul>' +
            '<li><a href="#" id="export_building">Building exposure</a></li>' +
            '<li><a href="#" id="export_population">Population exposure</a></li>' +
            '</ul></div>' +
            '<img id="export_button_spinner"' +
            ' src="' + AJAX_SPINNER +'"' +
            ' style="display: none;" />'
        );

        exportPopup = L.popup();
        exportPopup.setContent(expButton);
        exportPopup.setLatLng(popupLatLng);
        exportPopup.openOn(map);
    };

    /* Generic jquery error dialog, which renders to the '#error-dialog' div */
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

    var boundingBoxCenter = function(topLeft, bottomRight) {
        var halfWidth = (bottomRight.lng - topLeft.lng) / 2;
        var halfHeight = (bottomRight.lat - topLeft.lat) / 2;
        return new L.LatLng(topLeft.lat + halfHeight, topLeft.lng + halfWidth);
    };

    /*
     * Create a map selection and zoom to it, given location and zoom level
     * URL params
     */
    var selectionFromURL = function(lat1, lng1, lat2, lng2, zoomLevel) {
        var topLeft;
        var bottomRight;
        topLeft = new L.LatLng(lat1, lng1);
        bottomRight = new L.LatLng(lat2, lng2);
        var centerPoint

        selectArea(topLeft, bottomRight);
        map.setView(boundingBoxCenter(topLeft, bottomRight), zoomLevel);
    };

    var exportFromURL = function(lat1, lng1, lat2, lng2, zoomLevel, export_type) {
        selectionFromURL(lat1, lng1, lat2, lng2, zoomLevel);
        showExportButtonPopup(
            boundingBoxCenter(latlonTopLeft, latlonBottomRight)
        );
        if (export_type == 'building') {
            doExportBuildingCoordinates();
        }
        else if (export_type == 'population') {
            doExportPopulation();
        }
    };

    /*
     * When time of day is 'off', disable the 'both' selection
     * for residential.
     *
     * Also, make sure the submit is enabled only if all radio button
     * groups have a selection.
     */
    var buildingExportFormSelectionChanged = function() {
        // NOTE: The radio button ids are given by Django
        // form rendering.
        var disableResidentialBoth = false;
        // If 'time of day' is 'off',
        // disable the 'both' option in the 'Residential' group,
        // and clear the 'both' selection if it is already selected.
        if ($("input[id=id_timeOfDay_4]:radio:checked").val() == 'off') {
            disableResidentialBoth = true;

            // if 'both' is selected AND the TOD is 'off',
            // clear the both selection
            if ($("input[id=id_residential_2]:radio:checked").val() == 'both') {
                $('input[id=id_residential_2]').removeAttr('checked');
                // Disable the submit/Download button
                $('#exposure-bldg-download-button').attr('disabled', 'disabled');
            }
        }
        $("input[id=id_residential_2]").attr('disabled',
                                             disableResidentialBoth);

        // If a subnational admin level (admin 1-3) is selected, clear the time
        // of day selection and disable it.
        var disableToD = false;
        if ($('input[id=id_adminLevel_0]:radio:checked').val() == null) {
            // A subnational selection has been made.
            // Disable ToD:
            $('input[name=timeOfDay]').removeAttr('checked');
            disableToD = true;
        }
        $('input[name=timeOfDay]').attr('disabled', disableToD);

        // Only enable the submit button if all of the radio button groups
        // have a selection:
        var radioSelections = [];
        // Collect names of the radio groups with a selection:
        $('form input[type=radio][class=exposure_export_widget]:checked').each(
            function() {
                radioSelections.push(this.name);
            }
        );

        var expectedSelections = ['adminLevel', 'residential', 'outputType'];
        if (!disableToD) {
            expectedSelections.push('timeOfDay');
        }
        if (JSON.stringify(radioSelections.sort())
                == JSON.stringify(expectedSelections.sort())) {
            $('#exposure-bldg-download-button').removeAttr('disabled');
        }
        else {
            $('#exposure-bldg-download-button').attr('disabled', 'disabled');
        }
    };

    /*
     * Show the export form as a jquery ui dialog
     */
    var showBuildingExportForm = function(requestType) {
        console.log('made it to ther show building export form:');

        //disable submit button until the user has made selections
        $("#exposure-bldg-download-button").attr('disabled','disabled');
        //enable the submit button once the selections have been made

        /*
         * Hook in radio selection logic.
         */
        $("#exposure-building-form").change(
            buildingExportFormSelectionChanged
        );

        // Display the form as a jqueryui popup:
        $("#exposure-building-form").dialog({
            title: 'Download Building Exposure',
            height: 275,
            width: 500,
            modal: true,
            autoOpen: true,
            //close: function(event, ui) { $("#exposure-export-form").remove(); },
        });

        // Hook functionality for Download button
        $("#exposure-bldg-download-button").click(
            function(event) {
                event.preventDefault();
                $("#exposure-bldg-download-button").attr('disabled', 'disabled');
                $("#download-button-spinner").css("display", "");

                if (requestType == 'coordinate') {
                    var params = {
                        adminLevel: $('input[name=adminLevel]:checked').val(),
                        timeOfDay: $('input[name=timeOfDay]:checked').val(),
                        residential: $('input[name=residential]:checked').val(),
                        outputType: $('input[name=outputType]:checked').val(),
                        lat1: latlonTopLeft.lat,
                        lng1: latlonTopLeft.lng,
                        lat2: latlonBottomRight.lat,
                        lng2: latlonBottomRight.lng,
                    };

                    // Check if export for the given parameters is allowed.
                    // If so, go head with the download.
                    // Otherwise, display an error.
                    $.ajax({
                        type: 'get',
                        data: params,
                        url: '/exposure/validate_export/',
                        error: function(response, error){
                            if (response.status == 403) {
                                showErrorDialog(
                                    response.responseText,
                                    {height: 175, width: 420}
                                );
                            }
                        },
                        success: function(data, textStatus, jqXHR) {
                            var url = '/exposure/export_building?';
                            url += objToUrlParams(params);
                            window.location.href = url;
                        },
                        complete: function() {
                            $("#download-button-spinner").css("display", "none");
                        },
                    });
                } else if (requestType == 'regional') {
                    console.log('hi, we made it to the request:');
                    var regionParams = {
                        adminLevel: $('input[name=adminLevel]:checked').val(),
                        timeOfDay: $('input[name=timeOfDay]:checked').val(),
                        residential: $('input[name=residential]:checked').val(),
                        outputType: $('input[name=outputType]:checked').val(),
                        regionId: regionId,
                    };
                    var url = '/exposure/export_building_region?';
                    url += objToUrlParams(regionParams);
                    window.location.href = url;
                }
            }
        );
    };

    var populationExportFormSelectionChanged = function() {
        var radioSelections = [];
        $('form input[type=radio][class=exposure_export_widget]:checked').each(
            function() {
                radioSelections.push(this.name);
            }
        );

        if (JSON.stringify(radioSelections.sort()) == JSON.stringify(['outputType'])) {
            $('#exposure-pop-download-button').removeAttr('disabled');
        }
    };

    var showPopulationExportForm = function() {
        $("#exposure-pop-download-button").attr('disabled','disabled');
        $("#exposure-population-form").change(
            populationExportFormSelectionChanged
        );
        $("#exposure-population-form").dialog(
            {title: 'Download Population Exposure',
             height: 160,
             width: 300,
             modal: true}
        );

        $("#exposure-pop-download-button").click(
            function(event) {
                event.preventDefault();
                $("#exposure-pop-download-button").attr('disabled', 'disabled');
                $("#download-button-spinner").css("display", "");

                var params = {
                    outputType: $('input[name=outputType]:checked').val(),
                    lat1: latlonTopLeft.lat,
                    lng1: latlonTopLeft.lng,
                    lat2: latlonBottomRight.lat,
                    lng2: latlonBottomRight.lng,
                };

                // Check if export for the given parameters is allowed.
                // If so, go head with the download.
                // Otherwise, display an error.
                $.ajax({
                    type: 'get',
                    data: params,
                    url: '/exposure/validate_export/',
                    error: function(response, error){
                        if (response.status == 403) {
                            showErrorDialog(
                                response.responseText,
                                {height: 175, width: 420}
                            );
                        }
                    },
                    success: function(data, textStatus, jqXHR) {
                        if (jqXHR.status == 204) {
                            var msg = 'No exposure data available in the selected area.';
                            showErrorDialog(msg, {title: 'Nothing here'});
                        }
                        else {
                            var url = '/exposure/export_population?';
                            url += objToUrlParams(params);
                            window.location.href = url;
                        }
                    },
                    complete: function() {
                        $("#download-button-spinner").css("display", "none");
                    },
                });
            }
        );

    };

    var exportBuildingRegionClick = function() {
        // Create the building exposure download form
        
    };

    var exportBuildingCoordinatesClick = function(event) {
        event.preventDefault();
        doExportBuildingCoordinates();
    };

    var exportPopulationClick = function(event) {
        event.preventDefault();
        doExportPopulation();
    };

    /*
     * Load the export form, which has all attached functionality to perform
     * the actual export.
     */
    var doExportBuildingCoordinates = function() {
        $("#export_options").hide();
        $("#export_button_spinner").css("display", "");

        var data = {lat1: latlonTopLeft.lat,
                    lng1: latlonTopLeft.lng,
                    lat2: latlonBottomRight.lat,
                    lng2: latlonBottomRight.lng};
        $.ajax({
            type: 'get',
            data: data,
            url: '/exposure/get_exposure_building_form/',
            error: function(response, error) {
                if (response.status == 401) {
                    // Ask the user to login and redirect back here when
                    // they're done logging in:
                    var signInMsg = (
                        // Include the error message from the server
                        response.responseText
                        + '<br/><a href="/accounts/login?next='
                        + '/oq-platform2/exposure_export.html'
                        + '%3Flat1=' + data.lat1
                        + '%26lng1=' + data.lng1
                        + '%26lat2=' + data.lat2
                        + '%26lng2=' + data.lng2
                        + '%26zoom=' + map.getZoom()
                        + '%26export_type=building'
                        + '">Sign in</a>'
                    );
                    showErrorDialog(signInMsg);
                }
                else if (response.status == 403) {
                    showErrorDialog(
                        response.responseText,
                        {height: 175, width: 420}
                    );
                }
            },
            success: function(data, textStatus, jqXHR) {
                if (jqXHR.status == 204) {
                    // No data for the given bounding box selection
                    var msg = 'No exposure data available in the selected area.';
                    showErrorDialog(msg, {title: 'Nothing here'});
                }
                else {
                    console.log('data:');
                    console.log(data);
                    $('#export_form_placeholder').html(data);
                    var requestType = "coordinate";
                    showBuildingExportForm(requestType);
                }
            },
            complete: function() { map.closePopup(exportPopup); },
        });
    };

    var doExportPopulation = function() {
        $("#export_options").hide();
        $("#export_button_spinner").css("display", "");

        var params = {lat1: latlonTopLeft.lat,
                      lng1: latlonTopLeft.lng,
                      lat2: latlonBottomRight.lat,
                      lng2: latlonBottomRight.lng};
        $.ajax({
            type: 'get',
            data: params,
            url: '/exposure/get_exposure_population_form/',
            error: function(response, error) {
                if (response.status == 401) {
                    // Ask the user to login and redirect back here when
                    // they're done logging in:
                    var signInMsg = (
                        // Include the error message from the server
                        response.responseText
                        + '<br/><a href="/accounts/login?next='
                        + '/oq-platform2/exposure_export.html'
                        + '%3Flat1=' + params.lat1
                        + '%26lng1=' + params.lng1
                        + '%26lat2=' + params.lat2
                        + '%26lng2=' + params.lng2
                        + '%26zoom=' + map.getZoom()
                        + '%26export_type=population'
                        + '">Sign in</a>'
                    );
                    showErrorDialog(signInMsg);
                }
                else if (response.status == 403) {
                    showErrorDialog(
                        response.responseText,
                        {height: 175, width: 420}
                    );
                }

            },
            success: function(data, textStatus, jqXHR) {
                $('#export_form_placeholder').html(data);
                showPopulationExportForm();
            },
            complete: function() { map.closePopup(exportPopup); },
        });
    };

    var onRectangleDraw = function(e) {
        // Clear layers, selections, and any previous download dialogs:
        var expForm = $("form.exposure_export_form");
        if (expForm.size()) {
            // If the form was once loaded, dispose of it:
            expForm.remove();
        }

        // Record the bounds of the bounding box
        latlonBottomRight = e.rect._latlngs[1];
        latlonTopLeft = e.rect._latlngs[3];
        selectArea(latlonTopLeft, latlonBottomRight);

        showExportButtonPopup(
            boundingBoxCenter(latlonTopLeft, latlonBottomRight)
        );

        // Hook the export links click functionality:
        $('#export_building').click(exportBuildingCoordinatesClick);
        $('#export_population').click(exportPopulationClick);
        // TODO: hook the same functionality for 'export_population'
    };
    map.on('draw:rectangle-created', onRectangleDraw);

    if (URL_PARAMS.lat1 && URL_PARAMS.lng1
            && URL_PARAMS.lat2 && URL_PARAMS.lng2
            && URL_PARAMS.zoom && URL_PARAMS.export_type) {
        exportFromURL(URL_PARAMS.lat1, URL_PARAMS.lng1,
                      URL_PARAMS.lat2, URL_PARAMS.lng2,
                      URL_PARAMS.zoom, URL_PARAMS.export_type);
    }
};

app.initialize(startApp);
