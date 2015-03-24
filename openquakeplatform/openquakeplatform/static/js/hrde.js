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
    CurvesByInvestSingle: {},
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
    mappedValue: null,
    selectedHazardMapName: null,
    selectedMappedValue: null,
    selectedHazardLayerName: null,
    selectedLayerValue: null,

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

    // Show hide layer controller
    function checkLayerController() {
        if ($.isEmptyObject(AppVars.layerControl._layers) ) {
            setTimeout(function() {
                $('.leaflet-control-layers-toggle').css({'display': 'none'});
            }, 100);
        } else {
            $('.leaflet-control-layers-toggle').css({'display': 'block'});
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
    $('#map-tools').append('<select id="external-layers-menu">'+
            '<option>Select additional layers</option>'+
            '<option value="1">Strain</option>'+
            '<option value="3">Instrumental Earthquake Catalogue</option>'+
            '<option value="4">Historic Earthquake Catalogue</option>'+
        '</select>'
    );
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

    $('#external-layers-menu').css({ 'margin-bottom' : 0 });
    $('#map-tools').append($('#base-map-menu'));
    $('#base-map-menu').css({ 'margin-bottom' : 0 });

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

    AppVars.layerControl = L.control.layers(app.baseLayers);
    checkLayerController();
    map.scrollWheelZoom.enable();
    map.options.maxBounds = null;

    // switch additional data layers
    $('#external-layers-menu').change(function() {
        var externalLayerSelection = document.getElementById('external-layers-menu').value;

        if (externalLayerSelection == 1) {
            var strain = new L.TileLayer(TILESTREAM_URL+'geodetic-strain-v2-1/{z}/{x}/{y}.png');
            map.addLayer(strain);
            checkLayerController();
            AppVars.layerControl.addOverlay(strain, "Strain");
        } else if (externalLayerSelection == 3) {
            var iec = L.tileLayer.wms("/geoserver/wms", {
                layers: 'oqplatform:isc_viewer_measure',
                format: 'image/png',
                transparent: true,
                version: '1.1.0'
            });
            map.addLayer(iec);
            checkLayerController();
            AppVars.layerControl.addOverlay(iec, "Instrumental Earthquake Catalogue");
        } else if (externalLayerSelection == 4) {
            var hec = L.tileLayer.wms("/geoserver/wms", {
                layers: 'oqplatform:ghec_viewer_measure',
                format: 'image/png',
                transparent: true,
                version: '1.1.0'
            });
            map.addLayer(hec);
            checkLayerController();
            AppVars.layerControl.addOverlay(hec, "Historic Earthquake Catalogue");
        }
    });

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
        $('#cover').remove();
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
                    if (cat != undefined && cat != 'None') {
                        AppVars.curveCategoryList.push(cat);
                        //console.log('AppVars.curveCategoryList:');
                        //console.log(AppVars.curveCategoryList);
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
                        AppVars.CurvesByInvestSingle[j] = name;
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
                    console.log('json[j].id:');
                    console.log(json[j].id);
                    var spectrumLayerId = json[j].id;
                    var spectrumLayerTitle = json[j].mapped_value;
                    AppVars.spectrumLayerNames[name].push(spectrumLayerId);
                    AppVars.spectrumLayersByCat[cat].push(spectrumLayerTitle);
                    AppVars.spectrumByInvestSingle[j] = name;
                    console.log('AppVars.spectrumByInvestSingle[j]:');
                    console.log(AppVars.spectrumByInvestSingle[j]);
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

        var scope = angular.element($("#curve-list")).scope();
        var option = scope.selected_curve.name;
        var investType = checkCurveType(AppVars.curvesByInvestMixed, AppVars.CurvesByInvestSingle, option);
        var curvesListCap = [];
        var curveType = 'hc';

        if (investType.indexOf('mixed') == 1 ) {
            // Use investType to find the key in curvesByInvestMixed
            var layerKey = investType.shift();
            // Use that key to look up available curves in curvesAvailable
            var curvesList = AppVars.curvesAvailable[layerKey].split(' ');

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
            if (curveType == 'hc') {
                $('#hc-mixed-selection').empty();
                $('#uhs-mixed-selection').empty();
                $('#spectrum-mixed-selection').empty();
                $('#hc-mixed-selection').append('<p><b>Select curves to be ploted in the chart:</b></p>');
                for (var j = 0; j < curvesList.length; j++) {
                    var checkbox = '<input type="checkbox" id="'+curvesList[j]+'" class="curve-list" value=" ' +
                        curvesList[j] +
                        '">' +
                        curvesList[j] +
                        '<br>';

                    $('#hc-mixed-selection').append(checkbox);
                }
            }

            $('.curve-list').prop('checked', true);
            mixedCurve(curveType);

        } else if (investType.indexOf('single') == 0 ) {
            singleCurve(curveType);
        } else {
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
        singleCurve();
    }); // end add input curve



    $('#addTileUhs').click(function() {
        $('#chartDialog').dialog('option', 'title', 'Plot');
        $('#chartDialog').empty();

        var scope = angular.element($("#uhs-list")).scope();
        var option = scope.selected_uhs.name;

        var investType = checkUhsType(AppVars.uhsByInvestMixed, AppVars.uhsByInvestSingle, option);
        var curveType = 'uhs';

        if (investType.indexOf('mixed') == 1 ) {
            // Use investType to find the key in uhsByInvestMixed
            var layerKey = investType.shift();
            // Use that key to look up available uhs in uhsAvailable
            var uhsList = AppVars.uhsAvailable[layerKey].split(' ');
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
            if (curveType == 'uhs') {
                $('#uhs-mixed-selection').empty();
                $('#hc-mixed-selection').empty();
                $('#uhs-mixed-selection').append('<p><b>Select curves to be ploted in the chart:</b></p>');
                for (var j = 0; j < uhsList.length; j++) {
                    var checkbox = '<input type="checkbox" id="'+uhsList[j]+'" class="curve-list" value=" ' +
                        uhsList[j] +
                        '">' +
                        uhsList[j] +
                        '<br>';

                    $('#uhs-mixed-selection').append(checkbox);
                }
            }

            $('.curve-list').prop('checked', true);
            mixedCurve(curveType);

        } else if ($.inArray('single', investType) > -1) {
            singleCurve(curveType);

        } else {
            alert('Whoops, there is an issue with the curve you are trying to load,' +
                ' One thing I can think of is some metadata that is required by this app is missing');
        }
    }); // end add uhs curve


    $('#addTileSpectrum').click(function() {
        $('#chartDialog').dialog('option', 'title', 'Plot');
        $('#chartDialog').empty();

        var scope = angular.element($("#spectrum-list")).scope();
        console.log('scope:');
        console.log(scope);
        var option = scope.selected_spectrum.name;
        var curveType = 'spectrum';

        singleCurve(curveType);

    }); // end add spectrum curve

    $('#addTileLoss').click(function() {
        $('#chartDialog').dialog('option', 'title', 'Plot');
        $('#chartDialog').empty();

        lossCurve();
    }); // end add loss curve

    // Check to see if the curve has an investigation time 'mixed'
    function checkCurveType(curvesByInvestMixed, CurvesByInvestSingle, option) {
        for (var key in AppVars.curvesByInvestMixed) {
            if (!AppVars.curvesByInvestMixed.hasOwnProperty(key))
                continue;
            if (AppVars.curvesByInvestMixed[key] == option) {
                var mixed = 'mixed';
                return [key, mixed];
            }
        }
        for (key in AppVars.CurvesByInvestSingle) {
            if (!AppVars.CurvesByInvestSingle.hasOwnProperty(key))
                continue;
            if (AppVars.CurvesByInvestSingle[key] == option) {
                var single = 'single';
                return [single];
            }
        }
    }

    // Check to see if the uhs has an investigation time 'mixed'
    function checkUhsType(uhsByInvestMixed, uhsByInvestSingle, option) {
        for (var key in AppVars.uhsByInvestMixed) {
            if (!AppVars.uhsByInvestMixed.hasOwnProperty(key))
                continue;
            if (AppVars.uhsByInvestMixed[key] == option) {
                var mixed = 'mixed';
                return [key, mixed];
            }
        }
        for (key in AppVars.uhsByInvestSingle) {
            if (!AppVars.uhsByInvestSingle.hasOwnProperty(key))
                continue;
            if (AppVars.uhsByInvestSingle[key] == option) {
                var single = 'single';
                return [single];
            }
        }
    }


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
                            if (tmpLatLng == undefined) {
                                alert("There is a problem with this hazard map, please alert the systems administration of this issue")
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

    // Add single curve layers form tilestream list
    function singleCurve(curveType) {
        var utfGrid = {};
        if (curveType == 'hc') {

            var scope = angular.element($("#curve-list")).scope();
            var curveLayerId = scope.selected_curve.name;

            // Look up the layer id using the layer name
            var curveLayerIdArray = AppVars.curveLayerNames[curveLayerId];
            var selectedLayer = curveLayerIdArray.toString();

            // get more information about the selected layer for use in chart
            $.getJSON(TILESTREAM_API_URL + selectedLayer, function(json) {
                AppVars.selectedHazardLayerName = json.name;
                AppVars.selectedLayerValue = json.mapped_value;
                AppVars.mappedValue = json.mapped_value;
                AppVars.layerInvestigationTime = json.investigationTime;
                AppVars.layerIml = json.iml;
                AppVars.layerImt = json.imt;
                var bounds = json.bounds;
                map.fitBounds(L.latLngBounds(L.latLng(bounds[1], bounds[0]), L.latLng(bounds[3], bounds[2])));

            });

            utfGrid = createUtfLayerGroups(selectedLayer);
            utfGrid.utfGridType = "curve";
            hazardCurveUtfGridClickEvent(curveType, utfGrid, selectedLayer);

        } else if (curveType == 'uhs') {

            var scope = angular.element($("#uhs-list")).scope();
            var uhsLayerId = scope.selected_uhs.name;

            // Look up the layer id using the layer name
            var uhsLayerIdArray = AppVars.uhsLayerNames[uhsLayerId];
            var selectedLayer = uhsLayerIdArray.toString();

            // get more information about the selected layer for use in chart
            $.getJSON(TILESTREAM_API_URL + selectedLayer, function(json) {
                AppVars.selectedHazardLayerName = json.name;
                AppVars.selectedLayerValue = json.mapped_value;
                AppVars.layerInvestigationTime = json.investigationTime;
                AppVars.layerIml = json.periods;
                AppVars.layerPoe = json.poe;
                AppVars.layerImt = json.imt;
                var bounds = json.bounds;
                map.fitBounds(L.latLngBounds(L.latLng(bounds[1], bounds[0]), L.latLng(bounds[3], bounds[2])));
            });

            utfGrid = createUtfLayerGroups(selectedLayer);
            utfGrid.utfGridType = "curve";
            hazardCurveUtfGridClickEvent(curveType, utfGrid, selectedLayer);

        } else if (curveType == 'spectrum') {

            var scope = angular.element($("#spectrum-list")).scope();
            var spectrumLayerId = scope.selected_spectrum.name;

            // Look up the layer id using the layer name
            var spectrumLayerIdArray = AppVars.spectrumLayerNames[spectrumLayerId];
            var selectedLayer = spectrumLayerIdArray.toString();

            // get more information about the selected layer for use in chart
            $.getJSON(TILESTREAM_API_URL + selectedLayer, function(json) {
                AppVars.selectedHazardLayerName = json.name;
                AppVars.selectedLayerValue = json.mapped_value;
                AppVars.layerInvestigationTime = json.investigationTime;
                AppVars.layerPoe = json.poe;
                AppVars.layerImt = json.imt;
                var bounds = json.bounds;
                map.fitBounds(L.latLngBounds(L.latLng(bounds[1], bounds[0]), L.latLng(bounds[3], bounds[2])));
            });

            utfGrid = createUtfLayerGroups(selectedLayer);
            utfGrid.utfGridType = "curve";
            hazardSpectrumUtfGridClickEvent(curveType, utfGrid, selectedLayer);

        } else if (curveType == 'input') {

            var scope = angular.element($("#input-list")).scope();
            var inputLayerId = scope.selected_input.name;

            // Look up the layer id using the layer name
            var inputLayerIdArray = AppVars.inputLayerNames[inputLayerId];
            var selectedLayer = inputLayerIdArray.toString();

            // get more information about the selected layer for use in chart
            $.getJSON(TILESTREAM_API_URL + selectedLayer, function(json) {
                AppVars.selectedHazardLayerName = json.name;
                AppVars.selectedLayerValue = json.mapped_value;
                var bounds = json.bounds;
                map.fitBounds(L.latLngBounds(L.latLng(bounds[1], bounds[0]), L.latLng(bounds[3], bounds[2])));
            });

            utfGrid = createUtfLayerGroups(selectedLayer);
            utfGrid.utfGridType = "curve";
            hazardCurveUtfGridClickEvent(curveType, utfGrid, selectedLayer);

        } else if (curveType == undefined || curveType == 'map') {

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

    function createUtfLayerGroups(selectedLayer, curveType) {
        var tileLayer = L.tileLayer(TILESTREAM_URL +
            selectedLayer +
            '/{z}/{x}/{y}.png',{wax: TILESTREAM_URL +
            selectedLayer +
            '.json'});

        AppVars.utfGrid = new L.UtfGrid(TILESTREAM_URL +
            selectedLayer +
            '/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
        var utfGridGroup = L.layerGroup([
            AppVars.utfGrid,
            tileLayer
        ]);

        AppVars.layerControl.addOverlay(utfGridGroup, selectedLayer);
        map.addLayer(utfGridGroup);
        checkLayerController();
        if (curveType == undefined || curveType == 'map') {
            Opacity(tileLayer);
        }

        return AppVars.utfGrid;
    }

    // add input curve layers from tilestream
    function inputCurve(curveType) {
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
                hazardInputD3Chart(mfdsJsonObj);
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

        var utfGrid = L.layerGroup([
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

        if (curveType == 'hc') {
            // Remove any existing UtfGrid layers in order to avoid conflict
            // this is only needed in the case when the user adds the same curve twice
            var scope = angular.element($("#curve-list")).scope();
            var curveLayerId = scope.selected_curve.name;

            // Look up the layer id using the layer name
            var curveLayerIdArray = AppVars.curveLayerNames[curveLayerId];

            selectedLayer = curveLayerIdArray.toString();

            // get more information about the selected layer for use in chart
            $.getJSON(TILESTREAM_API_URL + selectedLayer, function(json) {
                AppVars.mappedValue = json.mapped_value;
                AppVars.layerInvestigationTime = json.investigationTime;
                AppVars.layerIml = json.iml;
                AppVars.layerImt = json.imt;
                var bounds = json.bounds;
                map.fitBounds(L.latLngBounds(L.latLng(bounds[1], bounds[0]), L.latLng(bounds[3], bounds[2])));
            });

        } else if (curveType == 'uhs') {
            var scope = angular.element($("#uhs-list")).scope();
            var uhsLayerId = scope.selected_uhs.name;

            // Look up the layer id using the layer name
            var uhsLayerIdArray = AppVars.uhsLayerNames[uhsLayerId];
            var selectedLayer = uhsLayerIdArray.toString();

            // get more information about the selected layer for use in chart
            $.getJSON(TILESTREAM_API_URL + selectedLayer, function(json) {
                AppVars.mappedValue = json.mapped_value;
                AppVars.layerInvestigationTime = json.investigationTime;
                AppVars.layerIml = json.periods;
                AppVars.layerPoe = json.poe;
                AppVars.layerImt = json.imt;
                var bounds = json.bounds;
                map.fitBounds(L.latLngBounds(L.latLng(bounds[1], bounds[0]), L.latLng(bounds[3], bounds[2])));
            });
        }

        var tileLayer = L.tileLayer(TILESTREAM_URL +
            selectedLayer +
            '/{z}/{x}/{y}.png',{wax: TILESTREAM_URL +
            selectedLayer +
            '.json'});


        var utfGrid = new L.UtfGrid(TILESTREAM_URL +
            selectedLayer +
            '/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});

        var utfGridMixed = L.layerGroup([utfGrid, tileLayer]);

        AppVars.layerControl.addOverlay(utfGridMixed, selectedLayer);
        map.addLayer(utfGridMixed);
        checkLayerController();
        hazardCurveUtfGridClickEventMixed(utfGrid, curveType);
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
            console.log('e:');
            console.log(e);
            var lat = e.data.lat;
            var lng = e.data.lon;
            var yAxisLable = 'Spectral Acceleration, Sa [g]';
            var curveType = 'spectrum';

            try {
                $('#chartDialog').empty();
                if ($("#chartDialog").dialog("isOpen") == false) {
                    $('#chartDialog').dialog('open');
                }
            } catch (e) {
                // continue
            }

            // create a vector of period values from 0 to 4 in steps of 0.05
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

    var hazardCurveUtfGridClickEvent = function(curveType, utfGrid, selectedLayer) {
        utfGrid.on('click', function (e) {
            // format the selected map and layer names
            try {
                AppVars.selectedLayerValue = AppVars.selectedLayerValue.split(":").pop();
            } catch (e) {
                // continue
            }

            try {
                AppVars.selectedMappedValue = AppVars.selectedMappedValue.split(":").pop();
            } catch (e) {
                // continue
            }

            // Do stuff only if data is not null
            if (e.data) {
                var spotValue = "";
                try {
                    spotValue = e.data.iml;
                } catch (e) {
                    // continue
                }

                try {
                    $('#chartDialog').empty();
                    if ($("#chartDialog").dialog("isOpen") == false) {
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
                    } catch (e) {
                        // continue
                    }

                    if (prob == undefined) {
                        try {
                            prob = e.data.prob;
                        } catch (e) {
                            // continue
                        }
                    }

                    if (curveType == 'uhs') {
                        prob = e.data.imls;
                    }
                    console.log('e.data:');
                    console.log(e.data);

                    probArray = prob.split(',');
                    iml = e.data.iml;
                    if (iml == undefined) {
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

                    if (e.data.YCOORD != undefined) {
                        lat = e.data.YCOORD;
                        lng = e.data.XCOORD;
                    }
                    else if(e.data.latitude != undefined) {
                        lat = e.data.latitude;
                        lng = e.data.longitude;
                    }
                    invest_time = e.data.invest_tim;

                } catch (e) {
                    // continue
                }


                ////////////////////////////////////////////////////////////
                //// Single hazard UHS, curveChart and hazard map plots ////
                ////////////////////////////////////////////////////////////

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



                console.log('data:');
                console.log(data);

                drawSingleChart(data, probArray, AppVars.layerIml, curveType, yAxisLable, lat, lng);

                }
            } // End if data is not null
        }); // End utfGrid click
    }; // End hazardCurveUtfGridClickEvent

    function drawSingleChart(data, probArray, layerIml, curveType, yAxisLable, lat, lng) {

        // Find min and max y axis values
        maxYAxis = Math.max.apply(Math, probArray);
        minYAxis = Math.min.apply(Math, probArray);
        percent = 0.1 * maxYAxis;
        maxYAxis = percent + maxYAxis;

        var margin = {top: 60, right: 20, bottom: 80, left: 70},
        width = 580 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        if (curveType == 'uhs' || curveType == 'spectrum') {
            var x = d3.scale.linear().range([0, width]);
            var y = d3.scale.linear().range([height, 0]);
        } else {
            var x = d3.scale.log().range([0, width]);
            var y = d3.scale.log().range([height, 0]);
        }

        var xAxis = d3.svg.axis()
            .scale(x)
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

        var dataCallback = function(d) {
            d.x = +d[0];
            d.y = +d[1];
        };

        data.forEach(dataCallback);
        x.domain(d3.extent(data, function(d) { return d.x; }));

        if (curveType == 'uhs' || curveType == 'spectrum') {
            y.domain([minYAxis, maxYAxis]);
        } else {
            y.domain([d3.extent(data, function(d) { return d.y; })[0], 3]);
        }

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
        svg.append('path')
            .data([data])
            .attr('class', 'line')
            .attr('d', line);
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-35)";
                });
        svg.append('g')
            .attr('class', 'x axis')
            .append('text')
            .attr('x', width / 2)
            .attr('y',  (height + margin.bottom)- 17)
            .attr('text-anchor', 'middle')
            .style('font-size','14px')
            .text(AppVars.layerImt);
        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -70)
            .attr('x', -20)
            .attr('dy', '.71em')
            .style('font-size','12px')
            .style('text-anchor', 'end')
            .text(yAxisLable);
        var legend = d3.select('#chartDialog').append('svg')
            .attr('height', 25);
        textTopTitle = svg.append("text")
            .attr("x", 0)
            .attr("y", -45)
            .attr("dy", ".35em")
            .style("font-weight", "bold")
            .attr("font-size","14px")
            .text(AppVars.selectedHazardLayerName);
        textTopTitle2 = svg.append("text")
            .attr("x", 0)
            .attr("y", -30)
            .attr("dy", ".35em")
            .style("font-weight", "bold")
            .attr("font-size","14px")
            .text(AppVars.selectedLayerValue);
        textTopLable = svg.append("text")
            .attr("x", 0)
            .attr("y", -15)
            .attr("dy", ".35em")
            .attr("font-size","12px")
            .text('Point coordinates (lon, lat [in DD]): '+lng+', '+lat);
        textBottom = svg.append('text')
            .attr('x', 0)
            .attr('y', 335)
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
            csvData = csvData.concat(AppVars.layerInvestigationTime);
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
    }

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

                if (e.data.YCOORD != undefined) {
                    lat = e.data.YCOORD;
                    lon = e.data.XCOORD;
                }
                else if(e.data.latitude != undefined) {
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

    /////////////////////////////////////
    //////// Input hazard Chart /////////
    /////////////////////////////////////

    function hazardInputD3Chart(mfdsJsonObj) {

        var mappedValue1 = AppVars.mappedValue.split(':')[0];
        var mappedValue2 = AppVars.mappedValue.substring(AppVars.mappedValue.indexOf(":") + 1);

        var xAxisLable, yAxisLable, yAxisVariable, curve_vals, curve_coup, curve_name, colors;
        var min_value = 1000.0, min_value_k = '', max_value = -1, max_value_k = '';
        var selectedCurves = [];
        // associative array of arrays of values
        curve_vals = [];

        yAxisLable = 'Number of events / year';
        xAxisLable = 'Magnitude';

        // find the min and max value when there are multipe MFDs
        var keys = Object.keys(mfdsJsonObj).length
        var max = [];
        for (var k in mfdsJsonObj) {
            for (var i = 0; i < mfdsJsonObj[k].mags.length; i++) {
                max.push(mfdsJsonObj[k].mags[i]);
            }
        }

        function findMaxMagValue( max ){
            return Math.max.apply( Math, max );
        };

        function findMinMagValue( max ){
            return Math.min.apply( Math, max );
        };

        var multipleMfdsMinValue = findMinMagValue(max);
        var multipleMfdsMaxValue = findMaxMagValue(max);

        // prep data for multiple curve plots
        var multiplePlotData = [];
        var allyAxisVariable = [];

        for (var m in mfdsJsonObj) {
            var bar = [];
            for (var i = 0; i < mfdsJsonObj[m].mags.length; i++) {
                allyAxisVariable.push(mfdsJsonObj[m].mags[i]);
                bar.push([mfdsJsonObj[m].mags[i], mfdsJsonObj[m].occur_rates[i]]);
                multiplePlotData[m] = bar;
            }
        }

        for (var k in mfdsJsonObj) {
            curve_name = k;
            curve_vals[curve_name] = mfdsJsonObj[k].occur_rates;
            selectedCurves.push(k);
            yAxisVariable = mfdsJsonObj[k].mags;
        }

        for (var k in selectedCurves) {
            var curve_name = selectedCurves[k];
            var min_cur = 1000.0, max_cur = -1;

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
                    var circleX = d3.select(this.__data__[0]);
                    circleX = circleX.toString();
                    circleX = circleX.split(","[0]);

                    var circleY = d3.select(this.__data__[1]);
                    circleY = circleY.toString();
                    circleY = circleY.split(","[0]);

                    textTop.text(curveTitle+" point value (x/y): " + circleX + ", " + circleY);

                });
        }

        var margin = {top: 55, right: 80, bottom: 45, left: 60};
        var width = 580 - margin.left - margin.right;
        var height = 380 - margin.top - margin.bottom;
        if (keys == 1) {
            var x_scale = d3.scale.log().range([0, width]).domain([d3.min(yAxisVariable), d3.max(yAxisVariable)]);
        } else {
            var x_scale = d3.scale.log().range([0, width]).domain([multipleMfdsMinValue, multipleMfdsMaxValue]);
        }

        var y_scale = d3.scale.log().range([0, height]).domain([max_value, min_value]);

        var xAxis = [], xAxis_n = 1;
        var xAxis_vals = [];

        xAxis_n = parseInt(Math.ceil(allyAxisVariable.length / 5));

        if (xAxis_n > 4)
            xAxis_n = 4;

        for (var i = 0 ; i < xAxis_n ; i++) {
            xAxis_vals[i] = [];
            for (var e = i ; e < allyAxisVariable.length ; e += xAxis_n) {
                xAxis_vals[i].push(allyAxisVariable[e]);
            }

            xAxis[i] = d3.svg.axis()
                .scale(x_scale)
                .ticks(4)
                .innerTickSize(i == 0 ? 8 : 4)
                .outerTickSize(0)
                .tickValues(xAxis_vals[i])
                .orient("bottom");

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

        svg.append("text")
            .attr("x", 460)
            .attr("y", -25)
            .attr("dy", ".35em")
            .text("MFDS *");

        for (k in selectedCurves) {
            var curve_name = selectedCurves[k];
            var data = multiplePlotData[curve_name];

            // Update the css for each line
            colors = [
                "#4020F7",
                "#1869DB",
                "#158406",
                "#08A100",
                "#99C400",
                "#E76F00",
                "#FF3F00",
                "#FFFA00",
                "#4CFF06",
                "#29FF89",
                "#51DFFF",
                "#7782FF",
                "#DA97FF",
                "#FFBDE5",
                "#377CFC"
            ];

            var gray = "darkGray";
            $(".line"+k).css({'fill':'none','opacity':'0.5', 'stroke':gray});

            var color = colors[k % colors.length];

            var str = selectedCurves[k];
            str = str.replace(/_/g, " ");
            var curveTitle = capitalize(str)

            makeCircles(data, k, color, curveTitle);

            svg.append("text")
                .attr("x", 465)
                .attr("y", 0+(k*20))
                .attr("dy", ".35em")
                .text(curveTitle);

            svg.append("svg:circle")
                //.attr("cx", 50)
                .attr("cy", 0+(k*20))
                .attr("cx", 460)
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
                .attr("x", width / 2)
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
            .attr("x", -120)
            .attr("dy", ".71em")
            .style("font-size","12px")
            .style("text-anchor", "middle")
            .text(yAxisLable);

        textTopTitle = svg.append("text")
            .attr("x", 0)
            .attr("y", -47)
            .attr("dy", ".35em")
            .style("font-weight", "bold")
            .attr("font-size","14px")
            .text(mappedValue1);

        textTopTitle2 = svg.append("text")
            .attr("x", 0)
            .attr("y", -30)
            .attr("dy", ".35em")
            .style("font-weight", "bold")
            .attr("font-size","14px")
            .text(mappedValue2);

        textTop = svg.append("text")
            .attr("x", 0)
            .attr("y", -15)
            .attr("dy", ".35em")
            .style("font-size","11px")
            .text('');

        $('#chartDialog').append('<div>* Magnitude Frequency Distributions</div>');
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

            //csvData = csvData.concat(csvHeader);
            csvData.push("mfds");
            csvData.push("binWidth");
            csvData.push("minMag");
            csvData.push("occurRate");
            csvData.push("mags");
            csvData = JSON.stringify(csvData);
            var lineBreak = "lineBreak";
            csvData = csvData.concat(lineBreak);
            var quotationMark = '"';

            csvData = csvData
                .replace(/lineBreak/, '\r\n')
                .replace(/\[/g, '')
                .replace(/\]/g, '')
                .replace(/","/g, ',')
                .replace(/"/g, '');

            for (var k in selectedCurves) {
                curve_name = selectedCurves[k];
                var curveValue = mfdsJsonObj[curve_name];

                csvData += curve_name;
                csvData += ',';
                csvData += curveValue.bin_width;
                csvData += ',';
                csvData += curveValue.min_mag;
                csvData += ',';
                csvData += quotationMark;
                csvData += curveValue.occur_rates;
                csvData += quotationMark;
                csvData += ',';
                csvData += quotationMark;
                csvData += curveValue.mags;
                csvData += quotationMark;
                csvData += '\r\n';
            }

            downloadJSON2CSV(csvData);
        });
    } //End chart


    /////////////////////////////////////////////
    ///////// Mixed Hazard/spectra Chart ////////
    /////////////////////////////////////////////

    function buildMixedD3Chart(chartData, selectedCurves, curveType) {

        if (selectedCurves.indexOf("iml") > -1) {
            var inx = selectedCurves.indexOf("iml");
            selectedCurves.splice(inx, 1);
        }

        var lat, lon, poe, xAxisLable, yAxisLable, yAxisVariable, curve_vals, curve_coup, curve_name, legend, colors, chartHeader;
        var min_value = 1000.0, min_value_k = '', max_value = -1, max_value_k = '';

        if(!(AppVars.layerIml instanceof Array)) {
            AppVars.layerIml = AppVars.layerIml.split(' ');
            for (i = 0 ; i < AppVars.layerIml.length ; i++) {
                AppVars.layerIml[i] = parseFloat(AppVars.layerIml[i]);
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
            poe = AppVars.layerPoe;
            chartHeader = 'Investigation Time: '+AppVars.layerInvestigationTime+', Probability of exceedance: '+poe;
        } else {
            chartHeader = 'Investigation Time: '+AppVars.layerInvestigationTime;
        }

        invest_time = AppVars.layerInvestigationTime;
        if (curveType == 'hc') {
            yAxisLable =  'Probability of exceedance in '+AppVars.layerInvestigationTime+' years';
        } else if (curveType == 'uhs') {
            yAxisLable = 'Spectral acceleration (g)';
        }

        if (curveType == 'hc') {
            // The imt variable needs to be formated i.e. SA = Spectral Acceleration (g)
            // SA-0.1 = Spectral Acceleration (0.1 s)

            xAxisLable = AppVars.layerImt;
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
            try {
                curve_vals[curve_name] = chartData[curve_name].split(',');
            } catch (e) {
                // continue
            }
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
            yAxisVariable = AppVars.layerIml;
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

                    textBottom.text(curveTitle+" point value (x/y): " + circleX + ", " + circleY);

                }).on("mouseout", function() {
                    d3.select(this)
                        .attr('r', 2.5)
                        .style("fill", color);
                });
        }

        var margin = {top: 55, right: 10, bottom: 60, left: 60};
        var width = 450 - margin.left - margin.right;
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
            .attr("height", 35*(selectedCurves.length - 1));

        for (var i = 0; i < selectedCurves.length; i++) {

            var curve_name = selectedCurves[i];

            if (curveType == 'hc' && curve_name == "iml")
                continue;
            if (curveType == 'uhs' && curve_name == "periods")
                continue;

            var data = curve_coup[curve_name];

            svg.append("path")
                .data([data])
                .attr("class", "line"+i)
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
            var color = colors[i % colors.length];
            $(".line"+i).css({'fill':'none','opacity':'0.4', 'stroke':'black'});

            var str = selectedCurves[i];
            str = str.replace(/_/g, " ");
            var curveTitle = capitalize(str)

            makeCircles(data, i, color, curveTitle);

            legend.append("text")
                .attr("x", 90)
                .attr("y", 20*(i+1))
                .attr("dy", ".35em")
                .text(curveTitle);

            legend.append("svg:circle")
                .attr("cy", 20*(i+1))
                .attr("cx", 80)
                .attr("r", 3)
                .style("fill", color)

            $("."+selectedCurves[i]).css({'stroke':colors[i]});
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

        textTopTitle = svg.append("text")
            .attr("x", 0)
            .attr("y", -47)
            .attr("dy", ".35em")
            .style("font-weight", "bold")
            .attr("font-size","14px")
            .text(AppVars.mappedValue);

        textTopSubTitle = svg.append("text")
            .attr("x", 0)
            .attr("y", -32)
            .attr("dy", ".35em")
            .attr("font-size","12px")
            .text(chartHeader);

        textTopSubTitle = svg.append("text")
            .attr("x", 0)
            .attr("y", -20)
            .attr("dy", ".35em")
            .attr("font-size","12px")
            .text("(Lon/Lat): "+lon+", "+lat);

        textBottom = svg.append("text")
            .attr("x", 0)
            .attr("y", 315)
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
            csvData.push("investigationTime");
            csvData.push("poE");
            csvData.push("lon");
            csvData.push("lat");
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
            .text('Loss Curve');

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
