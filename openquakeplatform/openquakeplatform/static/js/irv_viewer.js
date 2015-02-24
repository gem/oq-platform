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
var region = [];
var districts = [];
var projectLayerAttributes;
var baseMapUrl = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png');
var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

function createIndexSimple(la, index) {
    var indicator = [];
    // setup the indicator with all the municipalities
    for (var ia = 0; ia < la.length; ia++) {
        var temp = {};
        temp.region = la[ia].properties.COUNTRY_NA;
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
        temp.region = la[ia].properties.COUNTRY_NA;
        indicator.push(temp);
    }
    for (var i = 0; i < index.length; i++) {
        for (var j = 0; j < la.length; j++, ct++) {
            if (indicator[j].region == la[j].properties.COUNTRY_NA) {
                var tempName = index[i].name;
                var tempValue = la[j].properties[tempName];
                indicator[j][tempName] = tempValue;
            }
        }
    }
    return indicator;
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
        var temp = themeObj[t].region;
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
            var themeObjMunic = themeObj[v].region;
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
            var themeObjMunic = themeObj[v1].region;
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
            var themeObjMunic = themeObj[v2].region;
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
            var themeObjMunic = themeObj[v3].region;
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
            var themeObjMunic = themeObj[v4].region;
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

function processIndicators(layerAttributes, projectDef) {
    districts = [];
    sessionProjectDef = projectDef;

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
        temp.region = la[s].properties.COUNTRY_NA;
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
    Category_PCP_Chart(catData, region, districName);

    /////////////////////////
    //// Compute the SVI ////
    /////////////////////////

    var SVI = {};
    var sviNameLookUp = 'SVI';
    var sviJSONthemes = socialVulnIndex;
    SVI = combindIndicators(sviNameLookUp, catData, sviJSONthemes );

    ///////////////
    //// Scale ////
    ///////////////

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

    for (var ih = 0; ih < tempKeys.length; ih++) {
        SVI[tempKeys[ih]] = scaleSVIvalues[ih];
    }

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
    RI = combindIndicators(nameLookUp, riskIndicator, riJSONthemes);

    ///////////////
    //// Scale ////
    ///////////////

    var riValueArray = [];
    var scaleRIvalues = [];
    for (var vj in RI) {
        riValueArray.push(RI[vj]);
    }
    var tempRImin = Math.min.apply(null, riValueArray),
        tempRImax = Math.max.apply(null, riValueArray);
    for (var jl = 0; jl < riValueArray.length; jl++) {
        scaleRIvalues.push( (riValueArray[jl] - tempRImin) / (tempRImax - tempRImin) );
    }
    var tempKeys = Object.keys(RI);
    for (var ij = 0; ij < tempKeys.length; ij++) {
        RI[tempKeys[ij]] = scaleRIvalues[ij];
    }

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
        for (var jb in SVI) {
            tempVal = SVI[jb] + RI[jb];
            var iriAverage = tempVal / 2;
            IRI[jb] = iriAverage;
        }
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

    var iriValueArray = [];
    var scaleIRIvalues = [];
    for (var vi in IRI) {
        iriValueArray.push(IRI[vi]);
    }
    var tempIRImin = Math.min.apply(null, iriValueArray),
        tempIRImax = Math.max.apply(null, iriValueArray);
    for (var ij = 0; ij < iriValueArray.length; ij++) {
        scaleIRIvalues.push( (iriValueArray[ij] - tempIRImin) / (tempIRImax - tempIRImin) );
    }
    var tempKeys = Object.keys(IRI);
    for (var il = 0; il < tempKeys.length; il++) {
        IRI[tempKeys[il]] = scaleIRIvalues[il];
    }
    IRI.plotElement = "iri"; // Lable within the object
    RI.plotElement = "ri"; // Lable within the object
    SVI.plotElement = "svi"; // Lable within the object
    var iriPcpData = [];
    iriPcpData.push(IRI);
    iriPcpData.push(SVI);
    iriPcpData.push(RI);
    IRI_PCP_Chart(iriPcpData);

    // Hide things untill all the ajax stuff is done


    ///////////////////////////////////
    //// Compute the IRI Indicator ////
    ///////////////////////////////////

} // End processIndicators

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

    $('#map-tools').append('<select id="svir-project-list">'+
            '<option selected disabled>Select Project</option>'+
        '</select>'
    );

    $('#svir-project-list').css({ 'margin-bottom' : 0 });

    // Set custom map div height
    $('#map').height("300px");

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
            for (var ij = 0; ij < SVIRLayerNames.length; ij++) {
                $('#svir-project-list').append('<option>'+ SVIRLayerNames[ij] +'</option>');
            }
            $('#svir-project-list').show();
        }
    });

    $('#svir-project-list').change(function() {
        $('#projectDef-spinner').show();
        $('#iri-spinner').show();
        // Get the layer metadata (project def)
        var selectedLayer = document.getElementById('svir-project-list').value;

        $.ajax({
            type: 'get',
            url: '../svir/get_layer_metadata_url?layer_name='+ selectedLayer,
            success: function(layerMetadataURL) {
                // ***** TEMP remove this ****
                //layerMetadataURL = '/catalogue/csw?outputschema=http%3A%2F%2Fwww.isotc211.org%2F2005%2Fgmd&service=CSW&request=GetRecordById&version=2.0.2&elementsetname=full&id=d5e173c8-b77d-11e4-a48e-0800278c33b4';
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

        // Get layer attributes from GeoServer
        $.ajax({
            type: 'get',
            url: '/geoserver/oqplatform/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='+ selectedLayer +'&maxFeatures=50&outputFormat=json',
            success: function(layerAttributes) {
                projectLayerAttributes = layerAttributes;
                processIndicators(layerAttributes, sessionProjectDef);
                $('#projectDef-spinner').hide();
                $('#iri-spinner').hide();
                $('#project-definition-svg').show();
            }
        });
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
