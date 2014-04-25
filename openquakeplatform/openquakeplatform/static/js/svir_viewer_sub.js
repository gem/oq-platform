/*
   Copyright (c) 2013, GEM Foundation.

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

var dataCat = "";
var chartCat = "";
var utfGrid = new Object;
var countriesArray = new Array('Turkmenistan', 'Uzbekistan', 'Kazakhstan', 'Mongolia', 'foo', 'bar');
var selectedValue1 = new Array(11.12, 16.591, 9.835, 14.0, 1, 1);
var selectedValue2 = new Array(33.209, 55.71, 49.38, 50.18, 1, 1);
var selectedValue3 = new Array(34.32, 72.306, 59.216, 64.189, 1, 1);
var selectedValue4 = new Array(1, 9.374, 4.413, 5.093, 1, 1); //TODO fix these demo numbers
var selectedValue5 = new Array(1, 9.374, 4.413, 5.093, 1, 1);
var selectedValue6 = new Array(1, 9.374, 4.413, 5.093, 1, 1);
var attrSelection = new Array();
var svirRankKeys = new Array();
var svirRankValues = new Array();
var svirRegionRankKeys = new Array();
var svirRegionRankValues = new Array();
var layerControl;
var selectedPDef;

var TILESTREAM_URL = 'http://tilestream.openquake.org/v2/';

// An object of all attributes and values to be used for the checkbox selection
var dataFormated = {};

// Keep track of the layer names
var layers;

// Make a list of categorys
var categoryList = [];
var layersByCat = {};
var layerNames = {};
var layerGrids = [];
var projectDefinition = {};

// Three PCP charts
var iriChart = {};
var categoryChart = {};

// Primary indicator for the PCP chart
var primaryIndicator = {};
var categoryIndicator = {};
var sessionPrimaryIndicator = {};
var sessionCategoryIndicator = {};
var defaultPrimaryIndicator = {};

// Grandpapa array
var chartArray = [];

// Parent objs on for the selected attributes
var obj0 = {};
var obj1 = {};
var obj2 = {};
var obj3 = {};
var obj4 = {};
var obj5 = {};
var obj6 = {};
var obj7 = {};
var obj8 = {};
var obj9 = {};
var obj10 = {};
var obj11 = {};
var obj12 = {};
var obj13 = {};
var obj14 = {};
var obj15 = {};
var obj16 = {};
var obj17 = {};
var obj18 = {};

var chart;

// vars used to set the weights of the project definition json
var data;
var pdData;
var pdName;
var pdWeight;
var pdLevel;
var pdParent;

// Keep track of project definition elements whos weights have been changes
var tempWeight = {};
var tempCatWeight = {};
var pdTempWeights = [];
var pdTempWeightsComputed = [];
var pdTempSpinnerIds = [];
var pdTempIds = [];
var pdTempPrimaryIndicator = [];
var pdTempPrimaryIndicatorLevels = [];
var pdTempPILevel = {};
var pdTempCategoryIndicator = [];
var parentChildKey = {};
var sviParentChildKey = {};
var pdTempCatWeight = {};
var tempCategory = "";
var tempSVI = "";
var tempParentChildKey = [];
var catIndicator = {};
var tempCatSearchElements = [];
var tempSviSearchElements = [];
var tempSviWeight = "";
var tempAalWeight = "";
var tempAalValue = "";
var tempIriWeight = "";
var municipality = [];

var baseMapUrl = (
    "http://{s}.tiles.mapbox.com/v3/unhcr.map-8bkai3wa/{z}/{x}/{y}.png"
);

var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

var startApp = function() {

    app.createMap();

    layers = {};

    layerControl = L.control.layers(app.baseLayers);
    map.panTo(new L.LatLng(39.399, -8.22));
    map.setZoom(6);

    // Duplicate layer warnning message
    function showDuplicateMsg() {
        $("#warning-duplicate").dialog("open");
    };

    $(document).ready(function() {
        $("#warning-duplicate").dialog({
            autoOpen: false,
            hieght: 300,
            width: 350,
            modal: true
        });
    });

    // Slider
    $(function() {
        $( "#slider-vertical" ).slider({
            orientation: "vertical",
            range: "min",
            min: 0,
            max: 100,
            value: 16.666,
            slide: function( event, ui ) {
                $( "#econ-weight" ).val( ui.value );
            }
        });
        $( "#econ-weight" ).val( $( "#slider-vertical" ).slider( "value" ) );
    });

    // No Layer to remove warnning message
    function showRemoveMsg() {
        $("#warning-no-layer").dialog("open");
    };

    //  Project definition dialog
    $("#projectDefDialog").dialog({
        autoOpen: false,
        height: 500,
        width: 800,
        modal: false
    });

    //  IRI PCP dialog
    $("#iri-pcp-chart").dialog({
        autoOpen: false,
        height: 500,
        width: 800,
        modal: false
    });

    $("#project-definition").button().click(function() {
        $("#projectDefDialog").dialog("open");
    });

    $("#warning-no-layer").dialog({
        autoOpen: false,
        hieght: 300,
        width: 350,
        modal: true
    });

    //  New project selection dialog
    $("#loadProjectDialog").dialog({
        autoOpen: false,
        height: 220,
        width: 350,
        modal: true
    });

    $("#load-project").button().click(function() {
        $("#loadProjectDialog").dialog("open");
    });

    // Remove layer 
    var removeLayer = function () {
        // Clear the contents of the table
        $("#tableBody").html("");
        $("#tablehead").html("");

        var e = document.getElementById("layer-list");
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

    // Get layer names from tilestream
    var tileStreamLayer = "";
    var category = "";
    var selCat = document.getElementById('layer-category');
    var selLayer = document.getElementById('layer-list');

    // Create a header for the menu drop down
    var catMenuHeader = document.createElement('option');
    catMenuHeader.innerHTML = "Projects:";
    selCat.appendChild(catMenuHeader);

    $.getJSON('http://tilestream.openquake.org/api/v1/Tileset',
    function(json) {

        // Create the category list (build the object)
        for (var i=0; i < json.length; i++) {
            var name = json[i].mapped_value;
            var cat = json[i].category;
            var type = json[i].type;
            var grids = json[i].grids;
            var pDef = json[i].project_definition;

            if (cat != undefined && type == "svir-qgis") {
                categoryList.push(cat);
                layerNames[name] = [];
                layersByCat[cat] = [];
                projectDefinition[name] = [];

                if (grids != undefined) {
                    var grid = grids.toString();
                    var gridName = grid.split("/")[4];
                    layerGrids.push(gridName);
                };
            }
            if (grids != undefined) {
                layerNames[grids] = [];
            };
        }

        // Create the category list (population the object)
        for (var i=0; i < json.length; i++) {
            var name = json[i].mapped_value;
            var cat = json[i].category;
            var type = json[i].type;
            var grids = json[i].grids;
            var pDef = json[i].project_definition;

            if (cat != undefined && type == "svir-qgis") {
                layerId = json[i].id;
                layerTitle = json[i].mapped_value;
                layerNames[name].push(layerId);
                layersByCat[cat].push(layerTitle);
                projectDefinition[name].push(pDef);
            }
        }

        // Get unique category names
        var categoryUnique = categoryList.filter(function(itm,i,categoryList){
            return i==categoryList.indexOf(itm);
        });
    
        for (var i in categoryUnique) {
            // Append category names to dropdown list
            var categoryTitle = categoryUnique[i];
            var opt = document.createElement('option');
            opt.innerHTML = categoryTitle;
            opt.value = categoryTitle;
            selCat.appendChild(opt);
            // Append layer list to dowpdown
            var layerOpt = document.createElement('option');
        }

    });

    // Create dynamic categorized layer dialog
    $("#layer-category").change(function() {
        // Remove the layer list element
        document.getElementById("layer-list").options.length = 0;

       // Create the layer list ibased on the category selected
        var e = document.getElementById("layer-category");
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

    map.addControl(layerControl.setPosition("topleft"));
    // TODO set the map max zoom to 9
    // The interactivity of the map/charts will not work with a map zoom greater then 9
    
    
    // Add layers form tilestream list
    $(document).ready(function() {
        $("#addLayer").click(function() {
            var e = document.getElementById("layer-list");
            var layerId = e.options[e.selectedIndex].value;

            $('#projectDefDialog').empty();

            // Look up the project definition layer id using the layer name
            var selectedPDefArray = projectDefinition[layerId];
            var selectedPDefStr = selectedPDefArray.toString();

            // TODO remove this link and replace with Django api call
            // Link to Github is a temp proof of concept
            // Load the project definition json
            selectedPDefStr = "https://api.github.com/repos/bwyss/oq-platform/git/blobs/9864cb7a5d36572af1451e585f4516d1d19ce568?callback=_processGithubResponse";
 
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
            
            console.log(selectedLayer);
            console.log(layerGrids);
            console.log(hasGrid);

            // Check for duplicae layes
            if (selectedLayer in layers) {
                showDuplicateMsg();
            }
            else {
                map.removeLayer(utfGrid);
                utfGrid = {};

                var tileLayer = L.tileLayer('http://tilestream.openquake.org/v2/' 
                    + selectedLayer
                    + '/{z}/{x}/{y}.png',{wax: 'http://tilestream.openquake.org/v2/'
                    +selectedLayer
                    +'.json'});
                layerControl.addOverlay(tileLayer, selectedLayer);
                map.addLayer(tileLayer);
                // Keep track of layers that have been added
                layers[selectedLayer] = tileLayer;

                if (hasGrid == true) {
                    gridList = 1;
                    utfGrid = new L.UtfGrid(TILESTREAM_URL
                        + selectedLayer
                        + '/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
                    map.addLayer(utfGrid);
                    utfGridClickEvent(utfGrid);
                };
            }
        });
    });

    // Remove layers from tilestream
    $(document).ready(function() {
        $('#removeLayer').click(function() {
            gridList = 0;
            map.removeLayer(utfGrid);
            utfGrid = {};
            utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/empty/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
            map.addLayer(utfGrid);
            utfGridClickEvent(utfGrid);
    
            var e = document.getElementById("layer-list");
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
    $("#thematicMap").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true
    });


    $("#thematic-map").button().click(function() {
        $("#thematicMap").dialog("open");
    });

    $(function() {
        $( "#categoryTabs" ).tabs({
            collapsible: true,
            selected: -1,
            active: false
        });
    });

    // Set up the data tables
    $(document).ready(function() {
        $('#econ-table').dataTable({
            "aaSorting": [ [0,'asc'], [1,'asc'] ],
            "sPaginationType": "full_numbers",
            //"aoColumnDefs": [
              //  { "sWidth": "20%", "aTargets": [ 0 ] }
            //],
        });
    });

    $(document).ready(function() {
        $('#pop-table').dataTable({
            "aaSorting": [ [0,'asc'], [1,'asc'] ],
            "sPaginationType": "full_numbers",
            //"aoColumnDefs": [
              //  { "sWidth": "20%", "aTargets": [ 0 ] }
            //],
        });
    });

    $(document).ready(function() {
        $('#gov-table').dataTable({
            "aaSorting": [ [0,'asc'], [1,'asc'] ],
            "sPaginationType": "full_numbers",
            //"aoColumnDefs": [
              //  { "sWidth": "20%", "aTargets": [ 0 ] }
            //],
        });
    });

    $(document).ready(function() {
        $('#edu-table').dataTable({
            "aaSorting": [ [0,'asc'], [1,'asc'] ],
            "sPaginationType": "full_numbers",
            //"aoColumnDefs": [
              //  { "sWidth": "20%", "aTargets": [ 0 ] }
            //],
        });
    });

    function buildDataTable(e, dataCat) {
        var values = [];
        for (var d in e.data) {
            values.push(e.data[d]);
        }
        var keys = Object.keys(e.data);
        for (var i=0, il=values.length; i<il; i++){
            $('#'+dataCat).dataTable().fnAddData( [
                keys[i],
                values[i]
                ]
            );
        }
    };

    function findPrimaryIndicators(pdData, pi) {
        // Find all of the primary indicators
        if (pi.some(function(currentValue) {
            return (pdData.type == currentValue);
        })) {
            //console.log(pdData);
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

    var utfGridClickEvent = function(utfGrid) {
        utfGrid.on('click', function(e) {
            $("#iri-pcp-chart").dialog("open");
            // Get the SVIR data from the utfGrid
            var tmpIri = {};
            var tmpPI;
            var tempCI;

            if (e.data) {
                // Find the variables that are primary indicators and their respecive category
                var ci = "categoryIndicator";
                findCategoryIndicators(pdData, [ci]);
                var pi = "primaryIndicator";
                findPrimaryIndicators(pdData, [pi]);
                var svi = "svi";
                findSvi(pdData, [svi]);

                // Create an object for each of the category indicators
                for (var n = 0; n < pdTempCategoryIndicator.length; n++) {
                    parentChildKey[pdTempCategoryIndicator[n]] = [];
                    var category = pdTempCategoryIndicator[n];
                };

                var iri = e.data.ir;
                iri = iri.split(',');
                var munic = e.data.municipio;
                munic = munic.split(',');
                //console.log(munic);
                var pri = e.data.pri;
                if (pri == undefined) {
                    pri = e.data.aal;
                };

                var munic_num = e.data['municipio'].split(',').length;
                municipality = e.data['municipio'].split(',');


                /////////////////////////////////////////////
                //// Create the primary indicator objects ///
                /////////////////////////////////////////////
 
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
                            var elementsParent =  checkElementCategory(elementName);

                            //console.log(elementsParent);

                            // Keep track of parents and their respective children
                            for (var k in parentChildKey) {
                                if(k == elementsParent) {
                                    var ep = elementsParent;
                                    var pos;
                                    pos = parentChildKey[ep].indexOf(elementName);
                                    if (!~pos) {
                                        parentChildKey[ep].push(elementName);
                                    };
                                };
                            };
                            
                            tmp[elementName] = parseFloat(tmpPI[m]);
                            tmp.municipality = municipality[m];
                            primaryIndicator[m] = tmp;
                        };
                    };
                };

                // Create the primary indicators obj continued 
                for (var i = 0; i < munic_num.length; i++) {
                    tmp.municipality = municipality[i];
                    primaryIndicator[i] = tmp;
                };

                // Keep the primaryIndicator obj as is and make a session copy that 
                // is to be modifyed by the project definition weights 
                var defaultPrimaryIndicator = JSON.parse( JSON.stringify( primaryIndicator ) );
                var sessionPrimaryIndicator = JSON.parse( JSON.stringify( primaryIndicator ) );
                
                // Multiply the copy of primary indicator data by the weighted value
                for(var p1 in sessionPrimaryIndicator) {
                    for(var p2 in sessionPrimaryIndicator[p1]) {
                        if(tempWeight.hasOwnProperty(p2)) {
                            sessionPrimaryIndicator[p1][p2] *= tempWeight[p2];
                        };
                    };
                };
                ///////////////
                //// Scale ////
                ///////////////

                var keys = Object.keys(sessionPrimaryIndicator[0]);
                
                for (var i = 0; i < keys.length; i++) {
                    // .... TODO iterate of every sessionPrimaryIndicator[k] element
                    // and scale each value...
                }

                // NOTE, currently the scale code below is working, but for only the crimerate element..

                // Scale each primary indicator value from 0 to 1
                // First find the min and max of each primary indicator per municipality
                var tempValues = [];
                var scaleValue = [];
                //console.log(parentChildKey);

                // Define the method to get values out of the sessionPrimaryIndicator object
                function getValues() {
                    tempValues.push(this.crimerate);
                }

                // Associate the getValues method with the sessionPrimaryIndicator object
                for(var k in sessionPrimaryIndicator) {
                    sessionPrimaryIndicator[k].getPIValues = getValues;
                };

                // Call the getValues method
                for(var k in sessionPrimaryIndicator) {
                    sessionPrimaryIndicator[k].getPIValues();
                };

                var tempMin = Math.min.apply(null, tempValues),
                    tempMax = Math.max.apply(null, tempValues);

                //console.log(tempValues);
                //console.log(tempMin);
                //console.log(tempMax);

                // Scale the values
                for (var i = 0; i < tempValues.length; i++) {
                    //console.log( (tempValues[i] - tempMin) / (tempMax - tempMin) );
                    scaleValue.push( (tempValues[i] - tempMin) / (tempMax - tempMin) );
                };

                //console.log(tempValues);
                console.log(scaleValue);

                // Pass scaled values back to the sessionPrimaryIndicator object
                function applyScaledValues(number) {
                    
                        //console.log(scaleValue[i]);
                        return scaleValue[number];
                    
                }

                // Associate the applyScaledValues method with the sessionPrimaryIndicator object
                for(var k  in sessionPrimaryIndicator) {
                    sessionPrimaryIndicator[k].scalePIValues = applyScaledValues;
                };

                // Call the applyScaledValues method
                
                for(var k in sessionPrimaryIndicator) {
                    console.log(k);
                   sessionPrimaryIndicator[k].crimerate = sessionPrimaryIndicator[k].scalePIValues(k);
                 
                }

                console.log(sessionPrimaryIndicator);

                /////////////////////////////////////////////
                /// Create the category indicator objects ///
                /////////////////////////////////////////////

                // The category indicator is the average value of it's children
                // and then multiplyed by its respective weight value

                for (k in parentChildKey) {
                    tempParentChildKey.push(k);
                };

                for (var i = 0; i < tempParentChildKey.length; i++) {
                    catIndicator[tempParentChildKey[i]] = [];
                };

                for (var i = 0; i < tempParentChildKey.length; i++) {
                    tempCatSearchElements = parentChildKey[tempParentChildKey[i]]; //what we are looking for in sessionPrimaryIndicator

                    // This function is needed to provide 'i' with its own scope
                    function scopeForCatIteration(i) {
                        //console.log(sessionPrimaryIndicator);
                        for (var key in sessionPrimaryIndicator) {
                            var obj = sessionPrimaryIndicator[key];
                            var prObj = [];
                            var piArray = [];
                            var mun = sessionPrimaryIndicator[key].municipality;


                            for (var n = 0; n < tempCatSearchElements.length; n++) {
                                piArray.push(obj[tempCatSearchElements[n]]);
                            };

                            var average = 0;
                            $.each(piArray,function() {
                                average += this;
                            });

                            // The category value (without weight)
                            average = (average / piArray.length);
                            prObj[mun] = average;
                            catIndicator[tempParentChildKey[i]].push(prObj); // Raw value with no weight applied
                            tempCategory = tempParentChildKey[i];
                        }; 
    
                    } //end function

                    scopeForCatIteration(i);
                };

                var sessionCatIndicator = jQuery.extend(true, {}, catIndicator);

                // Multiply the category indicator data by the weighted value
                for(var p1 in sessionCatIndicator){
                    for (var i = 0; i < sessionCatIndicator[p1].length; i++) {
                        for(prop in sessionCatIndicator[p1][i]) {
                            if(sessionCatIndicator[p1][i].hasOwnProperty(prop)){
                                sessionCatIndicator[p1][i][prop] *= tempCatWeight[p1];
                            }
                        }
                    }
                }

                console.log(sessionCatIndicator);
                /////////////////////////////////////////////
                /////////// Create the svi object ///////////
                /////////////////////////////////////////////

                var sviIndicator = {};
                var tempSviParentChildKey = [];
                var tempSviIndicator = {};
                //var strName, strValue, tempIndicatorKey, tempIndicatorValue; //move these vars into for loop below
                for (var i = 0; i < municipality.length; i++) {
                    tempSviIndicator[municipality[i]] = [];
                };

                tempSviSearchElements = Object.keys(sessionCatIndicator);
                console.log(tempSviSearchElements);

                var sessionKey = "";
                for(var k in sessionCatIndicator) {
                    sessionKey = k;
                }

                function sc() {
                    if (tempIndicatorKey = strName) {
                        tempSviIndicator[tempIndicatorKey].push(strValue);
                    };
                };

                for (var i = 0; i < tempSviSearchElements.length; i++) {
                    if (sessionKey = tempSviSearchElements[i]) {
                        for (var j = 0; j < sessionCatIndicator[sessionKey].length; j++) {
                            var strName, strValue, tempIndicatorKey, tempIndicatorValue;

                            for(strName in sessionCatIndicator[sessionKey][j]) {
                                strValue = sessionCatIndicator[sessionKey][j][strName];
                                
                                $.each(tempSviIndicator, function(key, value){
                                    tempIndicatorKey = key;
                                    tempIndicatorValue = value;
                                });
                            }
                            sc();
                        };  
                    };
                };

                sviIndicator = jQuery.extend(true, {}, tempSviIndicator);

                // Multiply the svi value by the weighted value
                $.each(sviIndicator, function(key, value) {
                    var sviAverage = 0;
                    var sviValue = 0;
                    $.each(value, function() {
                        sviAverage =+ (this / value.length);
                        sviValue = (sviAverage * tempSviWeight);
                    });
                    sviIndicator[key] = sviValue;
                })

                sviIndicator.plotElement = "svi"; // Lable within the object

                //////////////////////////////////////////////
                /////////// Create the PRI object ////////////
                //////////////////////////////////////////////

                // For the sample data provided aal = pri
                // However in the future this will need to be expanded
                // to include the children of pri

                var aalIndicator = {};
                var aalArray = e.data.aal.split(",");

                for (var i = 0; i < municipality.length; i++) {
                    aalIndicator[municipality[i]] = parseFloat([aalArray[i]]);
                };

                aalCopy = jQuery.extend(true, {}, aalIndicator); // ** Value with no Weight

                var aalStr = "aal";
                findAalWeight(pdData, [aalStr]);

                // Multiply the aal value by the weighted value
                $.each(aalIndicator, function(key, value) {
                    var aalValue = 0;
                    aalValue = (value * tempAalWeight);
                    aalIndicator[key] = aalValue;
                })

                aalIndicator.plotElement = "aal"; // Lable within the object

                //////////////////////////////////////////////
                // Create the IRI category indicator object //
                //////////////////////////////////////////////

                var iriIndicator = {};
                var iriArray = iri; // Do not use these values, 
                // instead compute the iri from PRI and SVI

                for (var i = 0; i < municipality.length; i++) {
                    iriIndicator[municipality[i]] = "";
                };

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
                        tmp = (sviValue + aalValue);
                        iriIndicator[k] = tmp;
                    }
                };

                iriIndicator.plotElement = "iri"; // Lable within the object
                console.log(iriIndicator);
            }
            var iriPcpData = [];
            iriPcpData.push(iriIndicator);
            iriPcpData.push(sviIndicator);
            iriPcpData.push(aalIndicator);
            console.log(iriPcpData);
            //buildD3SpiderChart(iriPcpData);
            buildD3SpiderChart(iriPcpData);
        });
    }

    ////////////////////////////////////////////
    ////// IRI Parallel Coordinates Chart //////
    ////////////////////////////////////////////

    function buildD3SpiderChart(iriPcpData) {

        var plotElements = ["iri", "svi", "aal"]; //need to add these lables into the respective objects

        var keys = [];
        for (var k in iriPcpData) {
            keys.push(k);
        }

        var m = [80, 160, 200, 160],
            w = 1480 - m[1] - m[3],
            h = 500 - m[0] - m[2];
        
        var x = d3.scale.ordinal().domain(municipality).rangePoints([0, w]),
            y = {};
        
        var line = d3.svg.line(),
            axis = d3.svg.axis().orient("left"),
            foreground;

        $("#iri-pcp-chart").empty();

        var svg = d3.select("#iri-pcp-chart").append("svg")
            .attr("width", w + m[1] + m[3])
            .attr("height", h + m[0] + m[2])
            .append("svg:g")
            .attr("transform", "translate(" + m[3] + ",5)");
        
        
            // Create a scale and brush for each trait.
            municipality.forEach(function(d) {
                // Coerce values to numbers.
                iriPcpData.forEach(function(p) { p[d] = +p[d]; });

                y[d] = d3.scale.linear()
                    .domain(d3.extent(iriPcpData, function(p) { return p[d]; }))
                    .range([h, 0]);
          
                y[d].brush = d3.svg.brush()
                    .y(y[d])
                    .on("brush", brush);
            });

            // Add a legend.
            var legend = svg.selectAll("g.legend")
                .data(plotElements)
                .enter().append("svg:g")
                .attr("class", "legend")
          
            legend.append("svg:line")
                .attr("class", String)
                .attr("x2", -28)
                .attr("y2", 0)
                .attr("transform", function(d, i) { return "translate(-140," + (i * 20 + 75) + ")"; });

            legend.append("svg:text")
                .attr("x", -125)
                .attr("y", -510)
                .attr("dy", ".31em")
                .text("test");

            legend.append("svg:text")
                .attr("x", -125)
                .attr("y", -510)
                .attr("dy", ".31em")
                .text(function(d) { return d; })
                .attr("transform", function(d, i) { return "translate(0," + (i * 20 + 584) + ")"; });
          
            // Add foreground lines.
            foreground = svg.append("svg:g")
                .attr("class", "foreground")
                .selectAll("path")
                .data(iriPcpData)
                .enter().append("svg:path")
                .attr("d", path)
                .attr("class", function(d) { console.log(d); return d.plotElement; });
          
            // Add a group element for each trait.
            var g = svg.selectAll(".trait")
                .data(municipality)
                .enter().append("svg:g")
                .attr("class", "trait")
                .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
                .call(d3.behavior.drag()
                .origin(function(d) { return {x: x(d)}; })
                .on("dragstart", dragstart)
                .on("drag", drag)
                .on("dragend", dragend));
          
            // Add an axis and title.
            g.append("svg:g")
                .attr("class", "axis")
                .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
                .append("svg:text")
                .attr("id", "attrLable")
                .attr("text-anchor", "left")
                .attr("y", 160)
                .attr("x", 160)
                .text(String);
          
            // Add a brush for each axis.
            g.append("svg:g")
                .attr("class", "brush")
                .each(function(d) { d3.select(this).call(y[d].brush); })
                .selectAll("rect")
                .attr("x", -8)
                .attr("width", 16);
          
            function dragstart(d) {
                i = keys.indexOf(d);
            }
          
            function drag(d) {
                x.range()[i] = d3.event.x;
                keys.sort(function(a, b) { return x(a) - x(b); });
                g.attr("transform", function(d) { return "translate(" + x(d) + ")"; });
                foreground.attr("d", path);
            }
          
            function dragend(d) {
                x.domain(keys).rangePoints([0, w]);
                var t = d3.transition().duration(500);
                t.selectAll(".trait").attr("transform", function(d) { return "translate(" + x(d) + ")"; });
                t.selectAll(".foreground path").attr("d", path);
            }

            

        // Update the css for each plotElements
        $("."+plotElements[0]).css('stroke', 'red');
        $("."+plotElements[1]).css('stroke', 'blue');
        $("."+plotElements[2]).css('stroke', 'green');
        $("."+plotElements[3]).css('stroke', 'orange');
        $("."+plotElements[4]).css('stroke', 'purple');
        $("."+plotElements[5]).css('stroke', 'black');
        $("."+plotElements[6]).css('stroke', 'gray');
        $("."+plotElements[7]).css('stroke', 'pink');
        $("."+plotElements[8]).css('stroke', 'teal');
        $("."+plotElements[9]).css('stroke', 'DarkBlue');
        $("."+plotElements[10]).css('stroke', 'DarkCyan');
        $("."+plotElements[11]).css('stroke', 'Crimson');
        $("."+plotElements[12]).css('stroke', 'Coral');
        $("."+plotElements[13]).css('stroke', 'DarkGoldenRod');
        $("."+plotElements[14]).css('stroke', 'MediumPurple');
        $("."+plotElements[15]).css('stroke', 'MediumSlateBlue');
        $("."+plotElements[16]).css('stroke', 'MediumSeaGreen');
        $("."+plotElements[17]).css('stroke', 'MidnightBlue');
        $("."+plotElements[18]).css('stroke', 'Maroon');

        // Returns the path for a given data point.
        
        function path(d) {
            return line(municipality.map(function(p) { return [x(p), y[p](d[p])]; }));
        }

        // Handles a brush event, toggling the display of foreground lines.
        function brush() {
            var actives = municipality.filter(function(p) { return !y[p].brush.empty(); }),
                extents = actives.map(function(p) { return y[p].brush.extent(); });
            foreground.classed("fade", function(d) {
                return !actives.every(function(p, i) {
                    return extents[i][0] <= d[p] && d[p] <= extents[i][1];
                });
            });
        }
    } // End PCP Chart

    // Change the utfgrid layer when the tabs are clicked
    $("#econ").click(function(){ 
        dataCat = "econ-table";
        chartCat = "econ-chart";
        utfGridClickEvent(dataCat, chartCat);
        $("#chartOptions").empty();
        $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
        $("#empty").remove();
    });

    $("#pop").click(function(){
        dataCat = "pop-table";
        chartCat = "pop-chart";
        utfGridClickEvent(dataCat, chartCat);
        $("#chartOptions").empty();
        $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
        $("#empty").remove();
    });

    $("#health").click(function(){
        dataCat = "health-table";
        chartCat = "health-chart";
        utfGridClickEvent(dataCat, chartCat);
        $("#chartOptions").empty();
        $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
        $("#empty").remove();
    });

    $("#infra").click(function(){
        dataCat = "infra-table";
        chartCat = "infra-chart";
        utfGridClickEvent(dataCat, chartCat);
        $("#chartOptions").empty();
        $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
        $("#empty").remove();
    });

    $("#gov").click(function(){
        dataCat = "gov-table";
        chartCat = "gov-chart";
        utfGridClickEvent(dataCat, chartCat);
        $("#chartOptions").empty();
        $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
        $("#empty").remove();
    });

    $("#edu").click(function(){
        dataCat = "edu-table";
        chartCat = "edu-chart";
        utfGridClickEvent(dataCat, chartCat);
        $("#chartOptions").empty();
        $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
        $("#empty").remove();
    });

    // This layer is used for the visual representation of the data
    //var portugal = L.tileLayer('http://tilestream.openquake.org/v2/svir-portugal/{z}/{x}/{y}.png');
    //layerControl.addOverlay(portugal, "svir-portugal");
    //map.addLayer(portugal);

    //var utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/svir-portugal/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
    //map.addLayer(utfGrid);
/*
    var utfGridClickEvent = function(dataCat, chartCat) {
        utfGrid.on('click', function (e) {
            // TODO allow the user to control the number of countries/attributes to interrogate

            $("#"+chartCat+"-bar").empty();
            svirRankValues = [];
            svirRankKeys = [];
            svirRegionRankValues = [];
            svirRegionRankKeys = [];
            svirBarArray = [];
            // When the map is clikced the table needs to be cleared out and recreated 
            var countryTable = $("#"+dataCat).dataTable();
            countryTable.fnClearTable();
            buildDataTable(e, dataCat);

            if (e.data) {

                // Populate a drop down list so the user can select attributes to be used in the spider chart
                var values = [];
                for (var d in e.data) {
                    values.push(e.data[d]);
                }
                var keys = Object.keys(e.data);

                $(function() {
                    var max = 6;
                    var checkboxes = $('input[type="checkbox"]');
                    checkboxes.change(function() {
                        var current = checkboxes.filter(':checked').length;
                    checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
                    });
                });

                if(attrSelection.length == 0) {
                    attrSelectionArray = $('.attributeOption:checkbox:checked');
                    for (var i = attrSelectionArray.length - 1; i >= 0; i--) {
                        attrSelection[i] = attrSelectionArray[i].name;
                    };
                }
    
                var distName = e.data.DISTRICT;
                var ec = (e.data.economic).split(",");
                var ed = (e.data.education).split(",");
                var g = (e.data.gov).split(",");
                var h = (e.data.health).split(",");
                var inf = (e.data.infrastruc).split(",");
                var s = (e.data.social).split(",");

                var econ = [];
                for (var i = 0; i < ec.length; i++) {
                    econ[i] = parseFloat(ec[i]);
                };
                var edu = [];
                for (var i = 0; i < ed.length; i++) {
                    edu[i] = parseFloat(ed[i]);
                };
                var gov = [];
                for (var i = 0; i < ed.length; i++) {
                    gov[i] = parseFloat(ed[i]);
                };
                var health = [];
                for (var i = 0; i < h.length; i++) {
                    health[i] = parseFloat(h[i]);
                };
                var infra = [];
                for (var i = 0; i < inf.length; i++) {
                    infra[i] = parseFloat(inf[i]);
                };
                var social = [];
                for (var i = 0; i < s.length; i++) {
                    social[i] = parseFloat(s[i]);
                };

                // give weight to the categories
                var svirData = e.data;
                var econWeight = ($( "#econ-weight" ).val() / 100);

                //var a = econ.map(function(x) x * 5);

                var a = econ.map(function(x) { return x * econWeight; });
                var b = edu.map(function(x) { return x * ((1 - econWeight) / 5)});
                var c = gov.map(function(x) { return x * ((1 - econWeight) / 5)});
                var d = health.map(function(x) { return x * ((1 - econWeight) / 5)});
                var f = infra.map(function(x) { return x * ((1 - econWeight) / 5)});
                var g = social.map(function(x) { return x * ((1 - econWeight) / 5)});

                econ = a;
                edu = b;
                gov = c;
                health = d;
                infra = f;
                social = g;
                    
                var keys = Object.keys(e.data);
                keys.shift();
                keys.splice(5, 2);


                var distAttrString = e.data.municipo;
                var distAttr = distAttrString.split(",");

                // TODO: use a 2d array instead of several selectedValue<x> arrays
                buildD3SpiderChart(keys, distName, econ, edu, gov, health, infra, social, distAttr);
                
            } else {
                document.getElementById('click').innerHTML = 'click: nothing';
            }
        }); // End utfGrid click
    } // End utfGridClickEvent
    */
};



app.initialize(startApp);