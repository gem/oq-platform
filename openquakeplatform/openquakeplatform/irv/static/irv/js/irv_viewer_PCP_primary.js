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

function Primary_PCP_Chart(projectDef, layerAttributes, zoneLabelField) {
    // Find the theme data and create selection dropdown menu
    var themesWithChildren = [];
    var sum = {};
    var sumMean = {};
    var sumMeanArray = [];

    for (var i = 0; i < projectDef.children.length; i++) {
        try {
            for (var j = 0; j < projectDef.children[i].children.length; j++) {
                if (projectDef.children[i].children[j].children) {
                    themesWithChildren.push(projectDef.children[i].children[j].name);
                }
            }
        } catch (e) {
            // continue
        }
    }
    if (themesWithChildren) {
        $(widgetsAndButtons.indicators.button).prop('disabled', false);
    }

    $('#themeSelector').empty();
    $('#themeSelector').append('<option value="">Select a Theme</option>');

    for (var l = 0; l < themesWithChildren.length; l++) {
        var theme = themesWithChildren[l];
        $('#themeSelector').append('<option value="'+ theme +'">' + theme + '</option>');
    }
    $('#themeSelector').show();

    // select the first indicator
    var menuOption = $('#themeSelector');
    menuOption[0].selectedIndex = 1;
    // trigger first indicator
    setTimeout(function() {
        $('#themeSelector').trigger('change');
    }, 100);

    $('#themeSelector').change(function() {
        var selectedTheme = $('#themeSelector').val();
        // Find the children of selected theme
        var selectedThemeChildren = [];
        for (var i = 0; i < projectDef.children.length; i++) {
            try {
                for (var j = 0; j < projectDef.children[i].children.length; j++) {
                    if (projectDef.children[i].children[j].name === selectedTheme) {
                        selectedThemeChildren = projectDef.children[i].children[j].children;
                    }
                }
            } catch (e) {
                // continue
            }
        }

        var dataToPlot = [];
        var regionNames = [];
        for (var regionIdx = 0; regionIdx < layerAttributes.features.length; regionIdx++) {
            var regionName = layerAttributes.features[regionIdx].properties[zoneLabelField];
            regionNames.push(regionName);
            var regionData = {"Region": regionName};
            for (var indicatorIdx = 0; indicatorIdx < selectedThemeChildren.length; indicatorIdx++) {
                var indicatorField = selectedThemeChildren[indicatorIdx].field;
                var indicatorValue = layerAttributes.features[regionIdx].properties[indicatorField];
                if (typeof indicatorValue !== 'undefined' && !isNaN(indicatorValue) && indicatorValue !== null) {
                    regionData[indicatorField] = indicatorValue;
                }
            }
            dataToPlot.push(regionData);
        }
        if (dataToPlot.length < 1) {
            return;
        }
        if (dataToPlot.length > 1) {
            var meanValuesArray = calculateMeanValues(dataToPlot);
            meanValuesArray[0].Region = "(mean)";
            dataToPlot = dataToPlot.concat(meanValuesArray);
        }

        $('#primary-tab').css({'height': '100%'});
        $('#primary-tab').append('<div id="primary-chart"></div>');

        $("#primary-chart").empty();
        // $("#primary-chart").width("600px").height("400px");

        // sumMeanArray = calculateMeanValues(plotData);
        // sumMeanArray[0].plotElement = "Mean";
        // plotData = plotData.concat(sumMeanArray);

        // var verticalSpacer = 10 * plotData.length;
        // var horizontalSpacer = 100 * Object.keys(plotData[0]).length;

        var leftMargin = calculateLeftMargin(regionNames);

        var parcoords = d3.parcoords({nullValueSeparator: "bottom"})("#primary-chart")
            // .width(600 + horizontalSpacer)
            // .height(300 + verticalSpacer)
            .width(600)
            .height(300)
            .data(dataToPlot)
            // .hideAxis(["plotElement"])  // if we want to use a legend instead
            .alpha(0.3)
            .margin({
                top: 30,
                left: leftMargin,
                right: 0,
                bottom: 20
            })
            // .mode("queue")
            .composite("darker")
            .render()
            .shadows()
            .createAxes()
            .reorderable()
            .brushMode("1D-axes");
    });
}


