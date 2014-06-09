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

function Category_PCP_Chart(catData, municipality, districName, concat) {
    catData.pop();
    concat.pop();
    console.log(catData);

    var demoDataArray = [];

    var demoObj1 = {
        economy : (2,3),
        education : 3,
        governance : 2.5
    };

    var demoObj2 = {
        economy : 3,
        education : 1.5,
        governance : 2
    };

    demoDataArray.push(demoObj1);
    demoDataArray.push(demoObj2);

    console.log(demoDataArray);

    // first time the is draw this will happen
    if (concat.length == 0) {
        concat = demoDataArray;
    }

    var array = [];
    var tmpArray = [];
    for (var i = 0; i < demoDataArray.length; i++) {
        for (var k in demoDataArray[i]){ 
            array.push(demoDataArray[i][k])
        }
    }

    for (var i = 0; i < array.length; i++) {
        if (!isNaN(parseFloat(array[i])) && isFinite(array[i])) {
            tmpArray.push(array[i]);
        }
    }

    var maxVal = Math.max.apply( Math, tmpArray );
        
    var margin = {top: 60, right: 10, bottom: 10, left: 10},
        width = 990 - margin.left - margin.right,
        height = 590 - margin.top - margin.bottom;
    
    var x = d3.scale.ordinal().rangePoints([0, width], 1),
        y = {};
    
    var line = d3.svg.line(),
        axis = d3.svg.axis().orient('left'),
        background,
        foreground;
    
    $('#tab-categroy-chart').empty();

    var svg = d3.select('#tab-categroy-chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    

    ///////////////////
    // Overlay Chart //
    ///////////////////

/*
    // Extract the list of dimensions and create a scale for each.
    x.domain(dimensions = d3.keys(concat[0]).filter(function(d) {
        return d != "municipality" && d != "scaleCIvalues" && d != "getCIvalues" && (y[d] = d3.scale.linear()
            .domain([0, maxVal])
            .range([height, 0]));
    }));

    // Add grey background lines for context.
    background = svg.append("g")
        .attr("class", "background")
        .selectAll("path")
        .data(concat)
        .enter().append("path")
        .attr("d", path);

    // Add a group element for each dimension.
    var g = svg.selectAll(".dimension")
        .data(dimensions)
        .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; });

    // Add an axis and title.
    g.append("g")
        .attr("class", "axis")
        .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
        .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .text(function(d) { return d; });

    // Add and store a brush for each axis.
    g.append("g")
        .attr("class", "brush")
        .each(function(d) { d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brush", brush)); })
        .selectAll("rect")
        .attr("x", -8)
        .attr("width", 16);

    var textTop = svg.append("text")
        .attr("x", 70)
        .attr("y", -35)
        .attr("dy", ".35em")
        .style("font-size","14px")
        .style("font-style", "bold")
        .text('');
    
    // Returns the path for a given data point.
    function path(d) {
        return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
    }
    
    // Handles a brush event, toggling the display of foreground lines.
    function brush() {
        var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
            extents = actives.map(function(p) { return y[p].brush.extent(); });
        foreground.style("display", function(d) {
            return actives.every(function(p, i) {
                return extents[i][0] <= d[p] && d[p] <= extents[i][1];
            }) ? null : "none";
        });
    }
*/
    ////////////////
    // Base Chart //
    ////////////////

    // Extract the list of dimensions and create a scale for each.
    x.domain(dimensions = d3.keys(demoDataArray[0]).filter(function(d) {
        return d != 'municipality' && d != 'scaleCIvalues' && d != 'getCIvalues' && (y[d] = d3.scale.linear()
            .domain([0, maxVal])
            .range([height, 0]));
    }));

    // Add blue foreground lines for focus.
    foreground = svg.append('g')
        .attr('class', 'foreground')
        .selectAll('path')
        .data(demoDataArray)
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
        .attr('x', 70)
        .attr('y', -35)
        .attr('dy', '.35em')
        .style('font-size','14px')
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
} // end chart

