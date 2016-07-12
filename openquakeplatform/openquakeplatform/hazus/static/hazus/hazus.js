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
var baseMapUrl = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var app = new OQLeaflet.OQLeafletApp(baseMapUrl);
var TILESTREAM_URL = TS_URL + '/v2/';

$( document ).ready(function() {
    $('#absoluteSpinner').hide();
});

var startApp = function() {

    // Show hide layer controller
    function checkLayerController() {
        if ($.isEmptyObject(layerControl._layers) ) {
            setTimeout(function() {
                $('.leaflet-control-layers-toggle').css({'display': 'none'});
            }, 100);
        } else {
            $('.leaflet-control-layers-toggle').css({'display': 'block'});
        }
    }

    $(function() {
        $( "#dialog" ).dialog({height: 520, width: 430, position: {at: "right bottom"}});
        $('#dialog').dialog('close');
    });

    map = new L.Map('map', {
        minZoom: 2,
        attributionControl: false,
        maxBounds: new L.LatLngBounds(new L.LatLng(-90, -180), new L.LatLng(90, 180)),
    });
    map.setView(new L.LatLng(10, -10), 2).addLayer(baseMapUrl);

    layerControl = L.control.layers(app.baseLayers);
    checkLayerController();

    map.addControl(layerControl.setPosition("topleft"));
    map.panTo(new L.LatLng(38.2, -101.6));
    map.scrollWheelZoom.enable();

    $('#external-layers-menu').css({ 'margin-bottom' : 0 });

    function createUtfLayerGroups(selectedLayer, selectedGrid, layerType) {
        // Sometimes a UtfGrid is thematicly represented by a seperate mbtile
        if (selectedGrid == "n/a") {
            selectedGrid = selectedLayer;
        }
        var tileLayer = L.tileLayer(TILESTREAM_URL +
            selectedLayer +
            '/{z}/{x}/{y}.png',{wax: TILESTREAM_URL +
            selectedLayer +
            '.json'});

        utfGrid = new L.UtfGrid(TILESTREAM_URL +
            selectedGrid +
            '/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
        var utfGridGroup = L.layerGroup([
            utfGrid,
            tileLayer
        ]);

        layerControl.addOverlay(utfGridGroup, selectedLayer);
        map.addLayer(utfGridGroup);
        checkLayerController();
        utfGridClickEvent(layerType);

        return utfGrid;
    }

    // switch additional data layers
    $('#external-layers-menu').change(function() {
        var externalLayerSelection = $('#external-layers-menu').val();

        if (externalLayerSelection == 1) {
            var selectedLayer = "ged-hazus-level1";
            var selectedGrid = "hazus_US_building_fractions";
            var layerType = "hazus";
            createUtfLayerGroups(selectedLayer, selectedGrid, layerType);
        } else if (externalLayerSelection == 2) {
            var building_fractions = L.tileLayer(TS_URL + '/v2/ged_hazus_US_building_fractions_black/{z}/{x}/{y}.png');
            layerControl.addOverlay(building_fractions, "US Counties");
            map.addLayer(building_fractions);
            checkLayerController();
        } else if (externalLayerSelection == 3) {
            var selectedLayer = "dwelling_fractions_non_res";
            var selectedGrid = "n/a";
            var layerType = "fractions";

            // prevent duplicate hazard maps to be loaded
            for (var k in layerControl._layers) {
                var nameTemp = layerControl._layers[k].name;
                if (nameTemp == selectedLayer) {
                    delete layerControl._layers[k];
                }
            }

            createUtfLayerGroups(selectedLayer, selectedGrid, layerType);
        }
    });

    //////////////////////////////////////////////////
    /////////////// Hazus Pie Chart //////////////////
    //////////////////////////////////////////////////

    function HazusChart(keys, values, name) {
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
            .attr("y", -10);

        var textBottom = vis.append("text")
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

    ////////////////////////////////////////
    ///// Dwelling Fractions Pie Chart /////
    ////////////////////////////////////////

    function modifyDialogDiv() {
        $('#dialog').append('<div id="rur_res">'+
            '</div><div id="rur_non_res">'+
            '</div><div id="urban_res">'+
            '</div><div id="urban_non_res"></div>'
        );
        $('#rur_res').css({'float': 'left'});
        $('#rur_non_res').css({'float': 'left'});
        $('#urban_res').css({'float': 'left'});
        $('#urban_non_res').css({'float': 'left'});
    }

    function dwellingFractionsChart(data, div, name) {
        var textLabelXY = [-100, 120];
        var textValueXY = [-25, 0];

        var width = 200,
            height = 225,
            radius = 90,
            inner = 35,
            color = d3.scale.category20c();

        var total = d3.sum(data, function(d) {
            return d3.sum(d3.values(d));
        });

        var vis = d3.select("#" +div)
            .append("svg:svg")
            .data([data])
            .attr("width", width)
            .attr("height", height)
            .append("svg:g")
            .attr("transform", "translate(" + radius * 1.1 + "," + radius * 1.1 + ")");

        var textLabel = vis.append("text")
            .attr("dy", ".35em")
            .style("text-anchor", "left")
            .attr("class", "textLabel")
            .text( "TOTAL" )
            .style('font-size','10px')
            .attr("y", textLabelXY[1])
            .attr("x", textLabelXY[0]);

        var textValue = vis.append("text")
            .attr("dy", ".35em")
            .style("text-anchor", "left")
            .attr("class", "textValue")
            .text(total.toFixed(2))
            .attr("x", -25)
            .attr("y", 0);

        vis.append("text")
            .attr("text-anchor", "left")
            .style("font-size", "16px")
            .text(name)
            .attr("y", 110)
            .attr("x", -100);

        var arc = d3.svg.arc()
            .innerRadius(inner)
            .outerRadius(radius);

        var arcOver = d3.svg.arc()
            .innerRadius(inner + 5)
            .outerRadius(radius + 5);

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
                        textLabel.text(d3.select(this).datum().data.label)
                            .style('font-size','10px')
                            .attr("y", textLabelXY[1])
                            .attr("x", textLabelXY[0]);
                        textValue.text(d3.select(this).datum().data.value.toFixed(3))
                            .attr("y", 0)
                            .attr("x", -25);
                    })
                    .on("mouseout", function(d) {
                        d3.select(this).select("path").transition()
                            .duration(100)
                            .attr("d", arc);
                        textLabel.text( "TOTAL" )
                            .style('font-size','10px')
                            .attr("y", textLabelXY[1])
                            .attr("x", textLabelXY[0]);
                        textValue.text(total.toFixed(2));
                    });

        arcs.append("svg:path")
            .attr("fill", function(d, i) { return color(i); } )
            .attr("d", arc);
    }

    function prepData(keys, values) {
        tempArray = [];

        for (var i = 0; i < values.length; i++) {
           tempArray[i] = {"label":keys[i], "value":parseFloat(values[i])};
        }
        return tempArray;
    }

    var utfGridClickEvent = function(layerType) {
        utfGrid.on('click', function (e) {
            if (e.data) {
                if (layerType == "hazus") {
                    $("#dialog").empty();
                    $("#dialog").dialog('open');
                    $('#dialog').dialog('option', 'title', 'Hazus Bulding Fractions Level 1');
                    var b = e.data.bf_json;
                    var bfClean = b.replace(/[\{\}\/"]/g, "");
                    var data = eval('({' + bfClean + '})');
                    var keys = [];
                    var values = [];
                    var div;
                    var name = e.data.name;
                    for (var prop in data) {
                        keys.push(prop);
                        values.push(data[prop]);
                    }
                    HazusChart(keys, values, name);
                }
                if (layerType == "fractions") {
                    $("#dialog").empty();
                    $("#dialog").dialog('open');
                    $('#dialog').dialog('option', 'title', 'PAGER Dwelling Fractions Level 0');
                    modifyDialogDiv();

                    // create the rural res data for d3
                    var keysArray = e.data.rur_res_l.split(',') ;
                    var valuesArray = e.data.rur_res_v.split(',');
                    var ruralResArray = prepData(keysArray, valuesArray);
                    div = 'rur_res';
                    var name = "Rural Residential";
                    dwellingFractionsChart(ruralResArray, div, name);

                    // create the rural non res data for d3
                    keysArray = e.data.rurn_res_l.split(',') ;
                    valuesArray = e.data.rurn_res_v.split(',');
                    var ruralNonResArray =  prepData(keysArray, valuesArray);
                    div = 'rur_non_res';
                    var name = "Rural Non Residential";
                    dwellingFractionsChart(ruralNonResArray, div, name);

                    // create the urban res data for d3
                    keysArray = e.data.urb_res_l.split(',') ;
                    valuesArray = e.data.urb_res_v.split(',');
                    var urbanResArray =  prepData(keysArray, valuesArray);
                    div = 'urban_res';
                    var name = "Urban Residential";
                    dwellingFractionsChart(urbanResArray, div, name);

                    // create the urban non res data for d3
                    keysArray = e.data.urbn_res_l.split(',') ;
                    valuesArray = e.data.urbn_res_v.split(',');
                    var urbanNonResArray =  prepData(keysArray, valuesArray);
                    div = 'urban_non_res';
                    var name = "Urban Non Residential";
                    dwellingFractionsChart(urbanNonResArray, div, name);
                }
            }
        });

    };

};

app.initialize(startApp);
