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
var utfGrid = {};
var styleLayer = {};
var utfGridGroup = {};
var countriesArray = new Array('Turkmenistan', 'Uzbekistan', 'Kazakhstan', 'Mongolia', 'foo', 'bar');
var selectedValue1 = new Array(11.12, 16.591, 9.835, 14.0, 1, 1);
var selectedValue2 = new Array(33.209, 55.71, 49.38, 50.18, 1, 1);
var selectedValue3 = new Array(34.32, 72.306, 59.216, 64.189, 1, 1);
var selectedValue4 = new Array(1, 9.374, 4.413, 5.093, 1, 1); //TODO fix these demo numbers
var selectedValue5 = new Array(1, 9.374, 4.413, 5.093, 1, 1);
var selectedValue6 = new Array(1, 9.374, 4.413, 5.093, 1, 1);
var attrSelection = [];
var svirRankKeys = [];
var svirRankValues = [];
var svirRegionRankKeys = [];
var svirRegionRankValues = [];
var layerControl = "";

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
var chart;
var baseMapUrl = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png');
var app = new OQLeaflet.OQLeafletApp(baseMapUrl);
var TILESTREAM_API_URL = TS_URL + '/api/v1/Tileset/';

var startApp = function() {

    $('#map').height("300px");

    map = new L.Map('map', {
        attributionControl: false,
        maxBounds: new L.LatLngBounds(new L.LatLng(-90, -180), new L.LatLng(90, 180)),
    });
    map.setView(new L.LatLng(10, -10), 2).addLayer(baseMapUrl);

    layers = {};
    layerControl = L.control.layers(app.baseLayers);
    map.addControl(layerControl.setPosition("topleft"));

    // Duplicate layer warnning message
    function showDuplicateMsg() {
        $("#worning-duplicate").dialog("open");
    }

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
    }

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

    $.getJSON(TS_URL + '/api/v1/Tileset',
    function(json) {
        // Create the category list (build the object)
        for (var i=0; i < json.length; i++) {
            var name = json[i].mapped_value;
            var cat = json[i].category;
            var type = json[i].type;
            if (cat != undefined && type == "svir") {
                categoryList.push(cat);
                layerNames[name] = [];
                layersByCat[cat] = [];
            }
        }

        // Create the category list (population the object)
        for (var j=0; j < json.length; j++) {
            var name = json[j].mapped_value;
            var cat = json[j].category;
            var type = json[j].type;
            if (cat != undefined && type == "svir") {
                layerId = json[j].id;
                layerTitle = json[j].mapped_value;
                layerNames[name].push(layerId);
                layersByCat[cat].push(layerTitle);
            }
        }

        // Get unique category names
        var categoryUnique = categoryList.filter(function(itm,i,categoryList){
            return i==categoryList.indexOf(itm);
        });

        for (var k in categoryUnique) {
            // Append category names to dropdown list
            var categoryTitle = categoryUnique[k];
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
                var tileLayer = L.tileLayer(TS_URL + '/v2/' +
                    selectedLayer +
                    '/{z}/{x}/{y}.png',{wax: TS_URL + '/v2/' +
                    selectedLayer +
                    '.json'});
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
                map.removeLayer(layers[selectedLayer]);
                delete layers[selectedLayer];
            }
            else {
                showRemoveMsg();
            }
        });
    });

    var winH = $(window).height();

    // Chart variable selection dialogs
    $("#econ-chart-options").dialog({
        autoOpen: false,
        height: winH / 1.5,
        width: 500,
        modal: true
    });

    $("#pop-chart-options").dialog({
        autoOpen: false,
        height: winH / 1.5,
        width: 500,
        modal: true
    });

    $("#infra-chart-options").dialog({
        autoOpen: false,
        height: winH / 1.5,
        width: 500,
        modal: true
    });

    $("#gov-chart-options").dialog({
        autoOpen: false,
        height: winH / 1.5,
        width: 500,
        //modal: true
    });

    $("#edu-chart-options").dialog({
        autoOpen: false,
        height: winH / 1.5,
        width: 500,
        modal: true
    });

    // Map options selection dialog
    $("#thematicMap").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true
    });

    $("#econChartOptions").button().click(function() {
        $("#econ-chart-options").dialog("open");
    });

    $("#popChartOptions").button().click(function() {
        $("#pop-chart-options").dialog("open");
    });

    $("#infraChartOptions").button().click(function() {
        $("#infra-chart-options").dialog("open");
    });

    $("#govChartOptions").button().click(function() {
        $("#gov-chart-options").dialog("open");
    });

    $("#eduChartOptions").button().click(function() {
        $("#edu-chart-options").dialog("open");
    });

    $("#thematic-map").button().click(function() {
        $("#thematicMap").dialog("open");
    });

    $(function() {
        $( "#categoryTabs" ).tabs({
            collapsible: true,
            active: 0
        });
    });

    // Set up the data tables
    $(document).ready(function() {
        $('#econ-table').dataTable({
            "aaSorting": [ [0,'asc'], [1,'asc'] ],
            "sPaginationType": "full_numbers"
        });
        // select first tab by default
        $( "#econ" ).trigger( "click" );
    });

    $(document).ready(function() {
        $('#pop-table').dataTable({
            "aaSorting": [ [0,'asc'], [1,'asc'] ],
            "sPaginationType": "full_numbers"
        });
    });

    $(document).ready(function() {
        $('#gov-table').dataTable({
            "aaSorting": [ [0,'asc'], [1,'asc'] ],
            "sPaginationType": "full_numbers"
        });
    });

    $(document).ready(function() {
        $('#edu-table').dataTable({
            "aaSorting": [ [0,'asc'], [1,'asc'] ],
            "sPaginationType": "full_numbers"
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
    }


    ////////////////////////////////////////////
    //////// Parallel Coordinates Chart ////////
    ////////////////////////////////////////////

    function buildD3Chart(chartCat, countryName, attrSelection, selectedValue1, selectedValue2, selectedValue3, selectedValue4, selectedValue5, selectedValue6, countriesArray) {
        chartArray = [];
        var numberOfCountries = $("#chart-var-numb option:selected").val();
        obj0.country = countriesArray[0];
        obj0[attrSelection[0]] = selectedValue1[0];
        obj0[attrSelection[1]] = selectedValue2[0];
        obj0[attrSelection[2]] = selectedValue3[0];
        obj0[attrSelection[3]] = selectedValue4[0];
        obj0[attrSelection[4]] = selectedValue5[0];
        obj0[attrSelection[5]] = selectedValue6[0];

        obj1.country = countriesArray[1];
        obj1[attrSelection[0]] = selectedValue1[1];
        obj1[attrSelection[1]] = selectedValue2[1];
        obj1[attrSelection[2]] = selectedValue3[1];
        obj1[attrSelection[3]] = selectedValue4[1];
        obj1[attrSelection[4]] = selectedValue5[1];
        obj1[attrSelection[5]] = selectedValue6[1];

        obj2.country = countriesArray[2];
        obj2[attrSelection[0]] = selectedValue1[2];
        obj2[attrSelection[1]] = selectedValue2[2];
        obj2[attrSelection[2]] = selectedValue3[2];
        obj2[attrSelection[3]] = selectedValue4[2];
        obj2[attrSelection[4]] = selectedValue5[2];
        obj2[attrSelection[5]] = selectedValue6[2];

        obj3.country = countriesArray[3];
        obj3[attrSelection[0]] = selectedValue1[3];
        obj3[attrSelection[1]] = selectedValue2[3];
        obj3[attrSelection[2]] = selectedValue3[3];
        obj3[attrSelection[3]] = selectedValue4[3];
        obj3[attrSelection[4]] = selectedValue5[3];
        obj3[attrSelection[5]] = selectedValue6[3];

        obj4.country = countriesArray[4];
        obj4[attrSelection[0]] = selectedValue1[4];
        obj4[attrSelection[1]] = selectedValue2[4];
        obj4[attrSelection[2]] = selectedValue3[4];
        obj4[attrSelection[3]] = selectedValue4[4];
        obj4[attrSelection[4]] = selectedValue5[4];
        obj4[attrSelection[5]] = selectedValue6[4];

        obj5.country = countriesArray[5];
        obj5[attrSelection[0]] = selectedValue1[5];
        obj5[attrSelection[1]] = selectedValue2[5];
        obj5[attrSelection[2]] = selectedValue3[5];
        obj5[attrSelection[3]] = selectedValue4[5];
        obj5[attrSelection[4]] = selectedValue5[5];
        obj5[attrSelection[5]] = selectedValue6[5];

        for (var i=0; i<numberOfCountries; i++) {
            chartArray[i] = window["obj" + i];
        }

        var country = [countriesArray[0], countriesArray[1], countriesArray[2], countriesArray[3], countriesArray[4], countriesArray[5]];
        var rawAttributes = [attrSelection[0], attrSelection[1], attrSelection[2], attrSelection[3], attrSelection[4], attrSelection[5]];

        // clean the rawAttributes array
        function cleanArraay(element) {
            return element != undefined;
        }
        var attributes = rawAttributes.filter(cleanArraay);

        for (var i=0; i<numberOfCountries; i++) {
            country.splice(numberOfCountries,10);
        }

        var winH = ($(window).height() / 2);
        var winW = ($(window).width());

        var margin = {top: 80, right: 80, bottom: 100, left: 180},
            width = winW - margin.left - margin.right,
            height = winH - margin.top - margin.bottom;

        var x = d3.scale.ordinal().domain(attributes).rangePoints([0, width]),
            y = {};

        var line = d3.svg.line(),
            axis = d3.svg.axis().orient("left"),
            foreground;

        $("#"+chartCat+"-pcc").empty();
        $("#"+chartCat+"-pcc").attr("height", winH);

        var svg = d3.select("#"+chartCat+"-pcc").append("svg")
            .attr("viewBox", "-180 -40 " + winW +" " + winH)
            .append("g");

        // Create a scale and brush for each trait.
        attributes.forEach(function(d) {
            // Coerce values to numbers.
            chartArray.forEach(function(p) { p[d] = +p[d]; });
            y[d] = d3.scale.linear()
                .domain(d3.extent(chartArray, function(p) { return p[d]; }))
                .range([height, 0]);
            y[d].brush = d3.svg.brush()
                .y(y[d])
                .on("brush", brush);
        });


        // Add a legend.
        var legend = svg.selectAll("g.legend")
            .data(country)
            .enter().append("svg:g")
            .attr("class", "legend");
        legend.append("svg:line")
        // ** left off here
            .attr("class", String)
            .attr("x2", 20)
            .attr("y2", 0)
            .attr("transform", function(d, i) { return "translate(-170," + (i * 20 + 20) + ")"; });
        legend.append("svg:text")
            .attr("x", -180)
            .attr("y", -565)
            .attr("dy", ".31em")
            .text(function(d) { return d; })
            .attr("transform", function(d, i) { return "translate(35," + (i * 20 + 584) + ")"; });
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
            .data(attributes)
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
            .each(function(d) {
                d3.select(this).call(axis.scale(y[d]));
            })
            .append("svg:text")
            .attr("id", "attrLable")
            .attr("text-anchor", "left")
            .attr("y", -10)
            .attr("x", 0)
            .attr("transform", "rotate(90)")
            .text(String);

        // Add a brush for each axis.
        g.append("svg:g")
            .attr("class", "brush")
            .each(function(d) { d3.select(this).call(y[d].brush); })
            .selectAll("rect")
            .attr("x", -8)
            .attr("width", 16);
        function dragstart(d) {
            i = attributes.indexOf(d);
        }
        function drag(d) {
            x.range()[i] = d3.event.x;
            attributes.sort(function(a, b) { return x(a) - x(b); });
            g.attr("transform", function(d) { return "translate(" + x(d) + ")"; });
            foreground.attr("d", path);
        }
        function dragend(d) {
            x.domain(attributes).rangePoints([0, w]);
            var t = d3.transition().duration(500);
            t.selectAll(".trait").attr("transform", function(d) { return "translate(" + x(d) + ")"; });
            t.selectAll(".foreground path").attr("d", path);
        }
        // Update the css for each country
        $("."+countriesArray[0]).css('stroke', 'red');
        $("."+countriesArray[1]).css('stroke', 'blue');
        $("."+countriesArray[2]).css('stroke', 'green');
        $("."+countriesArray[3]).css('stroke', 'orange');
        $("."+countriesArray[4]).css('stroke', 'purple');
        $("."+countriesArray[5]).css('stroke', 'black');
        // Returns the path for a given data point.
        function path(d) {
            return line(attributes.map(function(p) { return [x(p), y[p](d[p])]; }));
        }
        // Handles a brush event, toggling the display of foreground lines.
        function brush() {
            var actives = attributes.filter(function(p) { return !y[p].brush.empty(); }),
                extents = actives.map(function(p) { return y[p].brush.extent(); });
            foreground.classed("fade", function(d) {
                return !actives.every(function(p, i) {
                    return extents[i][0] <= d[p] && d[p] <= extents[i][1];
                });
            });
        }
    }


    // Change the utfGrid layer when the tabs are clicked
    $("#econ").click(function() {
        $('#econ-chart-options').empty();
        dataCat = "econ-table";
        chartCat = "econ-chart";

        try {
            map.removeLayer(styleLayer);
            map.removeLayer(utfGrid);
        } catch (e) {
            // continue
        }
        // Empty the layer controller
        layerControl._layers = {};

        styleLayer = new L.tileLayer(TS_URL + '/v2/svir_standized_econ_style/{z}/{x}/{y}.png');
        utfGrid = new L.UtfGrid(TS_URL + '/v2/svir_standized_econ/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
        var utfGridGroup = L.layerGroup([
            styleLayer,
            utfGrid
        ]);
        map.addLayer(utfGridGroup);
        layerControl.addOverlay(utfGridGroup, " SVIR Standardized Economic Indicators");

        // Populate a drop down list so the user can select attributes to be used in the pcc chart
        var econIndicators;
        var econIndicatorsArray = [];
        $.getJSON(TILESTREAM_API_URL, function(json) {
            for (var i = 0; i < json.length; i++) {
                if (json[i].category == 'economy') {
                    econIndicators = json[i].indicators;
                }
            }

        econIndicatorsArray = econIndicators.split(',');

        }).done(function() {
            for (var i = 0; i < econIndicatorsArray.length; i++) {
                var chartDropDown = '<input class="attributeOption econ-chart" type="checkbox" name="'+econIndicatorsArray[i]+'" value="'+econIndicatorsArray[i]+'">'+econIndicatorsArray[i]+'<br>';
                $('#econ-chart-options').append(chartDropDown);
            }
            $('.econ-chart:lt(5)').prop('checked', true);
            $('#econ-chart-options').append('<input id="econ-chart-optionsButton" type="button" value="Apply"/>');
            $('#econ-chart-optionsButton').click(function() {
                $('#econ-chart-options').dialog('close');
            });

            // don't allow more than 6 check boxes to be selected
            $(function() {
                var max = 6;
                var checkboxes = $('#'+chartCat+'-options input[type="checkbox"]');
                checkboxes.change(function() {
                    var current = checkboxes.filter(':checked').length;
                    checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
                });
            });
        });

        utfGridClickEvent(dataCat, chartCat);
    });

    $("#pop").click(function() {
        $('#pop-chart-options').empty();
        dataCat = "pop-table";
        chartCat = "pop-chart";
        try {
            map.removeLayer(styleLayer);
            map.removeLayer(utfGrid);
        } catch (e) {
            // continue
        }
        // Empty the layer controller
        layerControl._layers = {};

        styleLayer = new L.tileLayer(TS_URL + '/v2/svir_standized_pop/{z}/{x}/{y}.png');
        utfGrid = new L.UtfGrid(TS_URL + '/v2/svir_standized_pop/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
        var utfGridGroup = L.layerGroup([
            styleLayer,
            utfGrid
        ]);
        map.addLayer(utfGridGroup);
        layerControl.addOverlay(utfGridGroup, " SVIR Standardized Population Indicators");

        // Populate a drop down list so the user can select attributes to be used in the pcc chart
        var popIndicators;
        var popIndicatorsArray = [];
        $.getJSON(TILESTREAM_API_URL, function(json) {

            for (var i = 0; i < json.length; i++) {

                if (json[i].category == 'population') {
                    popIndicators = json[i].indicators;
                }
            }

        popIndicatorsArray = popIndicators.split(',');

        }).done(function() {
            for (var i = 0; i < popIndicatorsArray.length; i++) {
                var chartDropDown = '<input class="attributeOption pop-chart" type="checkbox" name="'+popIndicatorsArray[i]+'" value="'+popIndicatorsArray[i]+'">'+popIndicatorsArray[i]+'<br>';
                $('#pop-chart-options').append(chartDropDown);
            }
            $('.pop-chart:lt(5)').prop('checked', true);
            $('#pop-chart-options').append('<input id="pop-chart-optionsButton" type="button" value="Apply"/>');
            $('#pop-chart-optionsButton').click(function() {
                $('#pop-chart-options').dialog('close');
            });

            // don't allow more than 6 check boxes to be selected
            $(function() {
                var max = 6;
                var checkboxes = $('#'+chartCat+'-options input[type="checkbox"]');
                checkboxes.change(function() {
                    var current = checkboxes.filter(':checked').length;
                    checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
                });
            });
        });

        utfGridClickEvent(dataCat, chartCat);
    });

    $("#infra").click(function() {
        $('#infra-chart-options').empty();
        dataCat = "infra-table";
        chartCat = "infra-chart";
        try {
            map.removeLayer(styleLayer);
            map.removeLayer(utfGrid);
        } catch (e) {
            // continue
        }
        // Empty the layer controller
        layerControl._layers = {};

        styleLayer = new L.tileLayer(TS_URL + '/v2/svir_standized_infra/{z}/{x}/{y}.png');
        utfGrid = new L.UtfGrid(TS_URL + '/v2/svir_standized_infra/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
        var utfGridGroup = L.layerGroup([
            styleLayer,
            utfGrid
        ]);
        map.addLayer(utfGridGroup);
        layerControl.addOverlay(utfGridGroup, " SVIR Standardized Infrastructure Indicators");

        // Populate a drop down list so the user can select attributes to be used in the pcc chart
        var infraIndicators;
        var infraIndicatorsArray = [];
        $.getJSON(TILESTREAM_API_URL, function(json) {
            for (var i = 0; i < json.length; i++) {
                if (json[i].category == 'infrastructure') {
                    infraIndicators = json[i].indicators;
                }
            }

        infraIndicatorsArray = infraIndicators.split(',');

        }).done(function() {
            for (var i = 0; i < infraIndicatorsArray.length; i++) {
                var chartDropDown = '<input class="attributeOption infra-chart" type="checkbox" name="'+infraIndicatorsArray[i]+'" value="'+infraIndicatorsArray[i]+'">'+infraIndicatorsArray[i]+'<br>';
                $('#infra-chart-options').append(chartDropDown);
            }
            $('.infra-chart:lt(5)').prop('checked', true);
            $('#infra-chart-options').append('<input id="infra-chart-optionsButton" type="button" value="Apply"/>');
            $('#infra-chart-optionsButton').click(function() {
                $('#infra-chart-options').dialog('close');
            });

            // don't allow more than 6 check boxes to be selected
            $(function() {
                var max = 6;
                var checkboxes = $('#'+chartCat+'-options input[type="checkbox"]');
                checkboxes.change(function() {
                    var current = checkboxes.filter(':checked').length;
                    checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
                });
            });
        });

        utfGridClickEvent(dataCat, chartCat);
    });

    $("#gov").click(function() {
        $('#gov-chart-options').empty();
        dataCat = "gov-table";
        chartCat = "gov-chart";
        try {
            map.removeLayer(styleLayer);
            map.removeLayer(utfGrid);
        } catch (e) {
            // continue
        }
        // Empty the layer controller
        layerControl._layers = {};

        styleLayer = new L.tileLayer(TS_URL + '/v2/svir_standized_gov/{z}/{x}/{y}.png');
        utfGrid = new L.UtfGrid(TS_URL + '/v2/svir_standized_gov/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
        var utfGridGroup = L.layerGroup([
            styleLayer,
            utfGrid
        ]);
        map.addLayer(utfGridGroup);
        layerControl.addOverlay(utfGridGroup, " SVIR Standardized Government Indicators");

        // Populate a drop down list so the user can select attributes to be used in the pcc chart
        var govIndicators;
        var govIndicatorsArray = [];
        $.getJSON(TILESTREAM_API_URL, function(json) {
            for (var i = 0; i < json.length; i++) {
                if (json[i].category == 'government') {
                    govIndicators = json[i].indicators;
                }
            }

        govIndicatorsArray = govIndicators.split(',');

        }).done(function() {
            for (var i = 0; i < govIndicatorsArray.length; i++) {
                var chartDropDown = '<input class="attributeOption gov-chart" type="checkbox" name="'+govIndicatorsArray[i]+'" value="'+govIndicatorsArray[i]+'">'+govIndicatorsArray[i]+'<br>';
                $('#gov-chart-options').append(chartDropDown);
            }
            $('.gov-chart:lt(5)').prop('checked', true);
            $('#gov-chart-options').append('<input type="button" value="Apply"/>');

            // don't allow more than 6 check boxes to be selected
            $(function() {
                var max = 6;
                var checkboxes = $('#'+chartCat+'-options input[type="checkbox"]');
                checkboxes.change(function() {
                    var current = checkboxes.filter(':checked').length;
                    checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
                });
            });
        });

        utfGridClickEvent(dataCat, chartCat);
    });

    $("#edu").click(function() {
        $('#edu-chart-options').empty();
        dataCat = "edu-table";
        chartCat = "edu-chart";
        try {
            map.removeLayer(styleLayer);
            map.removeLayer(utfGrid);
        } catch (e) {
            // continue
        }
        // Empty the layer controller
        layerControl._layers = {};

        styleLayer = new L.tileLayer(TS_URL + '/v2/svir_standized_edu/{z}/{x}/{y}.png');
        utfGrid = new L.UtfGrid(TS_URL + '/v2/svir_standized_edu/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
        var utfGridGroup = L.layerGroup([
            styleLayer,
            utfGrid
        ]);
        map.addLayer(utfGridGroup);
        layerControl.addOverlay(utfGridGroup, " SVIR Standardized Education Indicators");

        // Populate a drop down list so the user can select attributes to be used in the pcc chart
        var eduIndicators;
        var eduIndicatorsArray = [];
        $.getJSON(TILESTREAM_API_URL, function(json) {
            for (var i = 0; i < json.length; i++) {
                if (json[i].category == 'education') {
                    eduIndicators = json[i].indicators;
                }
            }

        eduIndicatorsArray = eduIndicators.split(',');

        }).done(function() {
            for (var i = 0; i < eduIndicatorsArray.length; i++) {
                var chartDropDown = '<input class="attributeOption edu-chart" type="checkbox" name="'+eduIndicatorsArray[i]+'" value="'+eduIndicatorsArray[i]+'">'+eduIndicatorsArray[i]+'<br>';
                $('#edu-chart-options').append(chartDropDown);
            }
            $('.edu-chart:lt(5)').prop('checked', true);
            $('#edu-chart-options').append('<input type="button" value="Apply"/>');

            // don't allow more than 6 check boxes to be selected
            $(function() {
                var max = 6;
                var checkboxes = $('#'+chartCat+'-options input[type="checkbox"]');
                checkboxes.change(function() {
                    var current = checkboxes.filter(':checked').length;
                    checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
                });
            });
        });

        utfGridClickEvent(dataCat, chartCat);
    });

    var utfGridClickEvent = function(dataCat, chartCat) {
        utfGrid.on('click', function (e) {
            $("#"+chartCat+"-bar").empty();
            svirRankValues = [];
            svirRankKeys = [];
            svirRegionRankValues = [];
            svirRegionRankKeys = [];
            svirBarArray = [];
            // When the map is clikced the table needs to be cleared out and recreated
            var countryTable = $("#"+dataCat).dataTable();
            countryTable.fnClearTable();

            if (e.data) {
                buildDataTable(e, dataCat);

                // Populate a drop down list so the user can select attributes to be used in the pcc chart
                var values = [];
                for (var d in e.data) {
                    values.push(e.data[d]);
                }

                var keys = Object.keys(e.data);

                for (var i in values) {
                    if (keys[i] != "country" && keys[i] != "region") {
                        var c = keys[i].replace(/_/g, " ");
                        var value = values[i];
                        dataFormated[c] = values[i];
                    }
                }

                $("#chartOptionsButton").click(function(){
                    $('#'+chartCat+'-options').dialog('close');
                    // Grab the check box values to be used in the chart
                    attrSelection = $('#'+chartCat+'-options input:checked')
                        .map(function(){
                            return this.name;
                        });
                        if (attrSelection > 6) {
                            attrSelection.pop();
                        }
                });

                var attrSelection = [];
                $('#'+chartCat+'-options input:checked').map(function(){
                    attrSelection.push(this.name);
                });

                selectedValue1.unshift(parseFloat(dataFormated[attrSelection[0]]));
                if (selectedValue1.length > 6) {
                    selectedValue1.pop();
                }

                selectedValue2.unshift(parseFloat(dataFormated[attrSelection[1]]));
                if (selectedValue2.length > 6) {
                    selectedValue2.pop();
                }

                selectedValue3.unshift(parseFloat(dataFormated[attrSelection[2]]));
                if (selectedValue3.length > 6) {
                    selectedValue3.pop();
                }

                selectedValue4.unshift(parseFloat(dataFormated[attrSelection[3]]));
                if (selectedValue4.length > 6) {
                    selectedValue4.pop();
                }

                selectedValue5.unshift(parseFloat(dataFormated[attrSelection[4]]));
                if (selectedValue5.length > 6) {
                    selectedValue5.pop();
                }

                selectedValue6.unshift(parseFloat(dataFormated[attrSelection[5]]));
                if (selectedValue6.length > 6) {
                    selectedValue6.pop();
                }

                var countryName = e.data.country;
                countryName = countryName.replace(/\s/g, "-");

                // Indicate the country name for the table header
                $(".table-header").replaceWith('<div class="table-header" style="background-color: #dadcff;"><p>The table represents indicators for '+countryName+'</p>');

                countriesArray.unshift(countryName);

                if (countriesArray.length > 6) {
                    countriesArray.pop();
                }

                // TODO: use a 2d array instead of several selectedValue<x> arrays
                buildD3Chart(chartCat, countryName, attrSelection, selectedValue1, selectedValue2, selectedValue3, selectedValue4, selectedValue5, selectedValue6, countriesArray);

            }
        }); // End utfGrid click
    }; // End utfGridClickEvent
};

app.initialize(startApp);
