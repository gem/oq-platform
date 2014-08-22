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

var utfGrid = {};
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
var lossCategoryList = [];
var mapLayerGrids = [];
var curveLayerGrids = [];
var uhsLayerGrids = [];
var lossLayerGrids = [];
var mapLayersByCat = {};
var curveLayersByCat = {};
var uhsLayersByCat = {};
var lossLayersByCat = {};
var mapLayerNames = {};
var curveLayerNames = {};
var uhsLayerNames = {};
var lossLayerNames = {};
var layerGrid = {};
var curvesByInvestMixed = {};
var uhsByInvestMixed = {};
var lossByInvestMixed = {};
var curvesAvailable = {};
var uhsAvailable = {};
var lossAvailable = {};
var curvesByInvestSingle = {};
var uhsByInvestSingle = {};
var lossByInvestSingle = {};
var selectedCurves = [];
var selectedUhs = [];
var selectedLoss = [];
var lossLayerId = {};
var lossLayerTitle = {};

//Keep track of layer specific information
var layerInvestigationTime, layerIml, layerImt, layerPoe;
var baseMapUrl = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png');
var TILESTREAM_URL = TS_URL + '/v2/';
var TILESTREAM_API_URL = TS_URL + '/api/v1/Tileset/';
var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

try {
    var bing_key = BING_KEY.bing_key;
} catch(e) {
    // continue
}

var startApp = function() {

    $(function() {
        $( '#chartDialog' ).dialog({
            autoOpen: false,
            height: 520,
            width: 520,
            closeOnEscape: true,
            position: {at: 'right bottom'}
        });
    });

    // switch base maps
    $('#base-map-menu').change(function() {
        var baseMapSelection = document.getElementById('base-map-menu').value;
        map.removeLayer(baseMapUrl);
        if (baseMapSelection == 4) {
            baseMapUrl = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png');
            map.addLayer(baseMapUrl);
        } else if (baseMapSelection == 3) {
            baseMapUrl = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png');
            map.addLayer(baseMapUrl);
        } else if(baseMapSelection == 1) {
            baseMapUrl = new L.TileLayer('http://{s}.tiles.mapbox.com/v3/mapbox.blue-marble-topo-jul/{z}/{x}/{y}.png');
            map.addLayer(baseMapUrl);
        } else if (baseMapSelection == 2) {
            if (bing_key == undefined) {
                alert("A bing maps API key has not been added to this platform, please refer to the installation instructions for details");
            } else {
                baseMapUrl = new L.BingLayer(bing_key); // TODO change the api to point to bing api key aerial with labels
                map.addLayer(baseMapUrl);
            }
        } else if (baseMapSelection == 5) {
            baseMapUrl = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
            map.addLayer(baseMapUrl);
        }
    });

    $('#base-map-menu').css({ 'margin-bottom' : 0 });

    var map = new L.Map('map', {
        minZoom: 2,
        attributionControl: false,
        maxBounds: new L.LatLngBounds(new L.LatLng(-90, -180), new L.LatLng(90, 180)),
    });
    map.setView(new L.LatLng(10, -10), 2).addLayer(baseMapUrl);

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
        $('#worning-duplicate').dialog('open');
    }

    $(document).ready(function() {
        $('#worning-duplicate').dialog({
            autoOpen: false,
            height: 100,
            width: 350,
            modal: true
        });
    });

    // Duplicate grid warnning message
    function showDuplicateGridMsg() {
        $('#worning-duplicate-grid').dialog('open');
    }

    $(document).ready(function() {
        $('#worning-duplicate-grid').dialog({
            autoOpen: false,
            height: 300,
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
        $('#worning-no-layer').dialog('open');
    }

    $(document).ready(function() {
        $('#worning-no-layer').dialog({
            autoOpen: false,
            height: 100,
            width: 350,
            modal: true
        });
    });

    // Remove layer
    var removeLayer = function () {
        // Clear the contents of the table
        $('#tableBody').html('');
        $('#tablehead').html('');

        var e = document.getElementById('layer-list');
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
    var tileStreamLayer = '';
    var category = '';
    var selCat = document.getElementById('layer-category');
    var selLayer = document.getElementById('layer-list');

    var selCurveCat = document.getElementById('curve-category');
    var selUhsCat = document.getElementById('curve-category');
    var selLossCat = document.getElementById('curve-category');
    var selCurve = document.getElementById('curve-list');
    var selUhs = document.getElementById('uhs-list');
    var selLoss = document.getElementById('loss-list');

    // Create a header for the menu map drop down
    var catMenuHeader = document.createElement('option');
    catMenuHeader.innerHTML = 'Category:';
    selCat.appendChild(catMenuHeader);

    // Create a header for the menu drop down
    var catCurveMenuHeader = document.createElement('option');
    catCurveMenuHeader.innerHTML = 'Category:';
    selCurveCat.appendChild(catCurveMenuHeader);

    // Create a header for the menu drop down
    var catUhsMenuHeader = document.createElement('option');
    selUhsCat.appendChild(catUhsMenuHeader);
    $('#curve-category option:empty').remove();

    // Create a header for the menu drop down
    var catLossMenuHeader = document.createElement('option');
    selLossCat.appendChild(catLossMenuHeader);
    $('#curve-category option:empty').remove();

    $.getJSON(TILESTREAM_API_URL, function(json) {
            $('#hazard-curve').attr('disabled', true);

        // Create the category list (build the object)
        for (var i=0; i < json.length; i++) {
            var name = json[i].mapped_value;
            var cat = json[i].category;
            var type = json[i].type;
            var grids = json[i].grids;
            var chartType = json[i].chartType;
            var app = json[i].application;
            var grid, gridName;

            if (type == 'curve-hc' || type == 'curve-uhs' || type == 'curve-loss') {
                curveCategoryList.push(cat);
                curveLayersByCat[cat] = [];
                curveLayerNames[name] = [];
                grid = grids.toString();
                gridName = grid.split('/')[4];
                curveLayerGrids.push(gridName);

            }
            if (type == 'curve-uhs') {
                uhsCategoryList.push(cat);
                uhsLayersByCat[cat] = [];
                uhsLayerNames[name] = [];
                grid = grids.toString();
                gridName = grid.split('/')[4];
                uhsLayerGrids.push(gridName);
            }
            if (type == 'curve-loss') {
                lossCategoryList.push(cat);
                lossLayersByCat[cat] = [];
                lossLayerNames[name] = [];
                grid = grids.toString();
                gridName = grid.split('/')[4];
                lossLayerGrids.push(gridName);
            }
            if (chartType == undefined && cat !== undefined && type == 'hazard') {
                mapCategoryList.push(cat);
                mapLayerNames[name] = [];
                mapLayersByCat[cat] = [];
                if (grids !== undefined) {
                    grid = grids.toString();
                    gridName = grid.split('/')[4];
                    mapLayerGrids.push(gridName);
                }
            }
            if (grids !== undefined) {
                mapLayerNames[grids] = [];
            }
        }

        // Create the category list (population the object)
        for (var j = 0; j < json.length; j++) {
            var name = json[j].mapped_value;
            var cat = json[j].category;
            var type = json[j].type;
            var grids = json[j].grids;
            var chartType = json[j].chartType;
            var template = json[j].template;
            // Crazy clean up
            template = template.replace(/{{#__location__}}{{/, '');
            template = template.replace('/', '');
            template = template.replace(/__location__}}{{#__teaser__}}/, '');
            template = template.replace(/{{{/g, '').replace(/}}}/g, '');
            template = template.substring(0, template.indexOf('{{'));

            if (type == 'curve-hc') {
                var curveLayerId = json[j].id;
                var curveLayerTitle = json[j].mapped_value;
                curveLayerNames[name].push(curveLayerId);
                curveLayersByCat[cat].push(curveLayerTitle);

                if (chartType == 'single') {
                    curvesByInvestSingle[j] = name;
                }
                else if (chartType == 'mixed') {
                    curvesByInvestMixed[j] = name;
                    curvesAvailable[j] = template;
                }
            }

            if (type == 'curve-uhs') {
                var uhsLayerId = json[j].id;
                var uhsLayerTitle = json[j].mapped_value;
                uhsLayerNames[name].push(uhsLayerId);
                uhsLayersByCat[cat].push(uhsLayerTitle);

                if (chartType == 'mixed') {
                    uhsByInvestMixed[j] = name;
                    uhsAvailable[j] = template;
                }
                else if (chartType == 'single') {
                    uhsByInvestSingle[j] = name;
                }
            }

            if (type == 'curve-loss') {
                lossLayerId = json[j].id;
                lossLayerTitle = json[j].mapped_value;
                lossLayerNames[name].push(lossLayerId);
                lossLayersByCat[cat].push(lossLayerTitle);
                lossByInvestMixed[j] = name;
                lossAvailable[j] = template;
                lossByInvestSingle[j] = name;
            }

            if (chartType == undefined && cat !== undefined && type == 'hazard') {
                mapLayerId = json[j].id;
                mapLayerTitle = json[j].mapped_value;
                chartType = json[j].chartType;
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

        var lossCategoryUnique = lossCategoryList.filter(function(itm,i,lossCategoryList){
            return i == lossCategoryList.indexOf(itm);
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

        for (var i in curveCategoryUnique) {
            // Append category names to loss dropdown list
            var lossCategoryTitle = curveCategoryUnique[i];
            var lossOpt = document.createElement('option');
            lossOpt.innerHTML = lossCategoryTitle;
            lossOpt.value = lossCategoryTitle;
            selLossCat.appendChild(curveOpt);
            // Append layer list to dowpdown
            var layerlossOpt = document.createElement('option');
        }
    }).done(function() {
        $('#hazard-curve').attr('disabled', false);
        });

    $('#addTileCurve').click(function() {
        $('#addTileUhs').attr('disabled', true);
        $('#removeTileUhs').attr('disabled', true);
        $('#addTileLoss').attr('disabled', true);
        $('#removeTileLoss').attr('disabled', true);

        var e = document.getElementById('curve-list');
        var option = e.options[e.selectedIndex].value;
        var investType = checkCurveType(curvesByInvestMixed, curvesByInvestSingle, option);
        var curvesListCap = [];
        var curveType = 'hc';

        if (investType.indexOf('mixed') == 1 ) {
            // Use investType to find the key in curvesByInvestMixed
            var layerKey = investType.shift();
            // Use that key to look up available curves in curvesAvailable
            var curvesList = curvesAvailable[layerKey].split(' ');

            // Remove items that are not curves
            var index = curvesList.indexOf('iml');
            if (index > -1) {
                curvesList.splice(index, 1);
            }
            index = curvesList.indexOf('lat');
            if (index > -1) {
                curvesList.splice(index, 1);
            }
            index = curvesList.indexOf('lon');
            if (index > -1) {
                curvesList.splice(index, 1);
            }
            index = curvesList.indexOf('imt');
            if (index > -1) {
                curvesList.splice(index, 1);
            }
            index = curvesList.indexOf('invest_time');
            if (index > -1) {
                curvesList.splice(index, 1);
            }

            // remove _ and capotolise the values in the curvesList
            for (var i = 0; i < curvesList.length; i++) {
                var b = curvesList[i].replace(/_/g, ' ');
                b = capitalize(b);
                //  curvesListCap.push(b);
            }

            // Provide the user with the curves that are available in the dialog
            $('#hazardCurveDialog').append('<div id="curve-check-box"<p><b>Select curves to be ploted in the chart:</b></p></div>');
            for (var j = 0; j < curvesList.length; j++) {
                var checkbox = '<input type="checkbox" id="'+curvesList[j]+'" class="curve-list" value=" ' +
                    curvesList[j] +
                    '">' +
                    curvesList[j] +
                    '<br>';

                $('#curve-check-box').append(checkbox);
            }

            hazardCurveDialog.dialog('option', 'height', (500 + (curvesList.length * 10)));
            $('.curve-list').prop('checked', true);
            mixedCurve(curveType);

        } else if (investType.indexOf('single') == 0 ) {
            singleCurve(curveType);
        } else {
            alert('Whoops, there is an issue with the curve you are trying to load,' +
                ' One thing I can think of is some metadata that is required by this app is missing');
        }
    }); //end add tile curve

    $('#addTileUhs').click(function() {
        $('#addTileCurve').attr('disabled', true);
        $('#removeTileCurve').attr('disabled', true);
        $('#addTileLoss').attr('disabled', true);
        $('#removeTileLoss').attr('disabled', true);

        var e = document.getElementById('uhs-list');
        var option = e.options[e.selectedIndex].value;
        var investType = checkUhsType(uhsByInvestMixed, uhsByInvestSingle, option);
        var curveType = 'uhs';

        if (investType.indexOf('mixed') == 1 ) {
            // Use investType to find the key in uhsByInvestMixed
            var layerKey = investType.shift();
            // Use that key to look up available uhs in uhsAvailable
            var uhsList = uhsAvailable[layerKey].split(' ');
            var uhsListCap = [];

            // Remove items that are not curves
            var removeItems = ['lat', 'lon', 'invest_time', 'periods', 'poe'];
            for (var i = 0; i < removeItems.length; i++) {
                if (uhsList.indexOf(removeItems[i]) > -1) {
                    uhsList.splice(uhsList.indexOf(removeItems[i]), 1);
                }
            }

            // remove _ and capotolise the values in the uhsList
            for (var i = 0; i < uhsList.length; i++) {
                var b = uhsList[i].replace(/_/g, ' ');
                b = capitalize(b);
                //uhsListCap.push(b);
            }

            // Provide the user with the uhs that are available in the dialog
            $('#hazardCurveDialog').append('<div id="curve-check-box" <p><b>Select curves to be ploted in the chart:</b></p></div>');
            for (var l = 0; l < uhsList.length; l++) {
                var checkbox = '<input type="checkbox" id="'+uhsList[l]+'" class="curve-list" value=" ' +
                    uhsList[l] +
                    '">' +
                    uhsList[l] +
                    '<br>';

                $('#curve-check-box').append(checkbox);
            }
            hazardCurveDialog.dialog('option', 'height', (500 + (uhsList.length * 10)));
            $('.curve-list').prop('checked', true);
            mixedCurve(curveType);

        } else if ($.inArray('single', investType) > -1) {
            singleCurve(curveType);

        } else {
            alert('Whoops, there is an issue with the curve you are trying to load,' +
                ' One thing I can think of is some metadata that is required by this app is missing');
        }
    }); // end add uhs curve

    $('#addTileLoss').click(function() {
        $('#addTileCurve').attr('disabled', true);
        $('#removeTileCurve').attr('disabled', true);
        $('#addTileUhs').attr('disabled', true);
        $('#removeTileUhs').attr('disabled', true);

        lossCurve();
    }); // end add loss curve

    // Check to see if the curve has an investigation time 'mixed'
    function checkCurveType(curvesByInvestMixed, curvesByInvestSingle, option) {
        for (var key in curvesByInvestMixed) {
            if (!curvesByInvestMixed.hasOwnProperty(key))
                continue;
            if (curvesByInvestMixed[key] == option) {
                var mixed = 'mixed';
                return [key, mixed];
            }
        }
        for (key in curvesByInvestSingle) {
            if (!curvesByInvestSingle.hasOwnProperty(key))
                continue;
            if (curvesByInvestSingle[key] == option) {
                var single = 'single';
                return [single];
            }
        }
    }

    // Check to see if the uhs has an investigation time 'mixed'
    function checkUhsType(uhsByInvestMixed, uhsByInvestSingle, option) {
        for (var key in uhsByInvestMixed) {
            if (!uhsByInvestMixed.hasOwnProperty(key))
                continue;
            if (uhsByInvestMixed[key] == option) {
                var mixed = 'mixed';
                return [key, mixed];
            }
        }
        for (key in uhsByInvestSingle) {
            if (!uhsByInvestSingle.hasOwnProperty(key))
                continue;
            if (uhsByInvestSingle[key] == option) {
                var single = 'single';
                return [single];
            }
        }
    }

    // Create dynamic categorized map layer dialog
    $('#layer-category').change(function() {
        // Remove the layer list element
        document.getElementById('layer-list').options.length = 0;

       // Create the layer list based on the category selected
        var e = document.getElementById('layer-category');
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
    $('#curve-category').change(function() {
        // Remove the layer list element
        document.getElementById('curve-list').options.length = 0;

       // Create the layer list based on the category selected
        var e = document.getElementById('curve-category');
        var strUser = e.options[e.selectedIndex].value;
        var layersArray = curveLayersByCat[strUser];
        for (var i in layersArray) {
            var layers = layersArray[i];
            var curveOpt = document.createElement('option');
            curveOpt.innerHTML = layers;
            curveOpt.valuse = layers;
            selCurve.appendChild(curveOpt);
        }
        if($('#curve-list').find('option').length == 0) {
            $('#addTileCurve').attr('disabled', true);
            $('#removeTileCurve').attr('disabled', true);
        } else {
            $('#addTileCurve').attr('disabled', false);
            $('#removeTileCurve').attr('disabled', false);
        }
    });

    // Create dynamic categorized uhs layer dialog
    $('#curve-category').change(function() {
        // Remove the layer list element
        document.getElementById('uhs-list').options.length = 0;

        // Create the layer list based on the category selected
        var e = document.getElementById('curve-category');
        var strUser = e.options[e.selectedIndex].value;
        var layersArray = uhsLayersByCat[strUser];
        for (var i in layersArray) {
            var layers = layersArray[i];
            var uhsOpt = document.createElement('option');
            uhsOpt.innerHTML = layers;
            uhsOpt.valuse = layers;
            selUhs.appendChild(uhsOpt);
        }

        if($('#uhs-list').find('option').length == 0) {
            $('#addTileUhs').attr('disabled', true);
            $('#removeTileUhs').attr('disabled', true);
        } else {
            $('#addTileUhs').attr('disabled', false);
            $('#removeTileUhs').attr('disabled', false);
        }
    });

    // Create dynamic categorized loss layer dialog
    $('#curve-category').change(function() {
        // Remove the layer list element
        document.getElementById('loss-list').options.length = 0;

       // Create the layer list based on the category selected
        var e = document.getElementById('curve-category');
        var strUser = e.options[e.selectedIndex].value;
        var layersArray = lossLayersByCat[strUser];
        for (var i in layersArray) {
            var layers = layersArray[i];
            var lossOpt = document.createElement('option');
            lossOpt.innerHTML = layers;
            lossOpt.valuse = layers;
            selLoss.appendChild(lossOpt);
        }
        if($('#loss-list').find('option').length == 0) {
            $('#addTileLoss').attr('disabled', true);
            $('#removeTileLoss').attr('disabled', true);
        } else {
            $('#addTileLoss').attr('disabled', false);
            $('#removeTileLoss').attr('disabled', false);
        }
    });

    map.addControl(layerControl.setPosition('topleft'));
    // TODO set the map max zoom to 9
    // The interactivity of the map/charts will not work with a map zoom greater then 9


    // Add map layers form tilestream list
    $(document).ready(function() {
        $('#addTileLayer').click(function() {
            var e = document.getElementById('layer-list');
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

                var tileLayer = L.tileLayer(TILESTREAM_URL +
                    selectedLayer +
                    '/{z}/{x}/{y}.png',{wax: TILESTREAM_URL +
                    selectedLayer +
                    '.json'});
                layerControl.addOverlay(tileLayer, selectedLayer);
                map.addLayer(tileLayer);
                // Keep track of layers that have been added
                layers[selectedLayer] = tileLayer;

                if (hasGrid == true) {
                    gridList = 1;
                    utfGrid = new L.UtfGrid(TILESTREAM_URL +
                        selectedLayer +
                        '/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
                    map.addLayer(utfGrid);
                    hazardCurveUtfGridClickEvent(utfGrid);
                }
            }
        });
    });

    // Add single curve layers form tilestream list
    function singleCurve(curveType) {
        if (curveType == 'hc') {

            // Remove any existing UtfGrid layers in order to avoid conflict
            map.removeLayer(utfGrid);
            utfGrid = {};
            var e = document.getElementById('curve-list');
            var curveLayerId = e.options[e.selectedIndex].value;
    
            // Look up the layer id using the layer name
            var curveLayerIdArray = curveLayerNames[curveLayerId];    
            var selectedLayer = curveLayerIdArray.toString();
    
            // get more information about the selected layer for use in chart
            $.getJSON(TILESTREAM_API_URL + selectedLayer, function(json) {
                layerInvestigationTime = json.investigationTime;
                layerIml = json.iml;
                layerImt = json.imt;
            });
        } else if (curveType == 'uhs') {
            var e = document.getElementById('uhs-list');
            var uhsLayerId = e.options[e.selectedIndex].value;

            // Look up the layer id using the layer name
            var uhsLayerIdArray = uhsLayerNames[uhsLayerId];
            var selectedLayer = uhsLayerIdArray.toString();
            var hasGrid = $.inArray(selectedLayer, uhsLayerGrids) > -1;
            // get more information about the selected layer for use in chart
            $.getJSON(TILESTREAM_API_URL + selectedLayer, function(json) {
                layerInvestigationTime = json.investigationTime;
                layerIml = json.periods;
                layerPoe = json.poe;
            });
        }

        var hasGrid = $.inArray(selectedLayer, curveLayerGrids) > -1;
        // Check for duplicae layes
        if (selectedLayer in layers) {
            showDuplicateMsg();
        }
        else if (hasGrid == true && gridList > 0) {
            showDuplicateGridMsg();
        }
        else {
            var tileLayer = L.tileLayer(TILESTREAM_URL +
                selectedLayer +
                '/{z}/{x}/{y}.png',{wax: TILESTREAM_URL +
                selectedLayer +
                '.json'});
            layerControl.addOverlay(tileLayer, selectedLayer);

            map.addLayer(tileLayer);
            // Keep track of layers that have been added
            layers[selectedLayer] = tileLayer;

            if (hasGrid == true) {
                gridList = 1;
                utfGrid = new L.UtfGrid(TILESTREAM_URL +
                    selectedLayer +
                    '/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
                map.addLayer(utfGrid);

                hazardCurveUtfGridClickEvent(utfGrid);
            }
        }
    }

    // Add loss curve layers form tilestream list
    function lossCurve() {
        // Remove any existing UtfGrid layers in order to avoid conflict
        map.removeLayer(utfGrid);
        utfGrid = {};
        var e = document.getElementById('loss-list');
        var lossLayerId = e.options[e.selectedIndex].value;
        // Look up the layer id using the layer name
        var lossLayerIdArray = lossLayerNames[lossLayerId];
        var selectedLayer = lossLayerIdArray.toString();

        // get more information about the selected layer for use in chart
        $.getJSON(TILESTREAM_API_URL + selectedLayer, function(json) {
            layerInvestigationTime = json.investigationTime;
            layerIml = json.iml;
            layerImt = json.imt;
        });

        var hasGrid = $.inArray(selectedLayer, lossLayerGrids) > -1;
        // Check for duplicae layes
        if (selectedLayer in layers) {
            showDuplicateMsg();
        }
        else if (hasGrid == true && gridList > 0) {
            showDuplicateGridMsg();
        }
        else {
            var tileLayer = L.tileLayer(TILESTREAM_URL +
                selectedLayer +
                '/{z}/{x}/{y}.png',{wax: TILESTREAM_URL +
                selectedLayer +
                '.json'});
            layerControl.addOverlay(tileLayer, selectedLayer);
            map.addLayer(tileLayer);
            // Keep track of layers that have been added
            layers[selectedLayer] = tileLayer;

            if (hasGrid == true) {
                gridList = 1;
                utfGrid = new L.UtfGrid(TILESTREAM_URL +
                    selectedLayer +
                    '/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
                map.addLayer(utfGrid);

                lossCurveUtfGridClickEvent(utfGrid);
            }
        }
    }

    // Add mixed curve layers form tilestream list
    function mixedCurve(curveType) {

        var selectedLayer;

        if (curveType == 'hc') {
            // Remove any existing UtfGrid layers in order to avoid conflict
            // this is only needed in the case when the user adds the same curve twice
            var e = document.getElementById('curve-list');
            var curveLayerId = e.options[e.selectedIndex].value;

            //TODO make sure that the curveLayerNames[curveLayerId] are in all lowwer case and are seperated by _
            // Look up the layer id using the layer name
            var curveLayerIdArray = curveLayerNames[curveLayerId];

            selectedLayer = curveLayerIdArray.toString();
            var hasGrid = $.inArray(selectedLayer, curveLayerGrids) > -1;

            // get more information about the selected layer for use in chart
            $.getJSON(TILESTREAM_API_URL + selectedLayer, function(json) {
                layerInvestigationTime = json.investigationTime;
                layerIml = json.iml;
                layerImt = json.imt;
            });

        }
        else if (curveType == 'uhs') {
            var e = document.getElementById('uhs-list');
            var uhsLayerId = e.options[e.selectedIndex].value;

            // Look up the layer id using the layer name
            var uhsLayerIdArray = uhsLayerNames[uhsLayerId];
            var selectedLayer = uhsLayerIdArray.toString();
            var hasGrid = $.inArray(selectedLayer, uhsLayerGrids) > -1;
                    // get more information about the selected layer for use in chart
            $.getJSON(TILESTREAM_API_URL + selectedLayer, function(json) {
                layerInvestigationTime = json.investigationTime;
                layerIml = json.periods;
                layerPoe = json.poe;
            });
        }

        // Check for duplicae layes
        if (selectedLayer in layers) {
            showDuplicateMsg();
        }
        else if (hasGrid == true && gridList > 0) {
            showDuplicateGridMsg();
        }
        else {
            map.removeLayer(utfGrid);
            utfGrid = {};
            var tileLayer = L.tileLayer(TILESTREAM_URL +
                selectedLayer +
                '/{z}/{x}/{y}.png',{wax: TILESTREAM_URL +
                selectedLayer +
                '.json'});
            layerControl.addOverlay(tileLayer, selectedLayer);
            map.addLayer(tileLayer);
            // Keep track of layers that have been added
            layers[selectedLayer] = tileLayer;

            if (hasGrid == true) {
                gridList = 1;
                utfGrid = new L.UtfGrid(TILESTREAM_URL +
                    selectedLayer +
                    '/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
                map.addLayer(utfGrid);
                hazardCurveUtfGridClickEventMixed(utfGrid, curveType);
            }
        }
    }

    // Remove map layers from tilestream
    $(document).ready(function() {
        $('#removeTileLayer').click(function() {
            gridList = 0;
            map.removeLayer(utfGrid);
            utfGrid = {};
            utfGrid = new L.UtfGrid(TILESTREAM_URL + 'empty/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
            map.addLayer(utfGrid);
            hazardCurveUtfGridClickEvent(utfGrid);
            var e = document.getElementById('layer-list');
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
        });
    });

    // Remove curve layers from tilestream
    $(document).ready(function() {
        $('#removeTileCurve').click(function() {
            $('#addTileUhs').attr('disabled', false);
            $('#removeTileUhs').attr('disabled', false);
            $('#addTileLoss').attr('disabled', false);
            $('#removeTileLoss').attr('disabled', false);

            $('#curve-check-box').remove();
            gridList = 0;
            map.removeLayer(utfGrid);
            utfGrid = {};
            utfGrid = new L.UtfGrid(TILESTREAM_URL + 'empty/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
            map.addLayer(utfGrid);
            hazardCurveUtfGridClickEvent(utfGrid);
            var e = document.getElementById('curve-list');
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
            $('#addTileCurve').attr(':disabled', false);
            $('#removeTileCurve').attr('disabled', false);
            $('#addTileLoss').attr('disabled', false);
            $('#removeTileLoss').attr('disabled', false);

            $('#curve-check-box').remove();
            gridList = 0;

            map.removeLayer(utfGrid);
            utfGrid = {};
            utfGrid = new L.UtfGrid(TILESTREAM_URL + 'empty/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
            map.addLayer(utfGrid);
            hazardCurveUtfGridClickEvent(utfGrid);
            var e = document.getElementById('uhs-list');
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

    // Remove Loss layers from tilestream
    $(document).ready(function() {
        $('#removeTileLoss').click(function() {
            $('#addTileCurve').attr('disabled', false);
            $('#removeTileCurve').attr('disabled', false);
            $('#addTileUhs').attr('disabled', false);
            $('#removeTileUhs').attr('disabled', false);
            $('#curve-check-box').remove();
            gridList = 0;
            map.removeLayer(utfGrid);
            utfGrid = {};
            utfGrid = new L.UtfGrid(TILESTREAM_URL + 'empty/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
            map.addLayer(utfGrid);
            hazardCurveUtfGridClickEvent(utfGrid);
            var e = document.getElementById('loss-list');
            var mapLayerId = e.options[e.selectedIndex].value;

            // Look up the layer id using the layer name
            var mapLayerIdArray = lossLayerNames[mapLayerId];
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
    $('#thematicMap').dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true
    });

    // Map options selection dialog
    var hazardCurveDialog = $('#hazardCurveDialog').dialog({
        autoOpen: false,
        height: 420,
        width: 400,
        modal: true
    });

    $('#thematic-map').button().click(function() {
        $('#thematicMap').dialog('open');
    });

    $('#hazard-curve').button().click(function() {
        $('#hazardCurveDialog').dialog('open');
    });

    $('#hazard-dialog').button().click(function() {
        $('#chartDialog').dialog('open');
    });

    $(function() {
        $( '#categoryTabs' ).tabs({
            collapsible: true,
            selected: -1,
            active: false
        });
    });

    var hazardCurveUtfGridClickEvent = function(utfGrid) {
        utfGrid.on('click', function (e) {
            $('#chartDialog').empty();
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

                if (iml == undefined) {
                    iml = layerIml;
                } else {
                    imlArray = iml.split(',');
                }

                imt = e.data.imt;
                if(imt == 'PGA') {
                    imt = 'Peak Ground Acceleration (g)';
                } else if (imt == 'PGV') {
                    imt = 'Peak Ground Velocity (cm/s)';
                } else if (imt == 'PGD') {
                    imt = 'Peak Ground Displacement (cm)';
                } else if (imt == 'SA') {
                    imt = 'Spectral Acceleration (g)';
                }

                lat = e.data.lat;
                lng = e.data.lon;

                if (e.data.YCOORD != undefined) {
                    lat = e.data.YCOORD;
                    lng = e.data.XCOORD;
                }
                else if(e.data.latitude != undefined) {
                    lat = e.data.latitude;
                    lng = e.data.longitude;
                }

                invest_time = e.data.invest_tim;
                hazardD3Chart(probArray, imlArray, lat, lng, invest_time, imt);
            } else {
                //document.getElementById('click').innerHTML = 'click: nothing';
            }
        }); // End utfGrid click
    }; // End hazardCurveUtfGridClickEvent

    var hazardCurveUtfGridClickEventMixed = function(utfGrid, curveType) {
        utfGrid.on('click', function (e) {
            // Get the selected curves
            selectedCurves = [];
            var sc;
            if (curveType == 'hc') {
               selectedCurves.push('iml');
               sc = $('.curve-list:checkbox:checked');
            } else if (curveType == 'uhs') {
                selectedCurves.push('periods');
                sc = $('.curve-list:checkbox:checked');
            }

            for (var i = 0; i < sc.length; i++) {
                selectedCurves.push(sc[i].defaultValue);
            }
            for (i=0; i < selectedCurves.length; i++)
                selectedCurves[i] = selectedCurves[i].trim();

            $('#chartDialog').empty();

            if (e.data) {
                var chartData = e.data;
                //invest_time = e.data.invest_tim
                buildMixedD3Chart(chartData, selectedCurves, curveType);
            } else {
                //document.getElementById('click').innerHTML = 'click: nothing';
            }
        }); // End utfGrid click
    }; // End hazardCurveUtfGridClickEventMixed

    var lossCurveUtfGridClickEvent = function(utfGrid) {
        utfGrid.on('click', function (e) {
            $('#chartDialog').empty();
            var asset;
            var lat;
            var lon;
            var losses;
            var poes;

            function cleanArray(actual) {
                var newArray = [];
                for(var i = 0; i<actual.length; i++) {
                    if (actual[i]) {
                        newArray.push(actual[i]);
                    }
                }
                return newArray;
            }

            if (e.data) {
                asset = e.data.asset_ref;
                asset = asset.toString();
                asset.replace(/"/g, '');

                var assetArray = asset.split(',');
                for (var i = 0; i < assetArray.length; i++) {
                    assetArray[i] = assetArray[i].replace(/"/g, '');
                }

                losses = e.data.loss;
                var lossesArray = losses.split('"');
                for (var k in lossesArray) {
                    var index = lossesArray.indexOf(',');
                    if (index > -1) {
                        lossesArray.splice(index, 1);
                    }
                    var index2 = lossesArray.indexOf('');
                    if (index2 > -1) {
                        lossesArray.splice(index2, 1);
                    }
                }

                poes = e.data.poes;
                var poesArray = poes.split('"');
                for (var k in poesArray) {
                    var index = poesArray.indexOf(',');
                    if (index > -1) {
                        poesArray.splice(index, 1);
                    }
                    var index2 = poesArray.indexOf('');
                    if (index2 > -1) {
                        poesArray.splice(index2, 1);
                    }
                }

                lat = e.data.lat;
                lng = e.data.lon;

                if (e.data.YCOORD != undefined) {
                    lat = e.data.YCOORD;
                    lng = e.data.XCOORD;
                }
                else if(e.data.latitude != undefined) {
                    lat = e.data.latitude;
                    lng = e.data.longitude;
                }

                var chartData = {};

                for (var i = 0; i < lossesArray.length; i++) {
                    chartData[assetArray[i]] = [];
                }

                for (var i = 0; i < lossesArray.length; i++) {
                    chartData[assetArray[i]].push(lossesArray[i]);
                    chartData[assetArray[i]].push(poesArray[i]);
                }

                LossD3Chart(chartData, assetArray, lat, lon);
            } else {
                //document.getElementById('click').innerHTML = 'click: nothing';
            }
        }); // End utfGrid click
    }; // End hazardCurveUtfGridClickEvent

    function downloadJSON2CSV(array) {
        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if(line != '') line += ','
                line += array[i][index];
            }
            str += line;
        }

        if (navigator.appName != 'Microsoft Internet Explorer') {
            window.open('data:text/csv;charset=utf-8,' + escape(str));
        } else {
            var popup = window.open('','csv','');
            popup.document.body.innerHTML = '<pre>' + str + '</pre>';
        }
    }

    ////////////////////////////////////////////
    ////////////// Single hazard Chart /////////
    ////////////////////////////////////////////

    function hazardD3Chart(probArray, imlArray, lat, lng) {
        var lon = lng;
        // grid line functions
        function make_x_axis() {
            return d3.svg.axis()
                .scale(x)
                .orient('bottom')
                .ticks(5);
        }

        function make_y_axis() {
            return d3.svg.axis()
                .scale(y)
                .orient('left')
                .ticks(5);
        }

        if (layerIml instanceof Array) {
            //continue
        } else {
            layerIml = layerIml.split(',');
        }

        var data = [];
        for(i=0; i<probArray.length; i++) {
            // Only push into data if the values are greater then 0
            if (parseFloat(layerIml[i]) > 0 && parseFloat(probArray[i]) > 0) {
                data.push([parseFloat(layerIml[i]), parseFloat(probArray[i])]);
            }
        }

        var margin = {top: 20, right: 20, bottom: 80, left: 60},
        width = 400 - margin.left - margin.right,
        height = 380 - margin.top - margin.bottom;

        var x = d3.scale.log().range([0, width]);
        var y = d3.scale.log().range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            //.ticks(2)
            .tickFormat(function (d) { return Math.round(d * 100) / 100; })
            .orient('bottom');

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

        var line = d3.svg.line()
            .x(function(d) {
                return x(d.x);
            })
            .y(function(d) {
                return y(d.y);
            });

        var svg = d3.select('#chartDialog').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // grid lines
        svg.append('g')
            .attr('class', 'grid')
            .attr('transform', 'translate(0,' + height + ')')
            .call(make_x_axis()
                .tickSize(-height, 0, 0)
                .tickFormat('')
            );

        svg.append('g')
            .attr('class', 'grid')
            .call(make_y_axis()
                .tickSize(-width, 0, 0)
                .tickFormat('')
            );

        var dataCallback = function(d) {
            d.x = +d[0];
            d.y = +d[1];
        };

        data.forEach(dataCallback);
        x.domain(d3.extent(data, function(d) { return d.x; }));
        y.domain(d3.extent(data, function(d) { return d.y; }));

        svg.append('path')
            .data([data])
            .attr('class', 'line')
            .attr('d', line);
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)
            .selectAll("text")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr('x', 40)
                .style('font-size','12px')
                .attr("transform", function(d) {
                    return "rotate(45)";
                        })
            .append('text')
            .attr('x', 160)
            .attr('y', 30)
            .attr('dy', '.71em')
            .attr('text-anchor', 'middle')
            .style('font-size','12px')
            .text(layerImt);

        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -60)
            .attr('x', -20)
            .attr('dy', '.71em')
            .style('font-size','12px')
            .style('text-anchor', 'end')
            .text('Probability of exceedance in '+layerInvestigationTime+' years');

        var legend = d3.select('#chartDialog').append('svg')
            .attr('height', 25);

        // points along the line
        svg.selectAll('circle.line')
            .data(data)
            .enter().append('circle')
            .attr('class', 'line')
            .attr('cx', function(d) { return x(d.x); })
            .attr('cy', function(d) { return y(d.y); })
            .attr('r', 4.5)
            .style('fill', 'gray')
            .on('mouseover', function() {
                d3.select(this)
                    .attr('r', 6.6)
                    .text(circleX + ', ' + circleY)
                    .style('fill', 'red');
                var circleX = d3.select(this.__data__.x);
                circleX = circleX.toString();
                circleX = circleX.split(','[0]);

                var circleY = d3.select(this.__data__.y);
                circleY = circleY.toString();
                circleY = circleY.split(','[0]);

                textBottom.text('Point value (x/y): ' + circleX + ', ' + circleY);

            }).on('mouseout', function() {
                d3.select(this)
                    .attr('r', 4.5)
                    .style('fill', 'gray');
            });

        legend.append('text')
            .attr('x', 60)
            .attr('y', 7)
            .attr('dy', '.35em')
            .text('Location (Lon/Lat): '+lng+', '+lat);

        textBottom = svg.append('text')
            .attr('x', 0)
            .attr('y', 340)
            .attr('dy', '.35em')
            .text('');

        $('#chartDialog').append('<div id="downloadCurve"><font color="blue">Download Curve</font></div>');
        $('#downloadCurve').on('hover', function(){
            $(this).css('cursor', 'pointer');
        });

        var h = $('#chartDialog').height();
        h = h + 20;
        $('#chartDialog').css({'height': h+'px'});

        // Prep data for download to CSV
        $('#downloadCurve').click(function(event) {
            var csvData = [];
            csvData = csvData.concat('prob');
            csvData = csvData.concat('iml');
            csvData = csvData.concat('investigationTime');
            csvData = csvData.concat('lon');
            csvData = csvData.concat('lat');
            csvData = JSON.stringify(csvData);
            var lineBreak = 'lineBreak';
            csvData = csvData.concat(lineBreak);
            var quotationMark = '"';

            csvData = csvData.concat('"');
            csvData = csvData.concat(probArray);
            csvData = csvData.concat('","');
            csvData = csvData.concat(layerIml);
            csvData = csvData.concat('",');
            csvData = csvData.concat(layerInvestigationTime);
            csvData = csvData.concat(',');
            csvData = csvData.concat(lon);
            csvData = csvData.concat(',');
            csvData = csvData.concat(lat);
            csvData = csvData
                .replace(/lineBreak/, '\r\n')
                .replace(/\[/g, '')
                .replace(/\]/g, '')
                .replace(/''/g, '","');
            downloadJSON2CSV(csvData);
        });
    } // End Chart


    /////////////////////////////////////////////
    ///////// Mixed Hazard/spectra Chart ////////
    /////////////////////////////////////////////

    function buildMixedD3Chart(chartData, selectedCurves, curveType) {
        var lat, lon, poe, xAxisLable, yAxisLable, yAxisVariable, curve_vals, curve_coup, curve_name, legend, colors, chartHeaderTest;
        var min_value = 1000.0, min_value_k = '', max_value = -1, max_value_k = '';

        if (layerIml instanceof Array) {
            //continue
        } else {
            layerIml = layerIml.split(',');
            for (var i = 0; i < layerIml.length; i++) {
                layerIml[i] = parseFloat(layerIml[i]);
            }
        }

        /* associative array of arrays of values */
        curve_vals = [];
        /* associative array of arrays [ x, y ] to describe the curve on the plane */
        curve_coup = [];

        /* associative array of curves produced with d3.line */
        lat = chartData.lat;
        lon = chartData.lon;
        if (curveType == 'uhs') {
            poe = layerPoe;
            chartHeaderTest = 'Investigation Time: '+layerInvestigationTime+', Probability of exceedance: '+poe;
        } else {
            chartHeaderTest = 'Investigation Time: '+layerInvestigationTime;
        }

        invest_time = layerInvestigationTime;
        if (curveType == 'hc') {
            yAxisLable =  'Probability of exceedance in '+layerInvestigationTime+' years';
        } else if (curveType == 'uhs') {
            yAxisLable = 'Spectral acceleration (g)';
        }

        if (curveType == 'hc') {
            // The imt variable needs to be formated i.e. SA = Spectral Acceleration (g)
            // SA-0.1 = Spectral Acceleration (0.1 s)

            xAxisLable = layerImt;
            var xAxisLableValue;
            if (xAxisLable.indexOf('SA-') == 0 ) {
                xAxisLableValue = xAxisLable.substring(xAxisLable.indexOf('-') + 1);
                xAxisLable = 'Spectral Acceleration (' + xAxisLableValue + ' s) [g]';
            } else if (xAxisLable.indexOf('PGA-') == 0) {
                xAxisLableValue = xAxisLable.substring(xAxisLable.indexOf('-') + 1);
                xAxisLable = 'Peak Ground Acceleration [g]';
            } else if (xAxisLable.indexOf('PGV-') == 0) {
                xAxisLableValue = xAxisLable.substring(xAxisLable.indexOf('-') + 1);
                xAxisLable = 'Peak Ground Velocity [cm/s]';
            } else if (xAxisLable.indexOf('PGD-') == 0) {
                xAxisLableValue = xAxisLable.substring(xAxisLable.indexOf('-') + 1);
                xAxisLable = 'Peak Ground Displacement [cm]';
            }
        } else if (curveType == 'uhs') {
            xAxisLable = 'Period (s)';
        }

        for (var k in selectedCurves) {
            curve_name = selectedCurves[k];
            curve_vals[curve_name] = chartData[curve_name].split(',');
        }

        for (var k in selectedCurves) {
            curve_name = selectedCurves[k];
            var i;
            for (i = 0 ; i < curve_vals[curve_name].length ; i++) {
                curve_vals[curve_name][i] = parseFloat(curve_vals[curve_name][i]);
            }
        }

        // Set the y axis variable depending on the type of curve
        if (curveType == 'hc') {
            yAxisVariable = layerIml;
        } else if (curveType == 'uhs') {
            yAxisVariable = curve_vals.periods;
        }

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

            if (curveType == 'hc' && curve_name == 'iml')
                continue;
            if (curveType == 'uhs' && curve_name == 'periods')
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

            if (curveType == 'hc' && curve_name == 'iml')
                continue;
            if (curveType == 'uhs' && curve_name == 'periods')
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
                .orient('bottom')
                .ticks(5);
        }

        function y_grid() {
            return d3.svg.axis()
                .scale(y_scale)
                .orient('left')
                .ticks(5);
        }

        function makeCircles(circleData, k, color, curveTitle) {
            // Points along the line
            svg.selectAll("circle.line")
                .data(circleData)
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

                    textTop.text(curveTitle+" point value (x/y): " + circleX + ", " + circleY);

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
                xAxis[i].tickFormat(function (d) { return ''; })
            }
        }

        var yAxis = d3.svg.axis()
            .scale(y_scale)
            .orient("left");

        var line = d3.svg.line()
            .x(function(d,i) {
                return x_scale(d[0]);
            })
            .y(function(d) {
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
                .tickFormat('')
            );

        svg.append("g")
            .attr("class", "grid")
            .attr('opacity', 0.6)
            .call(y_grid()
                .tickSize(-width, 0, 0)
                .tickFormat('')
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

            var str = selectedCurves[k];
            str = str.replace(/_/g, " ");
            var curveTitle = capitalize(str)

            makeCircles(data, k, color, curveTitle);

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
            .attr("font-size","12px")
            .text("Location (Lon/Lat): "+lon+", "+lat);

        textTopLable = svg.append("text")
            .attr("x", -55)
            .attr("y", -47)
            .attr("dy", ".35em")
            .style("font-weight", "bold")
            .attr("font-size","12px")
            .text(chartHeaderTest);

        textTop = svg.append("text")
            .attr("x", 0)
            .attr("y", -15)
            .attr("dy", ".35em")
            .style("font-size","11px")
            .text('');

        $('#chartDialog').append('<div id="downloadCurve"><font color="blue">Download Curve</font></div>');
        $('#downloadCurve').on("hover", function(){
            $(this).css("cursor", "pointer");
        });

        var h = $("#chartDialog").height();
        h = h + 40;
        $("#chartDialog").css({"height": h+"px"});

        // Prep data for download to CSV
        $('#downloadCurve').click(function(event) {
            var csvHeader = selectedCurves;
            var csvData = [];
            csvData = csvData.concat(csvHeader);
            csvData = csvData.concat("investigationTime");
            csvData = csvData.concat("poE");
            csvData = csvData.concat("lon");
            csvData = csvData.concat("lat");
            csvData = JSON.stringify(csvData);
            var lineBreak = "lineBreak";
            csvData = csvData.concat(lineBreak);
            var quotationMark = '"';

            for (var k in selectedCurves) {
                curve_name = selectedCurves[k];
                var curveValue = chartData[curve_name];
                csvData = csvData.concat(quotationMark);
                csvData = csvData.concat(curveValue);
                csvData = csvData.concat(quotationMark);
            }

            csvData = csvData.concat(',');
            csvData = csvData.concat(invest_time);
            csvData = csvData.concat(',');
            csvData = csvData.concat(poe);
            csvData = csvData.concat(',');
            csvData = csvData.concat(lon);
            csvData = csvData.concat(',');
            csvData = csvData.concat(lat);
            csvData = csvData
                .replace(/lineBreak/, '\r\n')
                .replace(/\[/g, '')
                .replace(/\]/g, '')
                .replace(/''/g, '","');
            downloadJSON2CSV(csvData);
        });
    } //End chart

    ////////////////////////////////////////////
    ////////////// Loss Curve Chart ////////////
    ////////////////////////////////////////////

    function LossD3Chart(chartData, assetArray, lat, lon) {
        var lat, lon, xAxisLable, yAxisLable, curve_vals, curve_coup, curve_name, legend, colors;
        var min_value = 1000.0, min_value_k = '', max_value = -1, max_value_k = '';

        /* associative array of arrays of values */
        curve_valsX = [];
        curve_valsY = [];
        /* associative array of arrays [ x, y ] to describe the curve on the plane */
        curve_coup = [];

        /* associative array of curves produced with d3.line */
        yAxisLable = "Probability of exceedance";

        var selectedCurves = assetArray;

        for (var i = 0 ; i < assetArray.length ; i++) {
            var curve_name = selectedCurves[i];
            curve_valsX[curve_name] = chartData[curve_name][0].split(",");
            curve_valsY[curve_name] = chartData[curve_name][1].split(",");
        }

        var length = (curve_valsX[curve_name].length);

        for (var k in selectedCurves) {
            var curve_name = selectedCurves[k];
            var i;
            for (i = 0 ; i < length ; i++) {
                curve_valsX[curve_name][i] = Math.log(parseFloat(curve_valsX[curve_name][i]));
                //curve_valsX[curve_name][i] = parseFloat(curve_valsX[curve_name][i]);
                curve_valsY[curve_name][i] = parseFloat(curve_valsY[curve_name][i]);
            };
        }

        for (var k in selectedCurves) {
            var curve_name = selectedCurves[k];
            curve_coup[curve_name] = [];

            for (var i = 0 ; i < length ; i++) {
                if (curve_valsX[curve_name][i] > 0.0) {
                    curve_coup[curve_name].push([curve_valsX[curve_name][i], curve_valsY[curve_name][i] ]);
                }
            }
        }

        for (var k in selectedCurves) {
            var curve_name = selectedCurves[k];
            var min_cur = 1000.0, max_cur = -1;

            for (var i = 0 ; i < length ; i++) {
                if (min_cur > curve_valsX[curve_name][i])
                    min_cur = curve_valsX[curve_name][i];
                if (max_cur < curve_valsX[curve_name][i])
                    max_cur = curve_valsX[curve_name][i];
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

        function makeCircles(circleData, k, color, curve_name) {
            // Points along the line
            svg.selectAll("circle.line")
                .data(circleData)
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

                    textTop.text(curve_name+" point value (x/y): " + Math.pow(10, circleX) + ", " + circleY);

                }).on("mouseout", function() {
                    d3.select(this)
                        .attr('r', 2.5)
                        .style("fill", color);
                });
        }

        var margin = {top: 55, right: 100, bottom: 45, left: 60};
        var width = 480 - margin.left - margin.right;
        var height = 380 - margin.top - margin.bottom;

        var x_scale = d3.scale.linear().domain([0, max_value]).range([0, width]);
        var y_scale = d3.scale.linear().domain([0, 1]).range([height, 0]);

        var xAxis = d3.svg.axis()
            .ticks(6)
            .scale(x_scale)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y_scale)
            .orient("left");

        var line = d3.svg.line()
            .x(function(d,i) {
                return x_scale(d[0]);
            })
            .y(function(d) {
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
                .tickFormat('')
            );

        svg.append("g")
            .attr("class", "grid")
            .attr('opacity', 0.6)
            .call(y_grid()
                .tickSize(-width, 0, 0)
                .tickFormat('')
            );

        //for (k in selectedCurves) {
        for (var k = 0; k < selectedCurves.length; k++) {
            var curve_name = selectedCurves[k];
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

            makeCircles(data, k, color, curve_name);

            svg.append("text")
                .attr("x", 360)
                .attr("y", 20*(k))
                .attr("dy", ".35em")
                .text(selectedCurves[k]);

            svg.append("svg:circle")
                .attr("cx", 350)
                .attr("cy", 20*(k))
                .attr("r", 3)
                .style("fill", color)

            $("."+selectedCurves[k]).css({'stroke':colors[k]});
        }

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
            .text("Losses");

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
            .attr("font-size","12px")
            .text("Location (Lon/Lat): "+lon+", "+lat);

        textTopLable = svg.append("text")
            .attr("x", 0)
            .attr("y", -47)
            .attr("dy", ".35em")
            .style("font-weight", "bold")
            .attr("font-size","12px")
            .text('Loss Curve: some other info might go here');

        textTop = svg.append("text")
            .attr("x", 0)
            .attr("y", -15)
            .attr("dy", ".35em")
            .attr("font-size","11px")
            .text('');

        $('#chartDialog').append('<div id="downloadCurve"><font color="blue">Download Curve</font></div>');

        $('#downloadCurve').on("hover", function(){
            $(this).css("cursor", "pointer");
        });

        // Prep data for download to CSV
        // TODO extend this when there is more definition of the data
        $('#downloadCurve').click(function(event) {
            var jsonObject = JSON.stringify(chartData);
            jsonObject = jsonObject
                .replace(/{/g, '')
                .replace(/}/g, '')
                .replace(/\],/g, '\r\n')
                .replace(/\[/g, '')
                .replace(/\]/g, '')
                .replace(/:/g, ','+lon+','+lat+',');
            downloadJSON2CSV(jsonObject);
        });
    } //End chart
}; // End startApp

app.initialize(startApp);
