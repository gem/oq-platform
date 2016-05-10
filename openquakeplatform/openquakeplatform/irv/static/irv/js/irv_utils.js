function calculateMeanValues(inputData) {
    var sum = {};
    var sumMean = {};
    var sumMeanArray = [];

    // Build skeleton array
    for (var t in inputData[0]) {
        sum[t] = 0;
    }

    // Sum all the paths
    // Access the objects contained in the theme data array
    for (var region_idx = 0; region_idx < inputData.length; region_idx++) {
        // iterate over the each
        for (var elementName in inputData[region_idx]) {
            // This will sum all the values inside each theme object
            sum[elementName] += inputData[region_idx][elementName];
        }
    }

    // Get the mean
    for (var f in sum) {
        var thisSum = sum[f];
        sumMean[f] = (thisSum / inputData.length);
    }

    sumMeanArray.push(sumMean);
    return sumMeanArray;
}

function calculateLeftMargin(dataToPlot) {
    // collect text for first column to adjust left margin
    var firstCell = dataToPlot.map(function(d){
        return d3.values(d)[0];
    });

    // find the longest text size in the first row to adjust left margin
    var textLength = 0;
    firstCell.forEach(function(d){
        if (d.length > textLength) textLength = d.length;
    });
    return 3 * textLength;
}

function updateNumDisplayedRows(paragraphId, dataToPlot, maxRowsToDisplay) {
    var numDisplayedRows = Math.min(maxRowsToDisplay, dataToPlot.length);
    $(paragraphId).text("Displaying " + numDisplayedRows + " of " + dataToPlot.length + " rows");
}
