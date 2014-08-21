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


/////////////////////////////////////////////////
////// Category Parallel Coordinates Chart //////
/////////////////////////////////////////////////

function Primary_PCP_Chart(primaryData, municipality, districName, outlierBreakPoint) {
    console.log("primaryData");
    console.log(primaryData);

    var everyThing = [];
    var outlierPath;
    var allPaths = {};
    var sum = {};
    var sumMean = {};
    var outlier = [];
    var meanLine = [0,0];
    var array = [];
    var i,j,temparray;
    var tmpArray = [];
    for (var i = 0; i < primaryData.length; i++) {
        for (var k in primaryData[i]){
            array.push(primaryData[i][k]);
        }
    }

    for (var i = 0; i < array.length; i++) {
        if (!isNaN(parseFloat(array[i])) && isFinite(array[i])) {
            tmpArray.push(array[i]);
        }
    }

    var maxVal = Math.max.apply( Math, tmpArray );
        
    var margin = {top: 100, right: 40, bottom: 10, left: 50},
        width = 990 - margin.left - margin.right,
        height = 590 - margin.top - margin.bottom;
    
    var x = d3.scale.ordinal().rangePoints([0, width], 1),
        y = {};
    
    var line = d3.svg.line(),
        axis = d3.svg.axis().orient("left"),
        background,
        meanPath,
        outlierArray;

    var x_scale = d3.scale.linear().domain([0, width]).range([0, width]);
    var y_scale = d3.scale.linear().range([0, height]).domain([1, 0]);

    function yAxis() {
        return d3.svg.axis()
            .scale(y_scale)
            .orient("left")
            .ticks(10);
    }

    var xAxis = d3.svg.axis()
        .scale(x);

    $("#primary-chart").empty();

    var svg = d3.select("#primary-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // Extract the list of dimensions and create a scale for each.
    x.domain(dimensions = d3.keys(primaryData[0]).filter(function(d) {
        return d != "municipality" && d != "scalePIvalues" && d != "getPIvalues" && (y[d] = d3.scale.linear()
            .domain([0, maxVal])
            .range([height, 0]));
    }));
  
    var g = svg.selectAll(".dimension")
        .data(dimensions)
        .enter().append("g");
        //.attr("class", "dimension")
        //.attr("transform", function(d) { return "translate(" + x(d) + ")"; });

    svg.append("g")
        .data(dimensions)
        .enter().append("g")
        .attr("class", "dimension")
        .attr("x2", 600)
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; });

    // Add a grid
    svg.append("g")
        .attr("class", "grid")
        .call(yAxis()
            .tickSize(-width, 0, 0)
            .tickFormat("")
        );

    // Add an axis and title.
    g.append("g")
        .attr("class", "axis")
        .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
        //.append("text")
        .style("text-anchor", "middle")
        .style("opacity", 0.5)
        .attr("y", -9)
        .on("mouseover", function(d) {
            textTopLabels.text("Attribute: "+ d);
            d3.select(this)
                .style("font-size","14px")
                .style("opacity", 1);
        }).on("mouseout", function() {
            textTopLabels.text("");
            d3.select(this)
                .style("font-size","10px")
                .style("opacity", 0.5);
        });

    svg.append("g")
        .attr("class", "x-axis")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "start")
        .attr('y', -10)
        .attr('x', 10)
        .style('font-size','12px')
        .attr("transform", function(d) {
            return "rotate(-45)";
                })
        .append('text');

    var textTopLabels = svg.append("text")
        .attr("x", 70)
        .attr("y", -35)
        .attr("dy", ".35em")
        .style("font-size","14px")
        .style("font-style", "bold")
        .text("");

    var textTopDist = svg.append("text")
        .attr("x", 70)
        .attr("y", 80)
        .attr("class", "textTop")
        .attr("dy", ".35em")
        .style("font-size","53px")
        .style("font-style", "bold")
        .text("");

    var textTopMunc = svg.append("text")
        .attr("x", 70)
        .attr("y", 140)
        .attr("class", "textTop")
        .attr("dy", ".35em")
        .style("font-size","53px")
        .style("font-style", "bold")
        .text("");

    //build skeleton array
    for (var t in primaryData[0]) {
        sum[t] = 0;
    }

    // Returns the path for a given data point.
    function path(d) {
        return line(dimensions.map(function(p) {  everyThing.push([x(p), y[p](d[p])]); return [x(p), y[p](d[p])]; }));
    }

    //sum all the paths
    for (var g = 0; g < primaryData.length; g++) {
        for (var n in primaryData[g]) {
            sum[n] += primaryData[g][n];
        }
    }

    // get the mean
    for (var f in sum) {
        var thisSum = sum[f];
        sumMean[f] = (thisSum / primaryData.length);
    }

    // find outlier
    for (var s = 0; s < primaryData.length; s++) {
        for (var r in primaryData[s]) {
            var outlierLimit = sumMean[r] + outlierBreakPoint;
            if (primaryData[s][r] > outlierLimit) {
                outlier.push(primaryData[s]);
            }
        }
        
        for (var r in primaryData[s]) {
            var outlierLimit = sumMean[r] - outlierBreakPoint;
            if (primaryData[s][r] < outlierLimit) {
                outlier.push(primaryData[s]);
            }
        }
        
    }

    var sumMeanArray = [];
    sumMeanArray.push(sumMean);

    // Add blue meanPath lines for focus
    background = svg.append("g")
        .attr("class", "PI-background")
        .selectAll("path")
        .data(primaryData)
        .enter().append("path")
        .attr("d", path)
        .attr("id", function(d) { return d.municipality; })
        .on("mouseover", function() {
            d3.select(this)
                .style('stroke-width', 4)
                .style("opacity", 1);
                textTopDist.html("District: " + districName);
                textTopMunc.html("Municipality: " + this.id);
        }).on("mouseout", function() {
            d3.select(this)
                .style('stroke-width', 2)
                .style("opacity", 0.3);
                textTopDist.text("");
                textTopMunc.text("");
    });

    meanPath = svg.append("g")
        .attr("class", "PI-meanPath")
        .selectAll("path")
        .data(sumMeanArray)
        .enter().append("path")
        .attr("d", path)
        .attr("id", function(d) { return d.municipality; });

    outlierPath = svg.append("g")
        .attr("class", "PI-outlierPath")
        .selectAll("path")
        .data(outlier)
        .enter().append("path")
        .attr("d", path)
        .attr("id", function(d) { return d.municipality; })
        .on("mouseover", function() {
            d3.select(this)
                .style('stroke-width', 4)
                .style("opacity", 1);
                textTopDist.html("District: " + districName);
                textTopMunc.html("Municipality: " + this.id);
        }).on("mouseout", function() {
            d3.select(this)
                .style('stroke-width', 3)
                .style("opacity", 0.2);
                textTopDist.text("");
                textTopMunc.text("");
    });

    // Handles a brush event, toggling the display of meanPath lines.
    function brush() {
        var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
            extents = actives.map(function(p) { return y[p].brush.extent(); });
        meanPath.style("display", function(d) {
            return actives.every(function(p, i) {
                return extents[i][0] <= d[p] && d[p] <= extents[i][1];
            }) ? null : "none";
        });
    }
}

