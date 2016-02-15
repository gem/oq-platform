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
var widgetsAndButtons = {
    'projDef':    {'widget':     $('#project-def-widget'),
                   'button':     $('#toggleProjDefWidgetBtn'),
                   'buttonText': 'Show Project Definition'},
    'iri':        {'widget':     $('#iri-chart-widget'),
                   'button':     $('#toggleIriChartWidgetBtn'),
                   'buttonText': 'Show IRI Chart Widget'},
    'svi':        {'widget':     $('#cat-chart-widget'),
                   'button':     $('#toggleSviThemeWidgetBtn'),
                   'buttonText': 'Show SVI Theme Chart'},
    'indicators': {'widget':     $('#primary-tab-widget'),
                   'button':     $('#toggleCompIndWidgetBtn'),
                   'buttonText': 'Show Composite Indicator Chart'}
};


$(document).ready(function() {
    $('#cover').remove();
    $('.alert-unscaled-data').hide();
    $('#absoluteSpinner').hide();
    $('#loadProjectBtn').show();
});

var layerAttributes;
var sessionProjectDef = [];
var selectedRegion;
var selectedIndicator;
var selectedLayer;
var tempProjectDef;
var COMPATIBILITY_VERSION = '1.7.0';
var thematicLayer;
var leafletBoundingBox = [];
var mapboxBoundingBox = [];
var license;
var webGl;
var projectChange = false;
var verticesCount = 0;
var VERTICES_THRESHOLD = 500000;

var mappingLayerAttributes = {};

// sessionProjectDef is the project definition as it was when uploaded from the QGIS tool.
// While projectDef includes modified weights and is no longer the version that was uploaded from the QGIS tool
var projectLayerAttributes;
var regions = [];
var baseMapUrl = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png');
var app = new OQLeaflet.OQLeafletApp(baseMapUrl);
var indicatorChildrenKey = [];

function setWidgetsToDefault(){
    $('#pdSelection').empty();
    // set tabs back default
    // FIXME: all widgets will have only 1 tab; handle things accordingly
    widgetsAndButtons.iri.widget.tabs("enable", 2);
    widgetsAndButtons.svi.widget.tabs("enable", 3);

    widgetsAndButtons.projDef.widget.tabs('option', 'active', 0);
    $('#projectDef-spinner').text('Loading ...');
    $('#projectDef-spinner').append('<img id="download-button-spinner" src="/static/img/ajax-loader.gif" />');
    $('#projectDef-spinner').show();
    $('#iri-spinner').show();
    $('#regionSelectionDialog').empty();
    $('#projectDef-tree').empty();
    $('#iri-chart').empty();
    $('#cat-chart').empty();
    $('#primary-chart').empty();
}

function scaleTheData() {
    // Create a list of primary indicators that need to be scaled
    // We are not scaling any of the IR indicators
    var indicatorsToBeScaled = {};
    for (var i = 0; i < projectDef.children[1].children.length; i++) {
        for (var j = 0; j < projectDef.children[1].children[i].children.length; j++) {
            var tempName = projectDef.children[1].children[i].children[j].field;
            indicatorsToBeScaled[tempName] = {};
        }
    }

    // Populate the list with values
    for (var key in indicatorsToBeScaled) {
        for (var i = 0; i < layerAttributes.features.length; i++) {
            var tempRegion = layerAttributes.features[i].properties[selectedRegion];
            indicatorsToBeScaled[key][tempRegion] = layerAttributes.features[i].properties[key];
        }
    }

    for (var k in indicatorsToBeScaled) {
        scale(indicatorsToBeScaled[k]);
    }

    // Put values back into the layerAttributes obj
    for (var key in indicatorsToBeScaled) {
        for (var i = 0; i < layerAttributes.features.length; i++) {
            for (var layerAttributesKey in layerAttributes.features[i].properties) {
                if (key === layerAttributesKey) {
                    for(var indicatorKey in indicatorsToBeScaled[key]) {
                        if (layerAttributes.features[i].properties[selectedRegion] == indicatorKey) {
                            layerAttributes.features[i].properties[layerAttributesKey] = indicatorsToBeScaled[key][indicatorKey];
                        }
                    }
                }
            }
        }
    }
    // Process the indicators again
    processIndicators(layerAttributes, sessionProjectDef);
}

function createRiskIndicator(la, index, selectedRegion) {
    var indicator = [];
    // setup the indicator with all the regions
    for (var ia = 0; ia < la.length; ia++) {
        var region = la[ia].properties[selectedRegion];
        indicator.push({'region': region});
        regions.push(region);
    }

    for (var i = 0; i < index.length; i++) {
        for (var j = 0; j < la.length; j++) {
            if (indicator[j].region == la[j].properties[selectedRegion]) {
                var tempName = index[i].name;
                var tempValue = la[j].properties[tempName];
                indicator[j][tempName] = tempValue;
            }
        }
    }
    // Get the indicators children keys
    for (var q = 0; q < index.length; q++) {
        indicatorChildrenKey.push(index[q].field);
    }

    return indicator;
}

function combineIndicators(nameLookUp, themeObj, JSONthemes) {
    //  Set the projectDef equal to testSessionProjectDef if sessionProjectDef is
    // an empty object in order to test the function
    if (arguments[3]) {
        projectDef = arguments[3];
    }
    else if (!jQuery.isEmptyObject(sessionProjectDef)) {
       projectDef = sessionProjectDef;
    }
    else {
       return false;
    }

    var subIndex = {};
    var operator;
    var themeInversionFactor;

    // Get the theme operator
    for (var y = 0; y < projectDef.children.length; y++) {
        if (projectDef.children[y].name == nameLookUp) {
            operator = projectDef.children[y].operator;
        }
    }

    // first create an object with all of the district names
    for (var t = 0; t < themeObj.length; t++) {
        var tempRegion = themeObj[t].region;
        subIndex[tempRegion] = 0;
    }

    // get some info about the themes
    var themeKeys = [];
    var themeInversionObj = {};
    var themeWeightObj = {};
    for (var u = 0; u < JSONthemes.length; u++) {
        var themeName = JSONthemes[u].name;
        var themeWeight = JSONthemes[u].weight;
        themeKeys.push(themeName);
        themeWeightObj[themeName] = themeWeight;
        // identify if the node has been inverted
        if (JSONthemes[u].isInverted === true) {
            themeInversionObj[themeName] = -1;
        } else {
            themeInversionObj[themeName] = 1;
        }
    }

    // compute the subIndex values based on operator
    if (operator == 'Simple sum (ignore weights)') {
        for (var v = 0; v < themeObj.length; v++) {
            var tempElementValue = 0;
            var themeObjRegion = themeObj[v].region;
            // compute the themes
            for (var w = 0; w < themeKeys.length; w++) {
                // Get inversion factor
                var themeInversionFactor = themeInversionObj[themeKeys[w]];
                var tempThemeName = themeKeys[w];
                tempElementValue = tempElementValue + (themeObj[v][tempThemeName] * themeInversionFactor);
            }
            subIndex[themeObjRegion] = tempElementValue;
        }
    } else if (operator == 'Weighted sum') {
        for (var v1 = 0; v1 < themeObj.length; v1++) {
            var tempElementValue = 0;
            var themeObjRegion = themeObj[v1].region;
            // compute the themes
            for (var w1 = 0; w1 < themeKeys.length; w1++) {
                // Get inversion factor
                var themeInversionFactor = themeInversionObj[themeKeys[w1]];
                var tempThemeName = themeKeys[w1];
                var themeWeightVal = themeWeightObj[tempThemeName];
                if (themeWeightVal > 0) {
                    tempElementValue = tempElementValue + (themeObj[v1][tempThemeName] * themeWeightVal * themeInversionFactor);
                }
            }
            subIndex[themeObjRegion] = tempElementValue;
        }
    } else if (operator == 'Average (ignore weights)') {
        for (var v2 = 0; v2 < themeObj.length; v2++) {
            var tempElementValue = 0;
            var themeObjRegion = themeObj[v2].region;
            // compute the themes
            for (var w2 = 0; w2 < themeKeys.length; w2++) {
                // Get inversion factor
                var themeInversionFactor = themeInversionObj[themeKeys[w2]];
                var tempThemeName = themeKeys[w2];
                tempElementValue = tempElementValue + (themeObj[v2][tempThemeName] * themeInversionFactor);
            }
            var themeAverage = tempElementValue / themeKeys.length;
            subIndex[themeObjRegion] = themeAverage;
        }
    } else if (operator == 'Simple multiplication (ignore weights)') {
        for (var v3 = 0; v3 < themeObj.length; v3++) {
            var tempElementValue = 1;
            var themeObjRegion = themeObj[v3].region;
            // compute the themes
            for (var w3 = 0; w3 < themeKeys.length; w3++) {
                // Get inversion factor
                var themeInversionFactor = themeInversionObj[themeKeys[w3]];
                var tempThemeName = themeKeys[w3];
                tempElementValue = tempElementValue * (themeObj[v3][tempThemeName] * themeInversionFactor);
            }
            subIndex[themeObjRegion] = tempElementValue;
        }
    } else if (operator == 'Weighted multiplication') {
        for (var v4 = 0; v4 < themeObj.length; v4++) {
            var tempElementValue = 1;
            var themeObjRegion = themeObj[v4].region;
            // compute the themes

            for (var w4 = 0; w4 < themeKeys.length; w4++) {
                // Get inversion factor
                var themeInversionFactor = themeInversionObj[themeKeys[w4]];
                var tempThemeName = themeKeys[w4];
                var themeWeightVal = themeWeightObj[tempThemeName];
                if (themeWeightVal > 0) {
                    tempElementValue = (tempElementValue * (themeObj[v4][tempThemeName] * themeWeightVal) * themeInversionFactor);
                }
            }
            subIndex[themeObjRegion] = tempElementValue;
        }
    } else if (operator == 'Geometric mean (ignore weights)') {
        power = 1 / themeKeys.length;
        for (var v5 = 0; v5 < themeObj.length; v5++) {
            var tempElementValue = 1;
            var themeObjRegion = themeObj[v5].region;
            // compute the themes
            for (var w5 = 0; w5 < themeKeys.length; w5++) {
                // Get inversion factor
                var themeInversionFactor = themeInversionObj[themeKeys[w5]];
                var tempThemeName = themeKeys[w5];
                tempElementValue = tempElementValue * (themeObj[v5][tempThemeName] * themeInversionFactor);
            }
            tempElementValue = Math.pow(tempElementValue, power);
            subIndex[themeObjRegion] = tempElementValue;
        }
    }
    return subIndex;
}

function processIndicators(layerAttributes, projectDef) {
    var weightChange = 0;
    if (arguments[2]) {
        weightChange = arguments[2];
    }
    regions = [];
    var allSVIThemes = [];
    var allPrimaryIndicators = [];
    var allRiskIndicators = [];

    /////////////////////////////////////////////
    //// Create the primary indicator objects ///
    /////////////////////////////////////////////

    var svThemes;
    var riskIndicators;

    // Find all the nodes of type social vulnerability and risk index in the project def
    for (var k in projectDef.children) {
        if (projectDef.children[k].type == "Social Vulnerability Index") {
            svThemes = projectDef.children[k].children;
        } else if (projectDef.children[k].type == "Risk Index") {
            riskIndicators = projectDef.children[k].children;
        }
    }

    // process each Social Vulnerability Index nodes
    // Get all the primary indicators
    if (svThemes) {
        for (var i = 0; i < svThemes.length; i++) {
            if (svThemes[i].children) {
                for (var e = 0 ; e < svThemes[i].children.length; e++ ) {
                    allPrimaryIndicators.push(svThemes[i].children[e].field);
                }
            }
        }
    }

    //////////////////////////////////////
    //// Compute the theme indicators ////
    //////////////////////////////////////

    //build the theme indicator object
    var themeData = [];
    indicatorInfo = [];
    var laValuesArray = [];

    function generateThemeObject(indicatorObj) {
        var region = indicatorObj.region;
        var theme = indicatorObj.theme;
        var value = indicatorObj.value;
        // add the theme and value to each theme data object
        for (var i = 0; i < themeData.length; i++) {
            if (themeData[i].region == region) {
                themeData[i][theme] = value;
            }
        }
    }

    // setup themeData with all the regions
    var la = layerAttributes.features;
    for (var s = 0; s < la.length; s++) {
        var temp = {};
        temp.region = la[s].properties[selectedRegion];
        themeData.push(temp);
    }

    // Find the theme information
    if (svThemes) {
        for (var m = 0; m < svThemes.length; m++) {
            var operator = svThemes[m].operator;
            var weight = svThemes[m].weight;
            var name = svThemes[m].name;
            allSVIThemes.push(name);
            var tempChildren = svThemes[m].children;
            var tempIndicatorChildrenKeys = [];

            if (tempChildren) {
                for (var q = 0; q < tempChildren.length; q++) {
                    // Get the indicators children keys
                    tempIndicatorChildrenKeys.push(tempChildren[q].field);
                }
            }

            for (var o = 0; o < la.length; o++) {
                var tempValue = 0;
                var region = la[o].properties[selectedRegion];
                var theme = name;

                // check the operator type and compute accordingly
                if (operator == "Average (ignore weights)") {
                    for (var p in la[o].properties) {
                        // iterate over the indicator child keys
                        for (var r = 0; r < tempIndicatorChildrenKeys.length; r++) {
                            if (p == tempIndicatorChildrenKeys[r]) {
                                var primaryInversionFactor;
                                if (tempChildren[r].isInverted === true) {
                                    primaryInversionFactor = -1;
                                } else {
                                    primaryInversionFactor = 1;
                                }
                                // Sum the theme indicators
                                tempValue = tempValue + (la[o].properties[p] * primaryInversionFactor);
                            }
                        }
                    }
                    // Grab the average
                    var average = tempValue / tempIndicatorChildrenKeys.length;
                    indicatorInfo.push({'region':region, 'theme':theme, 'value':average});
                } else if ( operator == "Simple sum (ignore weights)") {
                    for (var p1 in la[o].properties) {
                        // iterate over the indicator child keys
                        for (var r1 = 0; r1 < tempIndicatorChildrenKeys.length; r1++) {
                            if (p1 == tempIndicatorChildrenKeys[r1]) {
                                var primaryInversionFactor;
                                if (tempChildren[r1].isInverted === true) {
                                    primaryInversionFactor = -1;
                                } else {
                                    primaryInversionFactor = 1;
                                }
                                // Sum the theme indicators
                                tempValue = tempValue + (la[o].properties[p1] * primaryInversionFactor);
                            }
                        }
                    }
                    indicatorInfo.push({'region':region, 'theme':theme, 'value':tempValue});
                } else if ( operator == "Weighted sum") {
                    for (var p2 in la[o].properties) {
                        // iterate over the indicator child keys
                        for (var r2 = 0; r2 < tempIndicatorChildrenKeys.length; r2++) {
                            if (p2 == tempIndicatorChildrenKeys[r2]) {
                                // Sum the theme indicators
                                var weight = tempChildren[r2].weight;
                                var primaryInversionFactor;
                                if (tempChildren[r2].isInverted === true) {
                                    primaryInversionFactor = -1;
                                } else {
                                    primaryInversionFactor = 1;
                                }
                                tempValue = tempValue + ((la[o].properties[p2] * primaryInversionFactor) * weight);
                                // Collect an array of all the values that pass through the loop
                                laValuesArray.push(la[o].properties[p2]);
                            }
                        }
                    }
                    indicatorInfo.push({'region':region, 'theme':theme, 'value':tempValue});
                } else if ( operator == "Simple multiplication (ignore weights)") {
                    tempValue = 1;
                    for (var p3 in la[o].properties) {
                        // iterate over the indicator child keys
                        for (var r3 = 0; r3 < tempIndicatorChildrenKeys.length; r3++) {
                            if (p3 == tempIndicatorChildrenKeys[r3]) {
                                // Sum the theme indicators
                                var primaryInversionFactor;
                                if (tempChildren[r3].isInverted === true) {
                                    primaryInversionFactor = -1;
                                } else {
                                    primaryInversionFactor = 1;
                                }
                                tempValue = tempValue * (la[o].properties[p3] * primaryInversionFactor);
                            }
                        }
                    }
                    indicatorInfo.push({'region':region, 'theme':theme, 'value':tempValue});
                } else if ( operator == "Weighted multiplication") {
                    tempValue = 1;
                    for (var p4 in la[o].properties) {
                        // iterate over the indicator child keys
                        for (var r4 = 0; r4 < tempIndicatorChildrenKeys.length; r4++) {
                            if (p4 == tempIndicatorChildrenKeys[r4]) {
                                var primaryInversionFactor;
                                if (tempChildren[r4].isInverted === true) {
                                    primaryInversionFactor = -1;
                                } else {
                                    primaryInversionFactor = 1;
                                }
                                // Sum the theme indicators
                                var weight = tempChildren[r4].weight;
                                tempValue = tempValue * (la[o].properties[p4] * primaryInversionFactor * weight);
                            }
                        }
                    }
                    indicatorInfo.push({'region':region, 'theme':theme, 'value':tempValue});
                } else if ( operator == "Geometric mean (ignore weights)") {
                    tempValue = 1;
                    var power = 1 / tempIndicatorChildrenKeys.length;
                    for (var p3 in la[o].properties) {
                        // iterate over the indicator child keys
                        for (var r3 = 0; r3 < tempIndicatorChildrenKeys.length; r3++) {
                            if (p3 == tempIndicatorChildrenKeys[r3]) {
                                // Sum the theme indicators
                                var primaryInversionFactor;
                                if (tempChildren[r3].isInverted === true) {
                                    primaryInversionFactor = -1;
                                } else {
                                    primaryInversionFactor = 1;
                                }
                                tempValue = tempValue * (la[o].properties[p3] * primaryInversionFactor);
                            }
                        }
                    }
                    tempValue = Math.pow(tempValue, power);
                    indicatorInfo.push({'region':region, 'theme':theme, 'value':tempValue});
                }
            }
        }
    }

    /////////////////////////////////////////////////
    //// Check for null values primary indicators ///
    /////////////////////////////////////////////////

    // Try and remove the warning message on each iteration.
    try {
        $('.incompleteData').remove();
    } catch (e) {
        // continue
    }

    if (laValuesArray.indexOf(null) > -1) {
        var warningMsg =
            '<div class="alert alert-danger incompleteData" role="alert">'+
                'The application is not able to render charts or the map layer for this project because the composite indicator data is incomplete.'+
            '</div>';

        // Provide warning message if the composite indicator data is incomplete
        $('#iri-chart').prepend(warningMsg);
        $('#cat-chart').prepend(warningMsg);
        $('#primary-tab').prepend(warningMsg);
        $('#project-def').prepend(warningMsg);
        // Stop the function
        $('#absoluteSpinner').hide();
        return;
    }

    ////////////////////////////////
    //// Check for scaled values ///
    ////////////////////////////////

    Array.prototype.max = function() {
        return Math.max.apply(null, this);
    };

    Array.prototype.min = function() {
        return Math.min.apply(null, this);
    };

    var maxValue = laValuesArray.max();
    var minValue = laValuesArray.min();

    if (minValue === 0 && maxValue === 1) {
        $('.alert-unscaled-data').hide();
    } else {
        $('.alert-unscaled-data').show();
        $('.scaleTheData').click(function() {
            // Scale the primary indicators
            scaleTheData();
        });
    }

    for (var p5 = 0; p5 < indicatorInfo.length; p5++) {
        // process the object for each record
        var indicatorObj = indicatorInfo[p5];
        indicatorObj.value = indicatorObj.value;
        generateThemeObject(indicatorObj);
    }

    Primary_PCP_Chart(projectDef, layerAttributes, selectedRegion);
    Theme_PCP_Chart(themeData);

    /////////////////////////
    //// Compute the SVI ////
    /////////////////////////

    var SVI = {};
    var sviNameLookUp = 'SVI';
    var sviJSONthemes = svThemes;
    // SVI is an object with region and value
    if (svThemes) {
        SVI = combineIndicators(sviNameLookUp, themeData, sviJSONthemes );
        scale(SVI);
    }

    ////////////////////////////////
    //// Compute the risk index ////
    ////////////////////////////////

    // Create the risk indicator only if it has children
    var RI = {};
    if (riskIndicators !== undefined) {
        var riskIndicator = createRiskIndicator(la, riskIndicators, selectedRegion);

        // capture all risk indicators for selection menu
        for (var key in riskIndicator[0]) {
            if (key != 'region') {
                allRiskIndicators.push(key);
            }
        }

        // Compute the Risk Indicator
        var nameLookUp = 'RI';
        var riJSONthemes = riskIndicators;
        RI = combineIndicators(nameLookUp, riskIndicator, riJSONthemes);
        scale(RI);
    } else {
        // If RI does not have any children the simply compute the RI
        // setup the indicator with all the regions using the layer attributes
        for (var ia = 0; ia < la.length; ia++) {
            var region = la[ia].properties[selectedRegion];
            RI[region] = 1;
        }
    }

    ///////////////////////////////
    //// Compute the IRI index ////
    ///////////////////////////////

    if (svThemes === undefined || riskIndicators === undefined) {
        //return;
    } else {
        var IRI = {};
        var sviWeight;
        var riWeight;
        var riInversionFactor;
        var sviInversionFactor;
        var iriOperator = projectDef.operator;

        for (var ik = 0; ik < projectDef.children.length; ik++) {
            if (projectDef.children[ik].name == 'RI') {
                riWeight = projectDef.children[ik].weight;
                if (projectDef.children[ik].isInverted === true) {
                    riInversionFactor = -1;
                } else {
                    riInversionFactor = 1;
                }
            } else if (projectDef.children[ik].name == 'SVI') {
                sviWeight = projectDef.children[ik].weight;
                if (projectDef.children[ik].isInverted === true) {
                    sviInversionFactor = -1;
                } else {
                    sviInversionFactor = 1;
                }
            }
        }

        if (iriOperator == "Average (ignore weights)") {
            for (var regionName in SVI) {
                tempVal = (SVI[regionName] * sviInversionFactor) + (RI[regionName] * riInversionFactor);
                var iriAverage = tempVal / 2;
                IRI[regionName] = iriAverage;
            }
        } else if (iriOperator == "Simple sum (ignore weights)") {
            for (var regionName in SVI) {
                tempVal = (SVI[regionName] * sviInversionFactor) + (RI[regionName] * riInversionFactor);
                IRI[regionName] = tempVal;
            }
        } else if (iriOperator == "Weighted sum") {
            for (var regionName in SVI) {
                tempVal = ((SVI[regionName] * sviWeight) * sviInversionFactor) + ((RI[regionName] * riWeight) * riInversionFactor);
                IRI[regionName] = tempVal;
            }
        } else if (iriOperator == "Simple multiplication (ignore weights)") {
            for (var regionName in SVI) {
                tempVal = (SVI[regionName] * sviInversionFactor) * (RI[regionName] * riInversionFactor);
                IRI[regionName] = tempVal;
            }
        } else if (iriOperator == "Weighted multiplication") {
            for (var regionName in SVI) {
                tempVal = ((SVI[regionName] * sviWeight) * sviInversionFactor) * ((RI[regionName] * riWeight) * riInversionFactor);
                IRI[regionName] = tempVal;
            }
        } else if (iriOperator == "Geometric mean (ignore weights)") {
            for (var regionName in SVI) {
                tempVal = Math.pow(SVI[regionName] * sviInversionFactor) * (RI[regionName] * riInversionFactor, 0.5);
                IRI[regionName] = tempVal;
            }
        }
        scale(IRI);
    }


    ////////////////////////////////////
    //// Prep data for thematic map ////
    ////////////////////////////////////

    // Pass indicators into a 'newProperties' element
    for (var ix = 0; ix < la.length; ix++) {
        la[ix].newProperties = {};
        for (var key in IRI) {
            if (key == la[ix].properties[selectedRegion]) {
                var tempValue = (IRI[key]).toFixed(5);
                la[ix].newProperties.IRI = parseFloat(tempValue);
            }
        }
        if (svThemes) {
            for (var key in SVI) {
                if (key == la[ix].properties[selectedRegion]) {
                    var tempValue = (SVI[key]).toFixed(5);
                    la[ix].newProperties.SVI = parseFloat(tempValue);
                }
            }
        }

        if (riskIndicators !== undefined) {
            for (var key in RI) {
                if (key == la[ix].properties[selectedRegion]) {
                    var tempValue = (RI[key]).toFixed(5);
                    la[ix].newProperties.RI = parseFloat(tempValue);
                }
            }

            for (var key in riskIndicator[ix]) {
                if (riskIndicator[ix] != 'region') {
                    var tempThemeName = riskIndicator[ix][key];
                    la[ix].newProperties[key] = tempThemeName;
                }
            }
        }

        for (var key in themeData[ix]) {
            if (key != 'region') {
                var tempThemeName = themeData[ix][key];
                la[ix].newProperties[key] = tempThemeName;
            } else if (key == 'region') {
                la[ix].newProperties.region = themeData[ix][key];
            }
        }
    }

    // Pass primary indicators into a 'newProperties' element
    if (svThemes) {
        for (var ia = 0; ia < svThemes.length; ia++) {
            var indicatorChildrenKey = [];
            var tempChildren = svThemes[ia].children;
            // Get the indicators children keys
            if (tempChildren) {
                for (var q = 0; q < tempChildren.length; q++) {
                    indicatorChildrenKey.push(tempChildren[q].field);
                }
            }

            for (var ib = 0; ib < la.length; ib++) {
                for (var p in la[ib].properties) {
                    for (var id = 0; id < indicatorChildrenKey.length; id++) {
                        if (p == indicatorChildrenKey[id]) {
                            var tempName = p;
                            la[ib].newProperties[tempName] = la[ib].properties[p];
                        }
                    }
                }
            }
        }
    }


    // If the browser does not support web-gl, then use traditional (limited) vector data.
    // If the browser does support web-gl, then use Mapbox-gl.
    if (webGl === true) {

        ////////////////////////////////////////
        // Deep copy the layer attributes obj //
        ////////////////////////////////////////

        // This application modifies the layer attributes based on changes to the indicator weights.
        // The app also need to keep track of the original layer attributes values.
        // Thus, the layerAttributes obj contains "properties" and "newProperties".
        // This presents an issue when using the object as a data source in Mapbox-GL, because
        // it is hard coded to use properties. In order to get around this issue, we need to
        // deep copy the layerAttributes, and replace "properties" with newProperties

        mappingLayerAttributes = JSON.parse(JSON.stringify(layerAttributes))

        for (var i = 0; i < mappingLayerAttributes.features.length; i++) {
            delete mappingLayerAttributes.features[i].properties;
        }

        for (var i = 0; i < mappingLayerAttributes.features.length; i++) {
            var tempProperties = JSON.parse(JSON.stringify(mappingLayerAttributes.features[i].newProperties))
            mappingLayerAttributes.features[i].properties = tempProperties;
        }

        for (var i = 0; i < mappingLayerAttributes.features.length; i++) {
            delete mappingLayerAttributes.features[i].newProperties;
        }

        // Emptry any existing interactivity
        $('#mapInfo').empty();

        mapBoxThematicMap(layerAttributes, allSVIThemes, allPrimaryIndicators, allRiskIndicators, weightChange);
    } else {
        leafletThematicMap(layerAttributes, allSVIThemes, allPrimaryIndicators, allRiskIndicators, weightChange);
    }

    var iriPcpData = [];

    if (IRI) {
        IRI.plotElement = "IRI"; // Label within the object
        iriPcpData.push(IRI);
    }

    if (svThemes) {
        SVI.plotElement = "SVI"; // Label within the object
        iriPcpData.push(SVI);
    } else {
        // Disable the primary tab.
        widgetsAndButtons.svi.widget.tabs("disable", 3);
    }

    if (riskIndicators !== undefined) {
        RI.plotElement = "RI"; // Label within the object
        iriPcpData.push(RI);
    }

    IRI_PCP_Chart(iriPcpData);


} // End processIndicators

function disableWidget(widgetAndBtn) {
    // if the widget is visible, click the button to toggle it
    if (widgetAndBtn.widget.is(':visible')) {
        widgetAndBtn.button.click();
    }
    // in any case, disable the button that shows the widget
    widgetAndBtn.button.prop('disabled', true);
}

function scale(IndicatorObj) {
    var ValueArray = [];
    var scaledValues = [];
    for (var v in IndicatorObj) {
        ValueArray.push(IndicatorObj[v]);
    }
    var tempMin = Math.min.apply(null, ValueArray),
        tempMax = Math.max.apply(null, ValueArray);

    for (var j = 0; j < ValueArray.length; j++) {
        // make sure not to divide by zero
        // 1 is an arbitrary choice to translate a flat array into an array where each element equals to 1
        if (tempMax == tempMin) {
            scaledValues = [1];
            // Disable the chart tabs
            // $("#project-def-widget").tabs("disable", 1);
            // $("#iri-chart-widget").tabs("disable", 2);
            // $("#cat-chart-widget").tabs("disable", 3);
            // FIXME: check what actually needs to be disabled
            $.each(['indicators', 'svi', 'iri'], function(i, widgetName) {
                disableWidget(widgetsAndButtons[widgetName]);
            });
        } else {
            scaledValues.push( (ValueArray[j] - tempMin) / (tempMax - tempMin) );
        }
    }

    var tempKeys = Object.keys(IndicatorObj);

    for (var ih = 0; ih < tempKeys.length; ih++) {
        IndicatorObj[tempKeys[ih]] = scaledValues[ih];
    }
    return IndicatorObj;
}

// Mapbox-gl stuff
function setupMapboxGlMap() {

    // Create mapbox map element
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuamFtaW4td3lzcyIsImEiOiJVcm5FdEw4In0.S8HRIEq8NqdtFVz2-BwQog';

    map = new mapboxgl.Map({
        container: 'map',
        // Load default mapbox basemap
        style: 'mapbox://styles/mapbox/streets-v8',
        center: [0, 20],
        zoom: 2,
    })
}

function mapBoxThematicMap(layerAttributes, allSVIThemes, allPrimaryIndicators, allRiskIndicators, weightChange) {
    $('#webGlThematicSelection').empty();

    // Add IRI SVI and RI options to the webGlThematicSelection menu
    if (mappingLayerAttributes.features[0].properties.IRI !== undefined) {
        $('#webGlThematicSelection').append('<option class="2">IRI</option>');
    }

    if (mappingLayerAttributes.features[0].properties.SVI !== undefined) {
        $('#webGlThematicSelection').append('<option class="2">SVI</option>');
    }

    if (mappingLayerAttributes.features[0].properties.RI !== undefined) {
        $('#webGlThematicSelection').append('<option class="2">RI</option>');
    }

    // Add IR children themes to selection menu
    if (allRiskIndicators.length > 0) {
        $('#webGlThematicSelection').append('<optgroup label="RI Themes">');
        for (var i = 0; i < allRiskIndicators.length; i++) {
            $('#webGlThematicSelection').append('<option class="1">'+allRiskIndicators[i]+'</option>');
        }
    }

    // Add SVI children themes to selection menu
    if (allSVIThemes.length > 0) {
        $('#webGlThematicSelection').append('<optgroup label="SVI Themes">');
        for (var i = 0; i < allSVIThemes.length; i++) {
            $('#webGlThematicSelection').append('<option class="3">'+allSVIThemes[i]+'</option>');
        }
    }

    // Add primary indicators to selection menu
    if (allPrimaryIndicators.length > 0) {
        $('#webGlThematicSelection').append('<optgroup label="Primary Indicators">');
        for (var i = 0; i < allPrimaryIndicators.length; i++) {
            $('#webGlThematicSelection').append('<option class="4">'+allPrimaryIndicators[i]+'</option>');
        }
    }

    $('#webGlThematicSelection').show();
    $('#webGlColorPicker').show();

    // Manage the thematic map selection menu
    // Set the map selection menu to the first multi group dropdown option
    if (selectedIndicator === undefined) {
        $("#webGlThematicSelection").val($("#webGlThematicSelection option:first").val());
        mapboxGlLayerCreation();
    } else {
        $('#webGlThematicSelection').val(selectedIndicator);
    }

    // Execute the mapboxGlLayerCreation when there has been a weight change
    if (weightChange > 0) {
        mapboxGlLayerCreation(weightChange);
    }

    $('#webGlThematicSelection').change(function() {
        mapboxGlLayerCreation();
    });
}

// Color options for GL map
var colorsPalRedSingle = ['#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#de2d26', '#a50f15'];
var colorsPalBlueSingle = ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#3182bd', '#08519c'];
var colorsPalGreenSingle = ['#edf8e9', '#c7e9c0', '#a1d99b', '#74c476', '#31a354', '#006d2c'];
var colorsPalRedMulti = ['#fef0d9', '#fdd49e', '#fdbb84', '#fc8d59', '#e34a33', '#b30000'];
var colorsPalBlueMulti = ['#f1eef6', '#d0d1e6', '#a6bddb', '#74a9cf', '#2b8cbe', '#045a8d'];
var colorsPalGreenMulti = ['#edf8fb', '#ccece6', '#99d8c9', '#66c2a4', '#2ca25f', '#006d2c'];
// Default color
var colorsPal = colorsPalRedSingle;

function colorPicker () {
    $('#webGlColorPicker').change(function() {
        //var colorsPal = colorsPalRedSingle;
        var colorSelection = $(this).val();
        if (colorSelection == 'Red Single Hue') {
            colorsPal = colorsPalRedSingle;
        }
        if (colorSelection == 'Red Multi Hue') {
            colorsPal = colorsPalRedMulti;
        }
        if (colorSelection == 'Blue Single Hue') {
            colorsPal = colorsPalBlueSingle;
        }
        if (colorSelection == 'Blue Multi Hue') {
            colorsPal = colorsPalBlueMulti;
        }
        if (colorSelection == 'Green Single Hue') {
            colorsPal = colorsPalGreenMulti;
        }
        if (colorSelection == 'Green Multi Hue') {
            colorsPal = colorsPalGreenMulti;
        }
        mapboxGlLayerCreation();
    });
}

function mapboxGlLayerCreation() {
    // There are 5 cases for managing the state of the map:

    // Case 1:
    // The map is created for the first time

    // Case 2:
    // The data used for thematic map has not changed, so we
    // keep the map source, destroy and recreate the map layers

    // Case 3:
    // The weight change will alter the underlying data, so we
    // update the map style and source

    // Case 3.1
    // Only reload the map for the appropriate weight change level

    // Case 4:
    // A new project has been loaded into the application

    // Case 5:
    // A new color scheme has been selected

    var weightChange = 0;

    if (arguments[0]) {
        weightChange = arguments[0];
    }

    selectedIndicator = $('#webGlThematicSelection').val();

    // Avoid unnecessarily redrawing the map.
    // Only redraw the map when:
        // 1) the level of the weight changes is lower than the level of the thematic map menu.
            // Example 1: if the user is viewing the SVI thematic map, and then changes any theme, or
            // primary indicator weight, the map must be refreshed.
            // Example 2: If the user is viewing a theme thematic map (e.g. Economy), and then changes
            // the SVI weight, the map should not be redrawn.
        // 2) the thematic map menu has been changes
        // 3) a new project is loaded into the map (case: weightChange = 0)
        // 5) (partial reload) a new color scheme has been selected, only recreate the layers, NOT the data source

    // weightChange can be a interger value form 0 to 4, 0 being no change been made to the tree chart
    // weightChange 1 = IRI, 2 = SVI or RI, 3 = a theme, 4 = is a primary indicator.
    // selectedIndicatorLabel is a value from 1 - 4, where 1 = IRI, 2 = SVI or RI, 3 = a theme, 4 is a primary indicator.
    // The selectedIndicatorLabel determines the thematic map layer to be rendered.
    var selectedIndicatorLabel = $('#webGlThematicSelection option:selected').attr('class');

    if (weightChange < parseInt(selectedIndicatorLabel) || parseInt(selectedIndicatorLabel) == 4) {
        if (weightChange !== 0) {
            $('#absoluteSpinner').hide();
            return;
        }
    }

    // Find the values to create categorized color ramp
    // First find the min and max vales
    var minMaxArray = [];
    for (var i = 0; i < mappingLayerAttributes.features.length; i++) {
        var match = false;
        for (var k in mappingLayerAttributes.features[i].properties) {
            if (k == selectedIndicator) {
                match = true;
                minMaxArray.push(mappingLayerAttributes.features[i].properties[k]);
                break
            }
            else {
                match = false;
            }
        }
        if (match === false) {
            return;
        }
    }

    // Focus map on layer
    if (projectChange) {
        map.fitBounds(mapboxBoundingBox);
    }

    var min = Math.min.apply(null, minMaxArray).toFixed(2);
    var max = Math.max.apply(null, minMaxArray).toFixed(2);
    min = (parseFloat(min) - 0.1);
    // Round up the max
    max = Math.ceil(max * 10) / 10;

    var breaks = [];

    function getColor() {
        var interval = (max - min) / 6;
        var tempStep = min;
        for (var i = 0; i < 5; i++) {
            tempStep += interval
            breaks.push(tempStep);
        }
        breaks.unshift(min);
        breaks.push(max);
    }

    getColor();

    // Case 2, and 4, try to remove any existing layers
    try {
        for (var i = 0; i < 6; i++) {
            map.removeLayer(i);
        };
    } catch (e) {
        // continue
    }


    // Case 3 update the source
    if (weightChange) {
        //map.update(true); // Not working for unknown reason.

        // FIXME would really prefer to update the map source here
        map.removeSource('projectSource');
    }

    // Case 4 destory the source
    // Here we use a try catch to manage 2 cases:
    // 1. When a project is loaded for the first time. In this case there is no existing map source or layer,
    // so we try to remove them, but as they do not exist, the app moves on and builds a new source and layer.
    // 2 When a project is loaded for the 2nd, 3rd, nth time. In this case we find that there is a map source
    // and layer that need to be removed, after being removed, the new map source and layers are created.
    // The same logic applies to removeing layers.
    if (projectChange) {
        try {
            map.removeSource('projectSource');
        } catch (e) {
            // continue
        }
    }

    // Case 1 and 4
    // **TEMP** also case 3
    // Populate the mapbox source with GeoJson from Geoserver
    // Only create a new source when the project has been changed
    if (map.style.sources.projectSource === undefined || projectChange || weightChange) {
        map.addSource('projectSource', {
            'type': 'geojson',
            'data': mappingLayerAttributes,
        });
        projectChange = false;
    }

    $('#mapLegend').remove();
    // Create the map legend
    $('#map-tools').append(
        '<div id="mapLegend" class="my-legend">'+
            '<div class="legend-title">'+selectedIndicator+'</div>'+
            '<div class="legend-scale">'+
                '<ul id="legendLables" class="legend-labels">'+
                '</ul>'+
            '</div>'+
        '</div>'
    );

    // Cases 1, 2, 3, 4, and 5
    // Create a new mapbox layers
    for (var i = 0; i < 6; i++) {
        map.addLayer({
            'id': i,
            'type': 'fill',
            'source': 'projectSource',
            "source-layer": "eq-simple",
            'interactive': true,
            'paint': {
                'fill-color': colorsPal[i],
                'fill-opacity': 0.8,
                'fill-outline-color': '#000066'
            },
            'filter': ['all',['>', selectedIndicator, breaks[i]], ['<=', selectedIndicator, breaks[i+1]]]
        });
        // Create legend elements
        $('#legendLables').append('<li><span style="background:'+colorsPal[i]+';"></span>'+breaks[i].toFixed(2)+'</li>');
    }

    $('#absoluteSpinner').hide();

    // Map interactivity
    $('#map-tools').append(
        '<div id="mapInfo"></div>'
    );

    map.on('click', function(e) {
        map.featuresAt(e.point, { radius : 6}, function(err, features) {
            if (err) throw err;
            $('#mapInfo').empty();
            for(var k in features[0].properties) {
                $('#mapInfo').append(k+': '+features[0].properties[k]+'</br>');
            }
        });
    });
    colorPicker();
}

function setupLeafletMap() {
    map = new L.Map('map', {
        minZoom: 2,
        scrollWheelZoom: false,
        attributionControl: false,
        maxBounds: new L.LatLngBounds(new L.LatLng(-90, -180), new L.LatLng(90, 180)),
    });
    map.setView(new L.LatLng(10, -10), 2).addLayer(baseMapUrl);
}


function leafletThematicMap(layerAttributes, allSVIThemes, allPrimaryIndicators, allRiskIndicators, weightChange) {

    // Add main indicators to selection menu
    $('#leafletThematicSelection').empty();
    $('#leafletThematicSelection').append(
        '<optgroup label="Indicators">'+
        '<option>IRI</option>'+
        '<option>SVI</option>'+
        '<option>IR</option>'
    );

    // Add SVI themes to selection menu
    $('#leafletThematicSelection').append('<optgroup label="SVI Indicators">');
    for (var id = 0; id < allSVIThemes.length; id++) {
        $('#leafletThematicSelection').append('<option>'+allSVIThemes[id]+'</option>');
    }

    try {
        if (riskIndicators !== undefined) {
            // Add IR themes to selection menu
            $('#leafletThematicSelection').append('<optgroup label="IR Indicators">');
            for (var ie = 0; ie < allRiskIndicators.length; ie++) {
                $('#leafletThematicSelection').append('<option>'+allRiskIndicators[ie]+'</option>');
            }
        }
    } catch (e) {
        // continue
    }

    // Add all primary indicators to selection menu
    $('#leafletThematicSelection').append('<optgroup label="Composite Indicators">');
    for (var ic = 0; ic < allPrimaryIndicators.length; ic++) {
        $('#leafletThematicSelection').append('<option>'+allPrimaryIndicators[ic]+'</option>');
    }

    // set the map selection menu to IRI or previously selected indicator value
    if (selectedIndicator == undefined) {
        // TODO fix this to use optgroup:first
        //$('#leafletThematicSelection').val('IRI');
        $('#leafletThematicSelection option').eq(3).attr("selected", "selected");
        thematicMapCreation();
    } else {
        $('#leafletThematicSelection').val(selectedIndicator);
    }

    // Execute the thematicMapCreation when there has been a weight change
    if (weightChange > 0) {
        thematicMapCreation();
    }

    $('#leafletThematicSelection').change(function() {
        thematicMapCreation();
    });
}


function thematicMapCreation() {
    $('#leafletThematicSelection').show();
    // Initialize the legend
    var legendControl = new L.Control.Legend();
    legendControl.addTo(map);

    // find the indicator that has been selected
    selectedIndicator = $('#leafletThematicSelection').val();

    var displayElement = 'newProperties.'+selectedIndicator;
    var la = layerAttributes.features;

    // find the min and max values for the selected indicator
    var minMaxArray = [];
    for (var i = 0; i < la.length; i++) {
        for (var k in la[i].newProperties) {
            if (k == selectedIndicator) {
                minMaxArray.push(la[i].newProperties[k]);
            }
        }
    }

    map.fitBounds(leafletBoundingBox);

    var min = Math.min.apply(null, minMaxArray).toFixed(2);
    var max = Math.max.apply(null, minMaxArray).toFixed(2);

    try {
        map.removeLayer(thematicLayer);
    } catch (e) {
        // continue
    }
    try {
        $('.leaflet-control-legend').empty();
    } catch (e) {
        // continue
    }

    // vary the color from yellow (60) to red(0) from min to max values
    var yellowToRed = new L.HSLHueFunction(new L.Point(min, 60), new L.Point(max, 0), {
        //outputHue: 60
    });

    // Set the thematic layer options
    var options = {
        recordsField: 'features',
        locationMode: L.LocationModes.GEOJSON,
        geoJSONField: 'geometry',
        layerOptions: {
            fillOpacity: 0.5,
            opacity: 0.5,
            weight: 1,
            stroke: true,
            color: '#0000FF'
        },
        displayOptions: {}
    };

    options.displayOptions[displayElement] = {
        displayName: selectedIndicator,
        fillColor: yellowToRed
    };

    thematicLayer = new L.ChoroplethDataLayer(layerAttributes, options);
    map.addLayer(thematicLayer);

    legendControl = new L.Control.Legend();
    legendControl.addTo(map);
    $('#absoluteSpinner').hide();
}

function whenProjDefSelected() {
    $('#projectDef-spinner').show();
    var pdSelection = $('#pdSelection').val();
    for (var i = 0; i < tempProjectDef.length; i++) {
        if (tempProjectDef[i].title === pdSelection) {
            // Deep copy the temp project definition object
            sessionProjectDef = jQuery.extend(true, {}, tempProjectDef[i]);
            loadPD(sessionProjectDef);
            $('#iri-spinner').hide();
            $('#project-definition-svg').show();
            processIndicators(layerAttributes, sessionProjectDef);
        }
    }
}

function getGeoServerLayers() {
    $('#load-project-spinner').show();
    var IRMTLayerNames = [];
    var url = "/geoserver/ows?service=WFS&version=1.0.0&REQUEST=GetCapabilities&SRSNAME=EPSG:4326&outputFormat=json&format_options=callback:getJson";
    // Get layers from GeoServer and populate the layer selection menu
    $.ajax({
        url: url,
        contentType: 'application/json',
        success: function(xml) {
            //convert XML to JSON
            var xmlText = new XMLSerializer().serializeToString(xml);
            var x2js = new X2JS();

            var jsonElement = x2js.xml_str2json(xmlText);

            var featureType = jsonElement.WFS_Capabilities.FeatureTypeList.FeatureType;

            // Find the IRMT keywords
            var stringsToLookFor = ['SVIR_QGIS_Plugin', 'IRMT_QGIS_Plugin'];
            // Reload if the api call was incomplete
            if (featureType.length === undefined) {
                getGeoServerLayers();
                return;
            }

            for (var i = 0; i < featureType.length; i++) {
                for (var j=0; j < stringsToLookFor.length; j++) {
                    stringToLookFor = stringsToLookFor[j];
                    if (featureType[i].Keywords.indexOf(stringToLookFor) > -1) {
                        IRMTLayerNames.push(featureType[i].Title + " (" + featureType[i].Name + ")");
                        break;
                    }
                }
            }

            // Create AngularJS dropdown menu
            var mapScope = angular.element($("#layer-list")).scope();
            var mapLayerList = [];
            for (var ij = 0; ij < IRMTLayerNames.length; ij++) {
                var tempObj = {};
                tempObj.name = IRMTLayerNames[ij];
                mapLayerList.push(tempObj);
            }

            mapScope.$apply(function(){
                mapScope.maps = mapLayerList;
            });
            $('#load-project-spinner').hide();
        },
        error: function() {
            $('#ajaxErrorDialog').empty();
            $('#ajaxErrorDialog').append(
                '<p>This application was not able to get a list of layers from GeoServer</p>'
            );
            $('#ajaxErrorDialog').dialog('open');
        }
    });
}


function versionCompare(a, b) {
    // This version check ignores the patch numbers
    if (a === undefined) {
        return -1;
    }

    var i, cmp, len, re = /(\.0)+[^\.]*$/;
    a = (a + '').replace(re, '').split('.');
    b = (b + '').replace(re, '').split('.');
    len = Math.min(a.length, b.length);

    // Check for a match between major release numbers
    if (a[0] !== b[0]) {
        return -1
    }
    // Check for a match between minor release numbers
    else {
        // eg. '1.7' vrs '1.6.7'
        if (a[1] > b[1]) {
            return -1;
        }

        // eg. '1.7' vrs '1.8.7'
        if (a[1] < b[1]) {
            return -1;
        }

        // eg. '1.7' vrs '1.7.1', '1.7' vrs '1.7.5', '1.7' vrs '1.7.9'
        if (a[1] == b[1]) {
            return 1
        }
    }
}

var startApp = function() {

    // Check the browser for webGL support
    function webglDetect(return_context) {
        if (!!window.WebGLRenderingContext) {
            var canvas = document.createElement("canvas"),
                names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
                context = false;

            for(var i=0;i<4;i++) {
                try {
                    context = canvas.getContext(names[i]);
                    if (context && typeof context.getParameter == "function") {
                        // WebGL is enabled
                        if (return_context) {
                            // Return WebGL object if the function's argument is present
                            return {name:names[i], gl:context};
                        }
                        // Else, return just true
                        return true;
                    }
                } catch(e) {}
            }

            // WebGL is supported, but disabled
            return false;
        }

        // WebGL not supported
        return false;
    }


    webGl = webglDetect();

    // using the list, otherwise we would lose the order
    $.each(['projDef', 'iri', 'svi', 'indicators'], function(i, widgetName) {
        // Theme tabs behavior
        var widget = widgetsAndButtons[widgetName].widget;
        widget.resizable({
            minHeight: 220,
            minWidth: 220
        });

        widget.tabs({
            collapsible: false,
            selected: -1,
            active: false,
        });

        widget.draggable({
            stack: "div",  // put on top of the others when dragging
            distance: 0,   // do it even if it's not actually moved
            cancel: "#project-def"
        });
        widget.css({
            'display': 'none',
            'width': '700px',
            'height': '600px',
            'overflow': 'auto',
            'position': 'fixed',
            'left': (10 + i * 40) + 'px',
            'top': (110 + i * 40) + 'px'
        });
    });

    $('#cover').remove();
    $('#projectDef-spinner').hide();
    $('#iri-spinner').hide();
    $('#primary_indicator').hide();
    $('#saveBtn').prop('disabled', true);
    $('#saveBtn').addClass('btn-disabled');

    // Slider
    $(function() {
        $( '#slider-vertical' ).slider({
            orientation: 'vertical',
            range: 'min',
            min: 0,
            max: 100,
            value: 16.666,
            slide: function( event, ui ) {
                $( '#econ-weight' ).val( ui.value );
            }
        });
        $( '#econ-weight' ).val( $( '#slider-vertical' ).slider( 'value' ) );
    });

    $('#map-tools').append(
        '<button id="loadProjectdialogBtn" type="button" class="btn btn-blue">Load Project</button>'
    );
    // Using the list in order to keep the order
    $.each(['indicators', 'svi', 'iri', 'projDef'], function(i, widgetName) {
        // slice(1) removes the heading # from the selector
        var buttonId = widgetsAndButtons[widgetName].button.selector.slice(1);
        var buttonText = widgetsAndButtons[widgetName].buttonText;
        $('#map-tools').append(
            '<button id="' + buttonId + '" type="button" class="btn btn-blue" disabled>' + buttonText + '</button>'
        );
    });

    if (webGl === false) {
        $('#map-tools').append(
            '<select id="leafletThematicSelection">'+
                '<option>Select Indicator</option>'+
            '</select>'
        );

        $('#leafletThematicSelection').hide();

        setupLeafletMap();
    } else {
        $('#map-tools').append(
            '<select id="webGlThematicSelection">'+
                '<option>Select Indicator</option>'+
            '</select>'
        );

        $('#map-tools').append(
            '<select id="webGlColorPicker">'+
                '<option>Red Single Hue</option>'+
                '<option>Red Multi Hue</option>'+
                '<option>Blue Single Hue</option>'+
                '<option>Blue Multi Hue</option>'+
                '<option>Green Single Hue</option>'+
                '<option>Green Multi Hue</option>'+
            '</select>'
        );

        $('#webGlThematicSelection').hide();
        $('#webGlColorPicker').hide();

        setupMapboxGlMap();
    }

    $('#loadProjectdialogBtn').click(function() {
        getGeoServerLayers();
        $('#loadProjectDialog').dialog('open');
    });

    function toggleWidget(widgetAndBtn) {
        // toggle widget and change text on the corresponding button
        var btnText = widgetAndBtn.button.html();
        if (btnText.indexOf('Hide ') >= 0) {  // Change Hide -> Show
            btnText = 'Show ' + btnText.slice(5);
        } else {                              // Change Show -> Hide
            btnText = 'Hide ' + btnText.slice(5);
        }
        widgetAndBtn.widget.toggle();
        widgetAndBtn.button.html(btnText);
    }

    // FIXME: suspect inner definition of click
    $.each(widgetsAndButtons, function(key, widgetAndBtn) {
        widgetAndBtn.button.click(function() {
            toggleWidget(widgetAndBtn);
        });
    });

    // TODO check these are all needed
    $('#region-selection-list').hide();
    $('#svir-project-list').hide();

    $('#svir-project-list').css({ 'margin-bottom' : 0 });
    $('#loadProjectBtn').prop('disabled', true);

    // Enable the load project button once a project has been selected
    $('#layer-list').change(function() {
        $('#loadProjectBtn').prop('disabled', false);
    });

    $('#loadProjectBtn').click(function() {
        setWidgetsToDefault();

        // FIXME This will not work if the title contains '(' or ')'
        // Get the selected layer
        var scope = angular.element($("#layer-list")).scope();
        selectedLayer = scope.selected_map.name;

        // clean the selected layer to get just the layer name
        selectedLayer = selectedLayer.substring(selectedLayer.indexOf("(") + 1);
        selectedLayer = selectedLayer.replace(/[)]/g, '');
        loadProject();
    });

    // AJAX error dialog
    $('#ajaxErrorDialog').dialog({
        autoOpen: false,
        height: 150,
        width: 400,
        closeOnEscape: true,
        modal: true
    });

    $('#saveStateDialog').dialog({
        autoOpen: false,
        height: 520,
        width: 620,
        closeOnEscape: true,
        position: {at: 'right bottom'}
    });

     $('#loadProjectDialog').dialog({
        autoOpen: false,
        height: 520,
        width: 620,
        closeOnEscape: true
    });

    $('#map-tools').css({
        'padding': '6px',
        'position': 'absolute',
        'top': '43px',
        'left': '39px',
        'width': '94%',
        'z-index': 6
    });

    $('#loadProjectdialogBtn').css({
        'position': 'fixed',
        'left': '50px'
    });

    // FIXME: for some reason, this is not styling the buttons
    $.each(widgetsAndButtons, function(key, widgetAndBtn) {
        widgetAndBtn.button.css({
            'position': 'relative',
            'float': 'right',
            'margin-left': '2px'
        });
    });

    $('#base-map-menu').css({
        'position': 'fixed',
        'left': '390px'
    });

    $('#leafletThematicSelection').css({
        'position': 'fixed',
        'left': '160px',
        'margin-bottom' : 0
    });

    $('#webGlThematicSelection').css({
        'position': 'fixed',
        'left': '160px',
        'margin-bottom' : 0
    });

    $('#webGlColorPicker').css({
        'position': 'fixed',
        'left': '160px',
        'margin-bottom' : 0,
        'margin-top': '31px'
    });

    // Check the URL for layer parameter
    var urlLayerParameter = location.href;
    urlLayerParameter = urlLayerParameter.split('irv/')[1];

    if (urlLayerParameter) {
        selectedLayer = urlLayerParameter;
        loadProject();
    }
};

function loadProject() {
    setWidgetsToDefault();
    $('#thematic-map-selection').show();
    attributeInfoRequest(selectedLayer);
    $.each(widgetsAndButtons, function(key, widgetAndBtn) {
        // just enable buttons without opening widgets
        widgetAndBtn.button.prop('disabled', false);
    });
    // open the project definition widget if it's not already open
    if (!widgetsAndButtons.projDef.widget.is(':visible')) {
        widgetsAndButtons.projDef.button.click();
    }
}

function attributeInfoRequest(selectedLayer) {
    $('#loadProjectDialog').dialog('close');
    $('#absoluteSpinner').show();
    // Get layer attributes from GeoServer
    return $.ajax({
        type: 'get',
        url: '/geoserver/oqplatform/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='+ selectedLayer +'&outputFormat=json',
        success: function(data) {
            projectChange = true;
            // Make a global variable used by the d3-tree chart
            // when a weight is modified
            layerAttributes = data;
            projectLayerAttributes = layerAttributes;

            // provide a dropdown menu to select the region field
            var layerFields = [];
            // get all the field name out of the layer attributes object
            for (var key in layerAttributes.features[0].properties) {
                layerFields.push(key);
            }
            projDefJSONRequest(selectedLayer);

        },
        error: function() {
            $('#ajaxErrorDialog').empty();
            $('#ajaxErrorDialog').append(
                '<p>This application was not able to get information about the selected layer</p>'
            );
            $('#ajaxErrorDialog').dialog('open');
        }
    });
}

function projDefJSONRequest(selectedLayer) {
    // Get the project definition
    return $.ajax({
        type: 'get',
        url: '/svir/get_supplemental_information?layer_name='+ selectedLayer,
        success: function(data) {
            // Stop the application and provide an error if webGL is not supported
            // and the vertices count is greater then the vertices threshold
            verticesCount = data.vertices_count;
            if (webGl === false && verticesCount > VERTICES_THRESHOLD) {
                $('#ajaxErrorDialog').empty();
                $('#ajaxErrorDialog').append(
                    '<p>The project geometry is too complex for your browser to manage. Please try using a browser that has WebGL support</p>'
                );
                $('#ajaxErrorDialog').dialog('open');
                $('#absoluteSpinner').hide();
                $('#projectDef-spinner').hide();
                return;
            }

            license = data.license;
            tempProjectDef = data.project_definitions;
            selectedRegion = data.zone_label_field;
            selectedIndicator = undefined;

            // Remove alert div
            $('#alert').remove();

            // Check the svir plugin version
            // Provide some backwards compatibility for old naming convention
            var thisVersion = null;
            if (data.hasOwnProperty('svir_plugin_version')) {
                thisVersion = data.svir_plugin_version;
            } else if (data.hasOwnProperty('irmt_plugin_version')) {
                thisVersion = data.irmt_plugin_version;
            } else {
                $('#projectDef-spinner').hide();
                $('#project-def').append(
                    '<div id="alert" class="alert alert-danger" role="alert">' +
                        'The project you are trying to load was created with a version of the SVIR QGIS tool kit that is not compatible with this application' +
                    '</div>'
                );
                return
            }

            var versionCheck = versionCompare(COMPATIBILITY_VERSION, thisVersion);

            if (versionCheck < 0) {
                // Warn the user and stop the application
                $('#projectDef-spinner').hide();
                $('#project-def').append(
                    '<div id="alert" class="alert alert-danger" role="alert">' +
                        'The project you are trying to load was created with a version of the SVIR QGIS tool kit that is not compatible with this application' +
                    '</div>'
                );
                return
            }

            // Populate global bounding box array
            leafletBoundingBox = [
                [data.bounding_box.miny, data.bounding_box.minx],
                [data.bounding_box.maxy, data.bounding_box.maxx]
            ];

            mapboxBoundingBox = [
                [data.bounding_box.minx,data.bounding_box.miny],
                [data.bounding_box.maxx, data.bounding_box.maxy]
            ];

            if ($('#pdSelection').length > 0) {
                $('#pdSelection').remove();
            }

            // Create the pd selection menu
            $('#project-def').prepend('<select id="pdSelection" onChange="whenProjDefSelected();"><option value"" disabled selected>Select a Project Definition</option></select>');
            var pdTitles = [];

            // break the array into objects, present the user with a choice of PDs
            for (var i = 0; i < tempProjectDef.length; i++) {
                // Get the PD title
                pdTitles.push(tempProjectDef[i].title);
            }
            // Provide the user with a selection dropdown of the available PDs
            for (var ia = 0; ia < pdTitles.length; ia++) {
                $('#pdSelection').append(
                    '<option value="'+ pdTitles[ia] +'">'+ pdTitles[ia] +'</option>'
                );
            }

            // select the first project definition in menu dropdown list
            try {
                var menuOption = $('#pdSelection');
                menuOption[0].selectedIndex = 1;
            } catch (e) {
                // continue
            }

            triggerPdSelection();
            $('#projectDef-spinner').hide();
        },
        error: function() {
            $('#ajaxErrorDialog').empty();
            $('#ajaxErrorDialog').append(
                '<p>The project you are trying to load does not apear to be valid.</p>'
            );
            $('#ajaxErrorDialog').dialog('open');
        }
    });
}

// Trigger first project definition selection
function triggerPdSelection () {
    $('#pdSelection').trigger('change');
}

app.initialize(startApp);
