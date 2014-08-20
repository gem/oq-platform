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
    var m = [80, 160, 10, 160],
        w = 990 - m[1] - m[3],
        h = 590 - m[0] - m[2];
    
    var x = d3.scale.ordinal().domain(municipality).rangePoints([0, w]),
        y = {};
    
    var line = d3.svg.line(),
        axis = d3.svg.axis().orient("left"),
        foreground;

    $("#iri-chart").empty();

    var svg = d3.select("#iri-chart").append("svg")
        .attr("width", w + m[1] + m[3])
        .attr("height", h + m[0] + m[2])
        .append("svg:g")
        .attr("transform", "translate(" + m[3] + ",5)");
    
    
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
            .text("test");
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
      
        // Add a group element for each trait.
        var g = svg.selectAll(".trait")
            .data(municipality)
            .enter().append("svg:g")
            .attr("class", "trait")
            .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
            .call(d3.behavior.drag()
            .origin(function(d) { return {x: x(d)}; })
            .on("dragstart", dragstart)
            .on("drag", drag)
            .on("dragend", dragend));
      
        // Add an axis and title.
        g.append("svg:g")
            .attr("class", "axis")
            .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
            .append("svg:text")
            .attr("id", "attrLable")
            .attr("text-anchor", "left")
            .attr("y", 355)
            .attr("x", 355)
            .text(String);
      
        // Add a brush for each axis.
        g.append("svg:g")
            .attr("class", "brush")
            .each(function(d) { d3.select(this).call(y[d].brush); })
            .selectAll("rect")
            .attr("x", -8)
            .attr("width", 16);
      
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



// Change the utfgrid layer when the tabs are clicked
$("#econ").click(function(){
    dataCat = "econ-table";
    chartCat = "econ-chart";
    utfGridClickEvent(dataCat, chartCat);
    $("#chartOptions").empty();
    $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
    $("#empty").remove();
});
$("#pop").click(function(){
    dataCat = "pop-table";
    chartCat = "pop-chart";
    utfGridClickEvent(dataCat, chartCat);
    $("#chartOptions").empty();
    $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
    $("#empty").remove();
});
$("#health").click(function(){
    dataCat = "health-table";
    chartCat = "health-chart";
    utfGridClickEvent(dataCat, chartCat);
    $("#chartOptions").empty();
    $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
    $("#empty").remove();
});
$("#infra").click(function(){
    dataCat = "infra-table";
    chartCat = "infra-chart";
    utfGridClickEvent(dataCat, chartCat);
    $("#chartOptions").empty();
    $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
    $("#empty").remove();
});
$("#gov").click(function(){
    dataCat = "gov-table";
    chartCat = "gov-chart";
    utfGridClickEvent(dataCat, chartCat);
    $("#chartOptions").empty();
    $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
    $("#empty").remove();
});
$("#edu").click(function(){
    dataCat = "edu-table";
    chartCat = "edu-chart";
    utfGridClickEvent(dataCat, chartCat);
    $("#chartOptions").empty();
    $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
    $("#empty").remove();
});


