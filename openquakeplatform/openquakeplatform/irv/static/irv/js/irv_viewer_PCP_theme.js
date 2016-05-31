/*
   Copyright (c) 2015-2016, GEM Foundation.

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

function Theme_PCP_Chart(themeData) {
    $("#cat-chart").empty();
    // $("#cat-chart").width("600px").height("400px");

    themeMeanArray = calculateMeanValues(themeData);
    themeMeanArray[0].Region = "(mean)";
    themeData = themeData.concat(themeMeanArray);
    var maxRowsToDisplay = 5;
    updateNumDisplayedRows("#catDisplayedRows", themeData, maxRowsToDisplay);

    var color = d3.scale.category20();

    var graph = d3.parcoords({nullValueSeparator: "bottom"})("#cat-chart")
        .width(calculateWidth(themeData))
        .height(400)
        .data(themeData)
        // .hideAxis(["plotElement"])  // if we want to use a legend instead
        .alpha(0.3)
        .margin({
            top: 30,
            left: calculateLeftMargin(themeData),
            right: 0,
            bottom: 20
        })
        .mode("queue")
        .color(function(d) {return color(d.Region);})
        .composite("darker")
        .render()
        .shadows()
        .createAxes()
        .reorderable()
        .brushMode("1D-axes");

    // create data table, row hover highlighting
    var grid = d3.divgrid();
    d3.select("#cat-grid")
        .datum(themeData.slice(0,maxRowsToDisplay))
        .call(grid)
        .selectAll(".divgrid-row")
        .on({
        "mouseover": function(d) {
            graph.highlight([d]);
        },
        "mouseout": graph.unhighlight
        });

    // update data table on brush event
    graph.on("brush", function(d) {
        graph.unhighlight();
        d3.select("#cat-grid")
        .datum(d.slice(0,maxRowsToDisplay))
        .call(grid)
        .selectAll(".divgrid-row")
        .on({
            "mouseover": function(d) {
                graph.highlight([d]);
            },
            "mouseout": graph.unhighlight
        });
        updateNumDisplayedRows("#catDisplayedRows", d, maxRowsToDisplay);
    });

    assignThemeChartAndGridToMap(graph, grid);

    // NOTE: a simple click on an axis resets the brush for that axis
    //       The button is just to reset all brushes with a single click
    // d3.select('#btnReset').on('click', function() {
    //     graph.brushReset();
    // });
}
