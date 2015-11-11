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
var heatmapOpacity = 0.6;
var heatmapIntensity = 4000;
var dataPoints = [];
var maxMappedValue;
var minMappedValue;
var gl;

$(document).ready(function() {
    // Create an input field for the heatmap opacity option
    $('#map-tools').append(
        '<div id="opacity-div">'+
            '<label id="opacity-labels" for="heatmap-opacity-value">Heatmap opacity:</label>'+
            '<input type="text" id="heatmap-opacity-value" readonly>'+
            '<div id="heatmap-opacity"></div><br>'+
        '</div>'
    );

    // Create an input field for the heatmap intensity option
    $('#map-tools').append(
        '<div id="intensity-div">'+
            '<label id="intensity-labels" for="heatmap-intensity-value">Heatmap intensity:</label>'+
            '<input type="text" id="heatmap-intensity-value" readonly>'+
            '<div id="heatmap-intensity"></div>'+
        '</div>'
    );

    $('#map-tools').append(
        '<div id="mapLegend"></div>'
    );

    $(function() {
        $('#heatmap-opacity').slider({
            range: "max",
            min: 0,
            max: 1,
            step: 0.1,
            value: heatmapOpacity,
            slide: function( event, ui ) {
                $('#heatmap-opacity-value').val( ui.value );
            }
        });
        $('#heatmap-opacity-value').val($('#heatmap-opacity').slider('value') );
    });

    $(function() {
        $('#heatmap-intensity').slider({
            range: "max",
            min: 1000,
            max: 80000,
            value: heatmapIntensity,
            slide: function( event, ui ) {
                $('#heatmap-intensity-value').val( ui.value );
            }
        });
        $('#heatmap-intensity-value').val($('#heatmap-intensity').slider('value') );
    });

    // Calculate the height:
    var mapToolsHeight = 45;
    var headerHeight = $('#header').height();
    var footerHeight = $('#footer').height();
    var mtoolsHeight = $('#map-tools').height();
    var ribbonHeight = $('#oq-context-ribbon').height();
    var mapHeight = (window.innerHeight - headerHeight - footerHeight - mtoolsHeight - ribbonHeight - mapToolsHeight);

    // Watch for heatmap opacity update
    $("#heatmap-opacity").on("slidestop", function() {
        // Get the new opacity value
        heatmapOpacity = $('#heatmap-opacity').slider('value');
        heatmap.options.opacity = heatmapOpacity;
        // FIXME this should be a lauyer redraw, but that method does not
        // seem to be available in the heatmap plugin, I opend an issue for this here:
        // https://github.com/ursudio/webgl-heatmap-leaflet/issues/11
        // heatmap.redraw();
        // Because the above method is not working, we need to recreate the layer...
        createHeatMapLayer();
    });

    // Watch for heatmap intensity update
    $("#heatmap-intensity").on("slidestop", function() {
        // Get the new intensity value
        heatmapIntensity = $('#heatmap-intensity').slider('value');
        heatmap.options.size = heatmapIntensity;

        // FIXME, same as above...
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

function setupLeafletMap() {
    // Create a WebGl map
    map = L.map('map').setView([20, 0], 2);

    // Add webGL support
    gl = L.mapboxGL({
        accessToken: mbToken,
        style: 'mapbox://styles/mapbox/dark-v8'
    }).addTo(map);

    // Create a leaflet map
    //var baseMapUrl = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png');
    //map = L.map('map', {layers: [baseMapUrl]});

    //Initialize the heatmap
    heatmap = new L.TileLayer.WebGLHeatMap({
        size: heatmapIntensity,
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
    //////////////////////////////
    // Create the webGl heatmap //
    //////////////////////////////

    var allValuesArray = [];

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
        // Push all the mapped values into an array to be used for the legend
        allValuesArray.push(layerAttributes.features[i].properties.iml);
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

    // Get the max mapped value
    maxMappedValue = Math.max.apply(null, allValuesArray).toFixed(2);
    minMappedValue = Math.min.apply(null, allValuesArray).toFixed(2);

    // Fit the map to bounding box
    console.log('[[minLat, minLng], [maxLat, maxLng]]:');
    console.log([[minLat, minLng], [maxLat, maxLng]]);
    map.fitBounds([[minLat, minLng], [maxLat, maxLng]]);

    var mapZoom = map.getZoom();
    // FIXME the layer does not correctly fit the map without adjusting the map view
    // this might be resolved with 'heatmap.redraw()', but that method is not wroking
    setTimeout(function() {
        map.setZoom(mapZoom - 1);
        map.setZoom(mapZoom + 1);
    }, 1000);

    createHeatMapLayer();

    createLegend(minMappedValue, maxMappedValue);

    ////////////////////////////
    // Create the WebGL layer //
    ////////////////////////////
/*
    var geojsonMarkerOptions = {
        radius: 14,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 0.3,
        fillOpacity: 0.2
    };

    // Create geojson layer
    L.geoJson(layerAttributes, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: function (feature, layer) {
            var thisFeature = feature.properties.iml;
            thisFeature = thisFeature.toString();
            layer.bindPopup(thisFeature);
        }
    }).addTo(map);

*/

    // Create the map source

    console.log('gl:');
    console.log(gl);

    gl._glMap.addSource('projectSource', {
        'type': 'geojson',
        'data': layerAttributes,
    });

    // Create the map layer
    gl._glMap.addLayer({
        'id': 'transparentLayer',
        "type": "circle",
        //'type': 'symbol',
        'source': 'projectSource',
        'source-layer': 'eq-simple',
        'interactive': true,
        'paint': {
            'circle-radius': 14,
            'circle-color': 'orange',
            'circle-opacity': 0.2
        }
        //"layout": {
          //"icon-image": "{marker-symbol}-12",
          //"text-field": "{Village}",
          //"text-font": "Open Sans Semibold, Arial Unicode MS Bold",
          //"text-offset": [0, 0.6],
          //"text-anchor": "top"
        //},
    });

    gl._glMap.on('click', function(e) {
        console.log('e:');
        console.log(e);
        gl._glMap.featuresAt(e.point, { radius : 6}, function(err, features) {
            console.log('features:');
            console.log(features);
            if (err) throw err;
            $('#mapLegend').empty();
            for(var k in features[0].properties) {
                $('#mapLegend').append(k+': '+features[0].properties[k]+'</br>');
            }
        });
    });

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

        var value = (dataPoints[i][2] * 10);
        heatmap.addDataPoint(point[0], point[1], value);
    }
    console.log('heatmap:');
    console.log(heatmap);


    // Dynamic scale
    var zoom = map.getZoom();
    if (zoom <= 14 ) {
        zoom = zoom * 2;
    }
    // Get the intensiy for this layer
    //heatmapIntensity = 200000 / (zoom * maxMappedValue) ;
    //console.log('heatmapIntensity:');
    //console.log(heatmapIntensity);
    //heatmap.options.size = heatmapIntensity;

    map.addLayer(heatmap);
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

function createLegend(minMappedValue, maxMappedValue) {

    ///////////////////////
    // Create the legend //
    ///////////////////////

    var svgWidth = 250,
        svgHeight = 40,
        x1 = 0,
        barWidth = 250,
        y1 = 0,
        barHeight = 20,
        numberHues = 35;

    var idGradient = "legendGradient";

    var svgForLegendStuff = d3.select("#mapLegend").append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // Create the empty gradient that we're going to populate later
    svgForLegendStuff.append("g")
        .append("defs")
        .append("linearGradient")
            .attr("id",idGradient)
            .attr("x1","0%")
            .attr("x2","100%")
            .attr("y1","0%")
            .attr("y2","0%"); // x1=0, x2=100%, y1=y2 results in a horizontal gradient
    // Create the bar for the legend to go into
    // the "fill" attribute hooks the gradient up to this rect
    svgForLegendStuff.append("rect")
        .attr("fill","url(#" + idGradient + ")")
        .attr("x",x1)
        .attr("y",y1)
        .attr("width",barWidth)
        .attr("height",barHeight);

    svgForLegendStuff.append("text")
        .attr("class","legendText")
        .attr("text-anchor", "middle")
        .attr("x",x1 + 15)
        .attr("y", 35)
        .attr("dy",0)
        .text(minMappedValue);

    svgForLegendStuff.append("text")
        .attr("class","legendText")
        .attr("text-anchor", "left")
        .attr("x",x1 + 220)
        .attr("y", 35)
        .attr("dy",0)
        .text(maxMappedValue);

    // We go from a somewhat transparent blue/green (hue = 160º, opacity = 0.3)
    // to a fully opaque reddish (hue = 0º, opacity = 1)
    var hueStart = 160, hueEnd = 0;
    var opacityStart = 0.3, opacityEnd = 1.0;
    var theHue, rgbString, opacity,p;

    var deltaPercent = 1/(numberHues-1);
    var deltaHue = (hueEnd - hueStart)/(numberHues - 1);
    var deltaOpacity = (opacityEnd - opacityStart)/(numberHues - 1);

    // Set up the data here
    var theData = [];
    for (var i = 0; i < numberHues; i++) {
        theHue = hueStart + deltaHue*i;
        // The second parameter, set to 1 here, is the saturation
        // The third parameter is "lightness"
        rgbString = d3.hsl(theHue,1,0.6).toString();
        opacity = opacityStart + deltaOpacity*i;
        p = 0 + deltaPercent*i;
        theData.push({"rgb":rgbString, "opacity":opacity, "percent":p});
    }

    var stops = d3.select('#' + idGradient).selectAll('stop')
        .data(theData);
    stops.enter().append('stop');
    stops.attr('offset',function(d) {
        return d.percent;
    })
    .attr('stop-color',function(d) {
        return d.rgb;
    })
    .attr('stop-opacity',function(d) {
        return d.opacity;
    });

    ////////////////
    // legend end //
    ////////////////
}

// TODO save the state of the opacity and intensity parameters
// TODO provide some kinf of 'smart guess' a initial intensity parameters

