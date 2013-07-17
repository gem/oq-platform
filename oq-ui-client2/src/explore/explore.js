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
var map;
var layerControl;
// Keep track of the layer names
var layers;

var startExploreApp = function() {

    var layerControl = L.control.layers();
    layers = [];

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
    var overlays = {};

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

    // Add Wax support
    L.wax(map);

    // Resize the main and map div
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

    // Layer selection dialog
    $("#dialog-layers").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true
    });

    $("#layer-selection").button().click(function() {
        $("#dialog-layers").dialog("open");
    });

    // Get layer names from tilestream
    var tileStreamLayer = "";
    var sel = document.getElementById('tile-list');
    $.getJSON('http://tilestream.openquake.org/api/v1/Tileset',
    function(json) {
        for (var i=0; i < json.length; i++) {
            var tileStreamLayer = json[i].id;
            var opt = document.createElement('option');
            opt.innerHTML = tileStreamLayer;
            opt.value = json[i].id;
            sel.appendChild(opt);
        }
    });

    map.addControl(layerControl);

    // Add layers form tilestream list
    $(document).ready(function() {
        $('#addTileLayer').click(function() {

            var e = document.getElementById("tile-list");
            var selectedLayer = e.options[e.selectedIndex].value;
            // Check for duplicae layes
            var found = $.inArray(selectedLayer, layers) > -1;
            // If a duplicate lauyer is found, throw error
            if (found == true) {
                alert("This layer has already been added to the map");
                }
            else
                {
                var tileLayer = L.tileLayer('http://tilestream.openquake.org/v2/' 
                    + selectedLayer 
                    + '/{z}/{x}/{y}.png',{opacity: 0.8}); 
                layerControl.addOverlay(tileLayer, selectedLayer);
                map.addLayer(tileLayer);
                // Keep track of layers that have been added
                layers.push(selectedLayer);
                }
        });
    });

    // Remove layers from tilestream
    $(document).ready(function() {
        $('#removeTileLayer').click(function() {
            var e = document.getElementById("tile-list");
            var selectedLayer = e.options[e.selectedIndex].value;
            //layerControl.removeLayer(selectedLayer);
            console.log("remove layer " + selectedLayer);
            map.removeLayer(selectedLayer);
            //layers.push(selectedLayer);

        });
    });

    // Get layers names from geoserver
    var geoserverLayer = "";
    var geosel = document.getElementById('geoserver-list');
    $.getJSON('http://193.206.66.163/geoserver/rest/layers.json',
    function(json) {
        for (var i=0; i < json.layers.layer.length; i++) {
            var geoserverLayer = json.layers.layer[i].name;
            var opt = document.createElement('option');
            opt.innerHTML = geoserverLayer;
            opt.value = json.layers.layer[i].name;
            geosel.appendChild(opt);
        }
    });
    
     // Add layers form geoserver list
     $(document).ready(function() {
         $('#addGeoLayer').click(function() {
 
             var e = document.getElementById("geoserver-list");
             var selectedLayer = e.options[e.selectedIndex].value;
             var test = "pop_vals_gbr_urban";
             // Check for duplicae layes
             var found = $.inArray(selectedLayer, layers) > -1;
             // If a duplicate lauyer is found, throw error
             if (found == true) {
                 alert("This layer has already been added to the map");
                 }
             else
                 {
                 var geoLayer = new L.TileLayer.WMS('http://193.206.66.163/geoserver/wms', {
                    layers : 'ged:'+selectedLayer, 
                    format: 'image/png', 
                    transparent: true
                    });
                 layerControl.addOverlay(geoLayer, selectedLayer);
                 map.addLayer(geoLayer);
                 // Keep track of layers that have been added
                 layers.push(selectedLayer);
                 }
         });
     });

};

$(document).ready(startExploreApp);
