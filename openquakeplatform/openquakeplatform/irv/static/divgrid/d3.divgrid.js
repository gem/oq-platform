// From https://gist.github.com/syntagmatic/3687826#file-divgrid-js

d3.divgrid = function(config) {
  var columns = [];

  var dg = function(selection) {
    if (columns.length === 0) {
        columns = d3.keys(selection.data()[0][0]);
    }

    // header
    selection.selectAll(".divgrid-header")
        .data([true])
      .enter().append("div")
        .attr("class", "divgrid-header");

    var header = selection.select(".divgrid-header")
      .selectAll(".divgrid-cell")
      .data(columns);

    header.enter().append("div")
      .attr("class", function(d,i) {
          return "divgrid-col-" + i;
      })
      .classed("divgrid-cell", true);

    selection.selectAll(".divgrid-header .divgrid-cell")
      .text(function(d) {
          return d;
      });

    header.exit().remove();

    // rows
    var rows = selection.selectAll(".divgrid-row")
        .data(function(d) {
            return d;
        });

    rows.enter().append("div")
        .attr("class", "divgrid-row");

    rows.exit().remove();

    var cells = selection.selectAll(".divgrid-row").selectAll(".divgrid-cell")
        .data(function(d) {
            return columns.map(function(col){
                return d[col];
            });
        });

    // cells
    cells.enter().append("div")
      .attr("class", function(d,i) {
          return "divgrid-col-" + i;
      })
      .classed("divgrid-cell", true);

    cells.exit().remove();

    selection.selectAll(".divgrid-cell")
      .text(function(d) {
          return d;
      });

    return dg;
  };

  dg.columns = function(_) {
    if (!arguments.length) {
        return columns;
    }
    columns = _;
    return this;
  };

  return dg;
};
