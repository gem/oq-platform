// vars for storing lon/lat of the bounding box selection
var latlonTopLeft;
var latlonBottomRight;

var drawnItems;
var drawControl;

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

var baseMapUrl = (
    "http://{s}.tiles.mapbox.com/v3/unhcr.map-8bkai3wa/{z}/{x}/{y}.png"
);
var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

var startApp = function() {
    drawnItems = new L.LayerGroup();
    // draw tool
    drawControl = new L.Control.Draw({
        rectangle: {
        title: 'Selection Tool',
            allowIntersection: false,
            shapeOptions: {
                color: DRAW_TOOL_COLOR
            }
        }
    });

    // Leaflet popup for the map-interactive export function
    var exportPopup;

    /******************
     * Overlay layers *
     ******************/
    var grump_rural = L.tileLayer('http://tilestream.openquake.org/v2/gdal-custom-rural/{z}/{x}/{y}.png');
    var grump_urban = L.tileLayer('http://tilestream.openquake.org/v2/gdal-custom-urban/{z}/{x}/{y}.png',{opacity: 0.8});
    var df_admin0 = L.tileLayer(
        'http://tilestream.openquake.org/v2/dwelling-fractions/{z}/{x}/{y}.png',
        {wax: 'http://tilestream.openquake.org/v2/dwelling-fractions.json'}
    );
    var df_port = L.tileLayer(
        'http://tilestream.openquake.org/v2/PRT-dwelling-fractions/{z}/{x}/{y}.png',
        {wax: 'http://tilestream.openquake.org/v2/PRT-dwelling-fractions.json'}
    );

    var overlays = {
        "Dwelling Fractions Admin 0" : df_admin0,
        "Dwelling Fractions Portugal" : df_port,
        "GRUMP Urban" : grump_urban,
        "GRUMP Rural" : grump_rural,
    };

    app.createMap();
    map.addLayer(drawnItems);
    L.control.layers(app.baseLayers, overlays).addTo(map);
    map.addControl(drawControl);

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
            options.title = 'Woops!'
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
            doExportBuilding();
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
    var showBuildingExportForm = function() {

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
        $("#exposure-building-form").dialog(
            {title: 'Download Building Exposure',
             height: 275,
             width: 500,
             modal: true,
             close: function(event, ui) { $("#exposure-export-form").remove(); },
            }
        );

        // Hook functionality for Download button
        $("#exposure-bldg-download-button").click(
            function(event) {
                event.preventDefault();
                $("#exposure-bldg-download-button").attr('disabled', 'disabled');
                $("#download-button-spinner").css("display", "");

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

    var exportBuildingClick = function(event) {
        event.preventDefault();
        doExportBuilding();
    };

    var exportPopulationClick = function(event) {
        event.preventDefault();
        doExportPopulation();
    };

    /*
     * Load the export form, which has all attached functionality to perform
     * the actual export.
     */
    var doExportBuilding = function() {
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
                    $('#export_form_placeholder').html(data);
                    showBuildingExportForm();
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
        $('#export_building').click(exportBuildingClick);
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
