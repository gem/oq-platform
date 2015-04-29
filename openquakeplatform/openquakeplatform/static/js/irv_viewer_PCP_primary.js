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

function Primary_PCP_Chart(projectDef, layerAttributes, selectedRegion) {
    // Find the theme data and create selection dropdown menu
    var themesWithChildren = [];
    for (var i = 0; i < projectDef.children.length; i++) {
        for (var j = 0; j < projectDef.children[i].children.length; j++) {
            if (projectDef.children[i].children[j].children) {
                themesWithChildren.push(projectDef.children[i].children[j].name);
            }
        }
    }

    $('#primary_indicator').empty();
    $('#primary_indicator').append('<option value="">Select a Theme</option>');

    for (var l = 0; l < themesWithChildren.length; l++) {
        var theme = themesWithChildren[l];
        $('#primary_indicator').append('<option value="'+ theme +'">' + theme + '</option>');
    }
    $('#primary_indicator').show();

    $('#primary_indicator').change(function() {
        var selectedTheme = $('#primary_indicator').val();
        // Find the children of selected theme
        var selectedThemeChildren;
        for (var i = 0; i < projectDef.children.length; i++) {
            for (var j = 0; j < projectDef.children[i].children.length; j++) {
                if (projectDef.children[i].children[j].name === selectedTheme) {
                    selectedThemeChildren = projectDef.children[i].children[j].children;
                }
            }
        }

        // Get the data for each selected theme child
        var data = [];
        // first setup an object with all regions and the plot element
        var la = layerAttributes.features;
        for (var ia = 0; ia < selectedThemeChildren.length; ia++) {
            var temp = {};
            temp.plotElement = selectedThemeChildren[ia].field;
            for (var s = 0; s < la.length; s++) {
                var bar = la[s].properties[selectedRegion];
                temp[bar] = 0;
            }
            data.push(temp);
        }

        for (var n = 0; n < data.length; n++) {
            for (var o = 0; o < layerAttributes.features.length; o++) {
                var field = data[n].plotElement;
                var value = layerAttributes.features[o].properties[field];
                var region = layerAttributes.features[o].properties[selectedRegion];
                data[n][region] = value;
            }
        }

        $('#primary-tab').append('<div id="primary-chart"></div>');

        ////////////////
        /// d3 chert ///
        ////////////////

        // Create an array with each plot element name
        var plotAttribute= [];
        for (var ib = 0; ib < selectedThemeChildren.length; ib++) {
            plotAttribute.push(selectedThemeChildren[ib].field);
        }

        var keys = [];

        for (var k in data) {
            keys.push(k);
        }

        var winH = ($(window).height() / 1.7);
        var winW = ($(window).width());
        var m = [10, 10, 10, 120],
            w = (winW - 100) - m[1] - m[3],
            h = winH - m[0] - m[2];

        var x = d3.scale.ordinal().domain(regions).rangePoints([0, w]),
            y = {};

        var line = d3.svg.line(),
            axis = d3.svg.axis().orient("left"),
            foreground;

        var y_scale = d3.scale.linear().domain([1, 0]).range([0, h]);

        var xAxis = d3.svg.axis()
            .scale(x);

        $("#primary-chart").empty();

        var svg = d3.select("#primary-chart").append("svg")
            .attr("viewBox", "-30 -20 " +winW+" " + (winH +20))
            .attr("id", "IRI-svg-element")
            .append("svg:g")
            .attr("transform", "translate(" + m[3] + ",5)");

        // Create a scale and brush for each trait.
        regions.forEach(function(d) {
            y[d] = d3.scale.linear()
                .domain([0,1])
                .range([h, 0]);

            y[d].brush = d3.svg.brush()
                .y(y[d])
                .on("brush", brush);
        });

        // grid line functions
        function x_grid() {
            return d3.svg.axis()
                .scale(x)
                .orient('bottom');
        }

        function y_grid() {
            return d3.svg.axis()
                .scale(y_scale)
                .orient('left');
        }

        // Add a grid
        svg.append("g")
            .attr("class", "grid")
            .call(x_grid()
                .tickSize(h, 0, 0)
                .tickFormat("")
            );

        svg.append("g")
            .attr("class", "grid")
            .call(y_grid()
                .tickSize(-w, 0, 0)
                .tickFormat("")
            );

        // Add a legend.
        var legend = svg.selectAll("g.legend")
            .data(plotAttribute)
            .enter().append("svg:g")
            .style("font-size","14px")
            .style("font-style", "bold")
            .attr("class", "legend");

        legend.append("svg:line")
            .attr("class", String)
            .attr("x2", -18)
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
            .data(data)
            .enter().append("svg:path")
            .attr("d", path)
            .attr("class", function(d) { return d.plotElement; });

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

        svg.append("g")
            .attr("class", "x-axis")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "start")
            .attr('y', -15)
            .attr('x', 10)
            .style('font-size','16px')
            .attr("class", "text90")
            .attr("transform", function(d) {
                return "rotate(90)";
                    })
            .append('text');

        // Update the css for each plotAttribute
        $("."+plotAttribute[0]).css('stroke', 'red');
        $("."+plotAttribute[1]).css('stroke', 'blue');
        $("."+plotAttribute[2]).css('stroke', 'green');
        $("."+plotAttribute[3]).css('stroke', 'orange');
        $("."+plotAttribute[4]).css('stroke', 'purple');
        $("."+plotAttribute[5]).css('stroke', 'black');
        $("."+plotAttribute[6]).css('stroke', 'gray');
        $("."+plotAttribute[7]).css('stroke', 'pink');
        $("."+plotAttribute[8]).css('stroke', 'teal');
        $("."+plotAttribute[9]).css('stroke', 'DarkBlue');
        $("."+plotAttribute[10]).css('stroke', 'DarkCyan');
        $("."+plotAttribute[11]).css('stroke', 'Crimson');
        $("."+plotAttribute[12]).css('stroke', 'Coral');
        $("."+plotAttribute[13]).css('stroke', 'DarkGoldenRod');
        $("."+plotAttribute[14]).css('stroke', 'MediumPurple');
        $("."+plotAttribute[15]).css('stroke', 'MediumSlateBlue');
        $("."+plotAttribute[16]).css('stroke', 'MediumSeaGreen');
        $("."+plotAttribute[17]).css('stroke', 'MidnightBlue');
        $("."+plotAttribute[18]).css('stroke', 'Maroon');

        // Returns the path for a given data point.
        function path(d) {
            return line(regions.map(function(p) { return [x(p), y[p](d[p])]; }));
        }
        // Handles a brush event, toggling the display of foreground lines.
        function brush() {
            var actives = regions.filter(function(p) { return !y[p].brush.empty(); }),
                extents = actives.map(function(p) { return y[p].brush.extent(); });
            foreground.classed("fade", function(d) {
                return !actives.every(function(p, i) {
                    return extents[i][0] <= d[p] && d[p] <= extents[i][1];
                });
            });
        }
    });
}

