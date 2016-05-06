function calculateLeftMargin(dataToPlot) {
    // collect text for first column to adjust left margin
    var firstCell = dataToPlot.map(function(d){return d3.values(d)[0]});

    // find the longest text size in the first row to adjust left margin
    var textLength = 0;
    firstCell.forEach(function(d){
        if (d.length > textLength) textLength = d.length;
    });
    return 3 * textLength;
}
