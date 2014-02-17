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

var utfGrid = new Object;
var layerControl;

// An object of all attributes and values to be used for the checkbox selection
var dataFormated = {};

// Keep track of the layer names
var layers;

// Keep track of grids
var gridList;

// Make a list of categories
var mapCategoryList = [];
var curveCategoryList = [];
var uhsCategoryList = [];
var mapLayerGrids = [];
var curveLayerGrids = [];
var uhsLayerGrids = [];
var mapLayersByCat = {};
var curveLayersByCat = {};
var uhsLayersByCat = {};
var mapLayerNames = {};
var curveLayerNames = {};
var uhsLayerNames = {};
var layerGrid = {};
var curvesByInvestMixed = {};
var uhsByInvestMixed = {};
var curvesAvailable = {};
var uhsAvailable = {};
var curvesByInvestSingle = {};
var uhsByInvestSingle = {};
var selectedCurves = [];
var selectedUhs = [];

var baseMapUrl = (
    "http://{s}.tiles.mapbox.com/v3/unhcr.map-8bkai3wa/{z}/{x}/{y}.png"
);

var TILESTREAM_URL = 'http://tilestream.openquake.org/v2/';

var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

var startApp = function() {

    $(function() {
        $( "#chartDialog" ).dialog({
            autoOpen: false,
            height: 520,
            width: 440,
            closeOnEscape: true,
            position: {at: "right bottom"}
        });
    });

    app.createMap();

    layers = {};

    layerControl = L.control.layers(app.baseLayers);
    map.panTo(new L.LatLng(10, 10));
    map.setZoom(2);
    map.scrollWheelZoom.enable();
    map.options.maxBounds = null;

    function capitalize(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    function unCapitalize(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase();});
    }

    // Duplicate layer warnning message
    function showDuplicateMsg() {
        $("#worning-duplicate").dialog("open");
    };

    $(document).ready(function() {
        $("#worning-duplicate").dialog({
            autoOpen: false,
            height: 300,
            width: 350,
            modal: true
        });
    });

    // Duplicate grid warnning message
    function showDuplicateGridMsg() {
        $("#worning-duplicate-grid").dialog("open");
    };

    $(document).ready(function() {
        $("#worning-duplicate-grid").dialog({
            autoOpen: false,
            height: 300,
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
        $("#worning-no-layer").dialog("open");
    };

    $(document).ready(function() {
        $("#worning-no-layer").dialog({
            autoOpen: false,
            height: 300,
            width: 350,
            modal: true
        });
    });

    // Remove layer 
    var removeLayer = function () {
        // Clear the contents of the table
        $("#tableBody").html("");
        $("#tablehead").html("");

        var e = document.getElementById("layer-list");
        var mapLayerId = e.options[e.selectedIndex].value;

        // Look up the layer id using the layer name
        var mapLayerIdArray = mapLayerNames[mapLayerId];
        var selectedLayer = mapLayerIdArray.toString();

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

    var selCurveCat = document.getElementById('curve-category');
    var selUhsCat = document.getElementById('curve-category');
    var selCurve = document.getElementById('curve-list');
    var selUhs = document.getElementById('uhs-list');

    // Create a header for the menu map drop down
    var catMenuHeader = document.createElement('option');
    catMenuHeader.innerHTML = "Category:";
    selCat.appendChild(catMenuHeader);

    // Create a header for the menu curve drop down
    var catCurveMenuHeader = document.createElement('option');
    catCurveMenuHeader.innerHTML = "Category:";
    selCurveCat.appendChild(catCurveMenuHeader);

    // Create a header for the menu uhs drop down
    var catUhsMenuHeader = document.createElement('option');
    selUhsCat.appendChild(catUhsMenuHeader);
    $('#curve-category option:empty').remove();

    $.getJSON('http://tilestream.openquake.org/api/v1/Tileset',
    function(json) {

        // Create the category list (build the object)
        for (var i=0; i < json.length; i++) {
            var name = json[i].mapped_value;
            var cat = json[i].category;
            var type = json[i].type;
            var grids = json[i].grids;
            var invest = json[i].investigationTime;

            if (type == "curve-hc") {
                curveCategoryList.push(cat);
                curveLayersByCat[cat] = [];
                curveLayerNames[name] = [];
                var grid = grids.toString();
                var gridName = grid.split("/")[4];
                curveLayerGrids.push(gridName);
            }

            if (type == "curve-uhs") {
                uhsCategoryList.push(cat);
                uhsLayersByCat[cat] = [];
                uhsLayerNames[name] = [];
                var grid = grids.toString();
                var gridName = grid.split("/")[4];
                uhsLayerGrids.push(gridName);
            }

            if (invest == undefined && cat != undefined && type == "hazard") {
                mapCategoryList.push(cat);
                mapLayerNames[name] = [];
                mapLayersByCat[cat] = [];
                if (grids != undefined) {
                    var grid = grids.toString();
                    var gridName = grid.split("/")[4];
                    mapLayerGrids.push(gridName);
                }
            }
            if (grids != undefined) {
                mapLayerNames[grids] = [];
            }
        }

        // Create the category list (population the object)
        for (var i = 0; i < json.length; i++) {
            var name = json[i].mapped_value;
            var cat = json[i].category;
            var type = json[i].type;
            var grids = json[i].grids;
            var invest = json[i].investigationTime;
            var template = json[i].template;
            // Crazy clean up
            template = template.replace(/{{#__location__}}{{/, "");
            template = template.replace('/', "");
            template = template.replace(/__location__}}{{#__teaser__}}/, "");
            template = template.replace(/{{{/g, "").replace(/}}}/g, "");
            template = template.substring(0, template.indexOf('{{'));

            if (type == "curve-hc") {
                var curveLayerId = json[i].id;
                var curveLayerTitle = json[i].mapped_value;
                curveLayerNames[name].push(curveLayerId);
                curveLayersByCat[cat].push(curveLayerTitle);
            }

            if (type == "curve-hc" && invest == "mixed") {
                curvesByInvestMixed[i] = name;
                curvesAvailable[i] = template;
            }

            if (type == "curve-hc" && invest != "mixed") {
                curvesByInvestSingle[i] = name;
            }

            if (type == "curve-uhs") {
                var uhsLayerId = json[i].id;
                var uhsLayerTitle = json[i].mapped_value;
                uhsLayerNames[name].push(uhsLayerId);
                uhsLayersByCat[cat].push(uhsLayerTitle);
            }

            if (type == "curve-uhs" && invest == "mixed") {
                uhsByInvestMixed[i] = name;
                uhsAvailable[i] = template;
            }

            if (type == "curve-uhs" && invest != "mixed") {
                uhsByInvestSingle[i] = name;
            }

            if (invest == undefined && cat != undefined && type == "hazard") {
                mapLayerId = json[i].id;
                mapLayerTitle = json[i].mapped_value;
                layerInvest = json[i].investigationTime;
                mapLayerNames[name].push(mapLayerId);
                mapLayersByCat[cat].push(mapLayerTitle);
            }
        }

        // Get unique category names
        var mapCategoryUnique = mapCategoryList.filter(function(itm,i,mapCategoryList){
            return i == mapCategoryList.indexOf(itm);
        });
    
        var curveCategoryUnique = curveCategoryList.filter(function(itm,i,curveCategoryList){
            return i == curveCategoryList.indexOf(itm);
        });

        var uhsCategoryUnique = uhsCategoryList.filter(function(itm,i,uhsCategoryList){
            return i == uhsCategoryList.indexOf(itm);
        });

        for (var i in mapCategoryUnique) {
            // Append category names to map dropdown list
            var mapCategoryTitle = mapCategoryUnique[i];
            var opt = document.createElement('option');
            opt.innerHTML = mapCategoryTitle;
            opt.value = mapCategoryTitle;
            selCat.appendChild(opt);
            // Append layer list to dowpdown
            var layerOpt = document.createElement('option');
        }

        for (var i in curveCategoryUnique) {
            // Append category names to curve dropdown list
            var curveCategoryTitle = curveCategoryUnique[i];
            console.log(curveCategoryTitle);
            var curveOpt = document.createElement('option');
            curveOpt.innerHTML = curveCategoryTitle;
            curveOpt.value = curveCategoryTitle;
            selCurveCat.appendChild(curveOpt);
            // Append layer list to dowpdown
            var layerCurveOpt = document.createElement('option');
        }

        for (var i in curveCategoryUnique) {
            // Append category names to uhs dropdown list
            var uhsCategoryTitle = curveCategoryUnique[i];
            var uhsOpt = document.createElement('option');
            uhsOpt.innerHTML = uhsCategoryTitle;
            uhsOpt.value = uhsCategoryTitle;
            selUhsCat.appendChild(curveOpt);
            // Append layer list to dowpdown
            var layeruhsOpt = document.createElement('option');
        }
    }); //end getjson

    $("#addTileCurve").click(function() {
        $('#addTileUhs').attr("disabled", true);
        $('#removeTileUhs').attr("disabled", true);

        var e = document.getElementById("curve-list");
        var option = e.options[e.selectedIndex].value;
        var investType = checkCurveType(curvesByInvestMixed, curvesByInvestSingle, option);
        var curvesListCap = [];
        var curveType = "hc";

        if (investType.indexOf("mixed") == 1 ) {
            // Use investType to find the key in curvesByInvestMixed
            var layerKey = investType.shift();
            // Use that key to look up available curves in curvesAvailable
            var curvesList = curvesAvailable[layerKey].split(" ");

            // Remove items that are not curves
            var index = curvesList.indexOf("iml");
            if (index > -1) {
                curvesList.splice(index, 1);
            }
            index = curvesList.indexOf("lat");
            if (index > -1) {
                curvesList.splice(index, 1);
            }
            index = curvesList.indexOf("lon");
            if (index > -1) {
                curvesList.splice(index, 1);
            }
            index = curvesList.indexOf("imt");
            if (index > -1) {
                curvesList.splice(index, 1);
            }
            index = curvesList.indexOf("invest_time");
            if (index > -1) {
                curvesList.splice(index, 1);
            }
            
            // remove _ and capotolise the values in the curvesList 
            for (var i = 0; i < curvesList.length; i++) {
                var b = curvesList[i].replace(/_/g, " ");
                b = capitalize(b);
                //  curvesListCap.push(b);
            };

            // Provide the user with the curves that are available in the dialog
            $('#hazardCurveDialog').append('<div id="curve-check-box" Select curves to be ploted in the chart:<br></div>');
            for (var i = 0; i < curvesList.length; i++) {
                var checkbox = '<input type="checkbox" id="'+curvesList[i]+'" class="curve-list" value=" '
                    + curvesList[i]
                    + '">'
                    + curvesList[i]
                    + '<br>';

                $('#curve-check-box').append(checkbox);
            };
            hazardCurveDialog.dialog("option", "height", (420 + (selectedCurves.length * 10)));
            $('.curve-list').prop('checked', true);
            mixedCurve(curveType);

        } else if (investType.indexOf("single") == 0 ) {
            singleCurve();
        } else {
            alert("Whoops, there is an issue with the curve you are trying to load,"
                +" One thing I can think of is some metadata that is required by this app is missing");
        }
    }); //end add tile curve

    $("#addTileUhs").click(function() {
        $('#addTileCurve').attr("disabled", true);
        $('#removeTileCurve').attr("disabled", true);

        var e = document.getElementById("uhs-list");
        var option = e.options[e.selectedIndex].value;
        var investType = checkUhsType(uhsByInvestMixed, uhsByInvestSingle, option);
        var curveType = "uhs";

        if (investType.indexOf("mixed") == 1 ) {
            // Use investType to find the key in uhsByInvestMixed
            var layerKey = investType.shift();
            // Use that key to look up available uhs in uhsAvailable
            var uhsList = uhsAvailable[layerKey].split(" ");
            var uhsListCap = [];

            // Remove items that are not uhs
            index = uhsList.indexOf("lat");
            if (index > -1) {
                uhsList.splice(index, 1);
            }
            index = uhsList.indexOf("lon");
            if (index > -1) {
                uhsList.splice(index, 1);
            }
            index = uhsList.indexOf("invest_time");
            if (index > -1) {
                uhsList.splice(index, 1);
            }
            index = uhsList.indexOf("periods");
            if (index > -1) {
                uhsList.splice(index, 1);
            }
            index = uhsList.indexOf("poe");
            if (index > -1) {
                uhsList.splice(index, 1);
            }

            // remove _ and capotolise the values in the uhsList 
            for (var i = 0; i < uhsList.length; i++) {
                var b = uhsList[i].replace(/_/g, " ");
                b = capitalize(b);
                //uhsListCap.push(b);
            };
        
            // Provide the user with the uhs that are available in the dialog
            $('#hazardCurveDialog').append('<div id="curve-check-box" <p><b>Select curves to be ploted in the chart:</b></p></div>');
            for (var i = 0; i < uhsList.length; i++) {
                var checkbox = '<input type="checkbox" id="'+uhsList[i]+'" class="curve-list" value=" '
                    + uhsList[i]
                    + '">'
                    + uhsList[i]
                    + '<br>';

                $('#curve-check-box').append(checkbox);
            };
            hazardCurveDialog.dialog("option", "height", (420 + (selectedUhs.length * 10)));
            $('.curve-list').prop('checked', true);
            mixedCurve(curveType);

        } else if (investType.indexOf("single") == 0 ) {
            singleCurve();
        } else {
            alert("Whoops, there is an issue with the curve you are trying to load,"
                +" One thing I can think of is some metadata that is required by this app is missing");
        }
    }); // end add uhs curve

    // Check to see if the curve has an investigation time 'mixed'
    function checkCurveType(curvesByInvestMixed, curvesByInvestSingle, option) {
        for (key in curvesByInvestMixed) {
            if (!curvesByInvestMixed.hasOwnProperty(key)) 
                continue;
            if (curvesByInvestMixed[key] === option) {
                var key  = key;
                var mixed = "mixed";
                return [key, mixed];
            }
        }
        for (key in curvesByInvestSingle) {
            if (!curvesByInvestSingle.hasOwnProperty(key)) 
                continue;
            if (curvesByInvestSingle[key] === option) {
                var single = "single";
                return [single];
            }
        }
    }

    // Check to see if the uhs has an investigation time 'mixed'
    function checkUhsType(uhsByInvestMixed, uhsByInvestSingle, option) {
        for (key in uhsByInvestMixed) {
            if (!uhsByInvestMixed.hasOwnProperty(key)) 
                continue;
            if (uhsByInvestMixed[key] === option) {
                var key  = key;
                var mixed = "mixed";
                return [key, mixed];
            }
        }
        for (key in uhsByInvestSingle) {
            if (!uhsByInvestSingle.hasOwnProperty(key)) 
                continue;
            if (uhsByInvestSingle[key] === option) {
                var single = "single";
                return [single];
            }
        }
    }

    // Create dynamic categorized map layer dialog
    $("#layer-category").change(function() {
        // Remove the layer list element
        document.getElementById("layer-list").options.length = 0;

       // Create the layer list based on the category selected
        var e = document.getElementById("layer-category");
        var strUser = e.options[e.selectedIndex].value;
        var layersArray = mapLayersByCat[strUser];
        for (var i in layersArray) {
            var layers = layersArray[i];
            var opt = document.createElement('option');
            opt.innerHTML = layers;
            opt.valuse = layers;
            selLayer.appendChild(opt);
        }
    });

    // Create dynamic categorized curve layer dialog
    $("#curve-category").change(function() {
        // Remove the layer list element
        document.getElementById("curve-list").options.length = 0;

       // Create the layer list based on the category selected
        var e = document.getElementById("curve-category");
        var strUser = e.options[e.selectedIndex].value;
        var layersArray = curveLayersByCat[strUser];
        for (var i in layersArray) {
            var layers = layersArray[i];
            var curveOpt = document.createElement('option');
            curveOpt.innerHTML = layers;
            curveOpt.valuse = layers;
            selCurve.appendChild(curveOpt);
        }
    });

    // Create dynamic categorized uhs layer dialog
    $("#curve-category").change(function() {
        // Remove the layer list element
        document.getElementById("uhs-list").options.length = 0;

       // Create the layer list based on the category selected
        var e = document.getElementById("curve-category");
        var strUser = e.options[e.selectedIndex].value;
        var layersArray = uhsLayersByCat[strUser];
        for (var i in layersArray) {
            var layers = layersArray[i];
            var uhsOpt = document.createElement('option');
            uhsOpt.innerHTML = layers;
            uhsOpt.valuse = layers;
            selUhs.appendChild(uhsOpt);
        }
    });

    map.addControl(layerControl.setPosition("topleft"));
    // TODO set the map max zoom to 9
    // The interactivity of the map/charts will not work with a map zoom greater then 9
    
    
    // Add map layers form tilestream list
    $(document).ready(function() {
        $("#addTileLayer").click(function() {
            var e = document.getElementById("layer-list");
            var mapLayerId = e.options[e.selectedIndex].value;

            // Look up the layer id using the layer name
            var mapLayerIdArray = mapLayerNames[mapLayerId];
            var selectedLayer = mapLayerIdArray.toString();
            var hasGrid = $.inArray(selectedLayer, mapLayerGrids) > -1;

            // Check for duplicae layes
            if (selectedLayer in layers) {
                showDuplicateMsg();
            }
            else if (hasGrid == true && gridList > 0) {
                showDuplicateGridMsg();
            }
            else {
                // Remove any existing UtfGrid layers in order to avoid conflict
                map.removeLayer(utfGrid);
                utfGrid = {};

                var tileLayer = L.tileLayer(TILESTREAM_URL 
                    + selectedLayer
                    + '/{z}/{x}/{y}.png',{wax: TILESTREAM_URL
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

    // Add single curve layers form tilestream list
    function singleCurve() {
        // Remove any existing UtfGrid layers in order to avoid conflict
        map.removeLayer(utfGrid);
        utfGrid = {};
        var e = document.getElementById("curve-list");
        var curveLayerId = e.options[e.selectedIndex].value;
        // Look up the layer id using the layer name
        var curveLayerIdArray = curveLayerNames[curveLayerId];
        var selectedLayer = curveLayerIdArray.toString();
        var hasGrid = $.inArray(selectedLayer, curveLayerGrids) > -1;
        // Check for duplicae layes
        if (selectedLayer in layers) {
            showDuplicateMsg();
        }
        else if (hasGrid == true && gridList > 0) {
            showDuplicateGridMsg();
        }
        else {
            var tileLayer = L.tileLayer(TILESTREAM_URL 
                + selectedLayer
                + '/{z}/{x}/{y}.png',{wax: TILESTREAM_URL
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
    }

    // Add mixed curve layers form tilestream list
    function mixedCurve(curveType) {

        if (curveType == "hc") {

            // Remove any existing UtfGrid layers in order to avoid conflict
            // this is only needed in the case when the user adds the same curve twice
            var e = document.getElementById("curve-list");
            var curveLayerId = e.options[e.selectedIndex].value;
            //curveLayerId = unCapitalize(curveLayerId);
            //curveLayerId = curveLayerId.replace(/ /g, "_");

            //TODO make sure that the curveLayerNames[curveLayerId] are in all lowwer case and are seperated by _
            // Look up the layer id using the layer name
            var curveLayerIdArray = curveLayerNames[curveLayerId];

            var selectedLayer = curveLayerIdArray.toString();
            var hasGrid = $.inArray(selectedLayer, curveLayerGrids) > -1;

        } 
        else if (curveType == "uhs") {
            var e = document.getElementById("uhs-list");
            var uhsLayerId = e.options[e.selectedIndex].value;

            // Look up the layer id using the layer name
            var uhsLayerIdArray = uhsLayerNames[uhsLayerId];
            var selectedLayer = uhsLayerIdArray.toString();
            var hasGrid = $.inArray(selectedLayer, uhsLayerGrids) > -1;
        };

        // Check for duplicae layes
        console.log(selectedLayer);
        console.log(layers);
        if (selectedLayer in layers) {
            showDuplicateMsg();
        }
        else if (hasGrid == true && gridList > 0) {
            showDuplicateGridMsg();
        }
        else {
            map.removeLayer(utfGrid);
            utfGrid = {};
            var tileLayer = L.tileLayer(TILESTREAM_URL 
                + selectedLayer
                + '/{z}/{x}/{y}.png',{wax: TILESTREAM_URL
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
                utfGridClickEventMixed(utfGrid, curveType);
            };
        }
    }

    // Remove map layers from tilestream
    $(document).ready(function() {
        $('#removeTileLayer').click(function() {
            gridList = 0;
            map.removeLayer(utfGrid);
            utfGrid = {};
            utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/empty/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
            map.addLayer(utfGrid);
            utfGridClickEvent(utfGrid);
            var e = document.getElementById("layer-list");
            var mapLayerId = e.options[e.selectedIndex].value;
    
            // Look up the layer id using the layer name
            var mapLayerIdArray = curveLayerNames[mapLayerId];
            var selectedLayer = mapLayerIdArray.toString();
    
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

    // Remove curve layers from tilestream
    $(document).ready(function() {
        $('#removeTileCurve').click(function() {
            $('#addTileUhs').attr("disabled", false);
            $('#removeTileUhs').attr("disabled", false);

            $("#curve-check-box").remove();
            gridList = 0;
            map.removeLayer(utfGrid);
            utfGrid = {};
            utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/empty/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
            map.addLayer(utfGrid);
            utfGridClickEvent(utfGrid);
            var e = document.getElementById("curve-list");
            var mapLayerId = e.options[e.selectedIndex].value;
    
            // Look up the layer id using the layer name
            var mapLayerIdArray = curveLayerNames[mapLayerId];
            var selectedLayer = mapLayerIdArray.toString();
    
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

    // Remove uhs layers from tilestream
    $(document).ready(function() {
        $('#removeTileUhs').click(function() {
            $('#addTileCurve').attr("disabled", false);
            $('#removeTileCurve').attr("disabled", false);

            $("#curve-check-box").remove();
            gridList = 0;
            map.removeLayer(utfGrid);
            utfGrid = {};
            utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/empty/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
            map.addLayer(utfGrid);
            utfGridClickEvent(utfGrid);
            var e = document.getElementById("uhs-list");
            var mapLayerId = e.options[e.selectedIndex].value;
    
            // Look up the layer id using the layer name
            var mapLayerIdArray = uhsLayerNames[mapLayerId];
            var selectedLayer = mapLayerIdArray.toString();
    
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

    // Map options selection dialog
    var hazardCurveDialog = $("#hazardCurveDialog").dialog({
        autoOpen: false,
        height: 420,
        width: 400,
        modal: true
    });

    $("#thematic-map").button().click(function() {
        $("#thematicMap").dialog("open");
    });

    $("#hazard-curve").button().click(function() {
        $("#hazardCurveDialog").dialog("open");
    });

    $("#hazard-dialog").button().click(function() {
        $("#chartDialog").dialog("open");
    });

    $(function() {
        $( "#categoryTabs" ).tabs({
            collapsible: true,
            selected: -1,
            active: false
        });
    });

    var utfGridClickEvent = function(utfGrid) {
        utfGrid.on('click', function (e) {
            $("#chartDialog").empty();
            var prob;
            var iml;
            var probArray = [];
            var imlArray = [];
            var lat;
            var lng;
            var invest_time;
            var imt;

            if (e.data) {
                prob = e.data.prob;
                probArray = prob.split(',');
                iml = e.data.iml;
                imlArray = iml.split(',');
                imt = e.data.imt;
                if(imt == "PGA") {
                    imt = "Peak Ground Acceleration (g)";
                } else if (imt == "PGV") {
                    imt = "Peak Ground Velocity (cm/s)";
                } else if (imt == "PGD") {
                    imt = "Peak Ground Displacement (cm)";
                } else if (imt == "SA") {
                    imt = "Spectral Acceleration (g)";
                }
                lat = e.data.lat;
                lng = e.data.lon;
                if (lat == undefined) {
                    lat = e.data.YCOORD;
                    lng = e.data.XCOORD;
                }
                invest_time = e.data.invest_tim;
                buildD3Chart(probArray, imlArray, lat, lng, invest_time, imt);
            } else {
                //document.getElementById('click').innerHTML = 'click: nothing';
            }
        }); // End utfGrid click
    } // End utfGridClickEvent
    
    var utfGridClickEventMixed = function(utfGrid, curveType) {
        utfGrid.on('click', function (e) {
            // Get the selected curves
            selectedCurves = [];
            if (curveType == 'hc') {
               selectedCurves.push("iml"); 
               var sc = $('.curve-list:checkbox:checked');
            } else if (curveType == 'uhs') {
                selectedCurves.push('periods');
                var sc = $('.curve-list:checkbox:checked');
            };

            for (var i = 0; i < sc.length; i++) {
                selectedCurves.push(sc[i].defaultValue);
            };
            for (i=0; i < selectedCurves.length; i++)
                selectedCurves[i] = selectedCurves[i].trim();

            $("#chartDialog").empty();

            if (e.data) {
                var chartData = e.data;
                console.log(chartData);
                //invest_time = e.data.invest_tim
                buildMixedD3Chart(chartData, selectedCurves, curveType);
            } else {
                //document.getElementById('click').innerHTML = 'click: nothing';
            }
        }); // End utfGrid click
    } // End utfGridClickEventMixed


    ////////////////////////////////////////////
    ////////////// Line Chart //////////////////
    ////////////////////////////////////////////

    function buildD3Chart(probArray, imlArray, lat, lng, invest_time, imt) {
        // grid line functions
        function make_x_axis() {        
            return d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks(5)
        }

        function make_y_axis() {        
            return d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(5)
        }

        var data = [];
        for(i=0; i<probArray.length; i++) {
            // without log values...
            data.push([parseFloat(imlArray[i]), parseFloat(probArray[i])]);
        
            // with log valuse...
            //data.push([log(parseFloat(imlArray[i])), log(parseFloat(probArray[i]))]);
        }

        var margin = {top: 20, right: 20, bottom: 80, left: 60},
        width = 400 - margin.left - margin.right,
        height = 380 - margin.top - margin.bottom;

        var x = d3.scale.log().range([0, width]);
        var y = d3.scale.log().range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            //.ticks(4)
            .tickFormat(function (d) { return d; })
            .orient("bottom");
        var yAxis = d3.svg.axis()
            .scale(y)

            .orient("left");

        var line = d3.svg.line()
            .x(function(d) {
                return x(d.x); 
            })
            .y(function(d) { 
                return y(d.y); 
            });

        var svg = d3.select("#chartDialog").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // grid lines
        svg.append("g")         
            .attr("class", "grid")
            .attr("transform", "translate(0," + height + ")")
            .call(make_x_axis()
                .tickSize(-height, 0, 0)
                .tickFormat("")
            );
    
        svg.append("g")         
            .attr("class", "grid")
            .call(make_y_axis()
                .tickSize(-width, 0, 0)
                .tickFormat("")
            );

        var dataCallback = function(d) {
            d.x = +d[0];
            d.y = +d[1];
        };

        data.forEach(dataCallback);
        x.domain(d3.extent(data, function(d) { return d.x; }));
        y.domain(d3.extent(data, function(d) { return d.y; }));

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", line);
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("x", 160)
            .attr("y", 30)
            .attr("dy", ".71em")
            .attr("text-anchor", "middle")
            .style("font-size","12px")
            .text(imt);
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -60)
            .attr("x", -20)
            .attr("dy", ".71em")
            .style("font-size","12px")
            .style("text-anchor", "end")
            .text("Probabability of exceedance in "+invest_time+" years");

        var legend = d3.select("#chartDialog").append("svg");

        // points along the line
        svg.selectAll("circle.line") 
            .data(data) 
        .enter().append("circle") 
            .attr("class", "line") 
            .attr("cx", function(d) { return x(d.x); }) 
            .attr("cy", function(d) { return y(d.y); }) 
            .attr("r", 4.5)
            .style("fill", "gray")
            .on("mouseover", function() {
                d3.select(this)
                    .attr('r', 6.6)
                    .text(circleX + ", " + circleY)
                    .style("fill", "red");
                var circleX = d3.select(this.__data__.x);
                circleX = circleX.toString();
                circleX = circleX.split(","[0]);

                var circleY = d3.select(this.__data__.y);
                circleY = circleY.toString();
                circleY = circleY.split(","[0]);

                textBottom.text("Point value (x/y): " + circleX + ", " + circleY);

            }).on("mouseout", function() {
                d3.select(this)
                    .attr('r', 4.5)
                    .style("fill", "gray");
            });

        legend.append("text")
            .attr("x", 60)
            .attr("y", 7)
            .attr("dy", ".35em")
            .text("Location (Lon/Lat): "+lng+", "+lat);

        textBottom = svg.append("text")
            .attr("x", 0)
            .attr("y", 340)
            .attr("dy", ".35em")
            .text("");
    } // End Chart


    /////////////////////////////////////////////
    ////////////// Mixed Chart //////////////////
    /////////////////////////////////////////////

    function buildMixedD3Chart(chartData, selectedCurves, curveType) {
        var lat, lon, poe, xAxisLable, yAxisLable, yAxisVariable, curve_vals, curve_coup, curve_name, legend, colors;
        var min_value = 1000.0, min_value_k = "", max_value = -1, max_value_k = "";

        /* associative array of arrays of values */
        curve_vals = [];
        /* associative array of arrays [ x, y ] to describe the curve on the plane */
        curve_coup = [];

        /* associative array of curves produced with d3.line */
        lat = chartData["lat"];
        lon = chartData["lon"];
        if (curveType == 'uhs') {
            poe = chartData['poe'];
        };

        invest_time = chartData["invest_time"];
        if (curveType == 'hc') {
            yAxisLable = "Probabability of exceedance in "+invest_time+" years";
        } else if (curveType == 'uhs') {
            yAxisLable = "Spectral acceleration (g)";
        };

        if (curveType == 'hc') {
            // The imt variable needs to be formated i.e. SA = Spectral Acceleration (g)
            // SA-0.1 = Spectral Acceleration (0.1 s)
            xAxisLable = chartData["imt"];
            if (xAxisLable.indexOf("SA-") == 0 ) {
                var xAxisLableValue = xAxisLable.substring(xAxisLable.indexOf("-") + 1);
                xAxisLable = "Spectral Acceleration (" + xAxisLableValue + " s) [g]";
            } else if (xAxisLable.indexOf("PGA-") == 0) {
                var xAxisLableValue = xAxisLable.substring(xAxisLable.indexOf("-") + 1);
                xAxisLable = "Peak Ground Acceleration [g]";
            } else if (xAxisLable.indexOf("PGV-") == 0) {
                var xAxisLableValue = xAxisLable.substring(xAxisLable.indexOf("-") + 1);
                xAxisLable = "Peak Ground Velocity [cm/s]";
            } else if (xAxisLable.indexOf("PGD-") == 0) {
                var xAxisLableValue = xAxisLable.substring(xAxisLable.indexOf("-") + 1);
                xAxisLable = "Peak Ground Displacement [cm]";
            }
        } else if (curveType == 'uhs') {
            xAxisLable = 'Period (s)';
        };

        for (var k in selectedCurves) {
            curve_name = selectedCurves[k];
            curve_vals[curve_name] = chartData[curve_name].split(",");
        }
        console.log(selectedCurves);
        console.log(curve_vals);

        for (var k in selectedCurves) {
            curve_name = selectedCurves[k];
            var i;
            for (i = 0 ; i < curve_vals[curve_name].length ; i++) {
                
                curve_vals[curve_name][i] = parseFloat(curve_vals[curve_name][i]);
            }
        }

        // Set the y axis variable depending on the type of curve
        if (curveType == 'hc') {
            yAxisVariable = curve_vals['iml'];
            console.log(yAxisVariable);
        } else if (curveType == 'uhs') {
            yAxisVariable = curve_vals['periods'];
            console.log(yAxisVariable);
        };

        var old_value = -100;
        for (i = 0 ; i < yAxisVariable.length ; i++) {
            if (yAxisVariable[i] == old_value) {
                yAxisVariable.splice(i, 1);                
                i--;
            }
            else {
                old_value = yAxisVariable[i];
            }
        }

        for (var k in selectedCurves) {
            curve_name = selectedCurves[k];

            if (curveType == 'hc' && curve_name == "iml")
                continue;
            if (curveType == 'uhs' && curve_name == "periods")
                continue;

            curve_coup[curve_name] = [];
            for (var i = 0 ; i < curve_vals[curve_name].length ; i++) {
                if (yAxisVariable[i] > 0.0 && curve_vals[curve_name][i] > 0.0) {
                    curve_coup[curve_name].push([ yAxisVariable[i], curve_vals[curve_name][i] ]);
                }
            }
        }

        for (var k in selectedCurves) {
            var curve_name = selectedCurves[k];
            var min_cur = 1000.0, max_cur = -1;

            if (curveType == 'hc' && curve_name == "iml")
                continue;
            if (curveType == 'uhs' && curve_name == "periods")
                continue;

            for (var i = 0 ; i < curve_vals[curve_name].length ; i++) {
                if (curve_vals[curve_name][i] == 0)
                    continue;

                if (min_cur > curve_vals[curve_name][i])
                    min_cur = curve_vals[curve_name][i];
                if (max_cur < curve_vals[curve_name][i])
                    max_cur = curve_vals[curve_name][i];
            }
            if (max_value < max_cur) {
                max_value = max_cur;
                max_value_k = curve_name;
            }
            if (min_value > min_cur) {
                min_value = min_cur;
                min_value_k = curve_name;
            }
        }

        // grid line functions
        function x_grid() {
            return d3.svg.axis()
                .scale(x_scale)
                .orient("bottom")
                .ticks(5)
        }

        function y_grid() {
            return d3.svg.axis()
                .scale(y_scale)
                .orient("left")
                .ticks(5)
        }

        function makeCircles(foo, k, color) {
            // Points along the line
            svg.selectAll("circle.line") 
                .data(foo) 
                .enter().append("circle") 
                .attr("class", "line"+k) 
                .attr("cx", function(d) { return x_scale(d[0]); }) 
                .attr("cy", function(d) { return y_scale(d[1]); }) 
                .attr("r", 2.5)
                .style("fill", color)
                .on("mouseover", function() {
                    d3.select(this)
                        .attr('r', 6)
                        .text(circleX + ", " + circleY)
                        .style("fill", "gray");
                    var circleX = d3.select(this.__data__[0]);
                    circleX = circleX.toString();
                    circleX = circleX.split(","[0]);
    
                    var circleY = d3.select(this.__data__[1]);
                    circleY = circleY.toString();
                    circleY = circleY.split(","[0]);
    
                    textTop.text("Point value (x/y): " + circleX + ", " + circleY);
    
                }).on("mouseout", function() {
                    d3.select(this)
                        .attr('r', 2.5)
                        .style("fill", color);
                });
        }

        var margin = {top: 55, right: 20, bottom: 45, left: 60};
        var width = 400 - margin.left - margin.right;
        var height = 380 - margin.top - margin.bottom;

        if (curveType == 'hc') {
            var x_scale = d3.scale.log().range([0, width]).domain([d3.min(yAxisVariable), d3.max(yAxisVariable)]);
            var y_scale = d3.scale.log().range([0, height]).domain([max_value, min_value]);
        } else if (curveType == 'uhs') {
            var x_scale = d3.scale.linear().range([0, width]).domain([d3.min(yAxisVariable), d3.max(yAxisVariable)]);
            var y_scale = d3.scale.linear().range([0, height]).domain([max_value, min_value]);
        };

        var xAxis = [], xAxis_n = 1;
        var xAxis_vals = [];

        xAxis_n = parseInt(Math.ceil(yAxisVariable.length / 5));
        if (xAxis_n > 4)
            xAxis_n = 4;

        for (var i = 0 ; i < xAxis_n ; i++) {
            xAxis_vals[i] = [];
            for (var e = i ; e < yAxisVariable.length ; e += xAxis_n) {
                xAxis_vals[i].push(yAxisVariable[e]);
            }
            if (curveType == 'hc') {
                xAxis[i] = d3.svg.axis()
                    .scale(x_scale)
                    .ticks(4)
                    .innerTickSize(i == 0 ? 8 : 4)
                    .outerTickSize(0)
                    .tickValues(xAxis_vals[i])
                    .orient("bottom");

            } else if (curveType == 'uhs') {
                xAxis[i] = d3.svg.axis()
                    .scale(x_scale)
                    .ticks(4)
                    .orient("bottom");
            };

            if (i == 0) {
                xAxis[i].tickFormat(function (d) { return d; })
            }
            else {
                xAxis[i].tickFormat(function (d) { return ""; })
            }
        }

        var yAxis = d3.svg.axis()
            .scale(y_scale)
            .orient("left");

        var line = d3.svg.line()
            .x(function(d,i) {
                console.log(x_scale(d[0]));
                return x_scale(d[0]);
            })
            .y(function(d) {
                console.log(y_scale(d[1]));
                return y_scale(d[1]);
            })
        
        var svg = d3.select("#chartDialog").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // grid lines
        svg.append("g")         
            .attr("class", "grid")
            .attr("transform", "translate(0," + height + ")")
            .attr('opacity', 0.6)
            .call(x_grid()
                .tickSize(-height, 0, 0)
                .tickFormat("")
            );
    
        svg.append("g")         
            .attr("class", "grid")
            .attr('opacity', 0.6)
            .call(y_grid()
                .tickSize(-width, 0, 0)
                .tickFormat("")
            );

        legend = d3.select("#chartDialog").append("svg")
            .attr("height", 25*(selectedCurves.length - 1));

        for (k in selectedCurves) {
            var curve_name = selectedCurves[k];

            if (curveType == 'hc' && curve_name == "iml")
                continue;
            if (curveType == 'uhs' && curve_name == "periods")
                continue;

            var data = curve_coup[curve_name];

            svg.append("path")
                .data([curve_coup[curve_name]])
                .attr("class", "line"+k)
                .attr("d", line);

            // Update the css for each line
            colors = [
                "darkred", 
                "blue",
                "green", 
                "orange", 
                "red", 
                "sandybrown", 
                "yellowgreen", 
                "darksalmon", 
                "lightseagreen",
                "skyblue"
            ];

            var gray = "A0A0A0";
            $(".line"+k).css({'fill':'none','opacity':'0.5', 'stroke':gray});

            var color = colors[k % colors.length];

            makeCircles(data, k, color);

            var str = selectedCurves[k];
            str = str.replace(/_/g, " ");
            var curveTitle = capitalize(str)

            legend.append("text")
                .attr("x", 90)
                .attr("y", 20*(k))
                .attr("dy", ".35em")
                .text(curveTitle);

            legend.append("svg:circle")
                //.attr("cx", 50) 
                .attr("cy", 20*(k)) 
                .attr("cx", 80)
                .attr("r", 3)
                .style("fill", color)

            $("."+selectedCurves[k]).css({'stroke':colors[k]});
        }

        for (i = 0 ; i < xAxis_n ; i++) {
            var g = svg.append("g");

            g.attr("class", "x axis")
            
            g.attr("transform", "translate(0," + height + ")")
            .call(xAxis[i]);
            if (i == (xAxis_n - 1))
                g.append("text")
                .attr("x", 160)
                .attr("y", 30)
                .attr("dy", ".71em")
                .attr("text-anchor", "middle")
                .style("font-size","12px")
                .text(xAxisLable);
        }
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -60)
            .attr("x", -20)
            .attr("dy", ".71em")
            .style("font-size","12px")
            .style("text-anchor", "end")
            .text(yAxisLable);

        textTopLonLat = svg.append("text")
            .attr("x", 0)
            .attr("y", -32)
            .attr("dy", ".35em")
            .text("Location (Lon/Lat): "+lon+", "+lat);

        textTopLable = svg.append("text")
            .attr("x", -55)
            .attr("y", -47)
            .attr("dy", ".35em")
            .style("font-weight", "bold")
            .attr("font-size","12px")
            .text('Investigation Time: '+invest_time+', Probability of exceedance: '+poe);

        textTop = svg.append("text")
            .attr("x", 0)
            .attr("y", -15)
            .attr("dy", ".35em")
            .text("");
    } //End chart
}; // End startApp

app.initialize(startApp);
