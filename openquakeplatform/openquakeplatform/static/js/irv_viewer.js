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

var sessionProjectDef = [];

var utfGrid = {};
var layerControl;
var selectedPDef;
var previousCatData = [];

var TILESTREAM_URL = TS_URL + '/v2/';
var TILESTREAM_API_URL = TS_URL + '/api/v1/Tileset/';

// Keep track of the layer names
var layers;

// Make a list of categorys
var categoryList = [];
var layersByCat = {};
var layerNames = {};
var layerGrids = [];
var projectDefinition = {};

// Indicators for the PCP charts
var primaryIndicator = {};
var categoryIndicator = {};
var sessionPrimaryIndicator = {};
var sessionCategoryIndicator = {};
var weightedPrimaryIndicator = {};
var catIndicator = {};
var weightedCatIndicator = {};
var scaledCatIndicator = {};
var aalIndicator = {};
var scaledAalIndicator = {};
var weightedAalIndicator = {};
var sviIndicator = {};
var scaledSviIndicator = {};
var weightedSviIndicator = {};
var iriIndicator = {};

// vars used to set the weights of the project definition json
var pdData;

// Keep track of project definition elements whos weights have been changes
var tempWeight = {};
var tempCatWeight = {};
var pdTempPrimaryIndicator = [];
var pdTempPrimaryIndicatorLevels = [];
var pdTempPILevel = {};
var pdTempCategoryIndicator = [];
var parentChildKey = {};
var sviParentChildKey = {};
var pdTempCatWeight = {};
var tempParentChildKey = [];
var catIndicator = {};
var tempCatSearchElements = [];
var tempSviSearchElements = [];
var tempSviWeight = '';
var tempAalWeight = '';
var tempAalValue = '';
var tempIriWeight = '';
var municipality = [];
var outlierBreakPoint = 0.75; // used for the primary indicator outlier
var districts = [];
var projectLayerAttributes;

// Keep track of the utfGrid that has been selected last
var selectedGrid;
var baseMapUrl = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png');

var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

function createIndexSimple(la, index) {
    var ct = 0;
    var indicator = [];
    var tempString = [];
    // setup the indicator with all the municipalities
    for (var ia = 0; ia < la.length; ia++) {
        var temp = {};
        temp.municipality = la[ia].properties.COUNTRY_NA;
        indicator.push(temp);
        districts.push(la[ia].properties.COUNTRY_NA);
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
                    var tempValue3 = tempObj.COUNTRY_NA;
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
        temp.municipality = la[ia].properties.COUNTRY_NA;
        indicator.push(temp);
    }
    for (var i = 0; i < index.length; i++) {
        for (var j = 0; j < la.length; j++, ct++) {
            if (indicator[j].municipality == la[j].properties.COUNTRY_NA) {
                var tempName = index[i].name;
                var tempValue = la[j].properties[tempName];
                indicator[j][tempName] = tempValue;
            }
        }
    }
    return indicator;
}

function generateIndicatorObj(tempVal, indicator) {
    var tempDist = tempVal[0];
    var tempField  = tempVal[1];
    var tempVal = parseFloat(tempVal[2]);
    // add the info to risk indicator object
    for (var ie = 0; ie < indicator.length; ie++) {
        if (indicator[ie].municipality == tempDist) {
            indicator[ie][tempField] = tempVal;
        }
    }
}

function combindIndicators(nameLookUp, themeObj, JSONthemes) {
    projectDef = sessionProjectDef;
    var ct = 0;
    var newObj = {};
    var operator;
    for (var y = 0; y < projectDef.children.length; y++) {
        if (projectDef.children[y].name == nameLookUp) {
            operator = projectDef.children[y].operator;
        }
    }
    // first create an object with all of the district names
    for (var t = 0; t < themeObj.length; t++) {
        var temp = themeObj[t]['municipality'];
        newObj[temp] = 0;
    }
    // get some info aobut the themes
    var themekey = [];
    var themeWeightObj = {};
    for (var u = 0; u < JSONthemes.length; u++) {
        var themeName = JSONthemes[u].name;
        var themeWeight = JSONthemes[u].weight;
        themekey.push(themeName);
        themeWeightObj[themeName] = themeWeight;
    }
    // compute the newObj values based on operator
    if (operator == 'Simple sum (ignore weights)') {
        for (var v = 0; v < themeObj.length; v++) {
            var tempElementValue = 0;
            var themeObjMunic = themeObj[v].municipality;
            // sum the themes
            for (var w = 0; w < themekey.length; w++, ct++) {
                var tempThemeName = themekey[w];
                tempElementValue = tempElementValue + themeObj[v][tempThemeName];
            }
            newObj[themeObjMunic] = tempElementValue;
        }
    } else if (operator == 'Weighted sum') {
        for (var v1 = 0; v1 < themeObj.length; v1++) {
            var tempElementValue = 0;
            var themeObjMunic = themeObj[v1].municipality;
            // sum the themes
            for (var w1 = 0; w1 < themekey.length; w1++, ct++) {
                var tempThemeName = themekey[w1];
                var themeWeightVal = themeWeightObj[tempThemeName];
                tempElementValue = tempElementValue + (themeObj[v1][tempThemeName] * themeWeightVal);
            }
            newObj[themeObjMunic] = tempElementValue;
        }
    } else if (operator == 'Average (ignore weights)') {
        for (var v2 = 0; v2 < themeObj.length; v2++) {
            var tempElementValue = 0;
            var themeObjMunic = themeObj[v2].municipality;
            // sum the themes
            for (var w2 = 0; w2 < themekey.length; w2++, ct++) {
                var tempThemeName = themekey[w2];
                tempElementValue = tempElementValue + themeObj[v2][tempThemeName];
            }
            var themeAverage = tempElementValue / themekey.length;
            newObj[themeObjMunic] = themeAverage;
        }
    } else if (operator == 'Simple multiplication (ignore weights)') {
        for (var v3 = 0; v3 < themeObj.length; v3++) {
            var tempElementValue = 0;
            var themeObjMunic = themeObj[v3].municipality;
            // sum the themes
            for (var w3 = 0; w3 < themekey.length; w3++, ct++) {
                var tempThemeName = themekey[w3];
                if (tempElementValue == 0) {
                    tempElementValue = themeObj[v3][tempThemeName];
                } else {
                    tempElementValue = tempElementValue * themeObj[v3][tempThemeName];
                }
            }
            newObj[themeObjMunic] = tempElementValue;
        }
    } else if (operator == 'Weighted multiplication') {
        for (var v4 = 0; v4 < themeObj.length; v4++) {
            var tempElementValue = 0;
            var themeObjMunic = themeObj[v4].municipality;
            // sum the themes
            for (var w4 = 0; w4 < themekey.length; w4++, ct++) {
                var tempThemeName = themekey[w4];
                var themeWeightVal = themeWeightObj[tempThemeName];
                if (tempElementValue == 0) {
                    tempElementValue = (themeObj[v4][tempThemeName] * themeWeightVal);
                } else {
                    tempElementValue = tempElementValue * (themeObj[v4][tempThemeName] * themeWeightVal);
                }
            }
            newObj[themeObjMunic] = tempElementValue;
        }
    }
    return newObj;
}

function processIndicatorsNew(layerAttributes, projectDef) {
    districts = [];
    sessionProjectDef = projectDef;

    //////////////////////////////////////////////////////
    //// Create the primary indicator objects  *** NEW ///
    //////////////////////////////////////////////////////

    var socialVulnIndex;
    var riskIndex;
    var iriIndex = projectDef.children;

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
    var allPrimaryIndicatorsObj = {};
    var ct = 0;

    for (var i = 0; i < socialVulnIndex.length; i++) {
        for (var e = 0 ; e < socialVulnIndex[i].children.length; e++, ct++ ) {
            allPrimaryIndicators.push(socialVulnIndex[i].children[e].name);
        }
    }

    // Match each primary indicator with it's respective data value
    var primaryIndicatorObj = {};

    for (var h = 0; h < layerAttributes.features.length; h++) {
        var tempObj = layerAttributes.features[h].properties;
        for (var d = 0; d < allPrimaryIndicators.length; d++) {
            for (var l in tempObj) {
                if (allPrimaryIndicators[d] == l) {
                    var tempValue = allPrimaryIndicators[d];
                    var tempValue2 = tempObj[l];
                    var tempValue3 = tempObj.COUNTRY_NA;
                    if (primaryIndicatorObj[tempValue] == undefined) {
                        primaryIndicatorObj[tempValue] = tempValue2;
                        primaryIndicatorObj.municipio = tempValue3;
                    } else {
                        primaryIndicatorObj[tempValue] = primaryIndicatorObj[tempValue] + "," +tempValue2;
                        primaryIndicatorObj.municipio = primaryIndicatorObj.municipio + "," +tempValue3;
                    }
                }
            }
        }
    }

    ////////////////////////////////////////////////
    //// Compute the Category indicators ** NEW ////
    ////////////////////////////////////////////////

    //build the category indicator object
    var catData = [];
    tempString = [];

    function generateObject(temp) {
        var munic = temp[0];
        var theme = temp[1];
        var value = parseFloat(temp[2]);
        // add the theme and value to each category data object
        for (var i = 0; i < catData.length; i++) {
            if (catData[i].municipality == munic) {
                catData[i][theme] = value;
            }
        }
    }

    // setup catData with all the municipalities
    var la = layerAttributes.features;
    for (var s = 0; s < la.length; s++) {
        var temp = {};
        temp.municipality = la[s].properties.COUNTRY_NA;
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
        var la = layerAttributes.features;
        var tempField;
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
                var munic = la[o].properties.COUNTRY_NA;
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
                var munic1 = la[o].properties.COUNTRY_NA;
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
                var munic2 = la[o].properties.COUNTRY_NA;
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
                var munic3 = la[o].properties.COUNTRY_NA;
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
                var munic4 = la[o].properties.COUNTRY_NA;
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
    Category_PCP_Chart(catData, municipality, districName);

    ////////////////////////////////
    //// Compute the SVI ** NEW ////
    ////////////////////////////////

    var SVI = {};
    var sviNameLookUp = 'SVI';
    var sviJSONthemes = socialVulnIndex;
    var SVI = combindIndicators(sviNameLookUp, catData, sviJSONthemes );

    ///////////////
    //// Scale ////
    ///////////////

    // Scale the iri values
    var sviValueArray = [];
    var scaleSVIvalues = [];
    for (var v in SVI) {
        sviValueArray.push(SVI[v]);
    }

    var tempSVImin = Math.min.apply(null, sviValueArray),
        tempSVImax = Math.max.apply(null, sviValueArray);

    for (var j = 0; j < sviValueArray.length; j++) {
        scaleSVIvalues.push( (sviValueArray[j] - tempSVImin) / (tempSVImax - tempSVImin) );
    }

    var tempKeys = Object.keys(SVI);

    for (var i = 0; i < tempKeys.length; i++) {
        SVI[tempKeys[i]] = scaleSVIvalues[i];
    }

    ///////////////////////////////////////
    //// Compute the risk index ** NEW ////
    ///////////////////////////////////////

    var riskIndicatorObj = createIndexSimple(la, riskIndex);
    var riskIndicator = createIndex(la, riskIndex);

    ///////////////////////////////////////////
    //// Compute the Risk Indicator ** NEW ////
    ///////////////////////////////////////////

    var IR = {};
    var nameLookUp = 'RI';
    var riJSONthemes = riskIndex;
    var RI = combindIndicators(nameLookUp, riskIndicator, riJSONthemes);

    ///////////////
    //// Scale ////
    ///////////////

    // Scale the iri values
    var riValueArray = [];
    var scaleRIvalues = [];
    for (var v in RI) {
        riValueArray.push(RI[v]);
    }
    var tempRImin = Math.min.apply(null, riValueArray),
        tempRImax = Math.max.apply(null, riValueArray);
    for (var j = 0; j < riValueArray.length; j++) {
        scaleRIvalues.push( (riValueArray[j] - tempRImin) / (tempRImax - tempRImin) );
    }
    var tempKeys = Object.keys(RI);
    for (var i = 0; i < tempKeys.length; i++) {
        RI[tempKeys[i]] = scaleRIvalues[i];
    }

    //////////////////////////////////////
    //// Compute the IRI index ** NEW ////
    //////////////////////////////////////

    var IRI = {};
    var iriOperator = projectDef.operator;
    for (var ik = 0; ik < projectDef.children.length; ik++) {
        if (projectDef.children[ik].name == 'RI') {
            var riWeight = projectDef.children[ik].weight;
        } else if (projectDef.children[ik].name == 'SVI') {
            var sviWeight = projectDef.children[ik].weight;
        }
    }
    if (iriOperator == "Average (ignore weights)") {
        for (var jb in SVI) {
            tempVal = SVI[jb] + RI[jb];
            IRI[jb] = tempVal;
        }
        var iriAverage = tempVal / 2;
    } else if (iriOperator == "Simple sum (ignore weights)") {
        for (var jb in SVI) {
            tempVal = SVI[jb] + RI[jb];
            IRI[jb] = tempVal;
        }
    } else if (iriOperator == "Weighted sum") {
        for (var jb in SVI) {
            tempVal = (SVI[jb] * sviWeight) + (RI[jb] * riWeight);
            IRI[jb] = tempVal;
        }
    } else if (iriOperator == "Simple multiplication (ignore weights)") {
        for (var jb in SVI) {
            tempVal = SVI[jb] * RI[jb];
            IRI[jb] = tempVal;
        }
    } else if (iriOperator == "Weighted multiplication") {
        for (var jb in SVI) {
            tempVal = (SVI[jb] * sviWeight) * (RI[jb] * riWeight);
            IRI[jb] = tempVal;
        }
    }

    ///////////////
    //// Scale ////
    ///////////////

    // Scale the iri values
    var iriValueArray = [];
    var scaleIRIvalues = [];
    for (var v in IRI) {
        iriValueArray.push(IRI[v]);
    }
    var tempIRImin = Math.min.apply(null, iriValueArray),
        tempIRImax = Math.max.apply(null, iriValueArray);
    for (var j = 0; j < iriValueArray.length; j++) {
        scaleIRIvalues.push( (iriValueArray[j] - tempIRImin) / (tempIRImax - tempIRImin) );
    }
    var tempKeys = Object.keys(IRI);
    for (var i = 0; i < tempKeys.length; i++) {
        IRI[tempKeys[i]] = scaleIRIvalues[i];
    }
    IRI.plotElement = "iri"; // Lable within the object
    RI.plotElement = "ri"; // Lable within the object
    SVI.plotElement = "svi"; // Lable within the object
    var iriPcpData = [];
    iriPcpData.push(IRI);
    iriPcpData.push(SVI);
    iriPcpData.push(RI);
    IRI_PCP_Chart(iriPcpData);

    //////////////////////////////////////////
    //// Compute the IRI Indicator ** NEW ////
    //////////////////////////////////////////

    var IRI = {};
    var iriNameLookUp = "IRI";
} // End processIndicatorsNew

var startApp = function() {
    map = new L.Map('map', {
        minZoom: 2,
        scrollWheelZoom: false,
        attributionControl: false,
        maxBounds: new L.LatLngBounds(new L.LatLng(-90, -180), new L.LatLng(90, 180)),
    });
    map.setView(new L.LatLng(10, -10), 2).addLayer(baseMapUrl);

    layers = {};

    layerControl = L.control.layers(app.baseLayers);

    // Duplicate layer warnning message
    function showDuplicateMsg() {
        $('#warning-duplicate').dialog('open');
    }

    $(document).ready(function() {
        $('#warning-duplicate').dialog({
            autoOpen: false,
            hieght: 300,
            width: 350,
            modal: true
        });
    });

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

    // No Layer to remove warnning message
    function showRemoveMsg() {
        $('#warning-no-layer').dialog('open');
    }

    $('#warning-no-layer').dialog({
        autoOpen: false,
        hieght: 300,
        width: 350,
        modal: true
    });

    //  New project selection dialog
    $('#loadProjectDialog').dialog({
        autoOpen: false,
        height: 220,
        width: 350,
        modal: true
    });

    $('#map-tools').append('<select id="svir-project-list">'+
            '<option selected disabled>Select Project</option>'+
        '</select>'
    );

    $('#svir-project-list').css({ 'margin-bottom' : 0 });

    // Set custom map div height
    $('#map').height("300px");

    $('#load-project').button().click(function() {
        $('#loadProjectDialog').dialog('open');
    });

    // Remove layer
    var removeLayer = function () {
        var e = document.getElementById('layer-list');
        var layerId = e.options[e.selectedIndex].value;

        // Look up the layer id using the layer name
        var layerIdArray = layerNames[layerId];
        var selectedLayer = layerIdArray.toString();

        // Check in the layer is in the map port
        if (selectedLayer in layers) {
            layerControl.removeLayer(layers[selectedLayer]);
            map.removeLayer(layers[selectedLayer]);
            delete layers[selectedLayer];
        }
        else {
            showRemoveMsg();
        }
    };

    // Get layers from GeoServer
    $('#svir-project-list').hide();
    var SVIRLayerNames = [];
    var url = "/geoserver/ows?service=WFS&version=1.0.0&REQUEST=GetCapabilities&SRSNAME=EPSG:4326&outputFormat=json&format_options=callback:getJson";

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
                    SVIRLayerNames.push(featureType[i].Name);
                }
            }
            // Append the layer to the selection dropdown menu
            for (var i = 0; i < SVIRLayerNames.length; i++) {
                $('#svir-project-list').append('<option>'+ SVIRLayerNames[i] +'</option>');
            }
            $('#svir-project-list').show();
        }
    });

    $('#svir-project-list').change(function() {
        // Get the layer metadata (project def)
        var selectedLayer = document.getElementById('svir-project-list').value;

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
                    sessionProjectDef = jsonElement.GetRecordByIdResponse.MD_Metadata.identificationInfo.MD_DataIdentification.supplementalInformation.CharacterString.__text;
                    loadPD(sessionProjectDef);
                    sessionProjectDef = jQuery.parseJSON(sessionProjectDef);
                });
            }
        });
        // Get WMS layer
        //http://192.168.56.10:8080/geoserver/oqplatform/wms?service=WMS&version=1.1.0&request=GetMap&layers=oqplatform:ben2&styles=&bbox=-109.450553894043,-55.9840278625488,-28.8472194671629,13.3945837020875&width=512&height=440&srs=EPSG:4326&format=image%2Fpng
        var WMSLayer = L.tileLayer.wms("/geoserver/oqplatform/wms", {
            layers: selectedLayer,
            format: 'image/png',
            transparent: true,
            version: '1.1.0',
            attribution: "",
            crs: L.CRS.EPSG4326
        });

        WMSLayer.addTo(map);
        layerControl.addOverlay(selectedLayer, selectedLayer);

        // Get layer attributes from GeoServer
        $.ajax({
            type: 'get',
            url: '/geoserver/oqplatform/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='+ selectedLayer +'&maxFeatures=50&outputFormat=json',
            success: function(layerAttributes) {
                projectLayerAttributes = layerAttributes;
                processIndicatorsNew(layerAttributes, sessionProjectDef);
            }
        });
    });

    map.addControl(layerControl.setPosition('topleft'));

    // Map options selection dialog
    $('#thematicMap').dialog({
        autoOpen: false,
        height: 730,
        width: 350,
        modal: true
    });


    $('#thematic-map').button().click(function() {
        $('#thematicMap').dialog('open');
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
