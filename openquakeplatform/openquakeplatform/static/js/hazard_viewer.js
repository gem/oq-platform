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

// Make a list of categorys
var mapCategoryList = [];
var curveCategoryList = [];
var mapLayerGrids = [];
var curveLayerGrids = [];
var mapLayersByCat = {};
var curveLayersByCat = {};
var mapLayerNames = {};
var curveLayerNames = {};
var layerGrid = {};
var layersByInvestMixed = {};
var curvesAvailable = {};
var layersByInvestSingle = {};
var selectedCurves = [];

var baseMapUrl = (
    "http://{s}.tiles.mapbox.com/v3/unhcr.map-8bkai3wa/{z}/{x}/{y}.png"
);

var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

var startApp = function() {

    $(function() {
        $( "#chartDialog" ).dialog({
            autoOpen: false,
            height: 460,
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

    // Duplicate layer warnning message
    function showDuplicateMsg() {
        $("#worning-duplicate").dialog("open");
    };

    $(document).ready(function() {
        $("#worning-duplicate").dialog({
            autoOpen: false,
            hieght: 300,
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
        $("#worning-no-layer").dialog("open");
    };

    $(document).ready(function() {
        $("#worning-no-layer").dialog({
            autoOpen: false,
            hieght: 300,
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
    var selCurve = document.getElementById('curve-list');

    // Create a header for the menu map drop down
    var catMenuHeader = document.createElement('option');
    catMenuHeader.innerHTML = "Category:";
    selCat.appendChild(catMenuHeader);

    // Create a header for the menu curve drop down
    var catCurveMenuHeader = document.createElement('option');
    catCurveMenuHeader.innerHTML = "Category:";
    selCurveCat.appendChild(catCurveMenuHeader);

    $.getJSON('http://tilestream.openquake.org/api/v1/Tileset',
    function(json) {

        // Create the category list (build the object)
        for (var i=0; i < json.length; i++) {
            var name = json[i].mapped_value;
            var cat = json[i].category;
            var type = json[i].type;
            var grids = json[i].grids;
            var invest = json[i].investigationTime;

            if (type == "hazard-curve") {
                curveCategoryList.push(cat);
                curveLayersByCat[cat] = [];
                curveLayerNames[name] = [];
                var grid = grids.toString();
                var gridName = grid.split("/")[4];
                curveLayerGrids.push(gridName);
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
        for (var i=0; i < json.length; i++) {
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

            if (type == "hazard-curve") {
                var curveLayerId = json[i].id;
                curveLayerTitle = json[i].mapped_value;
                curveLayerNames[name].push(curveLayerId);
                curveLayersByCat[cat].push(curveLayerTitle);
            }

            if (type == "hazard-curve" && invest == "mixed") {
                layersByInvestMixed[i] = name;
                curvesAvailable[i] = template;
            }

            if (type == "hazard-curve" && invest != "mixed") {
                layersByInvestSingle[i]=name;
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
            return i==mapCategoryList.indexOf(itm);
        });
    
        var curveCategoryUnique = curveCategoryList.filter(function(itm,i,curveCategoryList){
            return i==curveCategoryList.indexOf(itm);
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
    }); //end getjson

    $("#addTileCurve").click(function() {
        var e = document.getElementById("curve-list");
        var option = e.options[e.selectedIndex].value;
        var investType = checkCurveType(layersByInvestMixed, layersByInvestSingle, option);
        console.log(investType.indexOf("mixed"));
        if (investType.indexOf("mixed") == 1 ) {
            // Use investType to find the key in layersByInvestMixed
            var layerKey = investType.shift();
            // Use that key to look up available curves in curvesAvailable
            var curvesList = curvesAvailable[layerKey].split(" ");
            // Remove ilm and lat long becasue they are not an option
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
            // Provide the user with the curves that are available in the dialog
            $('#hazardCurveDialog').append('<b>Select the curves to be ploted in the chart: </b><br>');
            for (var i = 0; i < curvesList.length; i++) {
                var checkbox = '<input type="checkbox" id="'+curvesList[i]+'" class="curve-list" value=" '
                    + curvesList[i]
                    + '">'
                    + curvesList[i]
                    + '<br>';

                $('#hazardCurveDialog').append(checkbox);
            };
            $('.curve-list').prop('checked', true);
            mixedCurve();

        } else if (investType.indexOf("single") == 0 ) {
            singleCurve();
        } else {
            alert("Whoops, there is an issue with the curve you are trying to load,"
                +" One thing I can think of is some metadata that is required by this app is missing");
        }
    });

    // Check to see if the curve has an investigation time 'mixed'
    function checkCurveType(layersByInvestMixed, layersByInvestSingle, option) {
        for (key in layersByInvestMixed) {
            if (!layersByInvestMixed.hasOwnProperty(key)) continue;
            if (layersByInvestMixed[key] === option) {
                var key  = key;
                var mixed = "mixed";
                return [key, mixed];
            }
        }
        for (key in layersByInvestSingle) {
            if (!layersByInvestSingle.hasOwnProperty(key)) continue;
            if (layersByInvestSingle[key] === option) {
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

    map.addControl(layerControl.setPosition("topleft"));
    // TODO set the map max zoom to 9
    // The interactivity of the map/charts will not work with a map zoom greater then 9
    
    
    // Add map layers form tilestream list
    $(document).ready(function() {
        $("#addTileLayer").click(function() {
            // Remove any existing UtfGrid layers in order to avoid conflict
            map.removeLayer(utfGrid);
            utfGrid = {};

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
                    utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/'
                        + selectedLayer
                        + '/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
                    map.addLayer(utfGrid);
                    utfGridClickEvent(utfGrid);
                    
                    //TODO render D3 chart for hazard curves
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
                utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/'
                    + selectedLayer
                    + '/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
                map.addLayer(utfGrid);
                //TODO create a seperate function to handle curves with invest type mixed
                //if ()
                utfGridClickEvent(utfGrid);
                
                //TODO render D3 chart for hazard curves
            };
        }
    }

    // Add mixed curve layers form tilestream list
    function mixedCurve() {
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
                utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/'
                    + selectedLayer
                    + '/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
                map.addLayer(utfGrid);
                //TODO create a seperate function to handle curves with invest type mixed
                //if ()
                utfGridClickEventMixed(utfGrid);
                
                //TODO render D3 chart for hazard curves
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

    // Map options selection dialog
    $("#thematicMap").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true
    });

    // Map options selection dialog
    $("#hazardCurveDialog").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
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
    
    var utfGridClickEventMixed = function(utfGrid) {
        utfGrid.on('click', function (e) {
            // Get the selected curves
            selectedCurves = [];
            selectedCurves.push("iml");
            var sc = $('.curve-list:checkbox:checked');
            for (var i = 0; i < sc.length; i++) {
                selectedCurves.push(sc[i].defaultValue);
            };

            for (i=0; i < selectedCurves.length; i++)
                selectedCurves[i] = selectedCurves[i].trim();

            $("#chartDialog").empty();

            if (e.data) {
                var chartData = e.data;
                //invest_time = e.data.invest_tim
                buildMixedD3Chart(chartData, selectedCurves);
            } else {
                //document.getElementById('click').innerHTML = 'click: nothing';
            }
        }); // End utfGrid click
    } // End utfGridClickEventMixed


    ////////////////////////////////////////////
    ////////////// Line Chart //////////////////
    ////////////////////////////////////////////

    function buildD3Chart(probArray, imlArray, lat, lng, invest_time, imt) {
        console.log(probArray);
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
            .tickFormat(function (d) { console.log(d); return d; })
            .orient("bottom");
        var yAxis = d3.svg.axis()
            .scale(y)

            .orient("left");

        var line = d3.svg.line()
            .x(function(d) {
                //console.log("d :"+ d);
                //console.log(x(d.x));
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
        console.log(data);

        data.forEach(dataCallback);
        x.domain(d3.extent(data, function(d) { return d.x; }));
        y.domain(d3.extent(data, function(d) { return d.y; }));
        console.log(data);
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


    ////////////////////////////////////////////
    ////////////// Line Chart //////////////////
    ////////////////////////////////////////////

    function buildMixedD3Chart(chartData, selectedCurves) {
        var lat, lon, curve_vals, curve_coup, curve_name, max_value = -1, max_value_k = "";

        /* associative array of arrays of values */
        curve_vals = [];
        /* associative array of arrays [ x, y ] to describe the curve on the plane */
        curve_coup = [];

        /* associative array of curves produced with d3.line */

        lat = chartData["lat"];
        lon = chartData["lon"];
        for (var k in selectedCurves) {
            curve_name = selectedCurves[k];

            //console.log(chartData[curve_name]);

            curve_vals[curve_name] = chartData[curve_name].split(",");

            if (curve_name == "iml")
                continue
            curve_coup[curve_name] = [];
            for (var i = 0 ; i < curve_vals[curve_name].length ; i++) {
                curve_coup[curve_name].push([parseFloat(curve_vals['iml'][i]), parseFloat(curve_vals[curve_name][i]) ]);
            }
        }

        for (var k in selectedCurves) {
            var curve_name = selectedCurves[k];

            if (curve_name == "iml")
                continue

            if (max_value < d3.max(curve_vals[curve_name])) {
                max_value = d3.max(curve_vals[curve_name]);
                max_value_k = curve_name;
            }
        }

        // grid line functions
        function make_x_axis() {
            return d3.svg.axis()
                .scale(x_scale)
                .orient("bottom")
                //.ticks(2)
        }

        function make_y_axis() {
            return d3.svg.axis()
                .scale(y_scale)
                .orient("left")
                //.ticks(5)
        }

        function makeCircles(foo, k) {
            // Points along the line
            svg.selectAll("circle.line") 
                .data(foo) 
                .enter().append("circle") 
                .attr("class", "line"+k) 
                .attr("cx", function(d) { return x_scale(d[0]); }) 
                .attr("cy", function(d) { return y_scale(d[1]); }) 
                .attr("r", 4.5)
                .style("fill", "gray")
                .on("mouseover", function() {
                    d3.select(this)
                        .attr('r', 6.6)
                        .text(circleX + ", " + circleY)
                        .style("fill", "red");
                    var circleX = d3.select(this.__data__[0]);
                    circleX = circleX.toString();
                    circleX = circleX.split(","[0]);
    
                    var circleY = d3.select(this.__data__[1]);
                    circleY = circleY.toString();
                    circleY = circleY.split(","[0]);
    
                    textBottom.text("Point value (x/y): " + circleX + ", " + circleY);
    
                }).on("mouseout", function() {
                    d3.select(this)
                        .attr('r', 4.5)
                        .style("fill", "none");
                });
        }

        var margin = {top: 20, right: 20, bottom: 80, left: 60},
        width = 400 - margin.left - margin.right,
        height = 380 - margin.top - margin.bottom;

        var x_scale = d3.scale.log().range([0, width]);
        var y_scale = d3.scale.log().range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x_scale)
            .tickFormat(function (d) { console.log(d); return Math.round(d*100)/100; })
            .orient("bottom")
            .ticks(8);

        var yAxis = d3.svg.axis()
            .scale(y_scale)
            //.ticks(6)
            .orient("left");

        var line = d3.svg.line()
            .x(function(d) {
                //console.log("d[0]: "+d[0]);
                //console.log("x_scale(d[0]): " +x_scale(d[0]));
                return x_scale(d[0]);
            })
            .y(function(d) {
                //console.log("d[1]: "+d[1]);
                //console.log(d[1]);
                //console.log("y_scale(d[1]): " +y_scale(d[1]));
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

        for (k in selectedCurves) {

            var curve_name = selectedCurves[k];
            console.log(curve_coup[curve_name]);
            if(curve_name == "iml")
                continue;

            var foo = curve_coup[curve_name];
            console.log(foo);

            x_scale.domain(d3.extent(foo, function(d) { return d[0]; }));
            y_scale.domain(d3.extent(foo, function(d) { return d[1]; }));

            svg.append("path")
                .data([foo])
                .attr("class", "line"+k)
                .attr("d", line);

            makeCircles(foo, k);

            // Update the css for each line
            var bar = ["fdbf6f","a6cee3","b2df8a","33a02c","e31a1c","1f78b4","ff7f00","cab2d6","6a3d9a"];
            $(".line"+k).css({'fill':'none','stroke':bar[k]});
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
            .text("imt place holder");
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
            .text("Probabability of exceedance in invest_time years");

        var legend = d3.select("#chartDialog").append("svg");

        legend.append("text")
            .attr("x", 60)
            .attr("y", 7)
            .attr("dy", ".35em")
            .text("Location (Lon/Lat): "+lon+", "+lat);

        textBottom = svg.append("text")
            .attr("x", 0)
            .attr("y", 340)
            .attr("dy", ".35em")
            .text("");
    } //End chart
}; // End startApp

app.initialize(startApp);
