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

////////////////////////////////////////////
////// IRI Parallel Coordinates Chart //////
////////////////////////////////////////////

function IRI_PCP_Chart(iriPcpData) {

    var plotElements = ["iri", "svi", "aal"];
    var keys = [];
    for (var k in iriPcpData) {
        keys.push(k);
    }
    var m = [80, 10, 10, 120],
        w = 990 - m[1] - m[3],
        h = 590 - m[0] - m[2];
    
    var x = d3.scale.ordinal().domain(municipality).rangePoints([0, w]),
        y = {};
    
    var line = d3.svg.line(),
        axis = d3.svg.axis().orient("left"),
        foreground;

    var x_scale = d3.scale.linear().domain([0, w]).range([0, w]);
    var y_scale = d3.scale.linear().range([0, h]).domain([1, 0]);

    function yAxis() {
        return d3.svg.axis()
            .scale(y_scale)
            .orient("left")
            .ticks(10);
    }

    var xAxis = d3.svg.axis()
        .scale(x);

    $("#iri-chart").empty();

    var svg = d3.select("#iri-chart").append("svg")
        .attr("viewBox", "-30 110 1100 590")
        .attr("id", "IRI-svg-element")
        .attr("width", w + m[1] + m[3])
        .attr("height", h + m[0] + m[2])
        .append("svg:g")
        .attr("transform", "translate(" + m[3] + ",5)");
    
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var aspect = windowWidth / windowHeight,
        chart = $("#IRI-svg-element");

    function resize() {
        var targetWidth = chart.parent().width();
        chart.attr("width", targetWidth);
        chart.attr("height", targetWidth / aspect);
    }

    resize();

    $(window).on("resize", function() {
        resize();
    });
    
    // Create a scale and brush for each trait.
    municipality.forEach(function(d) {
        // Coerce values to numbers.
        iriPcpData.forEach(function(p) { p[d] = +p[d]; });
        y[d] = d3.scale.linear()
            .domain([0,1])
            .range([h, 0]);
  
        y[d].brush = d3.svg.brush()
            .y(y[d])
            .on("brush", brush);
    });

    // Add a legend.
    var legend = svg.selectAll("g.legend")
        .data(plotElements)
        .enter().append("svg:g")
        .style("font-size","14px")
        .style("font-style", "bold")
        .attr("class", "legend");
  
    legend.append("svg:line")
        .attr("class", String)
        .attr("x2", -28)
        .attr("y2", 0)
        .attr("transform", function(d, i) { return "translate(-140," + (i * 20 + 75) + ")"; });

    legend.append("svg:text")
        .attr("x", -125)
        .attr("y", -510)
        .attr("dy", ".31em")
        .text(function(d) { return d; })
        .attr("transform", function(d, i) { return "translate(0," + (i * 20 + 584) + ")"; });
  
    // Add foreground lines.
    foreground = svg.append("svg:g")
        .attr("class", "foreground")
        .selectAll("path")
        .data(iriPcpData)
        .enter().append("svg:path")
        .attr("d", path)
        .attr("class", function(d) { return d.plotElement; });

    // Add a grid
    svg.append("g")
        .attr("class", "grid")
        .call(yAxis()
            .tickSize(-w, 0, 0)
            .tickFormat("")
        );
  
    var g = svg.selectAll(".dimension")
        .data(dimensions)
        .enter().append("g");

    // Add an axis and title.
    g.append("svg:g")
        .attr("class", "axis")
        .each(function(d) { d3.select(this).call(axis.scale(y_scale)); })
        .append("svg:text")
        .style("text-anchor", "middle")
        .style("opacity", 0.5)
        .attr("y", -9);

    function dragstart(d) {
        i = keys.indexOf(d);
    }
  
    function drag(d) {
        x.range()[i] = d3.event.x;
        keys.sort(function(a, b) { return x(a) - x(b); });
        g.attr("transform", function(d) { return "translate(" + x(d) + ")"; });
        foreground.attr("d", path);
    }
  
    function dragend(d) {
        x.domain(keys).rangePoints([0, w]);
        var t = d3.transition().duration(500);
        t.selectAll(".trait").attr("transform", function(d) { return "translate(" + x(d) + ")"; });
        t.selectAll(".foreground path").attr("d", path);
    }
        
    // Update the css for each plotElements
    $("."+plotElements[0]).css('stroke', 'red');
    $("."+plotElements[1]).css('stroke', 'blue');
    $("."+plotElements[2]).css('stroke', 'green');
    $("."+plotElements[3]).css('stroke', 'orange');
    $("."+plotElements[4]).css('stroke', 'purple');
    $("."+plotElements[5]).css('stroke', 'black');
    $("."+plotElements[6]).css('stroke', 'gray');
    $("."+plotElements[7]).css('stroke', 'pink');
    $("."+plotElements[8]).css('stroke', 'teal');
    $("."+plotElements[9]).css('stroke', 'DarkBlue');
    $("."+plotElements[10]).css('stroke', 'DarkCyan');
    $("."+plotElements[11]).css('stroke', 'Crimson');
    $("."+plotElements[12]).css('stroke', 'Coral');
    $("."+plotElements[13]).css('stroke', 'DarkGoldenRod');
    $("."+plotElements[14]).css('stroke', 'MediumPurple');
    $("."+plotElements[15]).css('stroke', 'MediumSlateBlue');
    $("."+plotElements[16]).css('stroke', 'MediumSeaGreen');
    $("."+plotElements[17]).css('stroke', 'MidnightBlue');
    $("."+plotElements[18]).css('stroke', 'Maroon');
    // Returns the path for a given data point.
    
    function path(d) {
        return line(municipality.map(function(p) { return [x(p), y[p](d[p])]; }));
    }
    // Handles a brush event, toggling the display of foreground lines.
    function brush() {
        var actives = municipality.filter(function(p) { return !y[p].brush.empty(); }),
            extents = actives.map(function(p) { return y[p].brush.extent(); });
        foreground.classed("fade", function(d) {
            return !actives.every(function(p, i) {
                return extents[i][0] <= d[p] && d[p] <= extents[i][1];
            });
        });
    }

    // Scroll down as a new chart is created
        $('#pcp-charts').scrollTop($('#chart-tabs').prop("scrollHeight"));

} // End PCP Chart
