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

    //  Project definition dialog
    $("#projectDefDialog").dialog({
        autoOpen: false,
        height: 500,
        width: 600,
        modal: false
    });

    $("#project-definition").button().click(function() {
        $("#projectDefDialog").dialog("open");
    });

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

        console.log(categoryList);

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

            // Look up the layer id using the layer name
            var selectedPDefArray = projectDefinition[layerId];
            var selectedPDefStr = selectedPDefArray.toString();
            selectedPDefStr = "https://api.github.com/repos/bwyss/oq-platform/git/blobs/a05a94858375bd0ae023f6950a2b13fac5127637?callback=_processGithubResponse";
            $.getJSON(selectedPDefStr+'?format=json&callback=?', function(json) {
                encodedData = json.data.content;
                var selectedPDef = window.atob(encodedData);
                loadPD(selectedPDef);
            });

            var layerIdArray = layerNames[layerId];
            var selectedLayer = layerIdArray.toString();
            // Check for duplicae layes
            if (selectedLayer in layers) {
                showDuplicateMsg();
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
            }
        });
    });

    // Remove layers from tilestream
    $(document).ready(function() {
        $('#removeLayer').click(function() {
    
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

    ////////////////////////////////////////////
    //// Project Definition Collapsible Tree ///
    ////////////////////////////////////////////

    function loadPD(selectedPDef) {
        var margin = {top: 20, right: 120, bottom: 20, left: 120},
            width = 960 - margin.right - margin.left,
            height = 800 - margin.top - margin.bottom;
    
        var i = 0,
            duration = 750,
            root;
        
        var tree = d3.layout.tree()
            .size([height, width]);
        
        var diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });
        
        var svg = d3.select("#projectDefDialog").append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        d3.json(selectedPDef, function() {
            flare=JSON.parse(selectedPDef)
            
            console.log(flare);
            root = flare;
            root.x0 = height / 2;
            root.y0 = 0;
            
            function collapse(d) {
                if (d.children) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }
        
            root.children.forEach(collapse);
            update(root);
        });
        
        d3.select(self.frameElement).style("height", "800px");
        
        function update(source) {
        
            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);
        
            // Normalize for fixed-depth.
            nodes.forEach(function(d) { d.y = d.depth * 180; });
        
            // Update the nodes…
            var node = svg.selectAll("g.node")
                .data(nodes, function(d) { return d.id || (d.id = ++i); });
            
            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .on("click", click);
            
            nodeEnter.append("circle")
                .attr("r", 1e-6)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
            
            nodeEnter.append("text")
                .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
                .attr("dy", ".35em")
                .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
                .text(function(d) { return d.name; })
                .style("fill-opacity", 1e-6);
            
            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
            
            nodeUpdate.select("circle")
                .attr("r", 4.5)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
            
            nodeUpdate.select("text")
                .style("fill-opacity", 1);
            
            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .remove();
            
            nodeExit.select("circle")
                .attr("r", 1e-6);
            
            nodeExit.select("text")
                .style("fill-opacity", 1e-6);
            
            // Update the links…
            var link = svg.selectAll("path.link")
                .data(links, function(d) { return d.target.id; });
            
            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                  var o = {x: source.x0, y: source.y0};
                  return diagonal({source: o, target: o});
                });
            
            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);
            
            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                  var o = {x: source.x, y: source.y};
                  return diagonal({source: o, target: o});
                })
                .remove();
            
            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }
        
        // Toggle children on click.
        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }
    }


    ////////////////////////////////////////////
    //////// Parallel Coordinates Chart ////////
    ////////////////////////////////////////////

    function buildD3SpiderChart(keys, distName, econ, edu, gov, health, infra, social, distAttr) {

        var attributes = distAttr;
        var replaceInArray = function(str){
            return str.replace(/\s+/g, "-")
        }

        var attrClean = attributes.map(replaceInArray);

        // Set up some variables and the field values you will use:
        var j,
            obj,
                a = econ[0],
                b = edu[1],
                c = infra[2],
                d = health[3],
                e = gov[4],
                f = social[5];
        
        // Loop through the array.
        for (i = 0; i < attrClean.length; i++) {
            // Create an object with a country field. 
            obj = { country: attrClean[i] };
            // Populate the other fields.
            obj[keys[0]] = econ[i];
            obj[keys[1]] = edu[i];
            obj[keys[2]] = infra[i];
            obj[keys[3]] = health[i];
            obj[keys[4]] = gov[i];
            obj[keys[5]] = social[i];
            
            // Set the array index to contain the object
            // (and if you need it then create a global object `objx`
            //  - not sure if you need it though.)
            chartArray[i] = window['obj'+i] = obj;
        };

        console.log(chartArray);
        
        var country = attrClean;
        var m = [80, 160, 200, 160],
            w = 1480 - m[1] - m[3],
            h = 500 - m[0] - m[2];
        
        var x = d3.scale.ordinal().domain(keys).rangePoints([0, w]),
            y = {};
        
        var line = d3.svg.line(),
            axis = d3.svg.axis().orient("left"),
            foreground;

        $("#"+chartCat+"-spider").empty();

        var svg = d3.select("#"+chartCat+"-spider").append("svg")
            .attr("width", w + m[1] + m[3])
            .attr("height", h + m[0] + m[2])
            .append("svg:g")
            .attr("transform", "translate(" + m[3] + ",5)");
        
        
            // Create a scale and brush for each trait.
            keys.forEach(function(d) {
                // Coerce values to numbers.
                chartArray.forEach(function(p) { p[d] = +p[d]; });

                y[d] = d3.scale.linear()
                    .domain(d3.extent(chartArray, function(p) { return p[d]; }))
                    .range([h, 0]);
          
                y[d].brush = d3.svg.brush()
                    .y(y[d])
                    .on("brush", brush);
            });

            // Add a legend.
            var legend = svg.selectAll("g.legend")
                .data(country)
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
                .data(chartArray)
                .enter().append("svg:path")
                .attr("d", path)
                .attr("class", function(d) { return d.country; });
          
            // Add a group element for each trait.
            var g = svg.selectAll(".trait")
                .data(keys)
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

        // Update the css for each country
        $("."+attrClean[0]).css('stroke', 'red');
        $("."+attrClean[1]).css('stroke', 'blue');
        $("."+attrClean[2]).css('stroke', 'green');
        $("."+attrClean[3]).css('stroke', 'orange');
        $("."+attrClean[4]).css('stroke', 'purple');
        $("."+attrClean[5]).css('stroke', 'black');
        $("."+attrClean[6]).css('stroke', 'gray');
        $("."+attrClean[7]).css('stroke', 'pink');
        $("."+attrClean[8]).css('stroke', 'teal');
        $("."+attrClean[9]).css('stroke', 'DarkBlue');
        $("."+attrClean[10]).css('stroke', 'DarkCyan');
        $("."+attrClean[11]).css('stroke', 'Crimson');
        $("."+attrClean[12]).css('stroke', 'Coral');
        $("."+attrClean[13]).css('stroke', 'DarkGoldenRod');
        $("."+attrClean[14]).css('stroke', 'MediumPurple');
        $("."+attrClean[15]).css('stroke', 'MediumSlateBlue');
        $("."+attrClean[16]).css('stroke', 'MediumSeaGreen');
        $("."+attrClean[17]).css('stroke', 'MidnightBlue');
        $("."+attrClean[18]).css('stroke', 'Maroon');

        // Returns the path for a given data point.
        
        function path(d) {
            return line(keys.map(function(p) { return [x(p), y[p](d[p])]; }));
        }

        // Handles a brush event, toggling the display of foreground lines.
        function brush() {
            var actives = keys.filter(function(p) { return !y[p].brush.empty(); }),
                extents = actives.map(function(p) { return y[p].brush.extent(); });
            foreground.classed("fade", function(d) {
                return !actives.every(function(p, i) {
                    return extents[i][0] <= d[p] && d[p] <= extents[i][1];
                });
            });
        }
    }

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
                //console.log(keys);


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
                //console.log(econWeight);
                console.log(econ);

                //var a = econ.map(function(x) x * 5);

                var a = econ.map(function(x) { return x * econWeight; });
                var b = edu.map(function(x) { return x * ((1 - econWeight) / 5)});
                var c = gov.map(function(x) { return x * ((1 - econWeight) / 5)});
                var d = health.map(function(x) { return x * ((1 - econWeight) / 5)});
                var f = infra.map(function(x) { return x * ((1 - econWeight) / 5)});
                var g = social.map(function(x) { return x * ((1 - econWeight) / 5)});

                console.log(b);
                console.log(a);
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
    
};



app.initialize(startApp);