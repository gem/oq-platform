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
