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

var MAX_ZOOM_LEVEL = 16;

var startStrainApp = function() {

    /***************
     * Base layers *
     ***************/
    var GEM_base = new L.tileLayer("http://{s}.tiles.mapbox.com/v3/unhcr.map-8bkai3wa/{z}/{x}/{y}.png",
                                   {subdomains: ['a', 'b', 'c', 'd'], noWrap: true});

    var baselayer = {
        'Base Map' : GEM_base
    };

    /******************
     * Overlay layers *
     ******************/

    strain = L.tileLayer('http://tilestream.openquake.org/v2/strain/{z}/{x}/{y}.png');

    var overlays = {
        "Geodetic-Strain" : strain,
    };

    /***********
     * The map *
     ***********/
    map = L.map('map', {
        center: [20, 20],
        zoom: 3,
        maxZoom: MAX_ZOOM_LEVEL,
        maxBounds: new L.LatLngBounds(new L.LatLng(-90, -185), new L.LatLng(90, 185)),
        layers: [GEM_base, strain],
        attributionControl: false,
    });

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
    $(document).ready(mapFit);
    $(window).resize(mapFit);
    $(document).ready(legendSlidingPanel);
};
$(document).ready(startStrainApp);
