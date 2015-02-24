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

function Category_PCP_Chart(catData, municipality, districName) {

    var data = catData;
    var winH = ($(window).height() / 1.5);
    var winW = ($(window).width());
    var margin = {top: 100, right: 20, bottom: 10, left: 20},
        width = (winW - 200) - margin.left - margin.right,
        height = winH - margin.top - margin.bottom;
    var tmpArray = [];
    var array = [];
    for (var i = 0; i < catData.length; i++) {
        for (var k in catData[i]){
            array.push(catData[i][k]);
        }
    }

    for (var i = 0; i < array.length; i++) {
        if (!isNaN(parseFloat(array[i])) && isFinite(array[i])) {
            tmpArray.push(array[i]);
        }
    }

    var maxVal = Math.max.apply( Math, tmpArray );

    var x = d3.scale.ordinal().rangePoints([0, width], 1);

    var x2 = d3.scale.linear()
        .range([0, width], 1);

     var y = d3.scale.linear()
        .range([height, 0]);

    var line = d3.svg.line(),
        axis = d3.svg.axis().orient('left'),
        foreground;

    var stack = d3.layout.stack()
        .offset("zero")
        .values(function(d) { return d.values; })
        .x(function(d) { return d.economy; })
        .y(function(d) { return d.education; });

    var nest = d3.nest()
        .key(function(d) { return d.key; });

    var area = d3.svg.area()
        .x(function(d) {  return x2(d.economy); })
        .y0(function(d) {  return y(d.y0); })
        .y1(function(d) {  return y(d.y); });

    $('#cat-chart').empty();

    var svg = d3.select('#cat-chart3').append('svg')
        .attr("viewBox", "-30 20 " +(winW -130)+" " +winH)
        .attr("id", "CI-svg-element")
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Extract the list of dimensions and create a scale for each.
    x.domain(dimensions = d3.keys(catData[0]).filter(function(d) {
        return d != 'municipality' && d != 'scaleCIvalues' && d != 'getCIvalues' && (y[d] = d3.scale.linear()
            .domain([0, maxVal])
            .range([height, 0]));
    }));
    var z = d3.scale.category20c();

    // Add blue foreground lines for focus.
    foreground = svg.append('g')
        .attr('class', 'foreground')
        .selectAll('path')
        .data(catData)
        .enter().append('path')
        .attr('d', path)
        .attr('id', function(d) { return d.municipality; })
            .on('mouseover', function() {
                d3.select(this)
                .style('stroke-width', 6)
                .style('stroke', 'steelblue');
                textTop.text('District: ' + districName + ', Municipality: ' + this.id);
            }).on('mouseout', function() {
                d3.select(this)
                .style('stroke-width', 3)
                .style('stroke', 'steelblue');
                textTop.text('');
            });
    var layers = stack(nest.entries(data));

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

