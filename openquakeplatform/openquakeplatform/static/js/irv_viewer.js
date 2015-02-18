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

var projectDef = [];

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

// Keep track of the utfGrid that has been selected last
var selectedGrid;
var baseMapUrl = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png');

var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

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
    // **** TODO remove this, its only for dev
    //var url = "https://platform.openquake.org/geoserver/oqplatform/ows?service=WFS&version=1.0.0&REQUEST=GetCapabilities&SRSNAME=EPSG:4326&outputFormat=json&format_options=callback:getJson"

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
            for (var i = 0; i < featureType.length; i++) {
                if (featureType[i].Keywords == "SVIR_QGIS_Plugin" ) {
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
                /*
                var n = layerMetadataURL.indexOf('/catalogue');
                layerMetadataURL = layerMetadataURL.substring(0, n != -1 ? n : layerMetadataURL.length);
                console.log('layerMetadataURL:');
                console.log(layerMetadataURL);
                */
                // *****TEMP****
                layerMetadataURL = "/catalogue/csw?outputschema=http%3A%2F%2Fwww.isotc211.org%2F2005%2Fgmd&service=CSW&request=GetRecordById&version=2.0.2&elementsetname=full&id=4dc11a14-b04f-11e4-8f64-0800278c33b4";
                $.get( layerMetadataURL, function( layerMetadata ) {
                    //convert XML to JSON
                    var xmlText = new XMLSerializer().serializeToString(layerMetadata);
                    var x2js = new X2JS();
                    var jsonElement = x2js.xml_str2json(xmlText);
                    console.log('jsonElement:');
                    console.log(jsonElement);
                    projectDef = jsonElement.GetRecordByIdResponse.MD_Metadata.identificationInfo.MD_DataIdentification.supplementalInformation.CharacterString.__text;
                    projectDef = jQuery.parseJSON(projectDef);
                    console.log('projectDef:');
                    console.log(projectDef);
                });
            }
        });
        // Get WMS layer
        //http://192.168.56.10:8080/geoserver/oqplatform/wms?service=WMS&version=1.1.0&request=GetMap&layers=oqplatform:ben2&styles=&bbox=-109.450553894043,-55.9840278625488,-28.8472194671629,13.3945837020875&width=512&height=440&srs=EPSG:4326&format=image%2Fpng
        var WMSLayer = L.tileLayer.wms("/geoserver/oqplatform/wms", {
            layers: selectedLayer,
            //layers: 'oqplatform:ben2',
            format: 'image/png',
            transparent: true,
            version: '1.1.0',
            attribution: "",
            crs: L.CRS.EPSG4326
        });
        console.log('WMSLayer:');
        console.log(WMSLayer);
        WMSLayer.addTo(map);
        layerControl.addOverlay(selectedLayer, selectedLayer);

        // Get layer attributes from GeoServer
        $.ajax({
            type: 'get',
            url: '/geoserver/oqplatform/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='+ selectedLayer +'&maxFeatures=50&outputFormat=json',
            success: function(layerAttributes) {
                console.log('layerAttributes:');
                console.log(layerAttributes);
                processIndicatorsNew(layerAttributes);
            }
        });
    });


    // Get layer names from tilestream
    var tileStreamLayer = '';
    var category = '';
    var selCat = document.getElementById('layer-category');
    var selLayer = document.getElementById('layer-list');

    // Create a header for the menu drop down
    var catMenuHeader = document.createElement('option');
    catMenuHeader.innerHTML = 'Projects:';
    selCat.appendChild(catMenuHeader);

    $.getJSON(TILESTREAM_API_URL,
    function(json) {

        var name, cat, type, grids, pDef;

        // Create the category list (build the object)
        for (var i=0; i < json.length; i++) {
            name = json[i].mapped_value;
            cat = json[i].category;
            type = json[i].type;
            grids = json[i].grids;
            pDef = json[i].project_definition;

            if (cat != undefined && type == 'svir-qgis') {
                categoryList.push(cat);
                layerNames[name] = [];
                layersByCat[cat] = [];
                projectDefinition[name] = [];

                if (grids != undefined) {
                    var grid = grids.toString();
                    var gridName = grid.split('/')[4];
                    layerGrids.push(gridName);
                }
            }
            if (grids != undefined) {
                layerNames[grids] = [];
            }
        }

        // Create the category list (population the object)
        for (var j=0; j < json.length; j++) {
            name = json[j].mapped_value;
            cat = json[j].category;
            type = json[j].type;
            grids = json[j].grids;
            pDef = json[j].project_definition;

            if (cat != undefined && type == 'svir-qgis') {
                layerId = json[j].id;
                layerTitle = json[j].mapped_value;
                layerNames[name].push(layerId);
                layersByCat[cat].push(layerTitle);
                projectDefinition[name].push(pDef);
            }
        }

        // Get unique category names
        var categoryUnique = categoryList.filter(function(itm,i,categoryList){
            return i==categoryList.indexOf(itm);
        });

        for (var l in categoryUnique) {
            // Append category names to dropdown list
            var categoryTitle = categoryUnique[l];
            var opt = document.createElement('option');
            opt.innerHTML = categoryTitle;
            opt.value = categoryTitle;
            selCat.appendChild(opt);
            // Append layer list to dowpdown
            var layerOpt = document.createElement('option');
        }

    });

    // Create dynamic categorized layer dialog
    $('#layer-category').change(function() {
        // Remove the layer list element
        document.getElementById('layer-list').options.length = 0;

       // Create the layer list ibased on the category selected
        var e = document.getElementById('layer-category');
        var strUser = e.options[e.selectedIndex].value;
        var layersArray = layersByCat[strUser];

        for (var i in layersArray) {
            var layers = layersArray[i];
            var opt = document.createElement('option');
            opt.innerHTML = layers;
            opt.valuse = layers;
            selLayer.appendChild(opt);
        }
    });

    map.addControl(layerControl.setPosition('topleft'));
    // TODO set the map max zoom to 9
    // The interactivity of the map/charts will not work with a map zoom greater then 9

    // Add layers form tilestream list
    $(document).ready(function() {
        $('#addLayer').click(function() {
            var e = document.getElementById('layer-list');
            var layerId = e.options[e.selectedIndex].value;

            // Look up the project definition layer id using the layer name
            var selectedPDefArray = projectDefinition[layerId];
            var selectedPDefStr = selectedPDefArray.toString();

            // TODO remove this link and replace with Django api call
            // Link to Github is a temp proof of concept
            // Load the project definition json
            selectedPDefStr = 'https://api.github.com/repos/bwyss/oq-platform/git/blobs/9864cb7a5d36572af1451e585f4516d1d19ce568?callback=_processGithubResponse';

            $.getJSON(selectedPDefStr+'?format=json&callback=?', function(pdJson) {
                encodedData = pdJson.data.content;
                selectedPDef = window.atob(encodedData);
                pdData = JSON.parse(selectedPDef);
                loadPD(selectedPDef);
            });

            // Look up the tile layer id using the layer name
            var layerIdArray = layerNames[layerId];
            var selectedLayer = layerIdArray.toString();
            var hasGrid = $.inArray(selectedLayer, layerGrids) > -1;

            // Check for duplicae layes
            if (selectedLayer in layers) {
                showDuplicateMsg();
            }
            else {
                map.removeLayer(utfGrid);
                utfGrid = {};

                var tileLayer = L.tileLayer(TILESTREAM_URL+
                    selectedLayer+
                    '/{z}/{x}/{y}.png',{wax: TILESTREAM_URL+
                    selectedLayer+
                    '.json'});
                layerControl.addOverlay(tileLayer, selectedLayer);
                map.addLayer(tileLayer);
                // Keep track of layers that have been added
                layers[selectedLayer] = tileLayer;

                if (hasGrid == true) {
                    gridList = 1;
                    utfGrid = new L.UtfGrid(TILESTREAM_URL+
                        selectedLayer+
                        '/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
                    map.addLayer(utfGrid);
                    utfGridClickEvent(utfGrid);
                }
            }
        });
    });

    // Remove layers from tilestream
    $(document).ready(function() {
        $('#removeLayer').click(function() {
            gridList = 0;
            map.removeLayer(utfGrid);
            utfGrid = {};
            utfGrid = new L.UtfGrid(TILESTREAM_URL+'/empty/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
            map.addLayer(utfGrid);
            utfGridClickEvent(utfGrid);

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
        });
    });

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

    function findPrimaryIndicators(pdData, pi) {
        // Find all of the primary indicators
        if (pi.some(function(currentValue) {
            return (pdData.type == currentValue);
        })) {
            // Create array of primary indicators
            pdTempPrimaryIndicator.push(pdData.name);
            pdTempPrimaryIndicatorLevels[pdData.name.toLowerCase()] = (pdData.level);
            tempWeight[pdData.name.toLowerCase()] = (pdData.weight);
        }
        (pdData.children || []).forEach(function(currentItem) {
            findPrimaryIndicators(currentItem, [pi]);
        });
    }

    function findCategoryIndicators(pdData, ci) {
        // Find all of the primary indicators
        if (ci.some(function(currentValue) {
            return (pdData.type == currentValue);
        })) {
            // Create array of primary indicators
            pdTempCategoryIndicator.push(pdData.name);
            tempCatWeight[pdData.name.toLowerCase()] = (pdData.weight);
            // Create a key pair for each category indicator and its respective child level
            pdTempPILevel[pdData.name.toLowerCase()] = (pdData.children[0].level);
        }
        (pdData.children || []).forEach(function(currentItem) {
            findCategoryIndicators(currentItem, [ci]);
        });
    }

    function checkElementCategory(elementName) {
        var foo = pdTempPrimaryIndicatorLevels[elementName];

        for(var prop in pdTempPILevel) {
            if(pdTempPILevel.hasOwnProperty(prop)) {
                if(pdTempPILevel[prop] === foo) {
                    return prop;
                }
            }
        }
    }

    function findSvi(pdData, svi) {
        // Find all of the primary indicators
        if (svi.some(function(currentValue) {
            return (pdData.name == currentValue);
        })) {
            tempSviWeight = pdData.weight;
        }
        (pdData.children || []).forEach(function(currentItem) {
            findSvi(currentItem, [svi]);
        });
    }

    function findAalWeight(pdData, aal) {
        // Find the aal value
        if (aal.some(function(currentValue) {
            return (pdData.name == currentValue);
        })) {
            tempAalWeight = pdData.weight;
        }
        (pdData.children || []).forEach(function(currentItem) {
            findAalWeight(currentItem, [aal]);
        });
    }

    function utfGridClickEvent(utfGrid) {
        utfGrid.on('click', function(e) {
            console.log('e:');
            console.log(e);
            processIndicators(e);
            selectedGrid = e;
        });
    }

    function processIndicatorsNew(layerAttributes) {

        //loadPD(projectDef);

        //////////////////////////////////////////////////////
        //// Create the primary indicator objects  *** NEW ///
        //////////////////////////////////////////////////////

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

        console.log('socialVulnIndex:');
        console.log(socialVulnIndex);
        console.log('riskIndex:');
        console.log(riskIndex);

        // process each Social Vulnerability Index nodes

        // Get all the primary indicators
        var allPrimaryIndicators = [];
        var allPrimaryIndicatorsObj = {};
        var ct = 0;
        for (var i = 0; i < socialVulnIndex.length; i++) {
            console.log('socialVulnIndex[i]:');
            console.log(socialVulnIndex[i]);
            for (var e = 0 ; e < socialVulnIndex[i].children.length; e++, ct++ ) {
                allPrimaryIndicators.push(socialVulnIndex[i].children[e].name);
            }
        }

        // Match each primary indicator with it's respective data value
        var primaryIndicatorObj = {};
        for (var h = 0; h < layerAttributes.features.length; h++) {
            var tempObj = layerAttributes.features[h].properties;
            //console.log('Object.keys(tempObj[l]):');
            //console.log(Object.getOwnPropertyNames(tempObj));
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

        console.log('primaryIndicatorObj:');
        console.log(primaryIndicatorObj);
        var districName = "temp";
        var outlierBreakPoint = 0.75;

        //Primary_PCP_Chart(primaryData, municipality, districName, outlierBreakPoint);

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
                    tempString.push(munic + ' '+ name+' '+average);
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
                    tempString.push(munic1 + ' '+ theme1 +' '+tempSum);
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
                    tempString.push(munic2 + ' '+ theme2 +' '+tempSum);
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
                    tempString.push(munic3 + ' '+ theme3 +' '+tempSum);
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
                    tempString.push(munic4 + ' '+ theme4 +' '+tempSum);
                }
            }
        }

        for (var p5 = 0; p5 < tempString.length; p5++) {
            // capture an array for each record
            var temp;
            temp = tempString[p5];
            temp = temp.split(" ");
            generateObject(temp);

        }
        console.log('catData:');
        console.log(catData);
        var districName = "temp";
        Category_PCP_Chart(catData, municipality, districName);

        ////////////////////////////////
        //// Compute the SVI ** NEW ////
        ////////////////////////////////

        var SVI = {};
        var SVIOperator;
        for (var y = 0; y < projectDef.children.length; y++) {
            if (projectDef.children[y].field == "SVI_1") {
                SVIOperator = projectDef.children[y].operator;
            }
        }

        // first create an object with all of the district names
        for (var t = 0; t < catData.length; t++) {
            var temp = catData[t]['municipality'];
            SVI[temp] = 0;
        }

        // get some info aobut the themes
        var themekey = [];
        var themeWeightObj = {};
        for (var u = 0; u < socialVulnIndex.length; u++) {
            var themeName = socialVulnIndex[u].name;
            var themeWeight = socialVulnIndex[u].weight;
            themekey.push(themeName);
            themeWeightObj[themeName] = themeWeight;
        }

        // compute the SVI values based on operator
        if (SVIOperator == 'Simple sum (ignore weights)') {
            for (var v = 0; v < catData.length; v++) {
                var tempSVIValue = 0;
                var catDataMunic = catData[v].municipality;
                // sum the themes
                for (var w = 0; w < themekey.length; w++, ct++) {
                    var tempThemeName = themekey[w];
                    tempSVIValue = tempSVIValue + catData[v][tempThemeName];
                }
                SVI[catDataMunic] = tempSVIValue;
            }
        } else if (SVIOperator == 'Weighted sum') {
            for (var v1 = 0; v1 < catData.length; v1++) {
                var tempSVIValue = 0;
                var catDataMunic = catData[v1].municipality;
                // sum the themes
                for (var w1 = 0; w1 < themekey.length; w1++, ct++) {
                    var tempThemeName = themekey[w1];
                    var themeWeightVal = themeWeightObj[tempThemeName];
                    tempSVIValue = tempSVIValue + (catData[v1][tempThemeName] * themeWeightVal);
                }
                SVI[catDataMunic] = tempSVIValue;
            }
        } else if (SVIOperator == 'Average (ignore weights)') {
            for (var v2 = 0; v2 < catData.length; v2++) {
                var tempSVIValue = 0;
                var catDataMunic = catData[v2].municipality;
                // sum the themes
                for (var w2 = 0; w2 < themekey.length; w2++, ct++) {
                    var tempThemeName = themekey[w2];
                    tempSVIValue = tempSVIValue + catData[v2][tempThemeName];
                }
                var themeAverage = tempSVIValue / themekey.length;
                SVI[catDataMunic] = themeAverage;
            }
        } else if (SVIOperator == 'Simple multiplication (ignore weights)') {
            for (var v3 = 0; v3 < catData.length; v3++) {
                var tempSVIValue = 0;
                var catDataMunic = catData[v3].municipality;
                // sum the themes
                for (var w3 = 0; w3 < themekey.length; w3++, ct++) {
                    var tempThemeName = themekey[w3];
                    if (tempSVIValue == 0) {
                        tempSVIValue = catData[v3][tempThemeName];
                    } else {
                        tempSVIValue = tempSVIValue * catData[v3][tempThemeName];
                    }
                }
                SVI[catDataMunic] = tempSVIValue;
            }
        } else if (SVIOperator == 'Weighted multiplication') {
            for (var v4 = 0; v4 < catData.length; v4++) {
                var tempSVIValue = 0;
                var catDataMunic = catData[v4].municipality;
                // sum the themes
                for (var w4 = 0; w4 < themekey.length; w4++, ct++) {
                    var tempThemeName = themekey[w4];
                    var themeWeightVal = themeWeightObj[tempThemeName];
                    if (tempSVIValue == 0) {
                        tempSVIValue = (catData[v4][tempThemeName] * themeWeightVal);
                    } else {
                        tempSVIValue = tempSVIValue * (catData[v4][tempThemeName] * themeWeightVal);
                    }
                }
                SVI[catDataMunic] = tempSVIValue;
            }
        }
        console.log('SVI:');
        console.log(SVI);

        ////////////////////////////////////////////
        //// Compute the risk index ** NEW ////
        ////////////////////////////////////////////

        var riskIndicator = [];
        var riskTempString = [];

        function generateRiskIndicatorObj(tempVal) {
            var tempRiskDist = tempVal[0];
            var tempRiskField  = tempVal[1];
            var tempRiskVal = parseFloat(tempVal[2]);
            // add the info to risk indicator object
            for (var ie = 0; ie < riskIndicator.length; ie++) {
                if (riskIndicator[ie].municipality == tempRiskDist) {
                    riskIndicator[ie][tempRiskField] = tempRiskVal;
                }
            }
        }

        // setup catData with all the municipalities
        for (var ia = 0; ia < la.length; ia++) {
            var temp = {};
            temp.municipality = la[ia].properties.COUNTRY_NA;
            riskIndicator.push(temp);
        }

        // find the risk indicator information
        for (var ib = 0; ib < riskIndex.length; ib++) {
            try {
                var riskOperator = riskIndex[ib].operator;
            } catch (e) {
                var riskOperator = 'n/a';
            }
            var riskWeight = riskIndex[ib].weight;
            var riskField = riskIndex[ib].field;

            // iterate over the layerAttributes to access the data
            for (var ic = 0; ic < la.length; ic++, ct++) { // la is layerAttributes.features
                if (riskOperator == 'n/a' || riskOperator == undefined) {
                    var riskIndicatorValue = la[ic].properties[riskField];
                    var riskIndicatorDistrict = la[ic].properties.COUNTRY_NA;
                    riskTempString.push(riskIndicatorDistrict + ' ' + riskField + ' ' + riskIndicatorValue);
                } // TODO build in else conditions for all posible operators
            }
        }
        // iterate over each temp string
        for (var id = 0; id < riskTempString.length; id++) {
            var tempVal = riskTempString[id];
            tempVal = tempVal.split(' ');
            generateRiskIndicatorObj(tempVal);
        }

        console.log('riskIndicator:');
        console.log(riskIndicator);

        ///////////////////////////////////////////
        //// Compute the Risk Indicator ** NEW ////
        ///////////////////////////////////////////

        var RI = {};
        var RIOperator;
        for (var ie = 0; ie < projectDef.children.length; ie++) {
            if (projectDef.children[ie].field == "RI_1") {
                RIOperator = projectDef.children[ie].operator;
            }
        }

        // create an object with all of the district names
        for (var ig = 0; ig < riskIndicator.length; ig++) {
            var temp = riskIndicator[ig]['municipality'];
            RI[temp] = 0;
        }

        // get some info aobut the themes
        var RIkey = [];
        var RIWeightObj = {};
        for (var ih = 0; ih < riskIndex.length; ih++) {
            var IRName = riskIndex[ih].name;
            var IRWeight = riskIndex[ih].weight;
            RIkey.push(IRName);
            RIWeightObj[IRName] = IRWeight;
        }

        if (RIOperator == 'Weighted sum') {
            for (var ij = 0; ij < riskIndicator.length; ij++) {
                var tempRIValue = 0;
                var riskIndicatorMunic = riskIndicator[ij].municipality;
                // sum the themes
                for (var ii = 0; ii < RIkey.length; ii++, ct++) {
                    var IRtempName = RIkey[ii];
                    var IRWeightVal = RIWeightObj[IRtempName];
                    tempRIValue = tempRIValue + (riskIndicator[ij][IRtempName] * IRWeightVal);
                }
                RI[riskIndicatorMunic] = tempRIValue;
            }
        } else if (RIOperator == 'Simple sum (ignore weights)') {
            for (var ik = 0; ik < riskIndicator.length; ik++) {
                var tempRIValue = 0;
                var riskIndicatorMunic = riskIndicator[ik].municipality;
                // sum the themes
                for (var il = 0; il < RIkey.length; il++, ct++) {
                    var IRtempName = RIkey[il];
                    tempRIValue = tempRIValue + riskIndicator[ik][IRtempName];
                }
                RI[riskIndicatorMunic] = tempRIValue;
            }
        } else if (RIOperator == 'Average (ignore weights)') {
            for (var im = 0; im < riskIndicator.length; im++) {
                var tempRIValue = 0;
                var riskIndicatorMunic = riskIndicator[im].municipality;
                // sum the themes
                for (var io = 0; io < RIkey.length; io++, ct++) {
                    var IRtempName = RIkey[io];
                    tempRIValue = tempRIValue + riskIndicator[im][IRtempName];
                }
                var IRAverage = tempRIValue / RIkey.length;
                RI[riskIndicatorMunic] = IRAverage;
            }
        } else if (RIOperator == 'Simple multiplication (ignore weights)') {
            for (var ip = 0; ip < riskIndicator.length; ip++) {
                var tempRIValue = 0;
                var riskIndicatorMunic = riskIndicator[ip].municipality;
                // sum the themes
                for (var iq = 0; iq < RIkey.length; iq++, ct++) {
                    var IRtempName = RIkey[iq];
                    if (tempRIValue == 0) {
                        tempRIValue = riskIndicator[ip][IRtempName];
                    } else {
                        tempRIValue = tempRIValue * riskIndicator[ip][IRtempName];
                    }
                }
                RI[riskIndicatorMunic] = tempRIValue;
            }
        } else if (RIOperator == 'Weighted multiplication') {
            for (var ir = 0; ir < riskIndicator.length; ir++) {
                var tempRIValue = 0;
                var riskIndicatorMunic = riskIndicator[ir].municipality;
                // sum the themes
                for (var is = 0; is < RIkey.length; is++, ct++) {
                    var IRtempName = RIkey[is];
                    var IRWeightVal = RIWeightObj[IRtempName];
                    if (tempRIValue == 0) {
                        tempRIValue = (riskIndicator[ir][IRtempName] * IRWeightVal);
                    } else {
                        tempRIValue = tempRIValue * (riskIndicator[ir][IRtempName] * IRWeightVal);
                    }
                }
                RI[riskIndicatorMunic] = tempRIValue;
            }
        }

        console.log('RI:');
        console.log(RI);

    } // End processIndicatorsNew

    function processIndicators(e) {
        var districName = e.data.name_1;
        //$('#pcp-charts').dialog('open');
        // Get the SVIR data from the utfGrid
        var tmpIri = {};
        var tmpPI;
        var tempCI;
        if (e.data) {
            // Find the variables that are primary indicators and their respecive category
            var ci = 'categoryIndicator';
            findCategoryIndicators(pdData, [ci]);
            var pi = 'primaryIndicator';
            findPrimaryIndicators(pdData, [pi]);
            var svi = 'svi';
            findSvi(pdData, [svi]);

            // Create an object for each of the category indicators
            for (var n = 0; n < pdTempCategoryIndicator.length; n++) {
                parentChildKey[pdTempCategoryIndicator[n]] = [];
                var category = pdTempCategoryIndicator[n];
            }
            var iri = e.data.ir;
            iri = iri.split(',');
            var munic = e.data.municipio;
            munic = munic.split(',');
            var pri = e.data.pri;

            if (pri == undefined) {
                pri = e.data.aal;
            }
            var munic_num = e.data['municipio'].split(',').length;
            municipality = e.data['municipio'].split(',');



            /////////////////////////////////////////////
            //// Create the primary indicator objects ///
            /////////////////////////////////////////////

            for (var k in weightedPrimaryIndicator) {
                delete weightedPrimaryIndicator[k];
            }

            for (var k in sessionPrimaryIndicator) {
                delete sessionPrimaryIndicator[k];
            }

            for (var k in primaryIndicator) {
                delete primaryIndicator[k];
            }

            for (i=0; i < municipality.length; i++)
                municipality[i] = municipality[i].trim();

            for (var m = 0; m < munic_num; m++) {
                var tmp = {};
                for (var i = 0; i < pdTempPrimaryIndicator.length; i++) {
                    var elementName = pdTempPrimaryIndicator[i].toLowerCase();
                    tmpPI = e.data[pdTempPrimaryIndicator[i].toLowerCase()];

                    if (tmpPI != undefined) {
                        tmpPI = tmpPI.split(',');
                        // Check and see what category the tmpPI belongs to
                        var elementsParent = checkElementCategory(elementName);

                        // Keep track of parents and their respective children
                        for (var k in parentChildKey) {
                            if(k == elementsParent) {
                                var ep = elementsParent;
                                var pos;
                                pos = parentChildKey[ep].indexOf(elementName);
                                if (!~pos) {
                                    parentChildKey[ep].push(elementName);
                                }
                            }
                        }
                        tmp[elementName] = parseFloat(tmpPI[m]);
                        tmp.municipality = municipality[m];
                        primaryIndicator[m] = tmp;
                    }
                }
            }

            // Create the primary indicators obj continued 
            for (var j = 0; j < munic_num.length; j++) {
                tmp.municipality = municipality[j];
                primaryIndicator[j] = tmp;
            }

            // Keep the primaryIndicator obj as is and make a session copy that 
            // is to be modifyed by the project definition weights 
            weightedPrimaryIndicator = JSON.parse( JSON.stringify( primaryIndicator ) );
            sessionPrimaryIndicator = JSON.parse( JSON.stringify( primaryIndicator ) );

            // Multiply the copy of primary indicator data by the weighted value
            for(var p1 in weightedPrimaryIndicator) {
                for(var p2 in weightedPrimaryIndicator[p1]) {
                    if(tempWeight.hasOwnProperty(p2)) {
                        weightedPrimaryIndicator[p1][p2] *= tempWeight[p2];
                    }
                }
            }

            // The data passed into d3 need to be an array of objects
            // Place the category indicator objects into an array
            var primaryData = [];

            // ******* bypass the scalling & weighting *****
            for (var l in primaryIndicator) {
                primaryData.push(primaryIndicator[l]);
            }

            // Allow the user to modify the outlier break point
            $('#outlier-limit').spinner({
                stop:function(e,ui){
                    outlierBreakPoint = document.getElementById('outlier-limit').value;
                    outlierBreakPoint = parseFloat(outlierBreakPoint);
                    Primary_PCP_Chart(primaryData, municipality, districName, outlierBreakPoint);
                }
            });

            $(function() {
                $("#outlier-limit").width(100).spinner({
                    min: 0,
                    max: 1,
                    step: 0.05,
                    numberFormat: "n",
                });
            });

            console.log('primaryData:');
            console.log(primaryData);

            Primary_PCP_Chart(primaryData, municipality, districName, outlierBreakPoint);

            /////////////////////////////////////////////
            /// Create the category indicator objects ///
            /////////////////////////////////////////////

            // The category indicator is the average value of it's children
            // and then multiplyed by its respective weight value

            // Clean out the objects
            for (var q in catIndicator) {
                delete catIndicator[q];
            }

            for (var p in scaledCatIndicator) {
                delete scaledCatIndicator[p];
            }

            for (var o in weightedCatIndicator) {
                delete weightedCatIndicator[o];
            }

            // Build the catIndicator object on each iteration
            function newValues(j, econ, edu, m, pop, inf, gov) {
                catIndicator[j] = {
                    economy: econ,
                    education: edu,
                    municipality: m,
                    population: pop,
                    infrastructure: inf,
                    governance: gov
                };
            }

            // Associate the newValues method with the category indicator object
            catIndicator.newCatObj = newValues;
            for (k in parentChildKey) {
                tempParentChildKey.push(k);
            }

            for (var j = 0; j < municipality.length; j++) {
                var tempCIValues = [];

                for (var key in weightedPrimaryIndicator) {
                    for (var i = 0; i < tempParentChildKey.length; i++) {
                        tempCatSearchElements = parentChildKey[tempParentChildKey[i]]; //what we are looking for in weightedPrimaryIndicator
                        var obj = weightedPrimaryIndicator[key];
                        var piArray = []; // array of values from a single weightedPrimaryIndicator obj
                        var mun = weightedPrimaryIndicator[key].municipality;

                        for (var n = 0; n < tempCatSearchElements.length; n++) {
                            piArray.push(obj[tempCatSearchElements[n]]);
                        }

                        var sum = 0;
                        $.each(piArray,function() {
                            sum += this;
                        })

                        tempCIValues[tempParentChildKey[i]] = sum;
                        tempCIValues["municipality"] = mun;
                    }

                    catIndicator.newCatObj(key, tempCIValues["economy"], tempCIValues["education"], tempCIValues["municipality"], tempCIValues["population"], tempCIValues["infrastructure"], tempCIValues["governance"] );
                }
            }// end scopeForCatIteration function


            ////////////////////////////////////////
            //// Apply the weight to the values ////
            ////////////////////////////////////////

            // Build the catIndicator object on each iteration
            function newWeightedValues(j, econ, edu, m, pop, inf, gov) {
                weightedCatIndicator[j] = {
                    economy: econ,
                    education: edu,
                    municipality: m,
                    population: pop,
                    infrastructure: inf,
                    governance: gov
                };
            }

            // Associate the newValues method with the category indicator object
            weightedCatIndicator.newWeightedCatObj = newWeightedValues;
            for (k in parentChildKey) {
                tempParentChildKey.push(k);
            }
            for (var j = 0; j < municipality.length; j++) {
                var tempCIValues = [];

                for (var key in weightedPrimaryIndicator) {
                    for (var i = 0; i < tempParentChildKey.length; i++) {
                        tempCatSearchElements = parentChildKey[tempParentChildKey[i]]; //what we are looking for in weightedPrimaryIndicator
                        var obj = weightedPrimaryIndicator[key];
                        var piArray = []; // array of values from a single weightedPrimaryIndicator obj
                        var mun = weightedPrimaryIndicator[key].municipality;

                        for (var n = 0; n < tempCatSearchElements.length; n++) {
                            piArray.push(obj[tempCatSearchElements[n]]);
                        }

                        var sum = 0;
                        $.each(piArray,function() {
                            sum += this;
                        })

                        tempCIValues[tempParentChildKey[i]] = sum;
                        tempCIValues["municipality"] = mun;

                        // Multiply the category indicator data by the weighted value
                        for (var k in tempCIValues) {
                            for (var p in tempCatWeight) {
                                if (k == p) {
                                    tempCIValues[k] = (tempCIValues[p] * tempCatWeight[k]);
                                }
                            }
                        }
                    }

                    weightedCatIndicator.newWeightedCatObj(key, tempCIValues["economy"], tempCIValues["education"], tempCIValues["municipality"], tempCIValues["population"], tempCIValues["infrastructure"], tempCIValues["governance"] );
                };
            } // end weighting

            scaledCatIndicator = jQuery.extend(true, {}, catIndicator);

            ///////////////
            //// Scale ////
            ///////////////

            // Scale each category indicator values from 0 to 1
            var tempCIvalues = [];
            var scaleCIvalues = [];

            // Define the method to get values out of the scaledCatIndicator object
            function getCIvalues(element) {
                if (this[element] != undefined) {
                    tempCIvalues.push(this[element]);
                }
            }

            // Pass scaled values back to the scaledCatIndicator object
            function applyScaledCIvalues(j) {
                return scaleCIvalues[j];
            }

            // Associate the getValues method with the scaledCatIndicator object
            for (var k in catIndicator) {
                catIndicator[k].getCIvalues = getCIvalues;
            }

            // Associate the applyScaledValues method with the scaledCatIndicator object
            for (var k in scaledCatIndicator) {
                scaledCatIndicator[k].scaleCIvalues = applyScaledCIvalues;
            }

            var CIkeys = Object.keys(scaledCatIndicator[0]);

            // Iterate over all the category indicators
            for (var i = 0; i < CIkeys.length; i++) {
                // Call the getValues method
                for (var y in catIndicator) {
                    catIndicator[y].getCIvalues(CIkeys[i]);
                }

                if (CIkeys[i] != "municipality" && CIkeys[i] != "getCIvalues" && CIkeys[i] != "scaleCIvalues" && CIkeys[i] != "newCatObj") {

                    var tempCImin = Math.min.apply(null, tempCIvalues),
                        tempCImax = Math.max.apply(null, tempCIvalues);

                    // Scale the values
                    for (var j = 0; j < tempCIvalues.length; j++) {
                        scaleCIvalues.push( (tempCIvalues[j] - tempCImin) / (tempCImax - tempCImin) );
                    }

                    // Call the applyScaledValues method
                    for (var l in scaledCatIndicator) {
                        scaledCatIndicator[l][CIkeys[i]] = scaledCatIndicator[l].scaleCIvalues(l);
                    }
                }
                scaleCIvalues = [];
                tempCIvalues = [];
            }

            // The data passed into d3 need to be an array of objects
            // Place the category indicator objects into an array
            var catData = [];

            for (var k in scaledCatIndicator) {
                catData.push(scaledCatIndicator[k]);
            }

            // TODO remove this concat if need be
            var concat = catData.concat(previousCatData);

            console.log('catData:');
            console.log(catData);


            Category_PCP_Chart(catData, municipality, districName);

            for (var k in scaledCatIndicator) {
                previousCatData.push(scaledCatIndicator[k]);
            }


            /////////////////////////////////////////////////////
            /// Create the category indicator objects *** NEW ///
            /////////////////////////////////////////////////////



            /////////////////////////////////////////////
            /////////// Create the svi object ///////////
            /////////////////////////////////////////////

            for (var k in sviIndicator) {
                delete sviIndicator[k];
            }

            for (var k in scaledSviIndicator) {
                delete scaledSviIndicator[k];
            }

            for (var k in weightedSviIndicator) {
                delete weightedSviIndicator[k];
            }

            function newSVIvalues(SVIaverage, tempMunic) {
                sviIndicator[tempMunic] = SVIaverage;
            }

            // Associate the newSVIvalues method with the svi object
            sviIndicator.SVIvalues = newSVIvalues;
            var tempSviParentChildKey = [];
            var tempSviIndicator = {};
            for (var i = 0; i < municipality.length; i++) {
                tempSviIndicator[municipality[i]] = [];
            }
            tempSviSearchElements = Object.keys(weightedCatIndicator);
            tempSviSearchElements.pop();
            var sessionKey = Object.keys(weightedCatIndicator[tempSviSearchElements[0]]);
            sessionKey.pop();
            sessionKey.pop();

            for (var i = 0; i < tempSviSearchElements.length; i++) {
                var tempArray = [];

                // Grab the municipality of the iteration
                var tempMunic = weightedCatIndicator[i]["municipality"];

                // Remove the municipality from the sessionkey array
                var index = sessionKey.indexOf("municipality");

                if (index > -1) {
                    sessionKey.splice(index, 1);
                }

                // Build the temp object
                for (var j = 0; j < sessionKey.length; j++) {
                    tempArray.push(weightedCatIndicator[i][sessionKey[j]]);
                }

                var SVIsum = 0
                $.each(tempArray,function() {
                    SVIsum += this;
                });

                sviIndicator.SVIvalues(SVIsum, tempMunic);
            };


            ////////////////////////////////////////
            //// Apply the weights to the values ///
            ////////////////////////////////////////

            weightedSviIndicator = jQuery.extend(true, {}, sviIndicator);

            // Multiply the svi values by the weighted value
            $.each(weightedSviIndicator, function(key, value) {
                if (key != "SVIvalues") {
                    var sviValue = (value * tempSviWeight);
                    weightedSviIndicator[key] = sviValue;
                }
            });


            ///////////////
            //// Scale ////
            ///////////////

            scaledSviIndicator = jQuery.extend(true, {}, sviIndicator);

            // Scale the svi values
            var valueArray = [];
            var scaleSVIvalues = [];
            for (var v in scaledSviIndicator) {
                valueArray.push(scaledSviIndicator[v]);
            }

            valueArray.shift();
            var tempSVImin = Math.min.apply(null, valueArray),
                tempSVImax = Math.max.apply(null, valueArray);

            for (var j = 0; j < valueArray.length; j++) {
                scaleSVIvalues.push( (valueArray[j] - tempSVImin) / (tempSVImax - tempSVImin) );
            }

            var tempKeys = Object.keys(scaledSviIndicator);
            tempKeys.shift();

            for (var i = 0; i < tempKeys.length; i++) {
                scaledSviIndicator[tempKeys[i]] = scaleSVIvalues[i];
            }

            scaledSviIndicator.plotElement = "svi"; // Lable within the object
            delete scaledSviIndicator.SVIvalues;

            //////////////////////////////////////////////
            /////////// Create the PRI object ////////////
            //////////////////////////////////////////////

            for (var k in aalIndicator) {
                delete aalIndicator[k];
            }

            for (var k in scaledAalIndicator) {
                delete scaledAalIndicator[k];
            }

            for (var k in weightedAalIndicator) {
                delete weightedAalIndicator[k];
            }

            // For the sample data provided aal = pri
            // However in the future this will need to be expanded
            // to include the children of pri


            var aalArray = e.data.aal.split(",");

            for (var i = 0; i < municipality.length; i++) {
                aalIndicator[municipality[i]] = parseFloat([aalArray[i]]);
            }

            aalCopy = jQuery.extend(true, {}, aalIndicator); // ** Value with no Weight
            var aalStr = "aal";
            findAalWeight(pdData, [aalStr]);

            ////////////////////////////////////////
            //// Apply the weights to the values ///
            ////////////////////////////////////////

            weightedAalIndicator = jQuery.extend(true, {}, aalIndicator);

            // Multiply the aal value by the weighted value
            $.each(weightedAalIndicator, function(key, value) {
                var aalValue = 0;
                aalValue = (value * tempAalWeight);
                weightedAalIndicator[key] = aalValue;
            });

            ///////////////
            //// Scale ////
            ///////////////

            scaledAalIndicator = jQuery.extend(true, {}, aalIndicator);


            // Scale the pri values
            var aalValueArray = [];
            var scaleAALvalues = [];

            for (var v in scaledAalIndicator) {
                aalValueArray.push(scaledAalIndicator[v]);
            }

            var tempAALmin = Math.min.apply(null, aalValueArray),
                tempAALmax = Math.max.apply(null, aalValueArray);

            for (var j = 0; j < aalValueArray.length; j++) {
                scaleAALvalues.push( (aalValueArray[j] - tempAALmin) / (tempAALmax - tempAALmin) );
            }

            var tempKeys = Object.keys(scaledAalIndicator);
            tempKeys.pop();

            for (var i = 0; i < tempKeys.length; i++) {
                scaledAalIndicator[tempKeys[i]] = scaleAALvalues[i];
            }

            scaledAalIndicator.plotElement = "aal"; // Lable within the object


            //////////////////////////////////////////////
            // Create the IRI category indicator object //
            //////////////////////////////////////////////

            for (var k in iriIndicator) {
                delete iriIndicator[k];
            }

            var iriArray = iri; // Do not use these values,

            // instead compute the iri from PRI and SVI
            for (var i = 0; i < municipality.length; i++) {
                iriIndicator[municipality[i]] = "";
            }

            iriCopy = jQuery.extend(true, {}, iriIndicator);
            var aalKey;
            var aalValue;
            var sviKey;
            var sviValue;

            // Compute IRI from PRI and SVI
            // TODO expand this to use proper IRI function...
            function getNewValues(k) {
                aalValue = aalIndicator[k];
                sviValue = sviIndicator[k];
            }

            for (var i = 0; i < municipality.length; i++) {
                tmp = 0;
                for(var k in iriIndicator) {
                    getNewValues(k);
                    tmp = (sviValue * aalValue);
                    iriIndicator[k] = tmp;
                }
            }

            ///////////////
            //// Scale ////
            ///////////////

            // Scale the iri values
            var iriValueArray = [];
            var scaleIRIvalues = [];

            for (var v in iriIndicator) {
                iriValueArray.push(iriIndicator[v]);
            }

            var tempIRImin = Math.min.apply(null, iriValueArray),
                tempIRImax = Math.max.apply(null, iriValueArray);

            for (var j = 0; j < iriValueArray.length; j++) {
                scaleIRIvalues.push( (iriValueArray[j] - tempIRImin) / (tempIRImax - tempIRImin) );
            }

            var tempKeys = Object.keys(iriIndicator);

            for (var i = 0; i < tempKeys.length; i++) {
                iriIndicator[tempKeys[i]] = scaleIRIvalues[i];
            }

            iriIndicator.plotElement = "iri"; // Lable within the object

        }

        console.log('iriIndicator:');
        console.log(iriIndicator);

        console.log('scaledSviIndicator:');
        console.log(scaledSviIndicator);

        console.log('scaledAalIndicator:');
        console.log(scaledAalIndicator);

        var iriPcpData = [];
        iriPcpData.push(iriIndicator);
        iriPcpData.push(scaledSviIndicator);
        iriPcpData.push(scaledAalIndicator);

            var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var aspect = windowWidth / windowHeight,
        chart = $("#IRI-svg-element");

    function resize() {
        var targetWidth = chart.parent().width();
        chart.attr("width", targetWidth);
        chart.attr("height", targetWidth / aspect);
    }

    resize();

        IRI_PCP_Chart(iriPcpData);
    } // End process indicators function
};

app.initialize(startApp);
