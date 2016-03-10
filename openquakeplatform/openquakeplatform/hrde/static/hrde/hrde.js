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

var AppProtoType = function() {
    return this;
};

AppProtoType.prototype = {
    layerControl: null,

    // Keep track of grids
    gridList: null,
    utfGrid: {},
    // Make a list of categories
    curveCategoryList: [],
    wikiLinkList: {},
    lossCategoryList: [],
    mapLayerGrids: [],
    curveLayerGrids: [],
    uhsLayerGrids: [],
    lossLayerGrids: [],
    mapLayersByCat: {},
    curveLayersByCat: {},
    uhsLayersByCat: {},
    lossLayersByCat: {},
    mapLayerNames: {},
    curveLayerNames: {},
    uhsLayerNames: {},
    lossLayerNames: {},
    curvesByInvestMixed: {},
    uhsByInvestMixed: {},
    lossByInvestMixed: {},
    curvesAvailable: {},
    uhsAvailable: {},
    lossAvailable: {},
    curvesByInvestSingle: {},
    uhsByInvestSingle: {},
    lossByInvestSingle: {},
    lossLayerId: {},
    lossLayerTitle: {},
    tileLayer: {},
    inputLayerNames: {},
    inputLayersByCat: {},
    inputByInvestMixed: {},
    inputAvailable: {},
    inputByInvestSingle: {},
    inputLayerGrids: [],
    spectrumLayerNames: {},
    spectrumLayersByCat: {},
    spectrumAvailable: {},
    spectrumByInvestSingle: {},
    spectrumLayerGrids: [],
    spectrumByInvestMixed: {},
    mappedValue: null,
    selectedHazardMapName: null,
    selectedMappedValue: null,
    selectedHazardLayerName: null,
    selectedLayerValue: null,
    allLayers: [],
    leafletClickEventIdx: {},
    leafletMouseEventIdx: {},

    //Keep track of layer specific information
    layerInvestigationTime: null,
    layerIml: null,
    layerImt: null,
    layerPoe: null

};

var AppVars = new AppProtoType();
var baseMapUrl = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png');
var TILESTREAM_URL = TS_URL + '/v2/';
var TILESTREAM_API_URL = TS_URL + '/api/v1/Tileset/';
var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

var startApp = function() {

    function checkForIdMatch(topLayerId) {
        for (var k in AppVars.leafletClickEventIdx) {
            // convert leafelt mouse and click event index to a number
            var key = parseFloat(k);
            key = key + 1;
            topLayerId = parseFloat(topLayerId);

            if (key == topLayerId) {
                // set the leaflet mouse and click event index
                var tempClickObj = {};
                var tempMouseObj = {};
                tempClickObj[key] = AppVars.leafletClickEventIdx[k];
                tempMouseObj[key] = AppVars.leafletMouseEventIdx[k];
                map._leaflet_events.click_idx = tempClickObj;
                map._leaflet_events.mousemove_idx = tempMouseObj;
            }
        }
        layerControlLayerSwitch();
    }

    function getControlLayerId() {
        var topLayerId = $('.leaflet-control-layers-overlays')[0].firstChild.firstChild.firstChild.id;
            topLayerId = topLayerId.split('.')[1];
            checkForIdMatch(topLayerId);
    }

    function layerControlLayerSwitch() {
        // Get the div id of the layer when layer order is changed
        $('.leaflet-down').click(function() {
            // If there is a change in the layer order, find the 'top'
            // layer and assigne it's utfGrid
            var topLayerId = $('.leaflet-control-layers-overlays')[0].firstChild.firstChild.firstChild.id;
            topLayerId = topLayerId.split('.')[1];
            checkForIdMatch(topLayerId);
        });

        $('.leaflet-up').click(function() {
            var layerId = $(this).parent()[0].children[0].firstChild.id;
            layerId = layerId.split('.')[1];
            checkForIdMatch(layerId);
        });
    }

    // Show hide layer controller
    function checkLayerController() {
        if ($.isEmptyObject(AppVars.layerControl._layers) ) {
            setTimeout(function() {
                $('.leaflet-control-layers').css({'display': 'none'});
            }, 100);
        } else {
            $('.leaflet-control-layers').css({'display': 'block'});
        }
    }

    $(function() {
        $('#chartDialog').dialog({
            autoOpen: false,
            height: 520,
            width: 620,
            closeOnEscape: true,
            position: {at: 'right bottom'}
        });
    });

    // Add some buttons to the toolbar ribbon
    $('#map-tools').append('<button type="button" id="hazard-data">Load Hazard Data</button>');
    $('#map-tools').append('<button type="button" id="risk-data">Load Risk Data</button>');
    $('#map-tools').append('<button type="button" id="HMDownload">Download Hazard Map</button>');
    $('#map-tools').append('<button type="button" id="legend">Legend</button>');
    $('#map-tools').append('<button type="button" id="terms">Terms of Use</button>');

    var winHelp = $(window).height() - 200;
    var winHaz = $(window).height() - 200;
    var winW = $(window).width() - 200;
    if (winHelp > 760) {
        winHelp = 760;
    }

    // Hazard Map download warning dialog
    $('#HMDownloadWarning').dialog({
        autoOpen: false,
        height: 150,
        width: 400,
        closeOnEscape: true
    });

    $('#base-map-menu').css({ 'margin-bottom' : 0 });
    $('#supplemental-layer-menu').css({ 'margin-bottom' : 0 });

    var riskDataDialog = $('#riskDataDialog').dialog({
        autoOpen: false,
        height: winHaz,
        width: 500,
        modal: true,
        position: [100,150]
    });

    $('#riskDataDialog').css({ 'overflow' : 'auto' });
    $('#risk-data').button().click(function() {
        $('#riskDataDialog').dialog('open');
    });

    var hazardDataDialog = $('#hazardDataDialog').dialog({
        autoOpen: false,
        height: winHaz,
        width: 500,
        modal: true,
        position: [100,150]
    });

    $('#hazardDataDialog').css({ 'overflow' : 'auto' });

    $('#hazard-data').button().click(function() {
        $('#hazardDataDialog').dialog('open');
    });

    var legendDialog = $('#legendDialog').dialog({
        autoOpen: false,
        height: 230,
        width: 200,
        modal: false,
        position: [20,620]
    });

    $('#legend').button().click(function() {
        $('#legendDialog').dialog('open');
    });

    $('#terms').button().click(function() {
        window.location = "/account/terms/";
    });

    map = new L.Map('map', {
        minZoom: 2
    });
    map.setView(new L.LatLng(10, -10), 2).addLayer(baseMapUrl);

    layers = {};

    AppVars.layerControl = L.control.orderlayers(app.baseLayers, null, {collapsed:true, order:'qgis'});
    checkLayerController();
    map.scrollWheelZoom.enable();
    map.options.maxBounds = null;

    function capitalize(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    function unCapitalize(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase();});
    }

    $(function() {
        $('#opacity-slider').slider({
            min: 0,
            max: 1,
            step: 0.1,
            value: 1,
            slide: function( event, ui ) {
                $( "#amount" ).val( ui.value );
            }
        });
        $('#amount').val( $('#opacity-slider').slider('value') );
    });

    // No Layer to remove warnning message
    function showRemoveMsg() {
        $('#worning-no-layer').dialog('open');
    }

    $(document).ready(function() {
        $('#cover').hide();
        $('#absoluteSpinner').hide();
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

        var scope = angular.element($("#layer-list")).scope();
        var mapLayerId = scope.selected_map.name;

        // Look up the layer id using the layer name
        var mapLayerIdArray = AppVars.mapLayerNames[mapLayerId];
        var selectedLayer = mapLayerIdArray.toString();

    };

    var selCat = document.getElementById('hazard-curve-category');
    var selLossCat = document.getElementById('risk-curve-category');
    var selLoss = document.getElementById('loss-list');

    // Create a header for the menu map drop down
    var catMenuHeader = document.createElement('option');
    catMenuHeader.innerHTML = 'Choose a model:';

    var catCurveMenuHeader = document.createElement('option');
    catCurveMenuHeader.innerHTML = 'Choose a model:';
    selCat.appendChild(catCurveMenuHeader);


    // Create a header for the menu drop down
    var catLossMenuHeader = document.createElement('option');
    catLossMenuHeader.innerHTML = 'Choose a model:';
    selLossCat.appendChild(catLossMenuHeader);
    $('#risk-curve-category option:empty').remove();

    function checkForMissingData(name, cat, type, grids, application) {
        // Use only valid  data returned from the tilestream server in the application
        return (
            name !== undefined && name !== "" && name !== null &&
            cat !== undefined && cat !== "" && cat !== null &&
            type !== undefined && type !== "" && type !== null &&
            grids !== undefined && grids !== "" && grids !== null &&
            application == 'hazard-viewer'
        );
    }

    $.getJSON(TILESTREAM_API_URL, function(json) {
        $('#hazard-data').attr('disabled', true);

        // Create the category list (build the object)
        for (var i=0; i < json.length; i++) {
            var name = json[i].mapped_value;
            var cat = json[i].category;
            var type = json[i].type;
            var grids = json[i].grids;
            var chartType = json[i].chartType;
            var application = json[i].application;
            var grid, gridName;
            var wiki = json[i].wiki_link;

            if (checkForMissingData(name, cat, type, grids, application)) {
                if (type == 'curve-hc' || type == 'curve-uhs' || type == 'curve-spectrum' || type == 'curve-loss' || type == 'input-mfds' || type == 'map') {

                    if (wiki !== undefined ) {
                        AppVars.wikiLinkList[cat] = wiki;
                    }

                    AppVars.curveLayersByCat[cat] = [];
                    AppVars.curveLayerNames[name] = [];
                    grid = grids.toString();
                    gridName = grid.split('/')[4];
                    AppVars.curveLayerGrids.push(gridName);

                }
                if (type == 'curve-hc' || type == 'curve-uhs' || type == 'curve-spectrum' ||  type == 'input-mfds' || type == 'map') {
                    if (typeof cat != 'undefined' && cat != 'None') {
                        AppVars.curveCategoryList.push(cat);
                    }
                }
                if (type == 'curve-uhs') {
                    AppVars.uhsLayersByCat[cat] = [];
                    AppVars.uhsLayerNames[name] = [];
                    grid = grids.toString();
                    gridName = grid.split('/')[4];
                    AppVars.uhsLayerGrids.push(gridName);
                }
                if (type == 'curve-spectrum') {
                    AppVars.spectrumLayersByCat[cat] = [];
                    AppVars.spectrumLayerNames[name] = [];
                    grid = grids.toString();
                    gridName = grid.split('/')[4];
                    AppVars.spectrumLayerGrids.push(gridName);
                }
                if (type == 'curve-loss') {
                    AppVars.lossCategoryList.push(cat);
                    AppVars.lossLayersByCat[cat] = [];
                    AppVars.lossLayerNames[name] = [];
                    grid = grids.toString();
                    gridName = grid.split('/')[4];
                    AppVars.lossLayerGrids.push(gridName);
                }
                if (type == 'input-mfds') {
                    AppVars.inputLayersByCat[cat] = [];
                    AppVars.inputLayerNames[name] = [];
                    grid = grids.toString();
                    gridName = grid.split('/')[4];
                    AppVars.inputLayerGrids.push(gridName);
                }
                if (type == 'map') {
                    AppVars.mapLayerNames[name] = [];
                    AppVars.mapLayersByCat[cat] = [];
                    if (grids !== undefined) {
                        grid = grids.toString();
                        gridName = grid.split('/')[4];
                        AppVars.mapLayerGrids.push(gridName);
                    }
                }
                if (grids !== undefined) {
                    AppVars.mapLayerNames[grids] = [];
                }
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
            var application = json[j].application;

            if (checkForMissingData(name, cat, type, grids, application)) {
                // Crazy clean up
                template = template.replace(/{{#__location__}}{{/, '');
                template = template.replace('/', '');
                template = template.replace(/__location__}}{{#__teaser__}}/, '');
                template = template.replace(/{{{/g, '').replace(/}}}/g, '');
                template = template.substring(0, template.indexOf('{{'));

                if (type == 'curve-hc') {
                    var curveLayerId = json[j].id;
                    var curveLayerTitle = json[j].mapped_value;
                    AppVars.curveLayerNames[name].push(curveLayerId);
                    AppVars.curveLayersByCat[cat].push(curveLayerTitle);

                    if (chartType == 'single') {
                        AppVars.curvesByInvestSingle[j] = name;
                    }
                    else if (chartType == 'mixed') {
                        AppVars.curvesByInvestMixed[j] = name;
                        AppVars.curvesAvailable[j] = template;
                    }
                }

                if (type == 'curve-uhs') {
                    var uhsLayerId = json[j].id;
                    var uhsLayerTitle = json[j].mapped_value;
                    AppVars.uhsLayerNames[name].push(uhsLayerId);
                    AppVars.uhsLayersByCat[cat].push(uhsLayerTitle);

                    if (chartType == 'mixed') {
                        AppVars.uhsByInvestMixed[j] = name;
                        AppVars.uhsAvailable[j] = template;
                    }
                    else if (chartType == 'single') {
                        AppVars.uhsByInvestSingle[j] = name;
                    }
                }

                if (type == 'curve-spectrum') {
                    var spectrumLayerId = json[j].id;
                    var spectrumLayerTitle = json[j].mapped_value;
                    AppVars.spectrumLayerNames[name].push(spectrumLayerId);
                    AppVars.spectrumLayersByCat[cat].push(spectrumLayerTitle);

                    if (chartType == 'mixed') {
                        AppVars.spectrumByInvestMixed[j] = name;
                        AppVars.spectrumAvailable[j] = template;
                    }
                    else if (chartType == 'single') {
                        AppVars.spectrumByInvestSingle[j] = name;
                    }
                }

                if (type == 'curve-loss') {
                    AppVars.lossLayerId = json[j].id;
                    AppVars.lossLayerTitle = json[j].mapped_value;
                    AppVars.lossLayerNames[name].push(AppVars.lossLayerId);
                    AppVars.lossLayersByCat[cat].push(AppVars.lossLayerTitle);
                    AppVars.lossByInvestMixed[j] = name;
                    AppVars.lossAvailable[j] = template;
                    AppVars.lossByInvestSingle[j] = name;
                }

                if (type == 'input-mfds') {
                    var inputLayerId = json[j].id;
                    var inputLayerTitle = json[j].mapped_value;
                    AppVars.inputLayerNames[name].push(inputLayerId);
                    AppVars.inputLayersByCat[cat].push(inputLayerTitle);

                    if (chartType == 'mixed') {
                        AppVars.InputByInvestMixed[j] = name;
                        AppVars.inputAvailable[j] = template;
                    }
                    else if (chartType == 'single') {
                        AppVars.inputByInvestSingle[j] = name;
                    }
                }

                if (type == 'map') {
                    mapLayerId = json[j].id;
                    mapLayerTitle = json[j].mapped_value;
                    chartType = json[j].chartType;
                    AppVars.mapLayerNames[name].push(mapLayerId);
                    AppVars.mapLayersByCat[cat].push(mapLayerTitle);
                }
            }
        }

        // Get unique category and wiki link names
        var curveCategoryUnique = AppVars.curveCategoryList.filter(function(itm,i,curveCategoryList){
            return i == AppVars.curveCategoryList.indexOf(itm);
        });

        var lossCategoryUnique = AppVars.lossCategoryList.filter(function(itm,i,lossCategoryList){
            return i == AppVars.lossCategoryList.indexOf(itm);
        });

        for (var o in curveCategoryUnique) {
            // Append category names to curve dropdown list
            var curveCategoryTitle = curveCategoryUnique[o];
            var curveOpt = document.createElement('option');
            curveOpt.innerHTML = curveCategoryTitle;
            curveOpt.value = curveCategoryTitle;
            selCat.appendChild(curveOpt);
            // Append layer list to dowpdown
            var layerCurveOpt = document.createElement('option');
        }

        for (var p in lossCategoryUnique) {
            // Append category names to loss dropdown list
            var lossCategoryTitle = lossCategoryUnique[p];
            var lossOpt = document.createElement('option');
            lossOpt.innerHTML = lossCategoryTitle;
            lossOpt.value = lossCategoryTitle;
            selLossCat.appendChild(lossOpt);
            // Append layer list to dowpdown
            var layerlossOpt = document.createElement('option');
        }
    }).done(function() {
        $('#hazard-data').attr('disabled', false);
        });

    $('#addTileCurve').click(function() {
        $('#chartDialog').dialog('option', 'title', 'Plot');
        $('#chartDialog').empty();

        var selectedCurve = angular.element($("#curve-list")).scope().selected_curve.name;
        var curveType = 'hc';

        // identify if the layer is of cureve type mixed or single
        var chartType;
        for (var k in AppVars.curvesByInvestMixed) {
            if (AppVars.curvesByInvestMixed[k] === selectedCurve) {
                mixedCurve(curveType);
                chartType = 'mixed';
            }
        }

        for (var l in AppVars.curvesByInvestSingle) {
            if (AppVars.curvesByInvestSingle[l] === selectedCurve) {
                addSingleCurveToMap(curveType);
                chartType = 'single';
            }
        }

        if (chartType === undefined) {
            alert('Whoops, there is an issue with the curve you are trying to load,' +
                ' One thing I can think of is some metadata that is required by this app is missing');
        }
    }); //end add tile curve

    $('#addTileInput').click(function() {
        $('#chartDialog').empty();
        inputCurve();
    }); // end add input curve

    $('#addTileLayer').click(function() {
        $('#chartDialog').empty();
        addSingleCurveToMap();
    }); // end add input curve


    $('#addTileUhs').click(function() {
        $('#chartDialog').dialog('option', 'title', 'Plot');
        $('#chartDialog').empty();

        var selectedUhs = angular.element($("#uhs-list")).scope().selected_uhs.name;
        var curveType = 'uhs';

        // identify if the layer is of cureve type mixed or single
        var chartType;
        for (var k in AppVars.uhsByInvestMixed) {
            if (AppVars.uhsByInvestMixed[k] === selectedUhs) {
                mixedCurve(curveType);
                chartType = 'mixed';
            }
        }

        for (var l in AppVars.uhsByInvestSingle) {
            if (AppVars.uhsByInvestSingle[l] === selectedUhs) {
                addSingleCurveToMap(curveType);
                chartType = 'single';
            }
        }

        if (chartType === undefined) {
            alert('Whoops, there is an issue with the curve you are trying to load,' +
                ' One thing I can think of is some metadata that is required by this app is missing');
        }

    }); // end add uhs curve


    $('#addTileSpectrum').click(function() {
        $('#chartDialog').dialog('option', 'title', 'Plot');
        $('#chartDialog').empty();

        var selectedSpectrum = angular.element($("#spectrum-list")).scope().selected_spectrum.name;
        var curveType = 'spectrum';

        // identify if the layer is of cureve type mixed or single
        var chartType;
        for (var k in AppVars.spectrumByInvestMixed) {
            if (AppVars.spectrumByInvestMixed[k] === selectedSpectrum) {
                mixedCurve(curveType);
                chartType = 'mixed';
            }
        }

        for (var l in AppVars.spectrumByInvestSingle) {
            if (AppVars.spectrumByInvestSingle[l] === selectedSpectrum) {
                addSingleCurveToMap(curveType);
                chartType = 'single';
            }
        }

        if (chartType === undefined) {
            alert('Whoops, there is an issue with the curve you are trying to load,' +
                ' One thing I can think of is some metadata that is required by this app is missing');
        }

    }); // end add spectrum curve

    $('#addTileLoss').click(function() {
        $('#chartDialog').dialog('option', 'title', 'Plot');
        $('#chartDialog').empty();

        lossCurve();
    }); // end add loss curve

    $('#hazard-curve-category').change(function() {
        var e = document.getElementById('hazard-curve-category');
        var strUser = e.options[e.selectedIndex].value;
        // Add the wiki link to the dialog menu
        $('#wiki-link').empty();
        if (AppVars.wikiLinkList[strUser] !== undefined) {
            $('#wiki-link').append('<a href="'+AppVars.wikiLinkList[strUser]+'" style="color: rgb(0,102,204)" target="_blank">Detailed Documentation</a>' );
        }

        /////////////////////////////////////////////////
        // Create dynamic categorized map layer dialog //
        /////////////////////////////////////////////////
        var mapScope = angular.element($("#layer-list")).scope();
        var mapLayersArray = AppVars.mapLayersByCat[strUser];

        if (mapLayersArray instanceof Array) {
            $('#mapOptionLabel').prepend('Choose a Map');

            var mapLayerList = [];
            for (var i = 0; i < mapLayersArray.length; i++) {
                mapLayerList.push({name: mapLayersArray[i]});
            }

            mapScope.$apply(function(){
                mapScope.maps = mapLayerList;
            });

            $('#addTileLayer').attr('disabled', false);
        } else {
            $('#layer-list').find('option').empty();
            $('#addTileLayer').attr('disabled', true);
            mapScope.maps = null;
        }

        ///////////////////////////////////////////////////
        // Create dynamic categorized input model dialog //
        ///////////////////////////////////////////////////
        var inputScope = angular.element($("#input-list")).scope();
        var inputLayersArray = AppVars.inputLayersByCat[strUser];

        if (inputLayersArray instanceof Array) {
            var inputLayerList = [];
            for (var j = 0; j < inputLayersArray.length; j++) {
                inputLayerList.push({name: inputLayersArray[j]});
            }

            inputScope.$apply(function(){
                inputScope.inputs = inputLayerList;
            });

            $('#addTileInput').attr('disabled', false);
        } else {
            $('#input-list').find('option').empty();
            $('#addTileInput').attr('disabled', true);
            inputScope.inputs = null;
        }

        //////////////////////////////////////////////////////////
        // Create dynamic categorized hazard curve layer dialog //
        //////////////////////////////////////////////////////////
        var hazardCurveScope = angular.element($("#curve-list")).scope();
        var hazardCurveLayersArray = AppVars.curveLayersByCat[strUser];

        if (hazardCurveLayersArray instanceof Array) {
            var hazardCurveLayerList = [];

            for (var j = 0; j < hazardCurveLayersArray.length; j++) {
                hazardCurveLayerList.push({name: hazardCurveLayersArray[j]});
            }

            hazardCurveScope.$apply(function(){
                hazardCurveScope.curves = hazardCurveLayerList;
            });

            $('#addTileCurve').attr('disabled', false);
        } else {
            $('#curve-list').find('option').empty();
            $('#addTileCurve').attr('disabled', true);
            hazardCurveScope.curves = null;
        }

        ///////////////////////////////////////////////////////
        // Create dynamic categorized uhs curve layer dialog //
        ///////////////////////////////////////////////////////
        var uhsScope = angular.element($("#uhs-list")).scope();
        var uhsLayersArray = AppVars.uhsLayersByCat[strUser];

        if (uhsLayersArray instanceof Array) {
            var uhsLayerList = [];

            for (var j = 0; j < uhsLayersArray.length; j++) {
                uhsLayerList.push({name: uhsLayersArray[j]});
            }

            uhsScope.$apply(function(){
                uhsScope.uhss = uhsLayerList;
            });

            $('#addTileUhs').attr('disabled', false);
        } else {
            $('#uhs-list').find('option').empty();
            $('#addTileUhs').attr('disabled', true);
            uhsScope.uhss = null;
        }

        ////////////////////////////////////////////////////////////
        // Create dynamic categorized spectrum curve layer dialog //
        ////////////////////////////////////////////////////////////
        var spectrumScope = angular.element($("#spectrum-list")).scope();
        var spectrumLayersArray = AppVars.spectrumLayersByCat[strUser];

        if (spectrumLayersArray instanceof Array) {
            var spectrumLayerList = [];

            for (var j = 0; j < spectrumLayersArray.length; j++) {
                spectrumLayerList.push({name: spectrumLayersArray[j]});
            }

            spectrumScope.$apply(function(){
                spectrumScope.spectrums = spectrumLayerList;
            });

            $('#addTileSpectrum').attr('disabled', false);
        } else {
            $('#spectrum-list').find('option').empty();
            $('#addTileSpectrum').attr('disabled', true);
            spectrumScope.spectrums = null;
        }
    });

    // Create dynamic categorized loss layer dialog
    $('#risk-curve-category').change(function() {

        var e = document.getElementById('risk-curve-category');
        var strUser = e.options[e.selectedIndex].value;

        ////////////////////////////////////////////////////////
        // Create dynamic categorized loss curve layer dialog //
        ////////////////////////////////////////////////////////
        var lossScope = angular.element($("#loss-list")).scope();
        var lossLayersArray = AppVars.lossLayersByCat[strUser];

        if (lossLayersArray instanceof Array) {

            var lossLayerList = [];

            for (var j = 0; j < lossLayersArray.length; j++) {
                lossLayerList.push({name: lossLayersArray[j]});
            }

            lossScope.$apply(function(){
                lossScope.losses = lossLayerList;
            });

            $('#addTileLoss').attr('disabled', false);
        } else {
            $('#loss-list').find('option').empty();
            $('#addTileLoss').attr('disabled', true);
            lossScope.losses = null;
        }
    });

    map.addControl(AppVars.layerControl.setPosition('topleft'));

    // Logic for downloading hazard map csv
    $('#HMDownload').button().click(function() {

        if (AppVars.utfGrid !== undefined && AppVars.utfGrid.utfGridType == 'map') {
            var zoomLevel = map.getZoom();
            var bounds = map.getBounds();
            var tempPolygon = L.polygon([
                [bounds._northEast.lat, bounds._northEast.lng],
                [bounds._southWest.lat, bounds._southWest.lng]
            ]);

            if (zoomLevel >= 6) {
                var hazardMapValues = [];

                // get information out of the utfgrid for use in Download
                for (var l in AppVars.utfGrid._cache) {
                    if (AppVars.utfGrid._cache[l] !== null && typeof AppVars.utfGrid._cache[l] === 'object') {
                        for (var m in AppVars.utfGrid._cache[l].data) {
                            // download only the values that are within the map bounds
                            var tempRecord = AppVars.utfGrid._cache[l].data[m];
                            var tmpLatLng = L.latLng(tempRecord.lat, tempRecord.lon);
                            if (typeof tmpLatLng == 'undefined') {
                                alert("There is a problem with this hazard map, please alert the system administrators of this issue");
                            }
                            if (tempPolygon.getBounds().contains(tmpLatLng)) {
                                hazardMapValues.push([tempRecord.iml, tempRecord.lon, tempRecord.lat]);
                            }
                        }
                    }
                }

                var header = "val, longitude, latitude],";
                var stringForDownload = JSON.stringify(hazardMapValues);
                var stringForDownload = header.concat(stringForDownload);

                stringForDownload = stringForDownload
                    .replace(/{/g, '')
                    .replace(/}/g, '')
                    .replace(/\],/g, '\r\n')
                    .replace(/\[/g, '')
                    .replace(/\]/g, '');

                downloadJSON2CSV(stringForDownload);
            } else {
                $('#HMDownloadWarning').empty();
                $('#HMDownloadWarning').append("Hazard map data can only be downloaded at zoom level 6 or greater. The current zoom level is: "+zoomLevel );
                $('#HMDownloadWarning').dialog('open');
            }
        } else {
            $('#HMDownloadWarning').empty();
            $('#HMDownloadWarning').append("A hazard map needs to be loaded into the map before a csv can be downloaded");
            $('#HMDownloadWarning').dialog('open');
        }
    });

    function Opacity(tileLayer) {
        $('#opacity-slider').slider({
            change: function( event, ui) {
                var val = $('#opacity-slider').slider("option", "value");
                tileLayer.setOpacity(val);
            }
        });
    }

    // Add single curve layers form tilestream list to map
    function addSingleCurveToMap(curveType) {
        var utfGrid = {};
        if (curveType == 'hc') {

            var scope = angular.element($("#curve-list")).scope();
            var curveLayerId = scope.selected_curve.name;

            // Look up the layer id using the layer name
            var curveLayerIdArray = AppVars.curveLayerNames[curveLayerId];
            var selectedLayer = curveLayerIdArray.toString();

            getLayerMetadata(selectedLayer);

            utfGrid = createUtfLayerGroups(selectedLayer);
            utfGrid.utfGridType = "curve";
            hazardCurveUtfGridClickEvent(curveType, utfGrid, selectedLayer);

        } else if (curveType == 'uhs') {

            var scope = angular.element($("#uhs-list")).scope();
            var uhsLayerId = scope.selected_uhs.name;

            // Look up the layer id using the layer name
            var uhsLayerIdArray = AppVars.uhsLayerNames[uhsLayerId];
            var selectedLayer = uhsLayerIdArray.toString();

            getLayerMetadata(selectedLayer);

            utfGrid = createUtfLayerGroups(selectedLayer);
            utfGrid.utfGridType = "curve";
            hazardCurveUtfGridClickEvent(curveType, utfGrid, selectedLayer);

        } else if (curveType == 'spectrum') {

            var scope = angular.element($("#spectrum-list")).scope();
            var spectrumLayerId = scope.selected_spectrum.name;

            // Look up the layer id using the layer name
            var spectrumLayerIdArray = AppVars.spectrumLayerNames[spectrumLayerId];
            var selectedLayer = spectrumLayerIdArray.toString();

            getLayerMetadata(selectedLayer);

            utfGrid = createUtfLayerGroups(selectedLayer);
            utfGrid.utfGridType = "curve";
            hazardSpectrumUtfGridClickEvent(curveType, utfGrid, selectedLayer);

        } else if (curveType == 'input') {

            var scope = angular.element($("#input-list")).scope();
            var inputLayerId = scope.selected_input.name;

            // Look up the layer id using the layer name
            var inputLayerIdArray = AppVars.inputLayerNames[inputLayerId];
            var selectedLayer = inputLayerIdArray.toString();

            getLayerMetadata(selectedLayer);

            utfGrid = createUtfLayerGroups(selectedLayer);
            utfGrid.utfGridType = "curve";
            hazardCurveUtfGridClickEvent(curveType, utfGrid, selectedLayer);

        } else if (typeof curveType == 'undefined' || curveType == 'map') {

            var scope = angular.element($("#layer-list")).scope();
            mapLayerId = scope.selected_map.name;

            // Look up the layer id using the layer name
            var mapLayerIdArray = AppVars.mapLayerNames[mapLayerId];
            var selectedLayer = mapLayerIdArray.toString();

            // get more information about the selected layer
            $.getJSON(TILESTREAM_API_URL + selectedLayer, function(json) {
                AppVars.selectedHazardMapName = json.name;
                AppVars.selectedMappedValue = json.mapped_value;
                var bounds = json.bounds;
                var htmlLegend = json.html_legend;
                $('#legendDialog').empty();
                $("#legendDialog").dialog({height:315});
                $('#legendDialog').dialog('open');
                $('#legendDialog').append(htmlLegend);
                map.fitBounds(L.latLngBounds(L.latLng(bounds[1], bounds[0]), L.latLng(bounds[3], bounds[2])));
            });

            // prevent duplicate hazard maps to be loaded
            for (var k in AppVars.layerControl._layers) {
                var nameTemp = AppVars.layerControl._layers[k].name;
                if (nameTemp == selectedLayer) {
                    delete AppVars.layerControl._layers[k];
                }
            }

            utfGrid = createUtfLayerGroups(selectedLayer, curveType);
            utfGrid.utfGridType = "map";
            hazardCurveUtfGridClickEvent(curveType, utfGrid, selectedLayer);
        }
    }

    function getLayerMetadata(selectedLayer) {
        // get more information about the selected layer for use in chart
        $.getJSON(TILESTREAM_API_URL + selectedLayer, function(json) {
            AppVars.selectedHazardLayerName = json.name;
            AppVars.selectedLayerValue = json.mapped_value;
            AppVars.layerInvestigationTime = json.investigationTime;

            if (json.periods) {
                AppVars.layerIml = json.periods;
            } else {
                AppVars.layerIml = json.iml;
            }

            AppVars.layerPoe = json.poe;
            AppVars.layerImt = json.imt;
            var bounds = json.bounds;
            map.fitBounds(L.latLngBounds(L.latLng(bounds[1], bounds[0]), L.latLng(bounds[3], bounds[2])));
        });
    }

    function createUtfLayerGroups(selectedLayer, curveType) {
        var tileLayer = L.tileLayer(TILESTREAM_URL +
            selectedLayer +
            '/{z}/{x}/{y}.png',{wax: TILESTREAM_URL +
            selectedLayer +
            '.json'});

        AppVars.utfGrid = new L.UtfGrid(TILESTREAM_URL +
            selectedLayer +
            '/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
        var utfGridGroup = L.featureGroup([
            AppVars.utfGrid,
            tileLayer
        ]);

        AppVars.layerControl.addOverlay(utfGridGroup, selectedLayer);
        map.addLayer(utfGridGroup);
        checkLayerController();
        AppVars.allLayers.push(AppVars.utfGrid);

        // Capture the leaflet mouse and click event object
        for(var k  in map._leaflet_events.click_idx) {
            if (k !== 'key') {
                AppVars.leafletClickEventIdx[k] = map._leaflet_events.click_idx[k];
                AppVars.leafletMouseEventIdx[k] = map._leaflet_events.mousemove_idx[k];
            }
        }

        layerControlLayerSwitch();
        getControlLayerId();
        if (typeof curveType == 'undefined' || curveType == 'map') {
            Opacity(tileLayer);
        }

        return AppVars.utfGrid;
    }


    // add input curve layers from tilestream
    function inputCurve() {
        var scope = angular.element($("#input-list")).scope();
        var inputLayerId = scope.selected_input.name;

        // Look up the layer id using the layer name
        var inputLayerIdArray = AppVars.inputLayerNames[inputLayerId];
        var selectedLayer = inputLayerIdArray.toString();

        // get more information about the selected layer for use in chart
        $.getJSON(TILESTREAM_API_URL + selectedLayer, function(json) {
            AppVars.mappedValue = json.category +' '+ json.mapped_value;
            var bounds = json.bounds;
            var htmlLegend = json.html_legend;
            var htmlLegendHeight = htmlLegend.split(/\r\n|\r|\n/).length;
            htmlLegendHeight = htmlLegendHeight * 21;

            $('#legendDialog').empty();
            $('#legendDialog').dialog('open');
            $('#legendDialog').append(htmlLegend);
            $('#legendDialog').dialog({height:htmlLegendHeight});
            map.fitBounds(L.latLngBounds(L.latLng(bounds[1], bounds[0]), L.latLng(bounds[3], bounds[2])));
        });

        var utfGrid = createUtfLayerGroups(selectedLayer);

        AppVars.utfGrid.on('click', function (e) {
            if (e.data) {
                $('#chartDialog').empty();
                $('#chartDialog').dialog('open');
                var mfds, binWidth, minMag, occurRate, mags;

                mfds = e.data.mfds;
                var mfdsJsonObj = $.parseJSON(mfds);
                var inputObject = {};
                var magsArray = [];
                var occurRateArray = [];
                var tempOccurRate = [];
                for(var g in mfdsJsonObj) {
                    tempOccurRate = mfdsJsonObj[g].occur_rates;
                }
                for (var i = 0; i < tempOccurRate.length; i++) {
                    occurRateArray.push(i);
                }
                for (var k in mfdsJsonObj) {
                    binWidth = mfdsJsonObj[k].bin_width;
                    minMag = mfdsJsonObj[k].min_mag;
                    occurRate = mfdsJsonObj[k].occur_rates;
                    mags = occurRateArray.map(function(x) { return Math.round((minMag + binWidth * x) * 100) / 100; });
                    mfdsJsonObj[k].mags = mags;
                }
                var latlng = e.latlng;
                hazardInputD3Chart(mfdsJsonObj, latlng);
            }
        }); // End utfGrid click
    }

    // Add loss curve layers form tilestream list
    function lossCurve() {

        var scope = angular.element($("#loss-list")).scope();
        var lossLayerId = scope.selected_loss.name;
        // Look up the layer id using the layer name
        var lossLayerIdArray = AppVars.lossLayerNames[lossLayerId];
        var selectedLayer = lossLayerIdArray.toString();

        // get more information about the selected layer for use in chart
        $.getJSON(TILESTREAM_API_URL + selectedLayer, function(json) {
            AppVars.layerInvestigationTime = json.investigationTime;
            AppVars.layerIml = json.iml;
            AppVars.layerImt = json.imt;
            var bounds = json.bounds;
            map.fitBounds(L.latLngBounds(L.latLng(bounds[1], bounds[0]), L.latLng(bounds[3], bounds[2])));
        });

        var tileLayer = L.tileLayer(TILESTREAM_URL +
            selectedLayer +
            '/{z}/{x}/{y}.png',{wax: TILESTREAM_URL +
            selectedLayer +
            '.json'});

        var utfGridLoss = new L.UtfGrid(TILESTREAM_URL +
            selectedLayer +
            '/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});

        var utfGrid = L.featureGroup([
            utfGridLoss,
            tileLayer
        ]);

        AppVars.layerControl.addOverlay(utfGrid, selectedLayer);
        map.addLayer(utfGrid);
        checkLayerController();
        lossCurveUtfGridClickEvent(utfGridLoss);
    }

    // Add mixed curve layers form tilestream list
    function mixedCurve(curveType) {
        var selectedLayer;
        var utfGrid = {};

        if (curveType == 'hc') {
            // Remove any existing UtfGrid layers in order to avoid conflict
            // this is only needed in the case when the user adds the same curve twice
            var curveLayerId = angular.element($("#curve-list")).scope().selected_curve.name;

            // Look up the layer id using the layer name
            var curveLayerIdArray = AppVars.curveLayerNames[curveLayerId];

            selectedLayer = curveLayerIdArray.toString();

            getLayerMetadata(selectedLayer);
            utfGrid = createUtfLayerGroups(selectedLayer);
            utfGrid.utfGridType = "curve";
            hazardCurveUtfGridClickEventMixed(utfGrid, curveType);

        } else if (curveType == 'uhs') {
            var uhsLayerId = angular.element($("#uhs-list")).scope().selected_uhs.name;

            // Look up the layer id using the layer name
            var uhsLayerIdArray = AppVars.uhsLayerNames[uhsLayerId];
            var selectedLayer = uhsLayerIdArray.toString();

            getLayerMetadata(selectedLayer);
            utfGrid = createUtfLayerGroups(selectedLayer);
            utfGrid.utfGridType = "curve";
            hazardCurveUtfGridClickEventMixed(utfGrid, curveType);

        } else if (curveType == 'spectrum') {
            var spectrumLayerId = angular.element($("#spectrum-list")).scope().selected_spectrum.name;

            // Look up the layer id using the layer name
            var spectrumLayerIdArray = AppVars.spectrumLayerNames[spectrumLayerId];
            var selectedLayer = spectrumLayerIdArray.toString();
            getLayerMetadata(selectedLayer);
            utfGrid = createUtfLayerGroups(selectedLayer);
            utfGrid.utfGridType = "curve";
            hazardSpectrumUtfGridClickEventMixed(curveType, utfGrid, selectedLayer);
        }


    }

    $(function() {
        $( '#categoryTabs' ).tabs({
            collapsible: true,
            selected: -1,
            active: false
        });
    });

    var hazardSpectrumUtfGridClickEvent = function(curveType, utfGrid, selectedLayer) {
        utfGrid.on('click', function (e) {
            var lat = e.data.lat;
            var lng = e.data.lon;
            var yAxisLable = 'Spectral Acceleration, Sa [g]';

            try {
                $('#chartDialog').empty();
                if ($("#chartDialog").dialog("isOpen") === false) {
                    $('#chartDialog').dialog('open');
                }
            } catch (exc) {
                // continue
            }

            // create a vector of period values from 0 to 5 in steps of 0.05
            // x is the x axis aka period
            // y is the acceleration

            var vectorofPeriods = [0];
            var vectorLength = 100;
            var baseValue = 0;

            for (var j = 0; j < vectorLength; j++) {
                vectorofPeriods.push(Math.round((baseValue += 0.05) * 100) / 100);
            }
            // push the tb and tc value into the vectorOfPeriods array for a cleaner curve
            vectorofPeriods.push(e.data.Tb);
            vectorofPeriods.push(e.data.Tc);
            vectorofPeriods.sort();

            // create curve path
            var acceleration = [];
            for (var i = 0; i < vectorofPeriods.length; i++) {
                if (vectorofPeriods[i] < e.data.Tb) {
                    acceleration.push(
                        e.data.ag * (1 + (vectorofPeriods[i] / e.data.Tb) * (e.data.f0 - 1))
                    );
                } else if (vectorofPeriods[i] >= e.data.Tb && vectorofPeriods[i] < e.data.Tc) {
                    acceleration.push(
                        e.data.ag * e.data.f0
                    );
                } else if (vectorofPeriods[i] >= e.data.Tc && vectorofPeriods[i] < e.data.Td) {
                    acceleration.push(
                        e.data.ag * e.data.f0 * (e.data.Tc / vectorofPeriods[i])
                    );
                } else if (vectorofPeriods[i] > e.data.Td) {
                    acceleration.push(
                        e.data.ag * e.data.f0 * ((e.data.Tc * e.data.Td) / Math.pow(vectorofPeriods[i], 2))
                    );
                }
            }

            // create the data array
            var data = [];
            for (var ia = 0; ia < acceleration.length; ia++) {
                data.push([vectorofPeriods[ia], acceleration[ia]]);
            }

            AppVars.layerIml = vectorofPeriods;
            drawSingleChart(data, acceleration, vectorofPeriods, curveType, yAxisLable, lat, lng);
        });
    };

    var hazardSpectrumUtfGridClickEventMixed = function(curveType, utfGrid, selectedLayer) {
        utfGrid.on('click', function (e) {
            var lat = e.data.lat;
            var lng = e.data.lon;
            var yAxisLable = 'Spectral Acceleration, Sa [g]';
            var spc = {}; // Spectrum Parameters Collection


            // spectrumCurves contains an array for each curve, each
            // containing an array collection of x y values
            var spectrumCurves = {};

            try {
                $('#chartDialog').empty();
                if ($("#chartDialog").dialog("isOpen") === false) {
                    $('#chartDialog').dialog('open');
                }
            } catch (exc) {
                // continue
            }

            // The utfGrid contains a comma separated string of 5 parameters used
            // to calculate each curve. Here we create an array from each string.


            for (var k in e.data) {
                // Get all the keys that of 'type'
                // TODO change 'type' to something more meaningful like 'spectrum element'
                if (k.indexOf('type') >= 0) {
                    var curveName = k;
                    var tempParameters = e.data[k];
                    spectrumCurves[curveName] = [];
                    spc[curveName] = tempParameters.split(',');
                }
            }

            // spc contains N arrays. Each array contains
            // 5 parameters that can be used to compute spectrum curves.
            // ag = 0, f0 = 1, tb = 2, tc = 3, td = 4


            // For each spectrum parameter set, create a vector of period values
            // from 0 to 5 in steps of 0.05
            // x is the x axis aka period
            // y is the acceleration

            for (var h in spc) {

                var vectorofPeriods = [0];
                var vectorLength = 100;
                var baseValue = 0;

                for (var j = 0; j < vectorLength; j++) {
                    vectorofPeriods.push(Math.round((baseValue += 0.05) * 100) / 100);
                }
                // push the tb and tc value into the vectorOfPeriods array for a cleaner curve
                vectorofPeriods.push(parseFloat(spc[h][2]));
                vectorofPeriods.push(parseFloat(spc[h][3]));
                vectorofPeriods.sort();

                // create curve path
                var acceleration = [];
                for (var i = 0; i < vectorofPeriods.length; i++) {
                    if (vectorofPeriods[i] < spc[h][2]) {
                        acceleration.push(
                            spc[h][0] * (1 + (vectorofPeriods[i] / spc[h][2]) * (spc[h][1] - 1))
                        );
                    } else if (vectorofPeriods[i] >= spc[h][2] && vectorofPeriods[i] < spc[h][3]) {
                        acceleration.push(
                            spc[h][0] * spc[h][1]
                        );
                    } else if (vectorofPeriods[i] >= spc[h][3] && vectorofPeriods[i] < spc[h][4]) {
                        acceleration.push(
                            spc[h][0] * spc[h][1] * (spc[h][3] / vectorofPeriods[i])
                        );
                    } else if (vectorofPeriods[i] >= spc[h][4]) {
                        acceleration.push(
                            spc[h][0] * spc[h][1] * ((spc[h][3] *spc[h][4]) / Math.pow(vectorofPeriods[i], 2))
                        );
                    }
                }

                // create the data array
                //var chartData = [];
                for (var ia = 0; ia < acceleration.length; ia++) {
                    spectrumCurves[h].push([vectorofPeriods[ia], acceleration[ia]]);
                }
            }

            AppVars.layerIml = vectorofPeriods;
            buildMixedSpectrumChart(spectrumCurves, lat, lng);
        });
    };

    var hazardCurveUtfGridClickEvent = function(curveType, utfGrid, selectedLayer) {
        AppVars.utfGrid.on('click', function (e) {
            // format the selected map and layer names
            try {
                AppVars.selectedLayerValue = AppVars.selectedLayerValue.split(":").pop();
            } catch (exc) {
                // continue
            }

            try {
                AppVars.selectedMappedValue = AppVars.selectedMappedValue.split(":").pop();
            } catch (exc) {
                // continue
            }

            // Do stuff only if data is not null
            if (e.data) {
                var spotValue = "";
                try {
                    spotValue = e.data.iml;
                } catch (exc) {
                    // continue
                }

                try {
                    $('#chartDialog').empty();
                    if ($("#chartDialog").dialog("isOpen") === false) {
                        $('#chartDialog').dialog('open');
                    }

                    var prob;
                    var iml;
                    var probArray = [];
                    var imlArray = [];
                    var lat;
                    var lng;
                    var invest_time;
                    var imt;

                    try {
                        prob = e.data.poe;
                    } catch (exc) {
                        // continue
                    }

                    if (typeof prob == 'undefined') {
                        try {
                            prob = e.data.prob;
                        } catch (exc) {
                            // continue
                        }
                    }

                    if (curveType == 'uhs') {
                        prob = e.data.imls;
                    }

                    probArray = prob.split(',');
                    iml = e.data.iml;
                    if (typeof iml == 'undefined') {
                        iml = AppVars.layerIml;
                    } else {
                        imlArray = iml.split(',');
                    }
                    imt = e.data.imt;
                    if (curveType == 'hc') {
                        if(imt == 'PGA') {
                            imt = 'Peak Ground Acceleration (g)';
                        } else if (imt == 'PGV') {
                            imt = 'Peak Ground Velocity (cm/s)';
                        } else if (imt == 'PGD') {
                            imt = 'Peak Ground Displacement (cm)';
                        } else if (imt == 'SA') {
                            imt = 'Spectral Acceleration (g)';
                        }
                    } else if (curveType == 'uhs') {
                        imt = 'Period (s)';
                    }

                    lat = e.data.lat;
                    lng = e.data.lon;

                    if (typeof e.data.YCOORD != 'undefined') {
                        lat = e.data.YCOORD;
                        lng = e.data.XCOORD;
                    }
                    else if(typeof e.data.latitude != 'undefined') {
                        lat = e.data.latitude;
                        lng = e.data.longitude;
                    }
                    invest_time = e.data.invest_tim;

                } catch (exc) {
                    // continue
                }

                if (utfGrid.utfGridType == "map") {
                    $('#chartDialog').append("<strong>"+AppVars.selectedHazardMapName+":<br>"+AppVars.selectedMappedValue+"</strong><br>"+spotValue+" [g]");
                } else if (utfGrid.utfGridType == "curve") {
                var lon = lng;
                var yAxisLable = "";
                var maxYAxis, minYaxis, percent;

                if (curveType == "uhs") {
                    yAxisLable = 'Spectral Acceleration, Sa [g]';
                } else if (curveType == "hc") {
                    yAxisLable = 'Probability of exceedance in '+AppVars.layerInvestigationTime+' years';
                }

                if(!(AppVars.layerIml instanceof Array)) {
                    AppVars.layerIml = AppVars.layerIml.split(',');
                }

                var data = [];
                for(i=0; i<probArray.length; i++) {
                    if (curveType == 'hc') {
                        // Only push into data if the values are greater then 0
                        if (parseFloat(AppVars.layerIml[i]) > 0 && parseFloat(probArray[i]) > 0) {
                            data.push([parseFloat(AppVars.layerIml[i]), parseFloat(probArray[i])]);
                        }
                    } else {
                         data.push([parseFloat(AppVars.layerIml[i]), parseFloat(probArray[i])]);
                    }
                }

                drawSingleChart(data, probArray, AppVars.layerIml, curveType, yAxisLable, lat, lng);

                }
            } // End if data is not null
        }); // End utfGrid click
    }; // End hazardCurveUtfGridClickEvent

    function hazardCurveUtfGridClickEventMixed(utfGrid, curveType) {
        utfGrid.on('click', function (e) {
            // Get the selected curves
            var selectedCurves = [];
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
            $('#chartDialog').dialog('open');

            if (e.data) {
                var chartData = e.data;
                //invest_time = e.data.invest_tim
                buildMixedD3Chart(chartData, selectedCurves, curveType);
            } else {
                //document.getElementById('click').innerHTML = 'click: nothing';
            }
        }); // End utfGrid click
    } // End hazardCurveUtfGridClickEventMixed

    var lossCurveUtfGridClickEvent = function(utfGrid) {
        utfGrid.on('click', function (e) {
            $('#chartDialog').empty();
            $('#chartDialog').dialog('open');
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
                lon = e.data.lon;

                if (typeof e.data.YCOORD != 'undefined') {
                    lat = e.data.YCOORD;
                    lon = e.data.XCOORD;
                }
                else if(typeof e.data.latitude != 'undefined') {
                    lat = e.data.latitude;
                    lon = e.data.longitude;
                }

                var chartData = {};

                for (var i = 0; i < lossesArray.length; i++) {
                    chartData[assetArray[i]] = [];
                }

                for (var b = 0; b < lossesArray.length; b++) {
                    chartData[assetArray[b]].push(lossesArray[b]);
                    chartData[assetArray[b]].push(poesArray[b]);
                }

                LossD3Chart(chartData, assetArray, lat, lon);
            } else {
                //document.getElementById('click').innerHTML = 'click: nothing';
            }
        }); // End utfGrid click
    }; // End hazardCurveUtfGridClickEvent

}; // End startApp

app.initialize(startApp);
