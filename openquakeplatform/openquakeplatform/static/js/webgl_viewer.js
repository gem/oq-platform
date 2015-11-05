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
var heatmap;
var heatmapIntensity = 15;
var heatmapSize = 3080;
var dataPoints = [];

$(document).ready(function() {
    // Create an input field for the heatmap intensity option
    // TODO clean up css
    $('#map-tools').append(
        '<div id="intensity-div" style="float: left;">'+
            '<label for="heatmap-intensity-value" style="float: left; margin-left: 10px; margin-top: 4px;">Heatmap Intensity:</label>'+
            '<input type="text" id="heatmap-intensity-value" readonly style="border:0; color:#f6931f; font-weight:bold; width:30px;">'+
            '<div id="heatmap-intensity" style="width:300px; margin-left: 10px;"></div><br>'+
        '</div>'
    );

    // Create an input field for the heatmap size option
    $('#map-tools').append(
        '<div id="size-div">'+
            '<label for="heatmap-size-value" style="float: left; margin-left: 40px; margin-top: 4px;">Heatmap Size:</label>'+
            '<input type="text" id="heatmap-size-value" readonly style="border:0; color:#f6931f; font-weight:bold; width:30px;">'+
            '<div id="heatmap-size" style="width:300px; margin-left: 350px;"></div>'+
        '</div>'
    );

    $(function() {
        $('#heatmap-intensity').slider({
            range: "max",
            min: 0,
            max: 100,
            value: heatmapIntensity,
            slide: function( event, ui ) {
                $('#heatmap-intensity-value').val( ui.value );
            }
        });
        $('#heatmap-intensity-value').val($('#heatmap-intensity').slider('value') );
    });

    $(function() {
        $('#heatmap-size').slider({
            range: "max",
            min: 1000,
            max: 7000,
            value: heatmapSize,
            slide: function( event, ui ) {
                $('#heatmap-size-value').val( ui.value );
            }
        });
        $('#heatmap-size-value').val($('#heatmap-size').slider('value') );
    });

    // Calculate the height:
    var mapToolsHeight = $('#map-tools').height();
    var headerHeight = $('#header').height();
    var footerHeight = $('#footer').height();
    var mtoolsHeight = $('#map-tools').height();
    var ribbonHeight = $('#oq-context-ribbon').height();
    var mapHeight = (window.innerHeight - headerHeight - footerHeight - mtoolsHeight - ribbonHeight - mapToolsHeight);


    // Watch for heatmap intensity update
    $("#heatmap-intensity").on("slidestop", function() {
        // Get the new intensity value
        heatmapIntensity = $('#heatmap-intensity').slider('value');
        createHeatMapLayer();
    });

    // Watch for heatmap size update
    $("#heatmap-size").on("slidestop", function() {
        // Get the new size value
        heatmapSize = $('#heatmap-size').slider('value');
        heatmap.options.size = heatmapSize;
        createHeatMapLayer();
    });

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
        //setupMapboxGlMap();
        setupLeafletMap();
    }
});

function setupLeafletMap() {
    // Create a WebGl map
    map = L.map('map').setView([20, 0], 2);

    // Add webGL support
    var gl = L.mapboxGL({
        accessToken: mbToken,
        style: 'mapbox://styles/mapbox/streets-v8'
    }).addTo(map);

    // Create a leaflet map
    //var baseMapUrl = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png');
    //map = L.map('map', {layers: [baseMapUrl]});

    //Initialize the heatmap
    heatmap = new L.TileLayer.WebGLHeatMap({
        size: heatmapSize,
    });

    // Check the URL for layer parameter
    var urlLayerParameter = location.href;
    urlLayerParameter = urlLayerParameter.split('webgl_viewer/')[1];

    if (urlLayerParameter) {
        attributeInfoRequest(urlLayerParameter);
    }

    setTimeout(function() {
        $('#absoluteSpinner').hide();
    }, 2000);
}

function mapboxGlLayerCreation(layerAttributes) {

    // Format the data to be used by heatmap plugin,
    // array of arrays like this: [[lat, lng, heatmapIntensity]...]
    for (var i = 0; i < layerAttributes.features.length; i++) {
        var tmpArray = [];
        tmpArray.push(
            layerAttributes.features[i].geometry.coordinates[1],
            layerAttributes.features[i].geometry.coordinates[0],
            // TODO fix the hard codded iml element
            layerAttributes.features[i].properties.iml
        );
        dataPoints.push(tmpArray);
    }

    // Find the bounding box for the new layer
    var minMaxLng = [];
    var minMaxLat = [];
    for (var i = 0; i < layerAttributes.features.length; i++) {
        minMaxLng.push(layerAttributes.features[i].geometry.coordinates[0]);
        minMaxLat.push(layerAttributes.features[i].geometry.coordinates[1]);
    }

    // Get the min and max lat and lon in order to create a bounding box
    var minLng = Math.min.apply(null, minMaxLng).toFixed(2);
    var maxLng = Math.max.apply(null, minMaxLng).toFixed(2);
    var minLat = Math.min.apply(null, minMaxLat).toFixed(2);
    var maxLat = Math.max.apply(null, minMaxLat).toFixed(2);

    // Fit the map to bounding box
    map.fitBounds([[minLat, minLng], [maxLat, maxLng]]);

    var mapZoom = map.getZoom();
    setTimeout(function() {
        map.setZoom(mapZoom - 1);
    }, 1000);

    createHeatMapLayer();
}

function createHeatMapLayer() {
    try {
        // empty the data array
        heatmap.data = [];
        // Try to remove the heatmap layer
        map.removeLayer(heatmap);
    } catch (e) {
        // continue
    }

    // Creat the heatmap layer
    for (var i = 0, len = dataPoints.length; i < len; i++) {
        var point = dataPoints[i];
        heatmap.addDataPoint(point[0], point[1], heatmapIntensity);
    }

    // TODO create legend

    map.addLayer(heatmap);
}

// Get layer attributes from GeoServer
function attributeInfoRequest(selectedLayer) {
    return $.ajax({
        type: 'get',
        url: '/geoserver/oqplatform/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='+ selectedLayer +'&outputFormat=json',
        success: function(data) {
            layerAttributes = data;
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


