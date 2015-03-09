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
var layerAttributes;
var sessionProjectDef = [];
var selectedRegion;
var sessionProjectDefStr;
var projectLayerAttributes;
var region = [];
var districts = [];
var baseMapUrl = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png');
var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

function createIndexSimple(la, index) {
    var indicator = [];
    // setup the indicator with all the municipalities
    for (var ia = 0; ia < la.length; ia++) {
        var temp = {};
        temp.region = la[ia].properties[selectedRegion];
        indicator.push(temp);
        // districts is used inside of the d3 charts
        districts.push(la[ia].properties[selectedRegion]);
    }
    // Get the indicators children keys
    var indicatorChildrenKey = [];
    for (var q = 0; q < index.length; q++) {
        indicatorChildrenKey.push(index[q].name);
    }
    // Match each primary indicator with it's respective data value
    var primaryRiskIndicatorObj = {};
    for (var ic = 0; ic < la.length; ic++) {
        var tempObj = la[ic].properties;
        for (var d = 0; d < indicatorChildrenKey.length; d++) {
            for(var o in tempObj) {
                if (indicatorChildrenKey[d] == o) {
                    var tempValue = indicatorChildrenKey[d];
                    var tempValue2 = tempObj[o];
                    var tempValue3 = tempObj[selectedRegion];
                    if (primaryRiskIndicatorObj[tempValue] == undefined) {
                        primaryRiskIndicatorObj[tempValue] = tempValue2;
                        primaryRiskIndicatorObj.district = tempValue3;
                    } else {
                        primaryRiskIndicatorObj[tempValue] = primaryRiskIndicatorObj[tempValue] + "," +tempValue2;
                        primaryRiskIndicatorObj.district = primaryRiskIndicatorObj.district + "," +tempValue3;
                    }
                }
            }
        }
    }
    return primaryRiskIndicatorObj;
}

function createIndex(la, index) {
    var ct = 0;
    var indicator = [];
    // setup the indicator with all the municipalities
    for (var ia = 0; ia < la.length; ia++) {
        var temp = {};
        temp.region = la[ia].properties[selectedRegion];
        indicator.push(temp);
    }
    for (var i = 0; i < index.length; i++) {
        for (var j = 0; j < la.length; j++, ct++) {
            if (indicator[j].region == la[j].properties[selectedRegion]) {
                var tempName = index[i].name;
                var tempValue = la[j].properties[tempName];
                indicator[j][tempName] = tempValue;
            }
        }
    }
    return indicator;
}

function combineIndicators(nameLookUp, themeObj, JSONthemes) {
    projectDef = sessionProjectDef;
    var ct = 0;
    var subIndex = {};
    var operator;
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
    // get some info aobut the themes
    var themekeys = [];
    var themeWeightObj = {};
    for (var u = 0; u < JSONthemes.length; u++) {
        var themeName = JSONthemes[u].name;
        var themeWeight = JSONthemes[u].weight;
        themekeys.push(themeName);
        themeWeightObj[themeName] = themeWeight;
    }
    // compute the subIndex values based on operator
    if (operator == 'Simple sum (ignore weights)') {
        for (var v = 0; v < themeObj.length; v++) {
            var tempElementValue = 0;
            var themeObjMunic = themeObj[v].region;
            // sum the themes
            for (var w = 0; w < themekeys.length; w++, ct++) {
                var tempThemeName = themekeys[w];
                tempElementValue = tempElementValue + themeObj[v][tempThemeName];
            }
            subIndex[themeObjMunic] = tempElementValue;
        }
    } else if (operator == 'Weighted sum') {
        for (var v1 = 0; v1 < themeObj.length; v1++) {
            var tempElementValue = 0;
            var themeObjMunic = themeObj[v1].region;
            // sum the themes
            for (var w1 = 0; w1 < themekeys.length; w1++, ct++) {
                var tempThemeName = themekeys[w1];
                var themeWeightVal = themeWeightObj[tempThemeName];
                tempElementValue = tempElementValue + (themeObj[v1][tempThemeName] * themeWeightVal);
            }
            subIndex[themeObjMunic] = tempElementValue;
        }
    } else if (operator == 'Average (ignore weights)') {
        for (var v2 = 0; v2 < themeObj.length; v2++) {
            var tempElementValue = 0;
            var themeObjMunic = themeObj[v2].region;
            // sum the themes
            for (var w2 = 0; w2 < themekeys.length; w2++, ct++) {
                var tempThemeName = themekeys[w2];
                tempElementValue = tempElementValue + themeObj[v2][tempThemeName];
            }
            var themeAverage = tempElementValue / themekeys.length;
            subIndex[themeObjMunic] = themeAverage;
        }
    } else if (operator == 'Simple multiplication (ignore weights)') {
        for (var v3 = 0; v3 < themeObj.length; v3++) {
            var tempElementValue = 0;
            var themeObjMunic = themeObj[v3].region;
            // sum the themes
            for (var w3 = 0; w3 < themekeys.length; w3++, ct++) {
                var tempThemeName = themekeys[w3];
                if (tempElementValue == 0) {
                    tempElementValue = themeObj[v3][tempThemeName];
                } else {
                    tempElementValue = tempElementValue * themeObj[v3][tempThemeName];
                }
            }
            subIndex[themeObjMunic] = tempElementValue;
        }
    } else if (operator == 'Weighted multiplication') {
        for (var v4 = 0; v4 < themeObj.length; v4++) {
            var tempElementValue = 0;
            var themeObjMunic = themeObj[v4].region;
            // sum the themes
            for (var w4 = 0; w4 < themekeys.length; w4++, ct++) {
                var tempThemeName = themekeys[w4];
                var themeWeightVal = themeWeightObj[tempThemeName];
                if (tempElementValue == 0) {
                    tempElementValue = (themeObj[v4][tempThemeName] * themeWeightVal);
                } else {
                    tempElementValue = tempElementValue * (themeObj[v4][tempThemeName] * themeWeightVal);
                }
            }
            subIndex[themeObjMunic] = tempElementValue;
        }
    }
    return subIndex;
}

function processIndicators(layerAttributes, projectDef) {
    districts = [];

    /////////////////////////////////////////////
    //// Create the primary indicator objects ///
    /////////////////////////////////////////////

    var socialVulnIndex;
    var riskIndex;

    // Find all the nodes of type social vulnerability and risk index in the project def
    for (var k in projectDef.children) {
        if (projectDef.children[k].type == "Social Vulnerability Index") {
            socialVulnIndex = projectDef.children[k].children;
        } else if (projectDef.children[k].type == "Risk Index") {
            riskIndex = projectDef.children[k].children;
        }
    }

    // process each Social Vulnerability Index nodes
    // Get all the primary indicators
    var allPrimaryIndicators = [];
    var ct = 0;

    for (var i = 0; i < socialVulnIndex.length; i++) {
        for (var e = 0 ; e < socialVulnIndex[i].children.length; e++, ct++ ) {
            allPrimaryIndicators.push(socialVulnIndex[i].children[e].field);
        }
    }

    // Match each primary indicator with it's respective data value
    var primaryIndicatorObj = {};

    for (var h = 0; h < layerAttributes.features.length; h++) {
        var tempProps = layerAttributes.features[h].properties;
        for (var d = 0; d < allPrimaryIndicators.length; d++) {
            for (var field in tempProps) {
                if (allPrimaryIndicators[d] == field) {
                    var tempFieldName = allPrimaryIndicators[d];
                    var tempFieldValue = tempProps[field];
                    var tempRegionName = tempProps[selectedRegion];

                    if (primaryIndicatorObj[tempFieldName] == undefined) {
                        primaryIndicatorObj[tempFieldName] = tempFieldValue;
                        primaryIndicatorObj.municipio = tempRegionName;
                    } else {
                        primaryIndicatorObj[tempFieldName] = primaryIndicatorObj[tempFieldName] + "," +tempFieldValue;
                        primaryIndicatorObj.municipio = primaryIndicatorObj.municipio + "," +tempRegionName;
                    }
                }
            }
        }
    }

    /////////////////////////////////////////
    //// Compute the Category indicators ////
    /////////////////////////////////////////

    //build the category indicator object
    var catData = [];
    tempString = [];

    function generateObject(temp) {
        var munic = temp[0];
        var theme = temp[1];
        var value = parseFloat(temp[2]);
        // add the theme and value to each category data object
        for (var i = 0; i < catData.length; i++) {
            if (catData[i].region == munic) {
                catData[i][theme] = value;
            }
        }
    }

    // setup catData with all the municipalities
    var la = layerAttributes.features;
    for (var s = 0; s < la.length; s++) {
        var temp = {};
        temp.region = la[s].properties[selectedRegion];
        catData.push(temp);
    }

    // Find the theme information
    for (var m = 0; m < socialVulnIndex.length; m++) {
        var operator = socialVulnIndex[m].operator;
        var weight = socialVulnIndex[m].weight;
        var name = socialVulnIndex[m].name;
        var tempChildren = socialVulnIndex[m].children;
        var indicatorChildrenKey = [];
        // Get the indicators children keys
        for (var q = 0; q < tempChildren.length; q++) {
            indicatorChildrenKey.push(tempChildren[q].field);
        }

        // iterate over the layerAttributes to access the data
        for (var o = 0; o < la.length; o++, ct++) {
            var tempSum = 0;
            // check the operator type and compute accordingly
            if (operator == "Average (ignore weights)") {
                for (var p in la[o].properties) {
                    // iterate over the indicator child keys
                    for (var r = 0; r < indicatorChildrenKey.length; r++, ct++) {
                        if (p == indicatorChildrenKey[r]) {
                            // Sum the theme indicators
                            tempSum = tempSum + la[o].properties[p];
                        }
                    }
                }
                var munic = la[o].properties[selectedRegion];
                var theme = name;
                // Grab the average
                var average = tempSum / indicatorChildrenKey.length;
                tempString.push(munic + '|'+ theme +'|'+ average);
            } else if ( operator == "Simple sum (ignore weights)") {
                for (var p1 in la[o].properties) {
                    // iterate over the indicator child keys
                    for (var r1 = 0; r1 < indicatorChildrenKey.length; r1++, ct++) {
                        if (p1 == indicatorChildrenKey[r1]) {
                            // Sum the theme indicators
                            tempSum = tempSum + la[o].properties[p1];
                        }
                    }
                }
                var munic1 = la[o].properties[selectedRegion];
                var theme1 = name;
                tempString.push(munic1 + '|'+ theme1 +'|'+ tempSum);
            } else if ( operator == "Weighted sum") {
                for (var p2 in la[o].properties) {
                    // iterate over the indicator child keys
                    for (var r2 = 0; r2 < indicatorChildrenKey.length; r2++, ct++) {
                        if (p2 == indicatorChildrenKey[r2]) {
                            // Sum the theme indicators
                            var weight = tempChildren[r2].weight;
                            tempSum = tempSum + (la[o].properties[p2] * weight);
                        }
                    }
                }
                var munic2 = la[o].properties[selectedRegion];
                var theme2 = name;
                tempString.push(munic2 + '|'+ theme2 +'|'+ tempSum);
            } else if ( operator == "Simple multiplication (ignore weights)") {
                for (var p3 in la[o].properties) {
                    // iterate over the indicator child keys
                    for (var r3 = 0; r3 < indicatorChildrenKey.length; r3++, ct++) {
                        if (p3 == indicatorChildrenKey[r3]) {
                            // Sum the theme indicators
                            if (tempSum == 0) {
                                tempSum = la[o].properties[p3];
                            } else {
                                tempSum = tempSum * la[o].properties[p3];
                            }
                        }
                    }
                }
                var munic3 = la[o].properties[selectedRegion];
                var theme3 = name;
                tempString.push(munic3 + '|'+ theme3 +'|'+ tempSum);
            } else if ( operator == "Weighted multiplication") {
                for (var p4 in la[o].properties) {
                    // iterate over the indicator child keys
                    for (var r4 = 0; r4 < indicatorChildrenKey.length; r4++, ct++) {
                        if (p4 == indicatorChildrenKey[r4]) {
                            // Sum the theme indicators
                            var weight = tempChildren[r4].weight;
                            if (tempSum == 0) {
                                tempSum = (la[o].properties[p4] * weight);
                            } else {
                                tempSum = tempSum * (la[o].properties[p4] * weight);
                            }
                        }
                    }
                }
                var munic4 = la[o].properties[selectedRegion];
                var theme4 = name;
                tempString.push(munic4 + '|'+ theme4 +'|'+ tempSum);
            }
        }
    }

    for (var p5 = 0; p5 < tempString.length; p5++) {
        // capture an array for each record
        var temp;
        temp = tempString[p5];
        temp = temp.split("|");
        generateObject(temp);
    }

    var districName = "temp";
    Category_PCP_Chart(catData, region, districName);

    /////////////////////////
    //// Compute the SVI ////
    /////////////////////////

    var SVI = {};
    var sviNameLookUp = 'SVI';
    var sviJSONthemes = socialVulnIndex;
    // SVI is an object with region and value
    SVI = combineIndicators(sviNameLookUp, catData, sviJSONthemes );

    ///////////////
    //// Scale ////
    ///////////////

    scale(SVI);

    ////////////////////////////////
    //// Compute the risk index ////
    ////////////////////////////////

    createIndexSimple(la, riskIndex);
    var riskIndicator = createIndex(la, riskIndex);

    ////////////////////////////////////
    //// Compute the Risk Indicator ////
    ////////////////////////////////////

    var RI = {};
    var nameLookUp = 'RI';
    var riJSONthemes = riskIndex;
    RI = combineIndicators(nameLookUp, riskIndicator, riJSONthemes);

    ///////////////
    //// Scale ////
    ///////////////

    scale(RI);

    ///////////////////////////////
    //// Compute the IRI index ////
    ///////////////////////////////

    var IRI = {};
    var sviWeight;
    var riWeight;
    var iriOperator = projectDef.operator;
    for (var ik = 0; ik < projectDef.children.length; ik++) {
        if (projectDef.children[ik].name == 'RI') {
            riWeight = projectDef.children[ik].weight;
        } else if (projectDef.children[ik].name == 'SVI') {
            sviWeight = projectDef.children[ik].weight;
        }
    }
    if (iriOperator == "Average (ignore weights)") {
        for (var regionName in SVI) {
            tempVal = SVI[regionName] + RI[regionName];
            var iriAverage = tempVal / 2;
            IRI[regionName] = iriAverage;
        }
    } else if (iriOperator == "Simple sum (ignore weights)") {
        for (var regionName in SVI) {
            tempVal = SVI[regionName] + RI[regionName];
            IRI[regionName] = tempVal;
        }
    } else if (iriOperator == "Weighted sum") {
        for (var regionName in SVI) {
            tempVal = (SVI[regionName] * sviWeight) + (RI[regionName] * riWeight);
            IRI[regionName] = tempVal;
        }
    } else if (iriOperator == "Simple multiplication (ignore weights)") {
        for (var regionName in SVI) {
            tempVal = SVI[regionName] * RI[regionName];
            IRI[regionName] = tempVal;
        }
    } else if (iriOperator == "Weighted multiplication") {
        for (var regionName in SVI) {
            tempVal = (SVI[regionName] * sviWeight) * (RI[regionName] * riWeight);
            IRI[regionName] = tempVal;
        }
    }

    ///////////////
    //// Scale ////
    ///////////////

    scale(IRI);

    // pass the new values back into the layer attributes object for use in thematic map
    for (var ix = 0; ix < la.length; ix++) {
        for (var key in IRI) {
            if (key == la[ix].properties[selectedRegion]) {
                //la[ix]['newProperties'] = {};
                la[ix].properties['newIRI'] = (IRI[key] * 100);
            }
        }
        for (var key in SVI) {
            if (key == la[ix].properties[selectedRegion]) {
                la[ix].properties['newSVI'] = (SVI[key] * 100);
            }
        }
        for (var key in RI) {
            if (key == la[ix].properties[selectedRegion]) {
                la[ix].properties['newIR'] = (RI[key] * 100);
            }
        }
    }

    console.log('la:');
    console.log(la);

    IRI.plotElement = "iri"; // Lable within the object
    RI.plotElement = "ri"; // Lable within the object
    SVI.plotElement = "svi"; // Lable within the object
    var iriPcpData = [];
    iriPcpData.push(IRI);
    iriPcpData.push(SVI);
    iriPcpData.push(RI);
    IRI_PCP_Chart(iriPcpData);

    thematicMap(layerAttributes);


    ///////////////////////////////////
    //// Compute the IRI Indicator ////
    ///////////////////////////////////

} // End processIndicators

function scale(IndicatorObj) {
    var ValueArray = [];
    var scaledValues = [];
    for (var v in IndicatorObj) {
        ValueArray.push(IndicatorObj[v]);
    }
    var tempMin = Math.min.apply(null, ValueArray),
        tempMax = Math.max.apply(null, ValueArray);
    for (var j = 0; j < ValueArray.length; j++) {
        // TODO make sure not to devide by zero
        scaledValues.push( (ValueArray[j] - tempMin) / (tempMax - tempMin) );
    }
    var tempKeys = Object.keys(IndicatorObj);
    for (var ih = 0; ih < tempKeys.length; ih++) {
        IndicatorObj[tempKeys[ih]] = scaledValues[ih];
    }
    return IndicatorObj
}

function thematicMap(layerAttributes) {

    // find the indicator that has been selected
    var selectedIndex = document.getElementById('thematic-map-selection').value;
    var displayElement = 'properties.new'+selectedIndex;
    console.log('displayElement:');
    console.log(displayElement);

    try {
        map.removeLayer(thematicLayer);
        console.log('remove the old layer:');
    } catch (e) {
        // continue
    }
    // Make some polygons from the WFS using leaflet-dvf
    var colorFunctionGreenRed = new L.HSLHueFunction(new L.Point(1,120), new L.Point(55,0));
    var colorFunction1 = new L.HSLLuminosityFunction(
        new L.Point(1,0.75),
        new L.Point(55,0.2),
        {
            outputHue: 240,
            outputSaturation: '100%'
        }
    );
    var opacityFunction = new L.PiecewiseFunction(
        [
            new L.LinearFunction(
                new L.Point(0, 0),
                new L.Point(1, 0.7)
            ),
            new L.LinearFunction(
                new L.Point(1, 0.7),
                new L.Point(55, 0.7)
            )
        ]
    );
    // For the full options, see the documentation
    var options = {
        recordsField: 'features',
        locationMode: L.LocationModes.GEOJSON,
        geoJSONField: 'geometry',
        layerOptions: {
            fillOpacity: 1,
            opacity: 1,
            weight: 1,
            stroke: true,
            color: '#0000FF'
        },
        displayOptions: {},
        /*
        displayOptions: {
            //displayElement: {
            'properties.newIRI': {
                displayName: 'COUNTRY_NA',
                fillColor: colorFunctionGreenRed,
                fillOpacity: opacityFunction
            }
        }
        */
    };

    options.displayOptions[displayElement] = {
        displayName: 'COUNTRY_NA',
        fillColor: colorFunctionGreenRed,
        fillOpacity: opacityFunction
    };

    console.log('options:');
    console.log(options);
    var thematicLayer = new L.ChoroplethDataLayer(layerAttributes, options);
    map.addLayer(thematicLayer);
}

var startApp = function() {
    $('#projectDef-spinner').hide();
    $('#iri-spinner').hide();
    map = new L.Map('map', {
        minZoom: 2,
        scrollWheelZoom: false,
        attributionControl: false,
        maxBounds: new L.LatLngBounds(new L.LatLng(-90, -180), new L.LatLng(90, 180)),
    });
    map.setView(new L.LatLng(10, -10), 2).addLayer(baseMapUrl);

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
        '<select id="thematic-map-selection">'+
            '<option>IRI</option>'+
            '<option>SVI</option>'+
            '<option>IR</option>'+
        '</select>'
    );

    $('#map-tools').append('<select id="svir-project-list">'+
            '<option selected disabled>Select Project</option>'+
        '</select>'
    );

    $('#thematic-map-selection').css({ 'margin-bottom' : 0 });
    $('#svir-project-list').css({ 'margin-bottom' : 0 });
    $('#region-selection-list').css({ 'margin-bottom' : 0 });
    $('#svir-project-list').hide();
    $('#region-selection-list').hide();
    var SVIRLayerNames = [];
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

            // Find the SVIR keywords
            var stringToLookFor = 'SVIR_QGIS_Plugin';
            for (var i = 0; i < featureType.length; i++) {
                if (featureType[i].Keywords.indexOf(stringToLookFor) > -1) {
                    var tempTitle = featureType[i].Title;
                    var tempName = featureType[i].Name;
                    SVIRLayerNames.push(featureType[i].Title + " (" + featureType[i].Name + ")");
                }
            }
            // Append the layer to the selection dropdown menu
            for (var ij = 0; ij < SVIRLayerNames.length; ij++) {
                $('#svir-project-list').append('<option>'+ SVIRLayerNames[ij] +'</option>');
            }
            $('#svir-project-list').show();
        },
        error: function() {
            $('#ajaxErrorDialog').empty();
            $('#ajaxErrorDialog').append(
                    '<p>This application was not able to get a list of layers from GeoServer</p>'
                );
            $('#ajaxErrorDialog').dialog('open');
        }
    });

    $('#thematic-map-selection').change(function() {
        thematicMap(layerAttributes);
    });

    // Get the layer metadata (project def)
    $('#svir-project-list').change(function() {
        $('#projectDef-spinner').show();
        $('#iri-spinner').show();
        // Get the selected layer
        var selectedLayer = document.getElementById('svir-project-list').value;
        // clean the selected layer to get just the layer name
        selectedLayer = selectedLayer.substring(selectedLayer.indexOf("(") + 1);
        selectedLayer = selectedLayer.replace(/[)]/g, '');

        // Get layer attributes from GeoServer
        $.ajax({
            type: 'get',
            url: '/geoserver/oqplatform/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='+ selectedLayer +'&outputFormat=json',
            success: function(data) {
                console.log('data:');
                console.log(data);

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

                $('#regionSelectionDialog').append(
                    '<p>Please select the field that contains the layer&#39s region labels</p>'+
                    '<select id="region-selection-list">'+
                    '<option selected disabled>Select Region</option>'+
                    '</select>'
                );

                // append each field to the selection menu
                for (var i = 0; i < layerFields.length; i++) {
                    $('#region-selection-list').append('<option>'+ layerFields[i] +'</option>');
                }

                $('#regionSelectionDialog').dialog('open');

                $('#region-selection-list').change(function() {
                    selectedRegion = document.getElementById('region-selection-list').value;
                    getLayerInfo(selectedLayer, layerAttributes);
                });
            },
            error: function() {
            $('#ajaxErrorDialog').empty();
            $('#ajaxErrorDialog').append(
                    '<p>This application was not able to get information about the selected layer</p>'
                );
            $('#ajaxErrorDialog').dialog('open');
            }
        });
    });


    function getLayerInfo(selectedLayer, layerAttributes) {
        $('#regionSelectionDialog').dialog('close');
        $.ajax({
            type: 'get',
            url: '../svir/get_layer_metadata_url?layer_name='+ selectedLayer,
            success: function(layerMetadataURL) {
                // ***** TEMP remove this ****
                layerMetadataURL = '/catalogue/csw?outputschema=http%3A%2F%2Fwww.isotc211.org%2F2005%2Fgmd&service=CSW&request=GetRecordById&version=2.0.2&elementsetname=full&id=d5e173c8-b77d-11e4-a48e-0800278c33b4';
                //layerMetadataURL = "/catalogue/csw?outputschema=http%3A%2F%2Fwww.isotc211.org%2F2005%2Fgmd&service=CSW&request=GetRecordById&version=2.0.2&elementsetname=full&id=4dc11a14-b04f-11e4-8f64-0800278c33b4";
                $.get( layerMetadataURL, function( layerMetadata ) {
                    //convert XML to JSON
                    var xmlText = new XMLSerializer().serializeToString(layerMetadata);
                    var x2js = new X2JS();
                    var jsonElement = x2js.xml_str2json(xmlText);
                    //pass a string representing the project def into the d3 tree chart
                    sessionProjectDefStr = jsonElement.GetRecordByIdResponse.MD_Metadata.identificationInfo.MD_DataIdentification.supplementalInformation.CharacterString.__text;
                    loadPD(sessionProjectDefStr);
                    sessionProjectDef = jQuery.parseJSON(sessionProjectDefStr);
                    // get b-box
                    var boundingBox = jsonElement.GetRecordByIdResponse.MD_Metadata.identificationInfo.MD_DataIdentification.extent.EX_Extent.geographicElement.EX_GeographicBoundingBox;
                    if (boundingBox != undefined) {
                        map.fitBounds (
                            L.latLngBounds (
                                L.latLng (
                                    parseFloat(boundingBox.northBoundLatitude.Decimal.__text),
                                    parseFloat(boundingBox.eastBoundLongitude.Decimal.__text)
                                ),
                                L.latLng (
                                    parseFloat(boundingBox.southBoundLatitude.Decimal.__text),
                                    parseFloat(boundingBox.westBoundLongitude.Decimal.__text)
                                )
                            )
                        );
                    }
                    $('#projectDef-spinner').hide();
                    $('#iri-spinner').hide();
                    $('#project-definition-svg').show();
                    $('#region-selection-list').show();
                    processIndicators(layerAttributes, sessionProjectDef);
                });
            },
            error: function() {
            $('#ajaxErrorDialog').empty();
            $('#ajaxErrorDialog').append(
                    '<p>This application was not able to get the supplemental information about the selected layer</p>'
                );
            $('#ajaxErrorDialog').dialog('open');
            }
        });
        // Get WMS layer
        //http://192.168.56.10:8080/geoserver/oqplatform/wms?service=WMS&version=1.1.0&request=GetMap&layers=oqplatform:ben2&styles=&bbox=-109.450553894043,-55.9840278625488,-28.8472194671629,13.3945837020875&width=512&height=440&srs=EPSG:4326&format=image%2Fpng
        /*
        var WMSLayer = L.tileLayer.wms("/geoserver/oqplatform/wms", {
            layers: selectedLayer,
            format: 'image/png',
            transparent: true,
            version: '1.1.0',
            attribution: "",
            crs: L.CRS.EPSG4326
        });

        WMSLayer.addTo(map);
        */
    }

    // Region selection dialog
    $('#regionSelectionDialog').dialog({
        autoOpen: false,
        height: 150,
        width: 400,
        closeOnEscape: true,
        modal: true
    });

    // AJAX error dialog
    $('#ajaxErrorDialog').dialog({
        autoOpen: false,
        height: 150,
        width: 400,
        closeOnEscape: true,
        modal: true
    });

    $(function() {
        $( '#categoryTabs' ).tabs({
            collapsible: false,
            selected: -1,
            active: false,
            height: 550
        });
    });

};

app.initialize(startApp);
