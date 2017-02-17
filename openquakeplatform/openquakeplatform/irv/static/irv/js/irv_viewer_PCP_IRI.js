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

function IRI_PCP_Chart(iriPcpData) {
    $("#iri-chart").empty();
    // $("#iri-chart").width("600px").height("300px");
    updateNumDisplayedRows("#iriDisplayedRows", iriPcpData);

    var color = d3.scale.category20();

    var graph = d3.parcoords(
            {nullValueSeparator: "bottom",
             nullValueSeparatorPadding: { "top": 15, "right": 0, "bottom": 8, "left": 0 }
            })("#iri-chart")
        .width(calculateWidth(iriPcpData))
        .height(400)
        .data(iriPcpData)
        // .hideAxis(["plotElement"])  // if we want to use a legend instead
        .alpha(0.3)
        .margin({
            top: 30,
            left: calculateLeftMargin(iriPcpData),
            right: 0,
            bottom: 20
        })
        .color(function(d) {return color(d.Region);})
        .composite("darker")
        .render()
        .shadows()
        .createAxes()
        .reorderable()
        .brushMode("1D-axes");

    // create data table, row hover highlighting
    var grid = d3.divgrid();
    d3.select("#iri-grid")
        .datum(iriPcpData.slice(0,MAX_ROWS_TO_DISPLAY))
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
        d3.select("#iri-grid")
            .datum(d.slice(0,MAX_ROWS_TO_DISPLAY))
            .call(grid)
            .selectAll(".divgrid-row")
            .on({
                "mouseover": function(d) {
                    graph.highlight([d]);
                },
                "mouseout": graph.unhighlight
            });
        updateNumDisplayedRows("#iriDisplayedRows", d);
        resetDataOfSelectedRegions();
        resetBrushesInOtherCharts("iri");
    });

    graph.on("brushend", function(d) {
        graph.unhighlight();
        var regions = [];
        if (!$.isEmptyObject(graph.brushExtents())) {
            regions = getRegions(d);
        }
        highlightRegionsInCharts(regions);
    });

    assignIRIChartAndGridToMap(graph, grid);

    // NOTE: a simple click on an axis resets the brush for that axis
    //       The button is just to reset all brushes with a single click
    // d3.select('#btnReset').on('click', function() {
    //     graph.brushReset();
    // });
}
