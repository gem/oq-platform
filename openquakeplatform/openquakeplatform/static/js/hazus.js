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

var layerControl, utfGrid;
var utfGrid = {};
var baseMapUrl = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png');
var app = new OQLeaflet.OQLeafletApp(baseMapUrl);
var TILESTREAM_URL = TS_URL + '/v2/';

var startApp = function() {

    $(function() {
        $( "#dialog" ).dialog({height: 520, width: 430, position: {at: "right bottom"}});
    });

    map = new L.Map('map', {
        minZoom: 2,
        attributionControl: false,
        maxBounds: new L.LatLngBounds(new L.LatLng(-90, -180), new L.LatLng(90, 180)),
    });
    map.setView(new L.LatLng(10, -10), 2).addLayer(baseMapUrl);

    layerControl = L.control.layers(app.baseLayers);

    map.addControl(layerControl.setPosition("topleft"));
    map.panTo(new L.LatLng(38.2, -101.6));
    map.scrollWheelZoom.enable();

    $('#map-tools').prepend('<select id="external-layers-menu">'+
            '<option>Select layers</option>'+
            '<option value="1">Hazus Level 1 Building Fractions</option>'+
            '<option value="2">US Counties</option>'+
        '</select>'
    );

    $('#external-layers-menu').css({ 'margin-bottom' : 0 });

    function createUtfLayerGroups(selectedLayer, selecedGrid) {
        var tileLayer = L.tileLayer(TILESTREAM_URL +
            selectedLayer +
            '/{z}/{x}/{y}.png',{wax: TILESTREAM_URL +
            selectedLayer +
            '.json'});

        utfGrid = new L.UtfGrid(TILESTREAM_URL +
            selecedGrid +
            '/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
        var utfGridGroup = L.layerGroup([
            utfGrid,
            tileLayer
        ]);

        layerControl.addOverlay(utfGridGroup, selectedLayer);
        map.addLayer(utfGridGroup);
        utfGridClickEvent();

        return utfGrid;
    }

        // switch additional data layers
    $('#external-layers-menu').change(function() {
        var externalLayerSelection = document.getElementById('external-layers-menu').value;

        if (externalLayerSelection == 1) {
            var selectedLayer = "ged-hazus-level1";
            var selecedGrid = "hazus_US_building_fractions"
            createUtfLayerGroups(selectedLayer, selecedGrid);
        } else if (externalLayerSelection == 2) {
            var building_fractions = L.tileLayer(TS_URL + '/v2/ged_hazus_US_building_fractions_black/{z}/{x}/{y}.png');
            layerControl.addOverlay(building_fractions, "US Counties");
            map.addLayer(building_fractions);
        } else if (externalLayerSelection == 4) {
        }
    });

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
            if (e.data) {
                $("#dialog").empty();
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

};

app.initialize(startApp);
