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

var map;
var MAX_ZOOM_LEVEL = 16;

var startGeoJSONApp = function() {

    /***************
     * Base layers *
     ***************/
    var GEM_base = new L.tileLayer("http://{s}.tiles.mapbox.com/v3/unhcr.map-8bkai3wa/{z}/{x}/{y}.png",
                                   {subdomains: ['a', 'b', 'c', 'd'], noWrap: true});

    var baselayer = {
        'Base Map' : GEM_base
    };


    /***********
     * The map *
     ***********/
    map = L.map('map', {
        center: [20, 20],
        zoom: 3,
        maxZoom: MAX_ZOOM_LEVEL,
        maxBounds: new L.LatLngBounds(new L.LatLng(-90, -185), new L.LatLng(90, 185)),
        layers: [GEM_base],
        attributionControl: false,
    });

    /**********
    * GeoJSON *
    **********/
    var style = {color:'red', fillColor:'orange', radius: 4, apacity: 1.0, fillOpacity: 1.0, weight: 2, clickable: false};
    L.Control.FileLayerLoad.LABEL = '<i class="icon-folder-open"></i>';
    L.Control.fileLayerLoad({
	    fitBounds: true,
	    layerOptions: {
            style: style,
            pointToLayer: function (data, latlng) {
                return L.circleMarker(latlng, {style: style}
            );
		}},
	}).addTo(map);

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
    $(document).ready(mapFit);
    $(window).resize(mapFit);

};
$(document).ready(startGeoJSONApp);
