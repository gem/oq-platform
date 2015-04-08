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
var selectedIndicator;

// sessionProjectDef is the project definition as is was when uploaded from the QGIS tool.
// While projectDef includes modified weights and is no longer the version that was uploaded from the QGIS tool
var sessionProjectDefStr;
var projectLayerAttributes;
var regions = [];
var baseMapUrl = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png');
var app = new OQLeaflet.OQLeafletApp(baseMapUrl);
var indicatorChildrenKey = [];


function createIndex(la, index) {
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
    projectDef = sessionProjectDef;
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
    var themeKeys = [];
    var themeWeightObj = {};
    for (var u = 0; u < JSONthemes.length; u++) {
        var themeName = JSONthemes[u].name;
        var themeWeight = JSONthemes[u].weight;
        themeKeys.push(themeName);
        themeWeightObj[themeName] = themeWeight;
    }
    // compute the subIndex values based on operator
    if (operator == 'Simple sum (ignore weights)') {
        for (var v = 0; v < themeObj.length; v++) {
            var tempElementValue = 0;
            var themeObjRegion = themeObj[v].region;
            // compute the themes
            for (var w = 0; w < themeKeys.length; w++) {
                var tempThemeName = themeKeys[w];
                tempElementValue = tempElementValue + themeObj[v][tempThemeName];
            }
            subIndex[themeObjRegion] = tempElementValue;
        }
    } else if (operator == 'Weighted sum') {
        for (var v1 = 0; v1 < themeObj.length; v1++) {
            var tempElementValue = 0;
            var themeObjRegion = themeObj[v1].region;
            // compute the themes
            for (var w1 = 0; w1 < themeKeys.length; w1++) {
                var tempThemeName = themeKeys[w1];
                var themeWeightVal = themeWeightObj[tempThemeName];
                tempElementValue = tempElementValue + (themeObj[v1][tempThemeName] * themeWeightVal);
            }
            subIndex[themeObjRegion] = tempElementValue;
        }
    } else if (operator == 'Average (ignore weights)') {
        for (var v2 = 0; v2 < themeObj.length; v2++) {
            var tempElementValue = 0;
            var themeObjRegion = themeObj[v2].region;
            // compute the themes
            for (var w2 = 0; w2 < themeKeys.length; w2++) {
                var tempThemeName = themeKeys[w2];
                tempElementValue = tempElementValue + themeObj[v2][tempThemeName];
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
                var tempThemeName = themeKeys[w3];
                tempElementValue = tempElementValue * themeObj[v3][tempThemeName];
            }
            subIndex[themeObjRegion] = tempElementValue;
        }
    } else if (operator == 'Weighted multiplication') {
        for (var v4 = 0; v4 < themeObj.length; v4++) {
            var tempElementValue = 1;
            var themeObjRegion = themeObj[v4].region;
            // compute the themes
            for (var w4 = 0; w4 < themeKeys.length; w4++) {
                var tempThemeName = themeKeys[w4];
                var themeWeightVal = themeWeightObj[tempThemeName];
                tempElementValue = tempElementValue * (themeObj[v4][tempThemeName] * themeWeightVal);
            }
            subIndex[themeObjRegion] = tempElementValue;
        }
    }
    return subIndex;
}

function processIndicators(layerAttributes, projectDef) {

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
    for (var i = 0; i < svThemes.length; i++) {
        for (var e = 0 ; e < svThemes[i].children.length; e++ ) {
            allPrimaryIndicators.push(svThemes[i].children[e].field);
        }
    }

    /////////////////////////////////////////
    //// Compute the theme indicators ////
    /////////////////////////////////////////

    //build the theme indicator object
    var themeData = [];
    indicatorInfo = [];

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
    for (var m = 0; m < svThemes.length; m++) {
        var operator = svThemes[m].operator;
        var weight = svThemes[m].weight;
        var name = svThemes[m].name;
        allSVIThemes.push(name);
        var tempChildren = svThemes[m].children;
        var tempIndicatorChildrenKeys = [];
        // Get the indicators children keys
        for (var q = 0; q < tempChildren.length; q++) {
            tempIndicatorChildrenKeys.push(tempChildren[q].field);
        }

        // iterate over the layerAttributes to access the data
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
                            // Sum the theme indicators
                            tempValue = tempValue + la[o].properties[p];
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
                            // Sum the theme indicators
                            tempValue = tempValue + la[o].properties[p1];
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
                            tempValue = tempValue + (la[o].properties[p2] * weight);
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
                            tempValue = tempValue * la[o].properties[p3];
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
                            // Sum the theme indicators
                            var weight = tempChildren[r4].weight;
                                tempValue = tempValue * (la[o].properties[p4] * weight);
                        }
                    }
                }
                indicatorInfo.push({'region':region, 'theme':theme, 'value':tempValue});
            }
        }
    }

    for (var p5 = 0; p5 < indicatorInfo.length; p5++) {
        // process the object for each record
        var indicatorObj = indicatorInfo[p5];
        generateThemeObject(indicatorObj);
    }

    Primary_PCP_Chart(projectDef);
    Theme_PCP_Chart(themeData);

    /////////////////////////
    //// Compute the SVI ////
    /////////////////////////

    var SVI = {};
    var sviNameLookUp = 'SVI';
    var sviJSONthemes = svThemes;
    // SVI is an object with region and value
    SVI = combineIndicators(sviNameLookUp, themeData, sviJSONthemes );
    scale(SVI);

    ////////////////////////////////
    //// Compute the risk index ////
    ////////////////////////////////

    var riskIndicator = createIndex(la, riskIndicators);

    // capture all risk indicators for selection menu
    for (var key in riskIndicator[0]) {
        if (key != 'region') {
            allRiskIndicators.push(key);
        }
    }

    ////////////////////////////////////
    //// Compute the Risk Indicator ////
    ////////////////////////////////////

    var RI = {};
    var nameLookUp = 'RI';
    var riJSONthemes = riskIndicators;
    RI = combineIndicators(nameLookUp, riskIndicator, riJSONthemes);
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

    scale(IRI);

    ////////////////////////////////////
    //// Prep data for thematic map ////
    ////////////////////////////////////

    // Pass indicators into a 'newProperties' element
    for (var ix = 0; ix < la.length; ix++) {
        for (var key in IRI) {
            if (key == la[ix].properties[selectedRegion]) {
                la[ix].newProperties = {};
                la[ix].newProperties['IRI'] = (IRI[key]).toFixed(5);
            }
        }
        for (var key in SVI) {
            if (key == la[ix].properties[selectedRegion]) {
                la[ix].newProperties['SVI'] = (SVI[key]).toFixed(5);
            }
        }
        for (var key in RI) {
            if (key == la[ix].properties[selectedRegion]) {
                la[ix].newProperties['IR'] = (RI[key]).toFixed(5);
            }
        }

        for (var key in riskIndicator[ix]) {
            if (riskIndicator[ix] != 'region') {
                var tempThemeName = riskIndicator[ix][key];
                la[ix].newProperties[key] = tempThemeName;
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
    for (var ia = 0; ia < svThemes.length; ia++) {
        var indicatorChildrenKey = [];
        var tempChildren = svThemes[ia].children;
        // Get the indicators children keys
        for (var q = 0; q < tempChildren.length; q++) {
            indicatorChildrenKey.push(tempChildren[q].field);
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

    // Add main indicators to selection menu
    $('#thematic-map-selection').empty();
    $('#thematic-map-selection').append(
        '<optgroup label="Indicators">'+
        '<option>IRI</option>'+
        '<option>SVI</option>'+
        '<option>IR</option>'
    );

    // Add SVI themes to selection menu
    $('#thematic-map-selection').append('<optgroup label="SVI Indicators">');
    for (var id = 0; id < allSVIThemes.length; id++) {
        $('#thematic-map-selection').append('<option>'+allSVIThemes[id]+'</option>');
    }

    // Add IR themes to selection menu
    $('#thematic-map-selection').append('<optgroup label="IR Indicators">');
    for (var ie = 0; ie < allRiskIndicators.length; ie++) {
        $('#thematic-map-selection').append('<option>'+allRiskIndicators[ie]+'</option>');
    }

    // Add all primary indicators to selection menu
    $('#thematic-map-selection').append('<optgroup label="Primary Indicators">');
    for (var ic = 0; ic < allPrimaryIndicators.length; ic++) {
        $('#thematic-map-selection').append('<option>'+allPrimaryIndicators[ic]+'</option>');
    }

    // set the map selection menu to IRI or previously selected indicator value
    if (selectedIndicator == undefined) {
        $('#thematic-map-selection').val('IRI');
    } else {
        $('#thematic-map-selection').val(selectedIndicator);
    }

    $('#thematic-map-selection').change(function() {
        thematicMap(layerAttributes);
    });

    thematicMap(layerAttributes);

    IRI.plotElement = "iri"; // Lable within the object
    RI.plotElement = "ri"; // Lable within the object
    SVI.plotElement = "svi"; // Lable within the object
    var iriPcpData = [];
    iriPcpData.push(IRI);
    iriPcpData.push(SVI);
    iriPcpData.push(RI);
    IRI_PCP_Chart(iriPcpData);


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
        // make sure not to devide by zero
        // 1 is an arbitrary choice to translate a flat array into an array where each element equals to 1
        if (tempMax  == tempMin) {
            ValueArray[j] = 1;
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

function thematicMap(layerAttributes) {
    // Initialise the legend
    var legendControl = new L.Control.Legend();
    legendControl.addTo(map);

    // find the indicator that has been selected
    selectedIndicator = $('#thematic-map-selection').val();

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
            fillOpacity: 1,
            opacity: 1,
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

    var thematicLayer = new L.ChoroplethDataLayer(layerAttributes, options);
    map.addLayer(thematicLayer);

    legendControl = new L.Control.Legend();
    legendControl.addTo(map);
}

var startApp = function() {
    $('#projectDef-spinner').hide();
    $('#iri-spinner').hide();
    $('#primary-spinner').hide();
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
        '<select id="svir-project-list">'+
            '<option selected disabled>Select Project</option>'+
        '</select>'
    );

    $('#map-tools').append(
        '<select id="thematic-map-selection">'+
            '<option>Select Indicator</option>'+
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

    // Get the layer metadata (project def)
    $('#svir-project-list').change(function() {
        $('#projectDef-spinner').show();
        $('#iri-spinner').show();
        $('#primary-spinner').show();
        $('#regionSelectionDialog').empty();
        // FIXME This will not work if the title contains '(' or ')'
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
                    '<option selected disabled>Select Field</option>'+
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
                console.log('layerMetadataURL:');
                console.log(layerMetadataURL);
                // ***** TEMP remove this ****
                //layerMetadataURL = '/catalogue/csw?outputschema=http%3A%2F%2Fwww.isotc211.org%2F2005%2Fgmd&service=CSW&request=GetRecordById&version=2.0.2&elementsetname=full&id=d5e173c8-b77d-11e4-a48e-0800278c33b4';
                //layerMetadataURL = "/catalogue/csw?outputschema=http%3A%2F%2Fwww.isotc211.org%2F2005%2Fgmd&service=CSW&request=GetRecordById&version=2.0.2&elementsetname=full&id=4dc11a14-b04f-11e4-8f64-0800278c33b4";
                layerMetadataURL = "/catalogue/csw?outputschema=http%3A%2F%2Fwww.isotc211.org%2F2005%2Fgmd&service=CSW&request=GetRecordById&version=2.0.2&elementsetname=full&id=96fcdbc2-dd00-11e4-993f-0800278c33b4";
                

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
                    $('#primary-spinner').hide();
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
        $( '#themeTabs' ).tabs({
            collapsible: false,
            selected: -1,
            active: false,
            height: 550
        });
    });

};

app.initialize(startApp);
