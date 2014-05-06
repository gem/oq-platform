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

function Category_PCP_Chart(catIndicator, municipality) {
    /*
    delete catIndicator.newCatObj;
    for (var k in catIndicator) {
        delete catIndicator[k].getCIvalues;
        delete catIndicator[k].scaleCIvalues;
    };
*/

    // The data passed into d3 need to be an array of objects
    // Place the category indicator objects into an array
    var data = [];
    for (var k in catIndicator) {
        data.push(catIndicator[k]);
    }

    console.log(data);

    var bar = [];
    for (var k in catIndicator[0]) {
        bar.push(k);
    }
    
    var index = bar.indexOf("municipality");
    if (index > -1) {
        bar.splice(index, 1);
    }
    console.log(bar);

    var margin = {top: 60, right: 10, bottom: 10, left: 10},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    var x = d3.scale.ordinal().rangePoints([0, width], 1),
        y = {};
    
    var line = d3.svg.line(),
        axis = d3.svg.axis().orient("left"),
        background,
        foreground;
    
    var svg = d3.select("#iri-pcp-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Extract the list of dimensions and create a scale for each.
    x.domain(dimensions = d3.keys(data[0]).filter(function(d) {
        return d != "municipality" && d != "getCIvalues" &&  d != "scaleCIvalues" && (y[d] = d3.scale.linear()
            .domain(d3.extent(data, function(p) { return +p[d]; }))
            .range([height, 0]));
    }));
    

    // Add blue foreground lines for focus.
    foreground = svg.append("g")
        .attr("class", "foreground")
        .selectAll("path")
        .data(data)
        .enter().append("path")
        .attr("d", path)
        .attr("id", function(d) { return d.municipality; })
        .on("mouseover", function() {
            d3.select(this)
                .style('stroke-width', 6)
                .style("stroke", "steelblue");
            textTop.text("Municipality: " + this.id);
        }).on("mouseout", function() {
            d3.select(this)
                .style('stroke-width', 1)
                .style("stroke", "gray");
            textTop.text("");
        });

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

    textTop = svg.append("text")
        .attr("x", 70)
        .attr("y", -35)
        .attr("dy", ".35em")
        .style("font-size","14px")
        .style("font-style", "bold")
        .text("");
    
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
}

