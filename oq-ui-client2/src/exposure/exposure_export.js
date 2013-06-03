// vars for storing lon/lat of the bounding box selection
var latlonTopLeft;
var latlonBottomRight;

var map;
var drawnItems;
var drawControl;

var MAX_ZOOM_LEVEL = 8;
var DRAW_TOOL_COLOR = '#FFA54F';

var startExposureApp = function() {
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

    /***************
     * Base layers *
     ***************/
    var naturalEarth = L.tileLayer('http://{s}.tiles.mapbox.com/v3/mapbox.natural-earth-2/{z}/{x}/{y}.png');
    var GEM_base = L.tileLayer('http://tilestream.openquake.org/v2/world-landmass/{z}/{x}/{y}.png');

    var baselayer = {
        'Natural Earth' : naturalEarth,
        'GEM Base Map' : GEM_base
    };

    /******************
     * Overlay layers *
     ******************/
    var grump_rural = L.tileLayer('http://tilestream.openquake.org/v2/gdal-custom-rural/{z}/{x}/{y}.png');
    var grump_urban = L.tileLayer('http://tilestream.openquake.org/v2/gdal-custom-urban/{z}/{x}/{y}.png',{opacity: 0.8});
    var osm = L.tileLayer('http://{s}.tiles.mapbox.com/v3/mapbox.world-bank-borders-en/{z}/{x}/{y}.png');
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
        "OpenStreetMap" : osm
    };

    /***********
     * The map *
     ***********/
    map = L.map('map', {
        center: [20, 20],
        zoom: 3,
        maxZoom: 8,
        layers: [osm, GEM_base]
    });
    map.addLayer(drawnItems);
    L.control.layers(baselayer, overlays).addTo(map);
    // Add Wax support
    L.wax(map);

    //resize the main and map div
    var mapFit = function() {
        var main_height = $(window).height()
                          - $("#header-wrapper").height()
                          - $("#footer").height();
        var map_height = $(window).height()
                         - $("#header-wrapper").height()
                         - $("#footer").height()
                         - $("#tooltip").height();

        $('#main').css("height", main_height + "px");
        $('#map').css("height", map_height + "px");
        map.invalidateSize(false);
    };

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

    $(document).ready(mapFit);
    $(window).resize(mapFit);

    $(document).ready(dwellingFractionSlidingPanel);
    $(document).ready(legendSlidingPanel);

    // add draw tool based on zoom level
    function onZoomend() {
       try {
            map.removeControl(drawControl);
        }
        catch (err){
            console.log('no draw control to remove');
        };

        if (map.getZoom() >= MAX_ZOOM_LEVEL) {
               map.addControl(drawControl);
               console.log(map.getZoom());
        }
    };
    map.on('zoomend', onZoomend);

    var showExportButtonPopup = function(popupLatLng) {
        var expButton = (
            '<button id="export_button">Export Exposure</button>' +
            '<img id="export_button_spinner"' +
            ' src="{{ STATIC_URL }}theme/images/ajax-loader.gif"' +
            ' style="display: none;" />'
        );

        exportPopup = L.popup();
        exportPopup.setContent(expButton);
        exportPopup.setLatLng(popupLatLng);
        exportPopup.openOn(map);
    };

    /* Generic jquery error dialog, which renders to the '#error-dialog' div */
    var showErrorDialog = function(message) {
        $("#error-dialog").append(message);
        $("#error-dialog").dialog(
            {modal: true,
             close: function(event, ui) { $("#error-dialog").empty(); },
             title: "Woops!"
            }
        );
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

    var exportFromURL = function(lat1, lng1, lat2, lng2, zoomLevel) {
        selectionFromURL(lat1, lng1, lat2, lng2, zoomLevel);
        doExport();
    };

    /*
     * When time of day is 'off', disable the 'both' selection
     * for residential.
     *
     * Also, make sure the submit is enabled only if all radio button
     * groups have a selection.
     */
    var exposureExportFormSelectionChanged = function() {
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
                $('input[type="submit"]').attr('disabled','disabled');
            }
        }
        $("input[id=id_residential_2]").attr('disabled',
                                             disableResidentialBoth);

        // Only enable the submit button if all of the radio button groups
        // have a selection:
        var radioSelections = [];
        // Collect names of the radio groups with a selection:
        $('form input[type=radio][class=exposure_export_widget]:checked').each(
            function() {
                radioSelections.push(this.name);
            }
        );
        if (JSON.stringify(radioSelections.sort())
            == JSON.stringify(['adminLevel', 'residential',
                               'timeOfDay', 'outputType'].sort())) {
            $('input[type=submit][id=exposure-download-button]').removeAttr('disabled');
        }
    };

    /*
     * Show the export form as a jquery ui dialog
     */
    var showExposureExportForm = function() {

        //disable submit button  untill the user has made selections
        $('input[type="submit"]').attr('disabled','disabled');
        //enable the submit button once the selections have been made

        /*
         * Hook in radio selection logic.
         */
        $("#exposure-export-form").change(
            exposureExportFormSelectionChanged
        );

        // Display the form as a jqueryui popup:
        $("#exposure-export-form").dialog(
            {title: 'Download Exposure Data',
             height: 275,
             width: 500,
             modal: true}
        );
        // And finally, hide the leaflet popup with the export button:
        map.closePopup(exportPopup);
    };

    var exportButtonClick = function(event) {
        event.preventDefault();
        // show the progress spinner:
        $("#export_button_spinner").css("display", "");

        doExport();
    };

    /*
     * Load the export form, which has all attached functionality to perform
     * the actual export.
     */
    var doExport = function() {
        // Load the form into the dom:
        var data = {'lat1': latlonTopLeft.lat,
                    'lng1': latlonTopLeft.lng,
                    'lat2': latlonBottomRight.lat,
                    'lng2': latlonBottomRight.lng};
        $.ajax({
            type: 'get',
            data: data,
            url: '/exposure/wizard1/',
            error: function(request, error) {
                if (request.status == 401) {
                    // Ask the user to login and redirect back here when
                    // they're done logging in:
                    var signInMsg = (
                        // Include the error message from the server
                        request.responseText
                        + '<br/><a href="/accounts/login?next='
                        + '/oq-platform2/exposure_export.html'
                        + '%3Flat1=' + data.lat1
                        + '%26lng1=' + data.lng1
                        + '%26lat2=' + data.lat2
                        + '%26lng2=' + data.lng2
                        + '%26zoom=' + map.getZoom()
                        + '">Sign in</a>'
                    );
                    showErrorDialog(signInMsg);
                    map.closePopup(exportPopup);
                }
            },
            success: function(data, textStatus, jqXHR) {
                var formHtml = $(data).find('form[id=exposure-export-form]');
                $('#wizard').html(formHtml);
                showExposureExportForm();
            }
        });
    };

    var onRectangleDraw = function(e) {
        // Clear layers, selections, and any previous download dialogs:
        var expForm = $("#exposure-export-form");
        if (expForm.size()) {
            // If the form was once loaded, dispose of it:
            expForm.children().remove();
        }

        // Record the bounds of the bounding box
        latlonBottomRight = e.rect._latlngs[1];
        latlonTopLeft = e.rect._latlngs[3];
        selectArea(latlonTopLeft, latlonBottomRight);

        showExportButtonPopup(
            boundingBoxCenter(latlonTopLeft, latlonBottomRight)
        );

        // Hook the export button click functionality:
        $('#export_button').click(exportButtonClick);
    };
    map.on('draw:rectangle-created', onRectangleDraw);

    if (URL_PARAMS.lat1 && URL_PARAMS.lng1
            && URL_PARAMS.lat2 && URL_PARAMS.lng2
            && URL_PARAMS.zoom) {
        exportFromURL(URL_PARAMS.lat1, URL_PARAMS.lng1,
                      URL_PARAMS.lat2, URL_PARAMS.lng2,
                      URL_PARAMS.zoom);
    }
};

$(document).ready(startExposureApp);
