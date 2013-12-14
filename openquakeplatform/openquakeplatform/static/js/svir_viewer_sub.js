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
            if (cat != undefined) {
                categoryList.push(cat);
                layerNames[name] = [];
                layersByCat[cat] = [];
            }
        }

        // Create the category list (population the object)
        for (var i=0; i < json.length; i++) {
            var name = json[i].mapped_value;
            var cat = json[i].category;

            if (cat != undefined) {
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
            var e = document.getElementById("layer-list");
            var layerId = e.options[e.selectedIndex].value;

            // Look up the layer id using the layer name
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
        $('#removeTileLayer').click(function() {
    
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
    //////// Parallel Coordinates Chart ////////
    ////////////////////////////////////////////

    function buildD3SpiderChart(keys, chartCat, distName, econ, edu, gov, health, infra, social, distAttr, municipo) {
console.log(keys);
/*
        var number = 19;

        for (var i = 0; i < distAttr.length; i++) 
        {
            var arr = [];
        
            for (var j = 0; j < distAttr.length; j++) {
                arr[municipo[j]] = econ[j];
            };
        
            chartArray[i] = arr;
        }
*/
        

/*
        for (var i = 0; i < distAttr.length; i++) {
            //chartArray["obj"+i] = {};
            //eval('var obj'+i+' = {};');
            window['obj'+i ] = {};
        };
        var number = distName.length;

        for (var j = 0; i < distName.length; j++) {
            //"obj"+i+.foo = "foo";
            //console.log([obj+i]);
            //window['obj'+i ][municipo[j]] = econ[i];
            //console.log(municipo[number]);
        };
        */
/*
        // Set up some variables and the field values you will use:
        var j,
            obj,
                ec = municipo[0],
                ed = municipo[1],
                go = municipo[2],
                he = municipo[3],
                inf = municipo[4],
                so = municipo[5];
        
        // Loop through the array.
        for (i = 0; i < keys.length; i++) {
            console.log(econ[i]);
            // Create an object with a country field. 
            obj = { country: keys[i] };
            // Populate the other fields.
            obj[municipo[0]] = econ[i];
            obj[municipo[1]] = econ[i+1];
            obj[municipo[2]] = econ[i+2];
            obj[municipo[3]] = econ[i+3];
            obj[municipo[4]] = econ[i+4];
            obj[municipo[5]] = econ[i+5];
            
            // Set the array index to contain the object
            // (and if you need it then create a global object `objx`
            //  - not sure if you need it though.)
            chartArray[i] = window['obj'+i] = obj;
        };
        console.log(obj1);
*/
        var attributes = distAttr;
        //var attributes = ["Armamar", "CarregaldoSal", "CastroDaire", "Cinfães", "Lamego", "Mangualde"];
        //var attributes = ["Armamar", " Carregal do Sal", " Castro Daire", " Cinfães", " Lamego", " Mangualde", " Moimenta da Beira", " Mortágua", " Nelas", " Oliveira de Frades", " Penalva do Castelo", " Penedono", " Resende", " Santa Comba Dão", " Sernancelhe", " Sátão", " São João da Pesqueira", " São Pedro do Sul", " Tabua", "foo", "bar", "foo", "foo", "foo"]

        var replaceInArray = function(str){
            return str.replace(/\s+/g, "")
        }
        
        var attrClean = attributes.map(replaceInArray);

        obj0.country = attrClean[0];
        obj0[attrClean[0]] = econ[0];
        obj0[attrClean[1]] = econ[1];
        obj0[attrClean[2]] = econ[2];
        obj0[attrClean[3]] = econ[3];
        obj0[attrClean[4]] = econ[4];
        obj0[attrClean[5]] = econ[5];
        obj0[attrClean[5]] = econ[6];
        obj0[attrClean[5]] = econ[7];
        obj0[attrClean[5]] = econ[8];
        obj0[attrClean[5]] = econ[9];
        obj0[attrClean[5]] = econ[10];
        obj0[attrClean[5]] = econ[11];
        obj0[attrClean[5]] = econ[12];
        obj0[attrClean[5]] = econ[13];
        obj0[attrClean[5]] = econ[14];
        obj0[attrClean[5]] = econ[15];
        obj0[attrClean[5]] = econ[16];
        obj0[attrClean[5]] = econ[17];
        obj0[attrClean[5]] = econ[18];

        obj1.country = attrClean[1];
        obj1[attrClean[0]] = edu[0];
        obj1[attrClean[1]] = edu[1];
        obj1[attrClean[2]] = edu[2];
        obj1[attrClean[3]] = edu[3];
        obj1[attrClean[4]] = edu[4];
        obj1[attrClean[5]] = edu[5];
        obj1[attrClean[6]] = edu[6];
        obj1[attrClean[7]] = edu[7];
        obj1[attrClean[8]] = edu[8];
        obj1[attrClean[9]] = edu[9];
        obj1[attrClean[10]] = edu[10];
        obj1[attrClean[11]] = edu[11];
        obj1[attrClean[12]] = edu[12];
        obj1[attrClean[13]] = edu[13];
        obj1[attrClean[14]] = edu[14];
        obj1[attrClean[15]] = edu[15];
        obj1[attrClean[16]] = edu[16];
        obj1[attrClean[17]] = edu[17];
        obj1[attrClean[18]] = edu[18];

        obj2.country = attrClean[2];
        obj2[attrClean[0]] = gov[0];
        obj2[attrClean[1]] = gov[1];
        obj2[attrClean[2]] = gov[2];
        obj2[attrClean[3]] = gov[3];
        obj2[attrClean[4]] = gov[4];
        obj2[attrClean[5]] = gov[5];
        obj2[attrClean[6]] = gov[6];
        obj2[attrClean[7]] = gov[7];
        obj2[attrClean[8]] = gov[8];
        obj2[attrClean[9]] = gov[9];
        obj2[attrClean[10]] = gov[10];
        obj2[attrClean[11]] = gov[11];
        obj2[attrClean[12]] = gov[12];
        obj2[attrClean[13]] = gov[13];
        obj2[attrClean[14]] = gov[14];
        obj2[attrClean[15]] = gov[15];
        obj2[attrClean[16]] = gov[16];
        obj2[attrClean[17]] = gov[17];
        obj2[attrClean[18]] = gov[18];

        obj3.country = attrClean[3];
        obj3[attrClean[0]] = health[0];
        obj3[attrClean[1]] = health[1];
        obj3[attrClean[2]] = health[2];
        obj3[attrClean[3]] = health[3];
        obj3[attrClean[4]] = health[4];
        obj3[attrClean[5]] = health[5];
        obj3[attrClean[6]] = health[6];
        obj3[attrClean[7]] = health[7];
        obj3[attrClean[8]] = health[8];
        obj3[attrClean[9]] = health[9];
        obj3[attrClean[10]] = health[10];
        obj3[attrClean[11]] = health[11];
        obj3[attrClean[12]] = health[12];
        obj3[attrClean[13]] = health[13];
        obj3[attrClean[14]] = health[14];
        obj3[attrClean[15]] = health[15];
        obj3[attrClean[16]] = health[16];
        obj3[attrClean[17]] = health[17];
        obj3[attrClean[18]] = health[18];

        obj4.country = attrClean[4];
        obj4[attrClean[0]] = infra[0];
        obj4[attrClean[1]] = infra[1];
        obj4[attrClean[2]] = infra[2];
        obj4[attrClean[3]] = infra[3];
        obj4[attrClean[4]] = infra[4];
        obj4[attrClean[5]] = infra[5];
        obj4[attrClean[6]] = infra[6];
        obj4[attrClean[7]] = infra[7];
        obj4[attrClean[8]] = infra[8];
        obj4[attrClean[9]] = infra[9];
        obj4[attrClean[10]] = infra[10];
        obj4[attrClean[11]] = infra[11];
        obj4[attrClean[12]] = infra[12];
        obj4[attrClean[13]] = infra[13];
        obj4[attrClean[14]] = infra[14];
        obj4[attrClean[15]] = infra[15];
        obj4[attrClean[16]] = infra[16];
        obj4[attrClean[17]] = infra[17];
        obj4[attrClean[18]] = infra[18];

        obj5.country = attrClean[5];
        obj5[attrClean[0]] = social[0];
        obj5[attrClean[1]] = social[1];
        obj5[attrClean[2]] = social[2];
        obj5[attrClean[3]] = social[3];
        obj5[attrClean[4]] = social[4];
        obj5[attrClean[5]] = social[5];
        obj5[attrClean[6]] = social[6];
        obj5[attrClean[7]] = social[7];
        obj5[attrClean[8]] = social[8];
        obj5[attrClean[9]] = social[9];
        obj5[attrClean[10]] = social[10];
        obj5[attrClean[11]] = social[11];
        obj5[attrClean[12]] = social[12];
        obj5[attrClean[13]] = social[13];
        obj5[attrClean[14]] = social[14];
        obj5[attrClean[15]] = social[15];
        obj5[attrClean[16]] = social[16];
        obj5[attrClean[17]] = social[17];
        obj5[attrClean[18]] = social[18];

        chartArray[0] = obj0;
        chartArray[1] = obj1;
        chartArray[2] = obj2;
        chartArray[3] = obj3;
        chartArray[4] = obj4;
        chartArray[5] = obj5;
        
        console.log(chartArray);
        
        var country = keys;
        var m = [80, 160, 200, 160],
            w = 1480 - m[1] - m[3],
            h = 500 - m[0] - m[2];
        
        var x = d3.scale.ordinal().domain(attrClean).rangePoints([0, w]),
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
            attrClean.forEach(function(d) {
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
                .data(attrClean)
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
                i = attrClean.indexOf(d);
            }
          
            function drag(d) {
                x.range()[i] = d3.event.x;
                attrClean.sort(function(a, b) { return x(a) - x(b); });
                g.attr("transform", function(d) { return "translate(" + x(d) + ")"; });
                foreground.attr("d", path);
            }
          
            function dragend(d) {
                x.domain(attrClean).rangePoints([0, w]);
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

        // Returns the path for a given data point.
        
        function path(d) {
            return line(attrClean.map(function(p) { return [x(p), y[p](d[p])]; }));
        }

        // Handles a brush event, toggling the display of foreground lines.
        function brush() {
            var actives = attrClean.filter(function(p) { return !y[p].brush.empty(); }),
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
    var portugal = L.tileLayer('http://tilestream.openquake.org/v2/svir-portugal/{z}/{x}/{y}.png');
    layerControl.addOverlay(portugal, "svir-portugal");
    map.addLayer(portugal);

    var utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/svir-portugal/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
    map.addLayer(utfGrid);

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

            console.log(e.data);
    
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
                var m = e.data.municipo;
                var municipo = m.split(",");

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
                /*
                var edu = ed.split(",");
                var gov = g.split(",");
                var health = h.split(",");
                var infra = i.split(",");
                var social = s.split(",");
*/


                var keys = Object.keys(e.data);
                keys.shift();
                keys.splice(5, 2);

                var distAttrString = e.data.municipo;
                var distAttr = distAttrString.split(",");

                // TODO: use a 2d array instead of several selectedValue<x> arrays
                buildD3SpiderChart(keys, chartCat, distName, econ, edu, gov, health, infra, social, distAttr, municipo);
                
            } else {
                document.getElementById('click').innerHTML = 'click: nothing';
            }
        }); // End utfGrid click
    } // End utfGridClickEvent
    
};



app.initialize(startApp);