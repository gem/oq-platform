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
//var startAttr = ["ecoeac006", "ecoeac012", "ecoeac027", "ecoeac033"];
//var startAttr = ["bar_population_density_people_per_km2", "bar_human_development_index", "bar_percent_urban_population", "bar_percent_of_population_that_is_an_international_migrant"];
var dataCat = "";
var chartCat = "";
var utfGrid = new Object;
var countriesArray = new Array('Turkmenistan', 'Uzbekistan', 'Kazakhstan', 'Mongolia');
var selectedValue1 = new Array(11.12, 16.591, 9.835, 14.0);
var selectedValue2 = new Array(33.209, 55.71, 49.38, 50.18);
var selectedValue3 = new Array(34.32, 72.306, 59.216, 64.189);
var selectedValue4 = new Array(0, 9.374, 4.413, 5.093);
var attrSelection = new Array();
var svirRankKeys = new Array();
var svirRankValues = new Array();
var svirRegionRankKeys = new Array();
var svirRegionRankValues = new Array();

var layerControl;
// Keep track of the layer names
var layers;

// Make a list of categorys
var categoryList = [];
var layersByCat = {};
var layerNames = {};

var baseMapUrl = (
    "http://{s}.tiles.mapbox.com/v3/unhcr.map-8bkai3wa/{z}/{x}/{y}.png"
);

var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

var startApp = function() {

    app.createMap();

    layers = {};

    layerControl = L.control.layers(app.baseLayers);

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

    // Chart variable selection dialog
    $("#chartOptions").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true
    });

    // Map options selection dialog
    $("#thematicMap").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true
    });

    $("#chart-options").button().click(function() {
        $("#chartOptions").dialog("open");
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



function myData() {
  var sin = [],
      cos = [];

  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    cos.push({x: i, y: .5 * Math.cos(i/10)});
  }

  return [
    {
      values: sin,
      key: 'Sine Wave',
      color: '#ff7f0e'
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c'
    }
  ];
}

function buildD3SpiderChart(chartCat, countryName, attrSelection, selectedValue1, selectedValue2, selectedValue3, selectedValue4, countriesArray) {
    var array = [];
    var obj1 = {};
    var obj2 = {};
    var array1Child = [];
    var obj1Child1 = {};
    var obj1Child2 = {};
    var obj1Child3 = {};
    var obj1Child4 = {};

    obj1Child1.x = 0; // this will be labled as countriesArray[0]
    obj1Child1.y = selectedValue1[0];

    obj1Child2.x = 1; // this will be labled as countriesArray[1]
    obj1Child2.y = selectedValue1[1];

    obj1Child3.x = 2; // this will be labled as countriesArray[2]
    obj1Child3.y = selectedValue1[2];

    obj1Child4.x = 3; // this will be labled as countriesArray[3]
    obj1Child4.y = selectedValue1[3];

    array1Child[0] = obj1Child1;
    array1Child[1] = obj1Child2;
    array1Child[2] = obj1Child3;
    array1Child[3] = obj1Child4;

    obj1.color = "fff";
    obj1.key = "Global Rank";
    obj1.values = array1Child;

    obj1.color = "000";
    obj1.key = "Regional Rank";
    obj1.values = array1Child;



    array[0] = obj1;
    array[1] = obj1; //*****change this back to obj2


    console.log(array);





    nv.addGraph(function() {
        var chart = nv.models.lineChart();
      
        chart.xAxis
            .axisLabel('Time (ms)')
            .tickFormat(d3.format(',r'));
      
        chart.yAxis
            .axisLabel('Voltage (v)')
            .tickFormat(d3.format('.02f'));
      
        d3.select('#chart svg')
            .datum(array)
            .transition().duration(500)
            .call(chart);
      
        nv.utils.windowResize(chart.update);
        console.log(myData());
      
        return chart;
    });
    
    function buildD3SpiderChart() {
    
    };
}
/*
    function buildD3SpiderChart(chartCat, countryName, attrSelection, selectedValue1, selectedValue2, selectedValue3, selectedValue4, countriesArray) {
        // TODO we need to build a html legend to go next to the chart
        // the legend will use the attrSelection variable
        ////////////////////////////////////////////
        /////////// Initiate Spider chart //////////
        ////////////////////////////////////////////
        d = [
        [
        {axis: countriesArray[0], value: selectedValue1[0]},
        {axis: countriesArray[1], value: selectedValue1[1]},
        {axis: countriesArray[2], value: selectedValue1[2]},
        {axis: countriesArray[3], value: selectedValue1[3]}
        ], [
        {axis: countriesArray[0], value: selectedValue2[0]},
        {axis: countriesArray[1], value: selectedValue2[1]},
        {axis: countriesArray[2], value: selectedValue2[2]},
        {axis: countriesArray[3], value: selectedValue2[3]}
        ], [
        {axis: countriesArray[0], value: selectedValue3[0]},
        {axis: countriesArray[1], value: selectedValue3[1]},
        {axis: countriesArray[2], value: selectedValue3[2]},
        {axis: countriesArray[3], value: selectedValue3[3]}
        ], [
        {axis: countriesArray[0], value: selectedValue4[0]},
        {axis: countriesArray[1], value: selectedValue4[1]},
        {axis: countriesArray[2], value: selectedValue4[2]},
        {axis: countriesArray[3], value: selectedValue4[3]}
        ]
        ];

        RadarChart.draw("#"+chartCat+"-spider", d);

        ////////////////////////////////////////////
        /////////// Initiate legend ////////////////
        ////////////////////////////////////////////
        var LegendOptions = [attrSelection[0], attrSelection[1], attrSelection[2], attrSelection[3]];
        var colorscale = d3.scale.category10();
        
        var svg = d3.select("#"+chartCat+"-spider")
            .selectAll('svg')
            .append('svg')
            .attr("width", 300)
            .attr("height", 300);
        
        //Create the title for the legend
        var text = svg.append("text")
            .attr("class", "title")
            .attr('transform', 'translate(50,0)') 
            .attr("x", 0)
            .attr("y", 15)
            .attr("font-size", "16px")
            .attr("fill", "#404040")
            .text("Chart Legend");
                
        //Initiate Legend   
        var legend = svg.append("g")
            .attr("class", "legend")
            .attr('transform', 'translate(50,20)')
            .style("font-size","12px");
        
        //Create colour squares
        legend.selectAll('rect')
            .data(LegendOptions)
            .enter()
            .append("rect")
            .attr("x", 15)
            .attr("y", function(d, i){ return i * 20;})
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function(d, i){ return colorscale(i);});
    
        //Create text next to squares
        legend.selectAll('text')
            .data(LegendOptions)
            .enter()
            .append("text")
            .attr("x", 30)
            .attr("y", function(d, i){ return i * 20 + 9;})
            .attr("font-size", "11px")
            .attr("fill", "#737373")
            .text(function(d) { return d; });
        
    }

*/
    ////////////////////////////////////////////
    /////// Horizontal Multi-Bar Chart /////////
    ////////////////////////////////////////////

    //get the data into json format
    function buildD3BarChart(chartCat, countryName, keys, values, data) {
        
    }

    /*

    d3.json('multiBarHorizontalData.json', function(data) {
        nv.addGraph(function() {
            var chart = nv.models.multiBarHorizontalChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .margin({top: 30, right: 20, bottom: 50, left: 175})
                .showValues(true)
                .tooltips(false)
                .showControls(false);
     
            chart.yAxis
                .tickFormat(d3.format(',.2f'));
     
            d3.select('#chart1 svg')
                .datum(data)
            .transition().duration(500)
                .call(chart);
     
            nv.utils.windowResize(chart.update);
     
            return chart;
        });
    });
 */
    ////////////////////////////////////////////
    ////////////Rank bar chart /////////////////
    ////////////////////////////////////////////
/*

    function buildD3BarChart(chartCat, countryName, keys, values) {

        var data = d3.range(m).map(function() { return d3.range(n).map(Math.random); });
     
        // make an array from all the _r_ bits of data from keys/values (world rank)
        for (var i = 0; i < keys.length; i++) {
            var bar = /_r_/;

            if (bar.test(keys[i])) {
                svirRankKeys.push(keys[i]);
                svirRankValues.push(values[i]);            
            }
        };

        // make an array from all the _rr_ bits of data from keys/values (regional rank)
        for (var i = 0; i < keys.length; i++) {
            var bar = /_rr_/;

            if (bar.test(keys[i])) {
                svirRegionRankKeys.push(keys[i]);
                svirRegionRankValues.push(values[i]*10);          
            }
        };

        var svirBarArray = [svirRankValues.map(Number), svirRegionRankValues.map(Number)];
        var n = svirBarArray[0].length, // number of samples
        
        m = 2; // number of series regional and global

        var margin = {top: 20, right: 30, bottom: 30, left: 40},
            width = 560 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
         
        var y = d3.scale.linear()
            .domain([0, 200])
            .range([height, 0]);
         
        var x0 = d3.scale.ordinal()
            .domain(d3.range(n))
            .rangeBands([0, width], .2);
         
        var x1 = d3.scale.ordinal()
            .domain(d3.range(m))
            .rangeBands([0, x0.rangeBand()]);
         
        var z = d3.scale.category10();
         
        var xAxis = d3.svg.axis()
            .scale(x0)
            .orient("bottom");
         
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
         
        var svg = d3.select("#"+chartCat+"-bar").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("svg:g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
         
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
         
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
         
        svg.append("g").selectAll("g")
            .data(svirBarArray)
            .enter().append("g")
            .style("fill", function(d, i) { return z(i); })
            .attr("transform", function(d, i) { return "translate(" + x1(i) + ",0)"; })
            .selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("width", x1.rangeBand())
            .attr("height", y)
            .attr("x", function(d, i) { return x0(i); })
            .attr("y", function(d) { return height - y(d); });
 
    }
*/
    // Change the utfgrid layer when the tabs are clicked
    $("#econ").click(function(){
        startAttr = ["bar_r_gdp_per_capita", "bar_r_percent_female_labor_force_participation", "bar_r_percent_of_gdp_agriculture", "bar_r_percent_of_gdp_exports_of_goods_and_services"];
        attrSelection = ["bar_r_gdp_per_capita", "bar_r_percent_female_labor_force_participation", "bar_r_percent_of_gdp_agriculture", "bar_r_percent_of_gdp_exports_of_goods_and_services"];
        dataCat = "econ-table";
        chartCat = "econ-chart";
        map.removeLayer(utfGrid);
        utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/svir_standized_econ/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
        map.addLayer(utfGrid);
        utfGridClickEvent(dataCat, chartCat);
        $("#chartOptions").empty();
        $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
        $("#empty").remove();
    });

    $("#pop").click(function(){
        startAttr = ["bar_human_development_index", "bar_population_density_people_per_km2", "bar_percent_of_population_that_is_an_international_migrant"];
        attrSelection = ["bar_human_development_index", "bar_population_density_people_per_km2", "bar_percent_of_population_that_is_an_international_migrant"];
        dataCat = "pop-table";
        chartCat = "pop-chart";
        map.removeLayer(utfGrid);
        utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/svir_standized_pop/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
        map.addLayer(utfGrid);
        utfGridClickEvent(dataCat, chartCat);
        $("#chartOptions").empty();
        $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
        $("#empty").remove();
    });

    $("#health").click(function(){
        startAttr = ["bar_birth_rate", "bar_fertility_rate", "bar_infant_mortality_rate", "bar_life_expectancy"];
        attrSelection = ["bar_birth_rate", "bar_fertility_rate", "bar_infant_mortality_rate", "bar_life_expectancy"];
        dataCat = "health-table";
        chartCat = "health-chart";
        map.removeLayer(utfGrid);
        utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/svir_standized_health/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
        map.addLayer(utfGrid);
        utfGridClickEvent(dataCat, chartCat);
        $("#chartOptions").empty();
        $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
        $("#empty").remove();
    });

    $("#infra").click(function(){
        startAttr = ["bar_road_density_per_km2", "bar_motor_vehicles_per_1000_population", "bar_percent_of_population_with_improved_sanitation_facilities_access", "bar_percent_of_population_with_improved_water_source_access"];
        attrSelection = ["bar_road_density_per_km2", "bar_motor_vehicles_per_1000_population", "bar_percent_of_population_with_improved_sanitation_facilities_access", "bar_percent_of_population_with_improved_water_source_access"];
        dataCat = "infra-table";
        chartCat = "infra-chart";
        map.removeLayer(utfGrid);
        utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/svir_standized_infra/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
        map.addLayer(utfGrid);
        utfGridClickEvent(dataCat, chartCat);
        $("#chartOptions").empty();
        $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
        $("#empty").remove();
    });

    $("#gov").click(function(){
        startAttr = ["bar_intentional_homicides_per_100000_people", "bar_asylum_seekers_pending_cases_from_country_of_origin", "bar_corruption_index", "bar_percent_of_population_that_voted_in_last_parliamentary_election"];
        attrSelection = ["bar_intentional_homicides_per_100000_people", "bar_asylum_seekers_pending_cases_from_country_of_origin", "bar_corruption_index", "bar_percent_of_population_that_voted_in_last_parliamentary_election"];
        dataCat = "gov-table";
        chartCat = "gov-chart";
        map.removeLayer(utfGrid);
        utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/svir_standized_gov/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
        map.addLayer(utfGrid);
        utfGridClickEvent(dataCat, chartCat);
        $("#chartOptions").empty();
        $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
        $("#empty").remove();
    });

    $("#edu").click(function(){
        startAttr = ["bar_percent_of_population_that_is_literate", "bar_gross_enrollment_ratio_primary_education", "bar_mean_years_of_schooling", "bar_pupil_to_teacher_ratio"];
        attrSelection = ["bar_percent_of_population_that_is_literate", "bar_gross_enrollment_ratio_primary_education", "bar_mean_years_of_schooling", "bar_pupil_to_teacher_ratio"];
        dataCat = "edu-table";
        chartCat = "edu-chart";
        map.removeLayer(utfGrid);
        utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/svir_standized_edu/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
        map.addLayer(utfGrid);
        utfGridClickEvent(dataCat, chartCat);
        $("#chartOptions").empty();
        $("#chartOptions").append('<p>whoops, first interact with the map to load some data, then you can set the chart options</p>');
        $("#empty").remove();
    });

    var utfGridClickEvent = function(dataCat, chartCat) {
        utfGrid.on('click', function (e) {
            $("#chartOptions").empty();
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

            var dataFoo = e.data;
            console.log(dataFoo);
            var bar = JSON.stringify(dataFoo);
            console.log(bar);
    
            if (e.data) {
                // Populate a drop down list so the user can select attributes to be used in the spider chart
                var values = [];
                for (var d in e.data) {
                    values.push(e.data[d]);
                }
                var keys = Object.keys(e.data);
                for (var i in values) {
                    var value = values[i];
                    var chartDropDown = '<input class="attributeOption" type="checkbox" name="'+keys[i]+'" value="'+value[i]+'">'+keys[i]+'<br>';
                    $('#chartOptions').append(chartDropDown);
                }
    
                $('#chartOptions').append('<input id="chartOptionsButton" type="button" value="Apply"/>');
                
                $("#chartOptionsButton").click(function(){
                    $('#chartOptions').dialog('close');
                    // Grab the check box values to be used in the chart
                    attrSelection = $('#chartOptions input[class="attributeOption"]:checked')
                        .map(function(){
                            return this.name;
                        });
                        if (attrSelection > 4) {
                            attrSelection.pop();
                        } 
                });
                console.log(e.data[attrSelection[0]]);
                
                if (attrSelection.length == 0) {
                    attrSelection = startAttr;
                }

                selectedValue1.unshift(parseFloat(e.data[attrSelection[0]]));
                if (selectedValue1.length > 4) {
                    selectedValue1.pop();
                }
                
                selectedValue2.unshift(parseFloat(e.data[attrSelection[1]]));
                if (selectedValue2.length > 4) {
                    selectedValue2.pop();
                }
    
                selectedValue3.unshift(parseFloat(e.data[attrSelection[2]]));
                if (selectedValue3.length > 4) {
                    selectedValue3.pop();
                }
    
                selectedValue4.unshift(parseFloat(e.data[attrSelection[3]]));
                if (selectedValue4.length > 4) {
                    selectedValue4.pop();
                }
                
                var countryName = e.data.bar_country;
                // Indicate the country name for the table header
                $(".table-header").replaceWith('<div class="table-header" style="background-color: #dadcff;"><p>The table represents indicators for '+countryName+'</p>');
    
                countriesArray.unshift(countryName);
    
                if (countriesArray.length > 4) {
                    countriesArray.pop();
                }
                buildD3SpiderChart(chartCat, countryName, attrSelection, selectedValue1, selectedValue2, selectedValue3, selectedValue4, countriesArray);
                
                buildD3BarChart(chartCat, countryName, keys, values);

                //buildD3BarChart(countryName, keys, values);
            } else {
                document.getElementById('click').innerHTML = 'click: nothing';
            }
    
        });
    }

    //utfGridClickEvent();

    //map.addLayer(utfGrid); 

};

app.initialize(startApp);