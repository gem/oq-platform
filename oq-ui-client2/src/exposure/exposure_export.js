var startExposureApp = function() {
    var drawnItems = new L.LayerGroup();
    // vars for storing lon/lat of the bounding box selection
    var latlonTopLeft;
    var latlonBottomRight;
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
    var map = L.map('map', {
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


    // draw tool
    var drawControl = new L.Control.Draw({
        rectangle: {
        title: 'Selection Tool',
            allowIntersection: false,
            shapeOptions: {
                color: '#FFA54F'
            }
        }
    });


    // add draw tool based on zoom level
    function onZoomend() {
           try {
            map.removeControl(drawControl);
        }
        catch (err){
            console.log('no draw control to remove');
        };

        if (map.getZoom() > 7) {
               map.addControl(drawControl);
               console.log(map.getZoom());
           };
    };
    map.on('zoomend', onZoomend);


    //show loading when ajax is called
    jQuery.ajaxSetup({
        beforeSend: function() {
            $('#loader').show();
        },
        complete: function(){
            $('#loader').hide();
        },
        success: function() {}
    });


    var showExportButtonPopup = function(popupLon, popupLat) {
        var expButton = (
            '<button id="export_button">Export Exposure</button>' +
            '<img id="export_button_spinner"' +
            ' src="{{ STATIC_URL }}theme/images/ajax-loader.gif"' +
            ' style="display: none;" />'
        );
        // WARNING: Note the lon/lat ordering
        var popupLoc = new L.LatLng(popupLat, popupLon);

        exportPopup = L.popup();
        exportPopup.setContent(expButton);
        exportPopup.setLatLng(popupLoc);
        exportPopup.openOn(map);
    };


    map.on(
        'draw:rectangle-created',
        function (e) {
            // Clear layers, selections, and any previous download dialogs:
            var expForm = $("#exposure-export-form");
            if (expForm.size()) {
                // If the form was once loaded, dispose of it:
                expForm.children().remove();
            }
            drawnItems.clearLayers();

            // Draw the bounding box
            drawnItems.addLayer(e.rect);
            // Record the bounds of the bounding box
            latlonTopLeft = e.rect._latlngs[1];
            latlonBottomRight = e.rect._latlngs[3];

            // Compute the center coordinates of the selected bounding box
            // and display a leaflet popup with the export button:
            var halfWidth = (latlonBottomRight.lng - latlonTopLeft.lng) / 2;
            var halfHeight = (latlonBottomRight.lat - latlonTopLeft.lat) / 2;
            var boxCenterLon = latlonTopLeft.lng + halfWidth;
            var boxCenterLat = latlonTopLeft.lat + halfHeight;
            showExportButtonPopup(boxCenterLon, boxCenterLat);

            var exposureExportFormLoaded = function() {
                //disable submit button  untill the user has made selections
                $('input[type="submit"]').attr('disabled','disabled');
                //enable the submit button once the selections have been made

                /*
                 * Hook in radio selection logic.
                 * When time of day is 'off', disable the 'both' selection
                 * for residential.
                 *
                 * Also, make sure the submit is enabled only if all radio button
                 * groups have a selection.
                 */
                $("#exposure-export-form").change(
                    function() {
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
                    }
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

            // Hook the export button click functionality:
            var exportButtonClick = function(event) {
                    event.preventDefault();
                    // show the progress spinner:
                    $("#export_button_spinner").css("display", "");
                    // Load the form into the dom:
                    $('#wizard').load('/exposure/wizard1/ #exposure-export-form',
                                      {'lat1': latlonTopLeft.lat,
                                       'lng1': latlonTopLeft.lng,
                                       'lat2': latlonBottomRight.lat,
                                       'lng2': latlonBottomRight.lng },
                                       exposureExportFormLoaded);
            }
            $('#export_button').click(exportButtonClick);
        }
    );
};

$(document).ready(startExposureApp);
