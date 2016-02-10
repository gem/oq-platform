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


//*******TODO refrech the data used in the chart when the Project Definition has been changed******

function Theme_PCP_Chart(themeData) {

    // Disable the theme tab if there is only on theme and the region attributes in themeData.
    function countProperties(themeData) {
        var themeCount = 0;

        for(var prop in themeData) {
            if(themeData.hasOwnProperty(prop))
                ++themeCount;
        }
        return themeCount;
    }

    var themeCount = countProperties(themeData[0]);

    if (themeCount <= 2) {
        // Disable the theme tab.
        // FIXME: disable the whole widget instead
        $("#iri-chart-widget").tabs("disable", 2);
        // Stop the function from continuing.
        return;
    }

    var data = themeData;
    var winH = ($(window).height() / 1.5);
    var winW = ($(window).width());
    var margin = {top: 100, right: 20, bottom: 10, left: 20},
        width = (winW - 200) - margin.left - margin.right,
        height = winH - margin.top - margin.bottom;
    var eachValueInThemeData = [];
    var eachElementInThemeData = [];
    var sum = {};
    var sumMean = {};
    var sumMeanArray = [];

    for (var i = 0; i < themeData.length; i++) {
        for (var k in themeData[i]){
            if (k != 'region') {
                eachElementInThemeData.push(themeData[i][k]);
            }
        }
    }

    for (var j = 0; j < eachElementInThemeData.length; j++) {
        if (!isNaN(parseFloat(eachElementInThemeData[j])) && isFinite(eachElementInThemeData[j])) {
            eachValueInThemeData.push(eachElementInThemeData[j]);
        }
    }

    var maxVal = Math.max.apply( Math, eachValueInThemeData );
    var minVal = Math.min.apply( Math, eachValueInThemeData );

    var x = d3.scale.ordinal().rangePoints([0, width], 1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var line = d3.svg.line(),
        axis = d3.svg.axis().orient('left'),
        foreground;

    $('#cat-chart').empty();

    var svg = d3.select('#cat-chart').append('svg')
        .attr("viewBox", "100 20 " +(winW -400)+" " +winH)
        .attr("id", "CI-svg-element")
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Extract the list of dimensions and create a scale for each.
    x.domain(dimensions = d3.keys(themeData[0]).filter(function(d) {
        return d != 'region' && d != 'scaleCIvalues' && d != 'getCIvalues' && (y[d] = d3.scale.linear()
            .domain([minVal, maxVal])
            .range([height, 0]));
    }));

    // Add blue foreground lines for focus.
    foreground = svg.append('g')
        .attr('class', 'foreground')
        .selectAll('path')
        .data(themeData)
        .enter().append('path')
        .attr('d', path)
        .attr('id', function(d) { return d.region; })
            .on('mouseover', function() {
                d3.select(this)
                .style('stroke-width', 6)
                .style('stroke', 'steelblue');
                textTop.text('Region: ' + this.id);
            }).on('mouseout', function() {
                d3.select(this)
                .style('stroke-width', 3)
                .style('stroke', 'steelblue');
                textTop.text('');
            });

    // Add a group element for each dimension.
    var g = svg.selectAll('.dimension')
        .data(dimensions)
        .enter().append('g')
        .attr('class', 'dimension')
        .attr('transform', function(d) { return 'translate(' + x(d) + ')'; });

    // Add an axis and title.
    g.append('g')
        .attr('class', 'axis')
        .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
        .append('text')
        .style('text-anchor', 'middle')
        .attr('y', -9)
        .text(function(d) { return d; });

    // Add and store a brush for each axis.
    g.append('g')
        .attr('class', 'brush')
        .each(function(d) { d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on('brush', brush)); })
        .selectAll('rect')
        .attr('x', -8)
        .attr('width', 16);

    var textTop = svg.append('text')
        .attr('x', 170)
        .attr('y', -35)
        .attr('dy', '.35em')
        .attr("class", "text90")
        .style('font-size','30px')
        .style('font-style', 'bold')
        .text('');

    // Returns the path for a given data point.
    function path(d) {
        return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
    }

    //////////////////////
    //// Median line ////
    //////////////////////

     // Build skeleton array
     for (var t in themeData[0]) {
         sum[t] = 0;
     }

     // Sum all the paths
     // Access the objects contained in the theme data array
     for (var region_idx = 0; region_idx < themeData.length; region_idx++) {
        // iterate over the each
         for (var themeName in themeData[region_idx]) {
            // This will sum all the values inside each theme object
             sum[themeName] += themeData[region_idx][themeName];
         }
     }

     // Get the mean
     for (var f in sum) {
         var thisSum = sum[f];
         sumMean[f] = (thisSum / themeData.length);
     }

     sumMeanArray.push(sumMean);

     // Plot the median line
     meanPath = svg.append("g")
         .attr("class", "PI-meanPath")
         .selectAll("path")
         .data(sumMeanArray)
         .enter().append("path")
         .attr("d", path)
         .attr('id', function(d) { return d.region; })
             .on('mouseover', function() {
                 textTop.text('Median');
             }).on('mouseout', function() {
                 textTop.text('');
             });

    // Handles a brush event, toggling the display of foreground lines.
    function brush() {
        var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
            extents = actives.map(function(p) { return y[p].brush.extent(); });
        foreground.style('display', function(d) {
            return actives.every(function(p, i) {
                return extents[i][0] <= d[p] && d[p] <= extents[i][1];
            }) ? null : 'none';
        });
    }

} // End chart

