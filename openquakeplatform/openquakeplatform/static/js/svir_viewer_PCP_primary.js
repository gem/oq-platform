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



function Primary_PCP_Chart(primaryData, municipality, districName) {

      // Create an SVG for our chart.
    var svg = d3.select("#tab-primary-chart").append("svg")
        .attr("width", 1000)
        .attr("height", 800)
        .append("g")
        .attr("transform", "translate(40,10)");
    
    // Configure a chart.
    var chart = LineChart(
        {
            "parent": svg,
            "labels": [ "X", "Y" ],
            "data"  : [[-3,9],[-2,4],[-1,1],[0,0],[1,1],[2,4],[3,9]]
        });
    
    // Render the chart.
    chart();

////
//
// LineChart - This function will return a reusable LineChart with the
//             supplied configuration.
//
// parent     = A mandatory element indicating the parent node of this chart.
// labels     = The labels, names or headers for the data within this chart.
// data       = The data to be graphed in this chart.
// width      = The width in pixels of this chart.
// height     = The height in pixels of this chart.
// xi         = The index within the data array for the x axis.
// yi         = The index within the data array for the y axis.
// xoffset    = The x offset (relative to the parent) in pixels where we will
//              start rendering this chart.
// yoffset    = The y offset (relative to the parent) in pixels where we will
//              start rendering this chart.
//
////

function LineChart(config) {
    // The event handler for mouse over.
    var mouseOverHandler;
    
    // Default parameters.
    var p =
        {
            parent          : null,
            labels          : [ "X", "Y" ],
            listeners       : [],
            data            : [[0,0],[1,1],[2,4],[3,9],[4,16]],
            width           : 600,
            height          : 400,
            xi              : 0,
            yi              : 1,
            xoffset         : 0,
            yoffset         : 0
        };
    
    // If we have user-defined parameters, override the defaults.
    if (config !== "undefined")
    {
        for (var prop in config)
        {
            p[prop] = config[prop];
        }
    }
    
    // Render this chart.
    function chart()
    {
        // Use a linear scale for x, map the value range to the pixel range.
        var x = d3.scale.linear()
            .domain(d3.extent(p.data, function(d) { return +d[p.xi]; }))
            .range([0, p.width]);
        
        // Use a linear scale for y, map the value range to the pixel range.
        var y = d3.scale.linear()
            .domain(d3.extent(p.data, function(d) { return +d[p.yi]; }))
            .range([p.height, 0]);
        
        // Create the x axis at the bottom.
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        
        // Create the y axis to the left.
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
        
        // Define a function to draw the line.
        var line = d3.svg.line()
            .x(function(d) { return x(+d[p.xi]); })
            .y(function(d) { return y(+d[p.yi]); });
        
        // Append a graphics node to the parent, all drawing will be relative
        // to the supplied offsets.  This encapsulating transform simplifies
        // the offsets within the child nodes.
        var chartContainer = p.parent.append("g")
            .attr("transform", "translate(" + p.xoffset + "," + p.yoffset + ")");
        
        // Draw the x axis.
        chartContainer.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + p.height + ")")
            .call(xAxis);
        
        // Draw the y axis.
        chartContainer.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(p.labels[p.yi]);
        
        // Draw the line.
        chartContainer.append("path")
            .datum(p.data)
            .attr("class", "line")
            .attr("d", line);
        
        // We handle mouseover with transparent rectangles.  This will calculate
        // the width of each rectangle.
        var rectalWidth = x(p.data[1][p.xi]) - x(p.data[0][p.xi]);
        
        // Add the transparent rectangles for our mouseover events.
        chartContainer.selectAll("rect")
            .data(p.data.map(function(d) { return d; }))
            .enter().append("rect")
            .attr("class", "overlay")
            .attr("transform", function(d,i) { return "translate(" + x(d[p.xi]) + ",0)"; })
            .attr("opacity", 0.0)
            .attr("width", rectalWidth)
            .attr("height", p.height)
            .on("mouseover", function(d)
                {
                    mouseOverHandler(d, true);
                });
        
        // This function handles the mouseover event.
        //
        // data will contain the row experiencing mouseover.
        // originator will be true if this is being called by the chart which
        //   is originating this event, false otherwise.  This is required to
        //   avoid recursion of listeners notifying originators.
        mouseOverHandler = function (data, originator)
        {
            // Remove any old circles.
            chartContainer.selectAll("circle").remove();
            
            // Draw a small red circle over the mouseover point.
            chartContainer.append("circle")
                .attr("fill", "red")
                .attr("r", 4)
                .attr("cx", x(data[p.xi]))
                .attr("cy", y(data[p.yi]));
            
            // If we are the originator of this event, notify our listeners to
            // update themselves in turn.
            if (originator)
            {
                for (var i=0; i < p.listeners.length; i++)
                {
                    p.listeners[i].onMouseover(data, false);
                }
            }
        }
    }
    
    // This is the public on mouseover function which is visible to others.
    chart.onMouseover = function(data, originator)
    {
        mouseOverHandler(data, originator);
    }
    
    // Use this routine to retrieve and update attributes.
    chart.attr = function(name, value)
    {
        // When no arguments are given, we return the current value of the
        // attribute back to the caller.
        if (arguments.length == 1)
        {
            return p[name];
        }
        // Given 2 arguments we set the name=value.
        else if (arguments.length == 2)
        {
            p[name] = value;
        }
        
        // Return the chart object back so we can chain the operations together.
        return chart;
    }
    
    // This routine supports the update operation for this chart.  This is
    // applicable when the chart should be partially updated.
    chart.update = function()
    {
    }
    
    // Return the instantiated chart object.
    return chart;
}





// d3.select("body").append("span")
//     .text("Hello, world!");


}


