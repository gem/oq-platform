/*
   Copyright (c) 2014, GEM Foundation.

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
var utfGrid = [];
var baseMapUrl = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png');
var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

try {
    var bing_key = BING_KEY.bing_key;
} catch(e) {
    // continue
}

var startApp = function() {

    $(function() {
        $( "#dialog" ).dialog({height: 520, width: 430, position: {at: "right bottom"}});
    });

    // switch base maps
    $('#base-map-menu').change(function() {
        var baseMapSelection = document.getElementById('base-map-menu').value;
        map.removeLayer(baseMapUrl);
        if (baseMapSelection == 4) {
            baseMapUrl = new L.TileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png');
            map.addLayer(baseMapUrl);
        } else if (baseMapSelection == 3) {
            baseMapUrl = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png');
            map.addLayer(baseMapUrl);
        } else if(baseMapSelection == 1) {
            baseMapUrl = new L.TileLayer('http://{s}.tiles.mapbox.com/v3/mapbox.blue-marble-topo-jul/{z}/{x}/{y}.png');
            map.addLayer(baseMapUrl);
        } else if (baseMapSelection == 2) {
            if (bing_key == undefined) {
                alert("A bing maps API key has not been added to this platform, please refer to the installation instructions for details");
            }
            baseMapUrl = new L.BingLayer(bing_key); // TODO change the api to point to bing api key aerial with labels
            map.addLayer(baseMapUrl);
        } else if (baseMapSelection == 5) {
            baseMapUrl = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
            map.addLayer(baseMapUrl);
        }
    });

    $('#base-map-menu').css({ 'margin-bottom' : 0 });

    var map = new L.Map('map', {
        minZoom: 2,
        attributionControl: false,
        maxBounds: new L.LatLngBounds(new L.LatLng(-90, -180), new L.LatLng(90, 180)),
    });
    map.setView(new L.LatLng(10, -10), 2).addLayer(baseMapUrl);

    layerControl = L.control.layers(app.baseLayers);

    map.addControl(layerControl.setPosition("topleft"));
    map.panTo(new L.LatLng(38.2, -101.6));
    map.scrollWheelZoom.enable();

    // This layer is used for the visual representation of the data
    var hazus = L.tileLayer(TS_URL + '/v2/ged-hazus-level1/{z}/{x}/{y}.png');
    layerControl.addOverlay(hazus, "Hazus Level 1 Building Fractions");
    map.addLayer(hazus);

    var building_fractions = L.tileLayer(TS_URL + '/v2/ged_hazus_US_building_fractions_black/{z}/{x}/{y}.png');
    layerControl.addOverlay(building_fractions, "US Counties");
    map.addLayer(building_fractions);

    utfGrid = new L.UtfGrid(TS_URL + '/v2/hazus_US_building_fractions/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});

    map.addLayer(utfGrid);

    ////////////////////////////////////////////
    /////////////// Pie Chart //////////////////
    ////////////////////////////////////////////

    function buildD3PieChart(keys, values, name) {

        var w = 400,
            h = 400,
            r = 180,
            inner = 70,
            color = d3.scale.category20c();

        data = [];

        for (var i = 0; i < values.length; i++) {
           data[i] = {"label":keys[i], "value":values[i]};
        }
        
        var total = d3.sum(data, function(d) {
            return d3.sum(d3.values(d));
        });
        
        var vis = d3.select("#dialog")
            .append("svg:svg")
            .data([data])
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(" + r * 1.1 + "," + r * 1.1 + ")");
        
        var textTop = vis.append("text")
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("class", "textTop")
            .text( "TOTAL" )
            .attr("y", -10),
        
        textBottom = vis.append("text")
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("class", "textBottom")
            .text(total.toFixed(2))
            .attr("y", 10);

        vis.append("text")
            .attr("text-anchor", "left")
            .style("font-size", "16px")
            .text(name)
            .attr("y", -185)
            .attr("x", -195);
        
        var arc = d3.svg.arc()
            .innerRadius(inner)
            .outerRadius(r);
        
        var arcOver = d3.svg.arc()
            .innerRadius(inner + 5)
            .outerRadius(r + 5);
         
        var pie = d3.layout.pie()
            .value(function(d) { return d.value; });
         
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
                .append("svg:g")
                    .attr("class", "slice")
                    .on("mouseover", function(d) {
                        d3.select(this).select("path").transition()
                            .duration(200)
                            .attr("d", arcOver);
                        
                        textTop.text(d3.select(this).datum().data.label)
                            .attr("y", -10);
                        textBottom.text(d3.select(this).datum().data.value.toFixed(3))
                            .attr("y", 10);
                    })
                    .on("mouseout", function(d) {
                        d3.select(this).select("path").transition()
                            .duration(100)
                            .attr("d", arc);
                        
                        textTop.text( "TOTAL" )
                            .attr("y", -10);
                        textBottom.text(total.toFixed(2));
                    });
        
        arcs.append("svg:path")
            .attr("fill", function(d, i) { return color(i); } )
            .attr("d", arc);
        
        var legend = d3.select("#dialog").append("svg")
            .attr("class", "legend-hazus")
            .attr("width", 400)
            .attr("height", 40)
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(" + i * 27 + ",0)"; });
        
        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d, i) { return color(i); });
        
        legend.append("text")
            .attr("x", 0)
            .attr("y", 30)
            .attr("dy", ".35em")
            .text(function(d) { return d.label; });
    }

    var utfGridClickEvent = function() {
        utfGrid.on('click', function (e) {
            $("#dialog").empty();
            
            if (e.data) {
                var b = e.data.bf_json;
                var bfClean = b.replace(/[\{\}\/"]/g, "");
                var data = eval('({' + bfClean + '})');
                var keys = [];
                var values = [];
                var name = e.data.name;

                for (var prop in data) {
                    keys.push(prop);
                    values.push(data[prop]);
                }
                buildD3PieChart(keys, values, name);
            }
        });

    };
    utfGridClickEvent();
};

app.initialize(startApp);
