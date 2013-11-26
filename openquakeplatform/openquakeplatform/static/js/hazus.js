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
var utfGrid = new Object;

// Keep track of the layer names
var layers;

var baseMapUrl = (
    "http://{s}.tiles.mapbox.com/v3/unhcr.map-8bkai3wa/{z}/{x}/{y}.png"
);

var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

var startApp = function() {

    $(function() {
        $( "#dialog" ).dialog({position: {my: "right top", at: "right bottom", of: button}});
    });

    app.createMap();

    layers = {};

    layerControl = L.control.layers(app.baseLayers);

    map.addControl(layerControl.setPosition("topleft"));

    map.panTo(new L.LatLng(38.2, -101.6));

    // This layer is used for the visual representation of the data
    var hazus = L.tileLayer('http://tilestream.openquake.org/v2/ged-hazus-level1/{z}/{x}/{y}.png');
    layerControl.addOverlay(hazus, "Building Fractions");
    map.addLayer(hazus);

    var building_fractions = L.tileLayer('http://tilestream.openquake.org/v2/ged_hazus_US_building_fractions_black/{z}/{x}/{y}.png');
    layerControl.addOverlay(building_fractions, "Building Fractions");
    map.addLayer(building_fractions);

    utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/ged_hazus_US_building_fractions/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});

    map.addLayer(utfGrid);
 
    var utfGridClickEvent = function() {
        utfGrid.on('mouseover', function (e) {
            console.log(e);
            if (e.data) {
                document.getElementById('dialog').innerHTML = e.data.bf_json;
            } else {
                document.getElementById('dialog').innerHTML = 'hover: nothing';
            }
            console.log('mouseover: ' + e.data.bf_json);
        });
        utfGrid.on('mouseout', function (e) {
            //console.log('mouseout: ' + e.data);
        });
    }
    utfGridClickEvent();
};

app.initialize(startApp);