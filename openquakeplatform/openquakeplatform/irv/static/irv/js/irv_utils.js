/*
   Copyright (c) 2016, GEM Foundation.

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

function calculateMeanValues(inputData) {
    // return an array containing, for each indicator (or composite indicator) the
    // mean value with respect to the whole set of regions
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
    // depending on the length of region names, we need to adjust the left margin of charts,
    // in order to display labels entirely

    // collect text for first column to adjust left margin
    var firstCell = dataToPlot.map(function(d){
        return d3.values(d)[0];
    });

    // find the longest text size in the first row to adjust left margin
    var textLength = 0;
    firstCell.forEach(function(d){
        if (d.length > textLength) {
            textLength = d.length;
        }
    });
    return 3 * textLength;
}

function updateNumDisplayedRows(paragraphId, dataToPlot, maxRowsToDisplay) {
    // Update the text of paragraphId html element, displaying how many rows are being displayed with
    // respect to the total amount of rows filtered from the whole data set dataToPlot.
    var numDisplayedRows = Math.min(maxRowsToDisplay, dataToPlot.length);
    $(paragraphId).text("Displaying " + numDisplayedRows + " of " + dataToPlot.length + " rows");
}
