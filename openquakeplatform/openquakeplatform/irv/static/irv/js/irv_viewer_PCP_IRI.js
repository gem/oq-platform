/*
   Copyright (c) 2015, GEM Foundation.

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
    $("#iri-chart-swap").empty();
    // $("#iri-chart-swap").width("600px").height("300px");

    var parcoords = d3.parcoords({nullValueSeparator: "bottom"})("#iri-chart-swap")
        .width(600)
        .height(300)
        .data(iriPcpData)
        // .hideAxis(["plotElement"])  // if we want to use a legend instead
        .alpha(0.3)
        .composite("darker")
        .render()
        .shadows()
        .createAxes()
        .reorderable()
        .brushMode("1D-axes");

    // NOTE: a simple click on an axis resets the brush for that axis
    //       The button is just to reset all brushes with a single click
    // d3.select('#btnReset').on('click', function() {
    //     parcoords.brushReset();
    // });
}
