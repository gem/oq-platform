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
var categoryList = [];
var layerGrids = [];
var layersByCat = {};
var layerNames = {};
var layerGrid = {};

var baseMapUrl = (
    "http://{s}.tiles.mapbox.com/v3/unhcr.map-8bkai3wa/{z}/{x}/{y}.png"
);

var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

var startApp = function() {

    $(function() {
        $( "#dialog" ).dialog({
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
    catMenuHeader.innerHTML = "Category:";
    selCat.appendChild(catMenuHeader);

    $.getJSON('http://tilestream.openquake.org/api/v1/Tileset',
    function(json) {

        // Create the category list (build the object)
        for (var i=0; i < json.length; i++) {
            var name = json[i].mapped_value;
            var cat = json[i].category;
            var type = json[i].type;
            var grids = json[i].grids;
            if (cat != undefined && type == "hazard") {
                categoryList.push(cat);
                layerNames[name] = [];
                layersByCat[cat] = [];
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
            if (cat != undefined && type == "hazard") {
                layerId = json[i].id;
                layerTitle = json[i].mapped_value;
                layerNames[name].push(layerId);
                layersByCat[cat].push(layerTitle);
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
        $("#addTileLayer").click(function() {
            // Remove any existing UtfGrid layers in order to avoid conflict
            map.removeLayer(utfGrid);
            utfGrid = {};

            var e = document.getElementById("layer-list");
            var layerId = e.options[e.selectedIndex].value;

            // Look up the layer id using the layer name
            var layerIdArray = layerNames[layerId];
            var selectedLayer = layerIdArray.toString();
            var hasGrid = $.inArray(selectedLayer, layerGrids) > -1;

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

    // Remove layers from tilestream
    $(document).ready(function() {
        $('#removeTileLayer').click(function() {
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

    $("#hazard-dialog").button().click(function() {
        $("#dialog").dialog("open");
    });

    $(function() {
        $( "#categoryTabs" ).tabs({
            collapsible: true,
            selected: -1,
            active: false
        });
    });


    ////////////////////////////////////////////
    ////////////// Line Chart //////////////////
    ////////////////////////////////////////////

    function buildD3Chart(probArray, imlArray, lat, lng, invest_time, imt) {
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
            .ticks(4)
            .orient("bottom");
        var yAxis = d3.svg.axis()
            .scale(y)
            //.ticks(8)
            .orient("left");

        var line = d3.svg.line()
            .x(function(d) { return x(d.x); })
            .y(function(d) { return y(d.y); });

        var svg = d3.select("#dialog").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

        var legend = d3.select("#dialog").append("svg");

        svg.selectAll("circle.line") 
            .data(data) 
        .enter().append("circle") 
            .attr("class", "line") 
            .attr("cx", function(d) { return x(d.x); }) 
            .attr("cy", function(d) { return y(d.y); }) 
            .attr("r", 3.5)
            .style("fill", "white")
            .on("mouseover", function() {
                d3.select(this)
                    .attr('r', 6)
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
                    .attr('r', 3.5)
                    .style("fill", "white");
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
    }

    var utfGridClickEvent = function(utfGrid) {
        utfGrid.on('click', function (e) {
            $("#dialog").empty();
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
                console.log(e.data);
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
    
};



app.initialize(startApp);