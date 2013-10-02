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

var layerControl;
// Keep track of the layer names
var layers;

var app = new OQLeaflet.OQLeafletApp(BASE_MAP_URL);

var startApp = function() {

    app.createMap();
    L.wax(map);

    layers = {};

    layerControl = L.control.layers(app.baseLayers);

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

    // Duplicate layer warnning message
    function showDuplicateMsg() {
        $("#worning-duplicate").dialog("open");
    };

    $(document).ready(function() {
        $("#worning-duplicate").dialog({
            autoOpen: false,
            hieght: 300,
            width: 350,
            modal: true
        });
    });

    // No Layer to remove warnning message
    function showRemoveMsg() {
        $("#worning-no-layer").dialog("open");
    };

    $(document).ready(function() {
        $("#worning-no-layer").dialog({
            autoOpen: false,
            hieght: 300,
            width: 350,
            modal: true
        });
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
            if (selectedLayer in layers) {
               showDuplicateMsg();
            }
            else {
                var tileLayer = L.tileLayer('http://tilestream.openquake.org/v2/'
                    + selectedLayer
                    + '/{z}/{x}/{y}.png',{opacity: 0.8});
                layerControl.addOverlay(tileLayer, selectedLayer);
                map.addLayer(tileLayer);
                // Keep track of layers that have been added
                layers[selectedLayer] = tileLayer;
            }
        });
    });

    // Remove layers from tilestream
    $(document).ready(function() {
        $('#removeTileLayer').click(function() {
            var e = document.getElementById("tile-list");
            var selectedLayer = e.options[e.selectedIndex].value;
            // Check in the layer is in the map port
            if (selectedLayer in layers) {
                layerControl.removeLayer(layers[selectedLayer]);
                map.removeLayer(layers[selectedLayer]);
                delete layers[selectedLayer];
            }
            else {
                showRemoveMsg();
            }
        });
    });

    // Get layers names from geoserver
    var geoserverLayer = "";
    var geoSel = document.getElementById('geoserver-list');

    // Get Geoserver info with GetCapabilities
    $.ajax({
        type: "GET",
             url: "/geoserver/wms?SERVICE=WMS&REQUEST=GetCapabilities&TILED=true&VERSION=1.1.1",
        dataType: "xml",
        success: function(xmlDoc) {
            var layerNames = $(xmlDoc).find('Layer > Name');
            for (var i = 0; i < layerNames.length; i++) {
                var layerName = layerNames[i].textContent;
                var opt = document.createElement('option');
                opt.innerHTML = layerName;
                opt.value = layerName;
                geoSel.appendChild(opt);
            }
        }
    });

     // Add layers form geoserver list
     $(document).ready(function() {
         $('#addGeoLayer').click(function() {
            var e = document.getElementById("geoserver-list");
            var selectedLayer = e.options[e.selectedIndex].value;
            // Check for duplicae layes
            if ( selectedLayer in layers ) {
                showDuplicateMsg();
            }
            else {
                var geoLayer = new L.TileLayer.WMS('/geoserver/wms', {
                    layers : selectedLayer,
                    format: 'image/png',
                    transparent: true
                });
                layerControl.addOverlay(geoLayer, selectedLayer);
                map.addLayer(geoLayer);
                // Keep track of layers that have been added
                layers[selectedLayer] =  geoLayer;
            }
         });
     });

    // Remove layers from Geoserver
    $(document).ready(function() {
        $('#removeGeoLayer').click(function() {
            var e = document.getElementById("geoserver-list");
            var selectedLayer = e.options[e.selectedIndex].value;
             // Check in the layer is in the map port
             if (selectedLayer in layers) {
                 layerControl.removeLayer(layers[selectedLayer]);
                 map.removeLayer(layers[selectedLayer]);
                 delete layers[selectedLayer];
             }
             else {
                 showRemoveMsg();
             }
        });
    });


    // Get layer names from tilestream
    var IceboxLayer = "";
    var selIce = document.getElementById('ice-list');
    $.getJSON('http://127.0.0.1:8000/icebox/artifacts',
    function(json) {
        for (var i=0; i < json.length; i++) {
            var IceboxLayer = json[i].name;
            var opt = document.createElement('option');
            opt.innerHTML = IceboxLayer;
            opt.value = IceboxLayer;
            selIce.appendChild(opt);
        }
    });
/*
    // Add layers from the Icebox API
    $(document).ready(function() {
        $('#addIceLayer').click(function() {
            var e = document.getElementById("ice-list");
            var selectedLayer = e.options[e.selectedIndex].value;
            // Check for duplicae layes
            if (selectedLayer in layers) {
               showDuplicateMsg();
            }
            else {
                var tileLayer = L.tileLayer('http://tilestream.openquake.org/v2/'
                    + selectedLayer
                    + '/{z}/{x}/{y}.png',{opacity: 0.8});
                layerControl.addOverlay(tileLayer, selectedLayer);
                map.addLayer(tileLayer);
                // Keep track of layers that have been added
                layers[selectedLayer] = tileLayer;
            }
        });
    });
*/
    $.getJSON("http://127.0.0.1:8000/icebox/artifacts",
    function(json) {
         var foo = json;
        console.log(json[0].url);
    });
};

app.initialize(startApp);
