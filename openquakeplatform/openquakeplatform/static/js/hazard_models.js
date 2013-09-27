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

var baseMapUrl = (
    "http://{s}.tiles.mapbox.com/v3/unhcr.map-8bkai3wa/{z}/{x}/{y}.png"
);
var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

var startCallback = function() {

    /******************
     * Overlay layers *
     ******************/
    hazard_map_japan_21 = L.tileLayer('http://tilestream.openquake.org/v2/hazard-map-japan-21/{z}/{x}/{y}.png');
    hazard_map_japan_22 = L.tileLayer('http://tilestream.openquake.org/v2/hazard-map-japan-22/{z}/{x}/{y}.png');
    hazard_map_japan_22_land = L.tileLayer('http://tilestream.openquake.org/v2/hazard-map-japan-22-land/{z}/{x}/{y}.png');
    hazard_map_japan_21_land = L.tileLayer('http://tilestream.openquake.org/v2/hazard-map-japan-21-land/{z}/{x}/{y}.png');
    hazard_map_japan_21_contour = L.tileLayer('http://tilestream.openquake.org/v2/hazard-map-japan-21-contour/{z}/{x}/{y}.png');
    hazard_map_japan_22_contour = L.tileLayer('http://tilestream.openquake.org/v2/hazard-map-japan-22-contour/{z}/{x}/{y}.png');
    hazard_map_japan_21_contour_land = L.tileLayer('http://tilestream.openquake.org/v2/hazard-map-japan-21-contour-land/{z}/{x}/{y}.png');
    hazard_map_japan_22_contour_land = L.tileLayer('http://tilestream.openquake.org/v2/hazard-map-japan-22-contour-land/{z}/{x}/{y}.png');
    hazard_curve_Japan = L.tileLayer('http://tilestream.openquake.org/v2/hazard-curve-japan/{z}/{x}/{y}.png', {
        wax: 'http://tilestream.openquake.org/v2/hazard-curve-japan.json'
    });

    hazard_curve_Japan_land = L.tileLayer('http://tilestream.openquake.org/v2/hazard-curve-japan-land/{z}/{x}/{y}.png', {
        wax: 'http://tilestream.openquake.org/v2/hazard-curve-japan-land.json'
    });

    hazard_map = L.tileLayer('http://tilestream.openquake.org/v2/hazard-map-points-world/{z}/{x}/{y}.png');
    hazard_contour = L.tileLayer('http://tilestream.openquake.org/v2/hazard-map-contour-4/{z}/{x}/{y}.png');
    hazard_curve = L.tileLayer('http://tilestream.openquake.org/v2/hazard-curve-world/{z}/{x}/{y}.png', {
        wax: 'http://tilestream.openquake.org/v2/hazard-curve-world.json'
    });

    grump_rural = L.tileLayer('http://tilestream.openquake.org/v2/gdal-custom-rural/{z}/{x}/{y}.png');
    grump_urban = L.tileLayer('http://tilestream.openquake.org/v2/gdal-custom-urban/{z}/{x}/{y}.png',{opacity: 0.8});

    var overlays = {
        "GRUMP Urban" : grump_urban,
        "GRUMP Rural" : grump_rural,
        "Japan Hazard Map - 10% in 50 years" : hazard_map_japan_21,
        "Japan Hazard Map - 10% in 50 years - Land" : hazard_map_japan_21_land,
        "Japan Hazard Map - 10% in 50 years - Contour" : hazard_map_japan_21_contour,
        "Japan Hazard Map - 10% in 50 years - Contour - Land" : hazard_map_japan_21_contour_land,
        "Japan Hazard Map - 2% in 50 years" : hazard_map_japan_22,
        "Japan Hazard Map - 2% in 50 years - Land" : hazard_map_japan_22_land,
        "Japan Hazard Map - 2% in 50 years - Contour" : hazard_map_japan_22_contour,
        "Japan Hazard Map - 2% in 50 years - Contour - Land" : hazard_map_japan_22_contour_land,
        "Japan Hazard Curve - PGA" : hazard_curve_Japan,
        "Japan Hazard Curve - PGA - Land" : hazard_curve_Japan_land,
        "World Hazard Map - 10% in 50 years" : hazard_map,
        "World Hazard Map - 10% in 50 years - Contour" : hazard_contour,
        "World Hazard Curve - PGA" : hazard_curve,
    };

    // Init the map and add layers and interaction
    app.createMap();
    L.control.layers(app.baseLayers, overlays).addTo(map);
    L.wax(map);

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
    $(document).ready(legendSlidingPanel);
};

app.initialize(startCallback);
