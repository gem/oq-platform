/*
   Copyright (c) 2010-2015, GEM Foundation.

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

// vars for storing lon/lat of the bounding box selection
var latlonTopLeft;
var latlonBottomRight;
var regionSelection;

var drawnItems;
var drawControl;
var baseMapUrl = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var DRAW_TOOL_COLOR = '#FFA54F';
var app = new OQLeaflet.OQLeafletApp(THIRD_PARTY_URLS.leaflet_base_map);

var startApp = function() {
    drawnItems = new L.LayerGroup();

    // Create a dropdown list of all the countries
    var winH = $(window).height() - 100;
    var winW = $(window).width() - 300;
    $('#countriesListDialog').dialog({
        autoOpen: false,
        height: winH,
        width: winW,
        modal: true,
        open: function() {
            $('.ui-widget-overlay').addClass('custom-style');
        }
    });

    $('#map-tools').append('<button type="button" id="countries-list">Load Data by Region</button>');
    $('#countries-list').button().click(function() {
        $('#countriesListDialog').dialog('open');
    });

    $('#countries-list').button('disable');

    $(document).ready(function() {
        $('#countries-list').button('enable');
        $('#subRegionList').find('p').first().remove();
        $("#ragionTable").hide();
    });

    var width = $(window).width();
    $("#oq-body-content").width(width - 30);

    /******************
     * Overlay layers *
     ******************/

    var hazus1 = L.tileLayer(TS_URL + '/v2/ged-hazus-level1/{z}/{x}/{y}.png');
    var hazus_bf = L.tileLayer(TS_URL + '/v2/ged_hazus_US_building_fractions_black/{z}/{x}/{y}.png');
    var unh1 = L.tileLayer(TS_URL + '/v2/ph-unh1-bc-ge10-z10/{z}/{x}/{y}.png');

    var grump_rural = L.tileLayer(TS_URL + '/v2/gdal-custom-rural/{z}/{x}/{y}.png');
    var grump_urban = L.tileLayer(TS_URL + '/v2/gdal-custom-urban/{z}/{x}/{y}.png',{opacity: 0.8});

    var overlays = {
        "GRUMP Urban" : grump_urban,
        "GRUMP Rural" : grump_rural,
        "HAZUS Level 1 Building Counts" : hazus1,
        "HAZUS Level 1 Building Fractions" : hazus_bf,
        "UN Habitat Level 1 Building Counts" : unh1
    };

    map = new L.Map('map', {
        minZoom: 2,
        attributionControl: false,
        maxBounds: new L.LatLngBounds(new L.LatLng(-90, -180), new L.LatLng(90, 180)),
    });
    map.setView(new L.LatLng(10, -10), 2).addLayer(baseMapUrl);
    map.addLayer(drawnItems);
    L.control.layers(app.baseLayers, overlays).addTo(map).setPosition("topleft");

    L.control.coordinates({
        position: "bottomleft",
        labelTemplateLat: "Latitude: {y}",
        labelTemplateLng: "Longitude: {x}",
        enableUserInput: false,
    }).addTo(map);
};

app.initialize(startApp);
