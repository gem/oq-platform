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

// Indicators for the PCP charts
var primaryIndicator = {};
var categoryIndicator = {};
var sessionPrimaryIndicator = {};
var sessionCategoryIndicator = {};
var defaultPrimaryIndicator = {};
var catIndicator = {};
var sessionCatIndicator = {};
var sessionCatIndicator2 = {};
var aalIndicator = {};
var sviIndicator = {};
var iriIndicator = {};

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

// Keep track of the utfGrid that has been selected last
var selectedGrid;

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
    $("#pcp-charts").dialog({
        autoOpen: false,
        height: 660,
        width: 1100,
        modal: false,
        open: function() {
            $('#chart-tabs').tabs({
                create: function(e, ui) {
                    $('#closeBtn').click(function() {
                        $('#pcp-charts').dialog('close');
                    });
                }
            });
        }
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

    function utfGridClickEvent(utfGrid) {
        utfGrid.on('click', function(e) {
            console.log(e);
            processIndicators(e);
            selectedGrid = e;
        });
    }

    function processIndicators(e) {
        var districName = e.data.name_1;
        $("#pcp-charts").dialog("open");
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

            for (var k in defaultPrimaryIndicator) {
                delete defaultPrimaryIndicator[k];
            };

            for (var k in sessionPrimaryIndicator) {
                delete sessionPrimaryIndicator[k];
            };

            for (var k in primaryIndicator) {
                delete primaryIndicator[k];
            };

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
            console.log("primaryIndicator");
            console.log(primaryIndicator);

            ///////////////
            //// Scale ////
            ///////////////

            // Scale each primary indicator value from 0 to 1
            var tempPIvalues = [];
            var scalePIvalues = [];

            // Define the method to get values out of the sessionPrimaryIndicator object
            function getPIvalues(element) {
                tempPIvalues.push(this[element]);
            }

            // Pass scaled values back to the sessionPrimaryIndicator object
            function applyScaledPIvalues(j) {
                return scalePIvalues[j];
            }

            // Associate the getValues method with the sessionPrimaryIndicator object
            for (var k in sessionPrimaryIndicator) {
                sessionPrimaryIndicator[k].getPIvalues = getPIvalues;
            };

            // Associate the applyScaledValues method with the sessionPrimaryIndicator object
            for (var k in sessionPrimaryIndicator) {
                sessionPrimaryIndicator[k].scalePIvalues = applyScaledPIvalues;
            };

            var PIkeys = Object.keys(sessionPrimaryIndicator[0]);

            // Iterate over all the municipalities
            for (var i = 0; i < PIkeys.length; i++) {
                // Call the getValues method
                for (var y in sessionPrimaryIndicator) {
                    sessionPrimaryIndicator[y].getPIvalues(PIkeys[i]);
                };

                if (PIkeys[i] != "municipality" && PIkeys[i] != "getPIvalues" && PIkeys[i] != "scalePIvalues") {

                    var tempPImin = Math.min.apply(null, tempPIvalues),
                        tempPImax = Math.max.apply(null, tempPIvalues);

                    // Scale the values
                    for (var j = 0; j < tempPIvalues.length; j++) {
                        scalePIvalues.push( (tempPIvalues[j] - tempPImin) / (tempPImax - tempPImin) );
                    };

                    // Call the applyScaledValues method
                    for (var l in sessionPrimaryIndicator) {
                        sessionPrimaryIndicator[l][PIkeys[i]] = sessionPrimaryIndicator[l].scalePIvalues(l);
                    };
                };
                scalePIvalues = [];
                tempPIvalues = [];
                
            };

            // The data passed into d3 need to be an array of objects
            // Place the category indicator objects into an array
            var primaryData = [];
            for (var k in sessionPrimaryIndicator) {
                primaryData.push(sessionPrimaryIndicator[k]);
            };

            Primary_PCP_Chart(primaryData, municipality, districName);
            console.log("sessionPrimaryIndicator");
            console.log(sessionPrimaryIndicator);

            /////////////////////////////////////////////
            /// Create the category indicator objects ///
            /////////////////////////////////////////////

            // The category indicator is the average value of it's children
            // and then multiplyed by its respective weight value

            // Clean out the objects
            for (var k in catIndicator) {
                delete catIndicator[k];
            };

            for (var k in sessionCatIndicator) {
                delete sessionCatIndicator[k];
            };

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
            };
            
            for (var j = 0; j < municipality.length; j++) {
                var tempCIValues = [];

                for (var key in primaryIndicator) {
                    for (var i = 0; i < tempParentChildKey.length; i++) {
                        tempCatSearchElements = parentChildKey[tempParentChildKey[i]]; //what we are looking for in primaryIndicator
                        var obj = primaryIndicator[key];
                        var piArray = []; // array of values from a single primaryIndicator obj
                        var mun = primaryIndicator[key].municipality;

                        for (var n = 0; n < tempCatSearchElements.length; n++) {
                            piArray.push(obj[tempCatSearchElements[n]]);
                        };
                        var average = 0;
                        $.each(piArray,function() {
                            average += this;
                        });

                        // The category value (without weight)
                        average = (average / piArray.length);
                        tempCIValues[tempParentChildKey[i]] = average;
                        tempCIValues["municipality"] = mun;

                        // Multiply the category indicator data by the weighted value
                        for (var k in tempCIValues) {
                            for (var p in tempCatWeight) {
                                if (k == p) {
                                    tempCIValues[k] = (tempCIValues[p] * tempCatWeight[k]);
                                };
                            };
                        };      
                    };
                    /*
                    console.log("municipality");
                    console.log(municipality);
                    console.log("tempCIValues");
                    console.log(tempCIValues);
                    // Category indicators that have been averaged and weighted (correct)
                    */

                    catIndicator.newCatObj(key, tempCIValues["economy"], tempCIValues["education"], tempCIValues["municipality"], tempCIValues["population"], tempCIValues["infrastructure"], tempCIValues["governance"] );
                };
            }// end scopeForCatIteration function

            console.log("catIndicator");
            console.log(catIndicator); // IT IS adjusting to the new weight value

            sessionCatIndicator = jQuery.extend(true, {}, catIndicator);

            ///////////////
            //// Scale ////
            ///////////////

            // Scale each category indicator values from 0 to 1
            var tempCIvalues = [];
            var scaleCIvalues = [];

            // Define the method to get values out of the sessionCatIndicator object
            function getCIvalues(element) {
                if (this[element] != undefined) {
                    tempCIvalues.push(this[element]);
                };
            }

            // Pass scaled values back to the sessionCatIndicator object
            function applyScaledCIvalues(j) {
                return scaleCIvalues[j];
            }

            // Associate the getValues method with the sessionCatIndicator object
            for (var k in catIndicator) {
                catIndicator[k].getCIvalues = getCIvalues;
            };

            // Associate the applyScaledValues method with the sessionCatIndicator object
            for (var k in sessionCatIndicator) {
                sessionCatIndicator[k].scaleCIvalues = applyScaledCIvalues;
            };

            var CIkeys = Object.keys(sessionCatIndicator[0]);

            // Iterate over all the category indicators
            for (var i = 0; i < CIkeys.length; i++) {
                // Call the getValues method
                for (var y in catIndicator) {
                    catIndicator[y].getCIvalues(CIkeys[i]);
                };

                //console.log(CIkeys[i]);
                //console.log("tempCIvalues");
                //console.log(tempCIvalues); // correct

                if (CIkeys[i] != "municipality" && CIkeys[i] != "getCIvalues" && CIkeys[i] != "scaleCIvalues" && CIkeys[i] != "newCatObj") {
                    
                    var tempCImin = Math.min.apply(null, tempCIvalues),
                        tempCImax = Math.max.apply(null, tempCIvalues);

                    // Scale the values
                    for (var j = 0; j < tempCIvalues.length; j++) {
                        /*
                        console.log("CIkeys[i]");
                        console.log(CIkeys[i]);
                        console.log("tempCIvalues[j]");
                        console.log(tempCIvalues[j]);
                        console.log((tempCIvalues[j] - tempCImin) / (tempCImax - tempCImin));
                        */
                        scaleCIvalues.push( (tempCIvalues[j] - tempCImin) / (tempCImax - tempCImin) );
                    };


                //console.log("scaleCIvalues");
                //console.log(scaleCIvalues);

                    // Call the applyScaledValues method
                    for (var l in sessionCatIndicator) {
                        //console.log(CIkeys[i]);
                        //console.log(sessionCatIndicator[l].scaleCIvalues(l));
                        sessionCatIndicator[l][CIkeys[i]] = sessionCatIndicator[l].scaleCIvalues(l);
                    };
                };
                scaleCIvalues = [];
                tempCIvalues = [];
            };

            // The data passed into d3 need to be an array of objects
            // Place the category indicator objects into an array
            console.log("sessionCatIndicator");
            console.log(sessionCatIndicator); //NOT adjusting to the new weight
            var catData = [];
            for (var k in sessionCatIndicator) {
                catData.push(sessionCatIndicator[k]);
            };

            Category_PCP_Chart(catData , municipality, districName);


            /////////////////////////////////////////////
            /////////// Create the svi object ///////////
            /////////////////////////////////////////////

            for (var k in sviIndicator) {
                delete sviIndicator[k];
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
            };
            tempSviSearchElements = Object.keys(catIndicator);
            tempSviSearchElements.pop();
            var sessionKey = Object.keys(catIndicator[tempSviSearchElements[0]]);
            sessionKey.pop();
            sessionKey.pop();
            
            for (var i = 0; i < tempSviSearchElements.length; i++) {
                var tempArray = [];

                // Grab the municipality of the iteration
                var tempMunic = catIndicator[i]["municipality"];

                // Remove the municipality from the sessionkey array
                var index = sessionKey.indexOf("municipality");

                if (index > -1) {
                    sessionKey.splice(index, 1);
                };

                // Build the temp object
                for (var j = 0; j < sessionKey.length; j++) {
                    tempArray.push(catIndicator[i][sessionKey[j]]);
                };
                var SVIaverage = 0;
                $.each(tempArray,function() {
                    SVIaverage += this;
                });
                SVIaverage = (SVIaverage / tempArray.length);
                sviIndicator.SVIvalues(SVIaverage, tempMunic);
            };

            // Multiply the svi values by the weighted value
            $.each(sviIndicator, function(key, value) {
                if (key != "SVIvalues") {
                    var sviValue = (value * tempSviWeight);
                    sviIndicator[key] = sviValue;
                };
            });

            ///////////////
            //// Scale ////
            ///////////////

            // Scale the svi values
            var valueArray = [];
            var scaleSVIvalues = [];
            for (var v in sviIndicator) {
                valueArray.push(sviIndicator[v]);
            };

            valueArray.shift();
            var tempSVImin = Math.min.apply(null, valueArray),
                tempSVImax = Math.max.apply(null, valueArray);

            for (var j = 0; j < valueArray.length; j++) {
                scaleSVIvalues.push( (valueArray[j] - tempSVImin) / (tempSVImax - tempSVImin) );
            };

            var tempKeys = Object.keys(sviIndicator);
            tempKeys.shift();

            for (var i = 0; i < tempKeys.length; i++) {
                sviIndicator[tempKeys[i]] = scaleSVIvalues[i];
            };

            sviIndicator.plotElement = "svi"; // Lable within the object
            console.log("sviIndicator");
            console.log(sviIndicator);

            //////////////////////////////////////////////
            /////////// Create the PRI object ////////////
            //////////////////////////////////////////////

            for (var k in aalIndicator) {
                delete aalIndicator[k];
            };

            // For the sample data provided aal = pri
            // However in the future this will need to be expanded
            // to include the children of pri


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
            });

            ///////////////
            //// Scale ////
            ///////////////

            // Scale the pri values
            var aalValueArray = [];
            var scaleAALvalues = [];

            for (var v in aalIndicator) {
                aalValueArray.push(aalIndicator[v]);
            };

            var tempAALmin = Math.min.apply(null, aalValueArray),
                tempAALmax = Math.max.apply(null, aalValueArray);

            for (var j = 0; j < aalValueArray.length; j++) {
                scaleAALvalues.push( (aalValueArray[j] - tempAALmin) / (tempAALmax - tempAALmin) );
            };

            var tempKeys = Object.keys(aalIndicator);
            tempKeys.pop();

            for (var i = 0; i < tempKeys.length; i++) {
                aalIndicator[tempKeys[i]] = scaleAALvalues[i];
            };

            aalIndicator.plotElement = "aal"; // Lable within the object


            //////////////////////////////////////////////
            // Create the IRI category indicator object //
            //////////////////////////////////////////////

            for (var k in iriIndicator) {
                delete iriIndicator[k];
            };

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

            ///////////////
            //// Scale ////
            ///////////////
            // Scale the iri values
            var iriValueArray = [];
            var scaleIRIvalues = [];

            for (var v in iriIndicator) {
                iriValueArray.push(iriIndicator[v]);
            };

            var tempIRImin = Math.min.apply(null, iriValueArray),
                tempIRImax = Math.max.apply(null, iriValueArray);

            for (var j = 0; j < iriValueArray.length; j++) {
                scaleIRIvalues.push( (iriValueArray[j] - tempIRImin) / (tempIRImax - tempIRImin) );
            };

            var tempKeys = Object.keys(iriIndicator);

            for (var i = 0; i < tempKeys.length; i++) {
                iriIndicator[tempKeys[i]] = scaleIRIvalues[i];
            };

            iriIndicator.plotElement = "iri"; // Lable within the object
            console.log("iri: ");
            console.log(iriIndicator);
        }
        var iriPcpData = [];
        iriPcpData.push(iriIndicator);
        iriPcpData.push(sviIndicator);
        iriPcpData.push(aalIndicator);
        IRI_PCP_Chart(iriPcpData);
 } // End process indicators function
};

app.initialize(startApp);
