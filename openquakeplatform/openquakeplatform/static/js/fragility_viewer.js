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

var utfGrid = new Object;
var layerControl;

// Some hard codded data for demo and required vars and functions for fragility curve
var min = 0.05;
var max = 2.5;
var inc = ((max - min) / 100);
var chartData = [];
var iml = [];
var slightY = [];
var moderateY = [];
var extensiveY = [];
var collapseY = [];
var imtTitle = "SA(0.24)";
var plotTitle = "Fragility Model Example";
var slightMean = 0.269319817;
var slightStddev = 0.157809655;
var moderate = [];
var moderateMean = 0.429717196;
var moderateStddev = 0.265456576;
var extensive = [];
var extensiveMean = 0.72847252;
var extensiveStddev = 0.281239271;
var collapse = [];
var collapseMean = 1.087186036;
var collapseStddev = 0.322411831;

var baseMapUrl = (
    "http://{s}.tiles.mapbox.com/v3/unhcr.map-8bkai3wa/{z}/{x}/{y}.png"
);

var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

var startApp = function() {

    $(function() {
        $( "#chartDialog" ).dialog({
            autoOpen: false,
            height: 520,
            width: 500,
            closeOnEscape: true,
            position: {at: "right bottom"}
        });
    });

    app.createMap();

    layers = {};

    layerControl = L.control.layers(app.baseLayers);
    map.panTo(new L.LatLng(10, 10));
    map.setZoom(2);
    map.scrollWheelZoom.enable();
    map.options.maxBounds = null;
    map.addControl(layerControl.setPosition("topleft"));

    $("#fragility-curve").button().click(function() {
        $("#fragilityCurveDialog").dialog("open");
    });
    
    /////////////////////////////////
    /////// Fragility Stuff /////////
    /////////////////////////////////

    // create the x axis values
    for(var i=min; i<max;i=i+inc) {
        iml.push(Math.round(i*1000) / 1000);
    }
    iml.push(max);
    
    function normalCumulativeProbability(z) {
        var b1 = 0.31938153;
        var b2 = -0.356563782;
        var b3 = 1.781477937;
        var b4 = -1.821255978;
        var b5 = 1.330274429;
        var p = 0.2316419;
        var c2 = 0.3989423;
        if (z > 6.0){
            return 1.0};  // this guards against overflow
        if (z < -6.0){
            return 0.0};
        var a = Math.abs(z);
        var t = 1.0 / (1.0 + a * p);
        var b = c2 * Math.exp((-z)*(z / 2.0));
        var n = ((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t;
        var n = 1.0 - b * n;
        if (z < 0.0){
            n = 1.0 - n};
        return n;
    };
    
    function makeFragilityFunctionContinuous(mean, stddev) {
        var variance = stddev * stddev;
        var sigma = Math.sqrt(Math.log((variance / (mean * mean)) + 1.0));
    
        mu = (mean * mean) / Math.sqrt(variance + mean * mean);
    
        return function(iml) {
           return normalCumulativeProbability((Math.log(iml / mu)) / sigma);
        };
    };

    // To make all this work, this tempObj needs to be created somehow...
    var tempObj = {};
    tempObj.slightFragility = [0.269319817, 0.157809655];
    tempObj.moderateFragility = [0.429717196, 0.265456576];
    tempObj.extensiveFragility = [0.72847252, 0.281239271];
    tempObj.collapseFragility = [1.087186036, 0.322411831];

    for (var k in tempObj) {
        var tmp = makeFragilityFunctionContinuous(tempObj[k][0], tempObj[k][1]);
        chartData[k] = [];

        for (var i = 0; i < iml.length; i++) {
            var val = tmp(iml[i]);
            chartData[k].push([iml[i], val]);
        };
        
    }

    $("#fragility-dialog").button().click(function() {
        $("#chartDialog").dialog("open");
        buildMixedD3Chart(chartData);
    });


    /////////////////////////////////////////////
    ///////////// Fragility Chart ///////////////
    /////////////////////////////////////////////

    function buildMixedD3Chart(chartData) {

        var min_value = 1000.0, min_value_k = "", max_value = -1, max_value_k = "";

        console.log(chartData);
        //var lon = lng;
        // grid line functions
        function make_x_axis() {        
            return d3.svg.axis()
                .scale(x_scale)
                .orient("bottom")
                .ticks(5)
        }

        function make_y_axis() {        
            return d3.svg.axis()
                .scale(y_scale)
                .orient("left")
                .ticks(5)
        }

        function capitalise(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }

        function makeCircles(data, k, color, curveTitle) {

            // Points along the line
            svg.selectAll("circle.line") 
                .data(data) 
                .enter().append("circle") 
                .attr("class", "line"+k) 
                .attr("cx", function(d) { return x_scale(d[0]); }) 
                .attr("cy", function(d) { return y_scale(d[1]); }) 
                .attr("r", 2.5)
                .style("fill", color)
                .on("mouseover", function() {
                    d3.select(this)
                        .attr('r', 6)
                        .text(circleX + ", " + circleY)
                        .style("fill", "gray");
                    var circleX = d3.select(this.__data__[0]);
                    circleX = circleX.toString();
                    circleX = circleX.split(","[0]);
    
                    var circleY = d3.select(this.__data__[1]);
                    circleY = circleY.toString();
                    circleY = circleY.split(","[0]);
    
                    textTop.text(curveTitle+" point value (x/y): " + Math.round(circleX * 1000) / 1000 + ", " + Math.round(circleY * 1000) / 1000);
    
                }).on("mouseout", function() {
                    d3.select(this)
                        .attr('r', 2.5)
                        .style("fill", color);
                });
        }

        var margin = {top: 55, right: 100, bottom: 80, left: 60},
        width = 480 - margin.left - margin.right,
        height = 380 - margin.top - margin.bottom;

        var x_scale = d3.scale.linear().range([0, width]).domain([d3.min(iml), d3.max(iml)]);
        var y_scale = d3.scale.linear().range([0, height]).domain([1, 0]);

        var xAxis = d3.svg.axis()
            .scale(x_scale)
            //.ticks(4)
            .tickFormat(function (d) { return d; })
            .orient("bottom");
        var yAxis = d3.svg.axis()
            .scale(y_scale)

            .orient("left");

        var line = d3.svg.line()
            .x(function(d) {
                return x_scale(d[0]); 
            })
            .y(function(d) {
                return y_scale(d[1]); 
            });

        var svg = d3.select("#chartDialog").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // grid lines
        svg.append("g")         
            .attr("class", "grid")
            .attr("transform", "translate(0," + height + ")")
            .call(make_x_axis()
                .tickSize(-height, 0, 0)
                .tickFormat("")
            );
    
        svg.append("g")         
            .attr("class", "grid")
            .call(make_y_axis()
                .tickSize(-width, 0, 0)
                .tickFormat("")
            );

        var legend = d3.select("#chartDialog").append("svg")
            .attr("height", 25);

        var count = 0;
        for (var k in chartData) {
            svg.append("path")
                .data([chartData[k]])
                .attr("class", "line"+k)
                .attr("d", line);

            // Update the css for each line
            if (chartData.hasOwnProperty(k)) {
                ++count;
            }

            colors = [
                "darkred", 
                "blue",
                "green", 
                "orange", 
                "red", 
                "sandybrown", 
                "yellowgreen", 
                "darksalmon", 
                "lightseagreen",
                "skyblue"
            ];

            var gray = "A0A0A0";
            $(".line"+k).css({'fill':'none','opacity':'0.7', 'stroke':gray});

            var color = colors[count % colors.length];
            var data = chartData[k];
            var curveTitle = k;
            curveTitle = capitalise(curveTitle);

            makeCircles(data, k, color, curveTitle);

            // Curve lables
            svg.append("text")
                .attr("x", 340)
                .attr("y", 20*(count))
                .attr("dy", ".35em")
                .text(curveTitle);

            svg.append("svg:circle")
                //.attr("cx", 50)
                .attr("cy", 20*(count))
                .attr("cx", 330)
                .attr("r", 3)
                .style("fill", color)

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .append("text")
                .attr("x", 160)
                .attr("y", 30)
                .attr("dy", ".71em")
                .attr("text-anchor", "middle")
                .style("font-size","12px")
                .text(imtTitle);
                
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -60)
                .attr("x", -20)
                .attr("dy", ".71em")
                .style("font-size","12px")
                .style("text-anchor", "end")
                .text("Probabability of exceedance");

            textTopLable = svg.append("text")
                .attr("x", 0)
                .attr("y", -35)
                .attr("dy", ".35em")
                //.style("font-weight", "bold")
                .attr("font-size","14px")
                .text(plotTitle);
                
            textTop = svg.append("text")
                .attr("x", 0)
                .attr("y", -15)
                .attr("dy", ".35em")
                .text("");
        }


        $('#chartDialog').append('<div id="downloadCurve"><font color="blue">Download Curve</font></div>');
        $('#downloadCurve').on("hover", function(){
            $(this).css("cursor", "pointer");
        });

        var h = $("#chartDialog").height();
        h = h + 20;
        $("#chartDialog").css({"height": h+"px"});

        // Prep data for download to CSV
        $('#downloadCurve').click(function(event) {
            var csvData = [];
            csvData = csvData.concat("prob");
            csvData = csvData.concat("iml");
            csvData = csvData.concat("investigationTime");
            csvData = csvData.concat("lon");
            csvData = csvData.concat("lat");
            csvData = JSON.stringify(csvData);
            var lineBreak = "lineBreak";
            csvData = csvData.concat(lineBreak);
            var quotationMark = '"';

            csvData = csvData.concat('"');
            csvData = csvData.concat(probArray);
            csvData = csvData.concat('","');
            csvData = csvData.concat(imlArray);
            csvData = csvData.concat('",');
            csvData = csvData.concat(invest_time);
            csvData = csvData.concat(',');
            csvData = csvData.concat(lon);
            csvData = csvData.concat(',');
            csvData = csvData.concat(lat);
            csvData = csvData
                .replace(/lineBreak/, '\r\n')
                .replace(/\[/g, '')
                .replace(/\]/g, '')
                .replace(/""/g, '","');
            console.log(csvData);
            downloadJSON2CSV(csvData);
        });
    } // End Chart

}; // End startApp

app.initialize(startApp);
