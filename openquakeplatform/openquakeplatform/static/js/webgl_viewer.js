/*
   Copyright (c) 2015, GEM Foundation.

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

var webGl;
var mapBoxAccessToken;
var map;

$(document).ready(function() {
    // Calculate the height:
    var headerHeight = $('#header').height();
    var footerHeight = $('#footer').height();
    var mtoolsHeight = $('#map-tools').height();
    var ribbonHeight = $('#oq-context-ribbon').height();
    var mapHeight = (window.innerHeight - headerHeight - footerHeight - mtoolsHeight - ribbonHeight);
    $('#map').height(mapHeight);

    // Error dialog
    $('#errorDialog').dialog({
        autoOpen: false,
        height: 150,
        width: 400,
        closeOnEscape: true,
        modal: true
    });

    // Check to see if there is a system wide mapbox access token
    try {
        mapBoxAccessToken = mbToken;
    } catch(e) {
        mapBoxAccessToken = null;
    }

    if (!mapBoxAccessToken) {
        $('#errorDialog').empty();
        $('#errorDialog').append(
            '<p>This instalation of the OpenQuake Platform does not include the correct system setting for this application be used</p>'
        );
        $('#errorDialog').dialog('open');
        return;
    }

    // Check the browser for webGL support
    function webglDetect(return_context) {
        if (!!window.WebGLRenderingContext) {
            var canvas = document.createElement("canvas"),
                names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
                context = false;

            for(var i=0;i<4;i++) {
                try {
                    context = canvas.getContext(names[i]);
                    if (context && typeof context.getParameter == "function") {
                        // WebGL is enabled
                        if (return_context) {
                            // Return WebGL object if the function's argument is present
                            return {name:names[i], gl:context};
                        }
                        // Else, return just true
                        return true;
                    }
                } catch(e) {}
            }

            // WebGL is supported, but disabled
            return false;
        }

        // WebGL not supported
        return false;
    }

    webGl = webglDetect();

    if (webGl === false) {
        $('#errorDialog').empty();
        $('#errorDialog').append(
            '<p>This application requires a modern web browser that supports webGl</p>'
        );
        $('#errorDialog').dialog('open');
    } else {
        setupMapboxGlMap();
    }
});


function setupMapboxGlMap() {
    // Create mapbox map element
    mapboxgl.accessToken = mbToken;

    map = new mapboxgl.Map({
        container: 'map',
        // Load default mapbox basemap
        style: 'mapbox://styles/mapbox/streets-v8',
        center: [0, 20],
        zoom: 2,
    });

    // Check the URL for layer parameter
    var urlLayerParameter = location.href;
    urlLayerParameter = urlLayerParameter.split('webgl_viewer/')[1];

    if (urlLayerParameter) {
        console.log('urlLayerParameter:');
        console.log(urlLayerParameter);
        attributeInfoRequest(urlLayerParameter);
    }

    setTimeout(function() {
        $('#absoluteSpinner').hide();
    }, 2000);
}

function mapboxGlLayerCreation(layerAttributes) {
    // Color options for GL map
    var colorsPalRedSingle = ['#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#de2d26', '#a50f15'];
    var colorsPalBlueSingle = ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#3182bd', '#08519c'];
    var colorsPalGreenSingle = ['#edf8e9', '#c7e9c0', '#a1d99b', '#74c476', '#31a354', '#006d2c'];
    var colorsPalRedMulti = ['#fef0d9', '#fdd49e', '#fdbb84', '#fc8d59', '#e34a33', '#b30000'];
    var colorsPalBlueMulti = ['#f1eef6', '#d0d1e6', '#a6bddb', '#74a9cf', '#2b8cbe', '#045a8d'];
    var colorsPalGreenMulti = ['#edf8fb', '#ccece6', '#99d8c9', '#66c2a4', '#2ca25f', '#006d2c'];
    // Default color
    var colorsPal = colorsPalRedSingle;

    // Find the values to create categorized color ramp
    // First find the min and max vales
    var minMaxArray = [];
    for (var i = 0; i < layerAttributes.features.length; i++) {
        for (var k in layerAttributes.features[i].properties) {
            minMaxArray.push(layerAttributes.features[i].properties[k]);
        }
    }

    // TODO fix this
    //map.fitBounds(mapboxBoundingBox);


    var min = Math.min.apply(null, minMaxArray).toFixed(2);
    var max = Math.max.apply(null, minMaxArray).toFixed(2);
    min = (parseFloat(min) - 0.1);
    // Round up the max
    max = Math.ceil(max * 10) / 10;

    var breaks = [];

    function getColor() {
        var interval = (max - min) / 6;
        var tempStep = min;
        for (var i = 0; i < 5; i++) {
            tempStep += interval
            breaks.push(tempStep);
        }
        breaks.unshift(min);
        breaks.push(max);
    }

    getColor();

    console.log('minMaxArray:');
    console.log(minMaxArray);
    console.log('breaks:');
    console.log(breaks);

    map.addSource('projectSource', {
        'type': 'geojson',
        'data': layerAttributes,
    });


}

// Get layer attributes from GeoServer
function attributeInfoRequest(selectedLayer) {
    return $.ajax({
        type: 'get',
        url: '/geoserver/oqplatform/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='+ selectedLayer +'&outputFormat=json',
        success: function(data) {
            layerAttributes = data;
            console.log('layerAttributes:');
            console.log(layerAttributes);
            mapboxGlLayerCreation(layerAttributes);
        },
        error: function() {
            $('#ajaxErrorDialog').empty();
            $('#ajaxErrorDialog').append(
                '<p>This application was not able to get information about the selected layer</p>'
            );
            $('#ajaxErrorDialog').dialog('open');
        }
    });
}
