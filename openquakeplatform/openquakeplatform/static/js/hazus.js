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
        $( "#dialog" ).dialog({height: 300, position: {at: "right bottom"}});
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
            
            if (e.data) {
                var b = e.data.bf_json;
                var bfClean = b.replace(/[\{\}\/"]/g, "");
                console.log(bfClean);

                document.getElementById('dialog').innerHTML = "<b>" + e.data.name + " </b><br>"+ bfClean;
            } else {
                document.getElementById('dialog').innerHTML = 'hover: nothing';
            }
        });
        utfGrid.on('mouseout', function (e) {
            //console.log('mouseout: ' + e.data);
        });
    }
    utfGridClickEvent();
};

app.initialize(startApp);