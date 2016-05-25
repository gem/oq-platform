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

function isValidNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function calculateMeanValues(inputData) {
    // return an array containing, for each indicator (or composite indicator) the
    // mean value with respect to the whole set of regions
    var sum = {};
    var validValues = {};
    var sumMean = {};
    var sumMeanArray = [];

    // Sum all the paths
    // Access the objects contained in the theme data array
    for (var region_idx = 0; region_idx < inputData.length; region_idx++) {
        // iterate over the each
        for (var elementName in inputData[region_idx]) {
            // This will sum all the values inside each theme object
            var value = inputData[region_idx][elementName];
            if (isValidNumber(value)) {
                if (elementName in sum) {
                    sum[elementName] += value;
                } else {
                    sum[elementName] = value;
                }
                if (elementName in validValues) {
                    validValues[elementName] += 1;
                } else {
                    validValues[elementName] = 1;
                }
            }
        }
    }

    // Get the mean
    for (var f in sum) {
        try {
            sumMean[f] = sum[f] / validValues[f];
        } catch (exc) {
            // division by zero
            sumMean[f] = null;
        }
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
    return 4 * textLength;
}

function calculateWidth(dataToPlot) {
    // when we handle many indicators, the chart needs to be wider
    var numVerticalAxes = Object.keys(dataToPlot[0]).length;
    return 140 * numVerticalAxes;
}

function updateNumDisplayedRows(paragraphId, dataToPlot, maxRowsToDisplay) {
    // Update the text of paragraphId html element, displaying how many rows are being displayed with
    // respect to the total amount of rows filtered from the whole data set dataToPlot.
    var numDisplayedRows = Math.min(maxRowsToDisplay, dataToPlot.length);
    if (numDisplayedRows < dataToPlot.length) {
        $(paragraphId).text("(displaying " + numDisplayedRows + " of " + dataToPlot.length + " rows)");
    } else {
        $(paragraphId).text("");
    }
}
