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

var countriesArray = new Array('Turkmenistan', 'Uzbekistan', 'Kazakhstan', 'Mongolia');
var selectedValue1 = new Array(11.12, 16.591, 9.835, 14.0);
var selectedValue2 = new Array(33.209, 55.71, 49.38, 50.18);
var selectedValue3 = new Array(34.32, 72.306, 59.216, 64.189);
var selectedValue4 = new Array(0, 9.374, 4.413, 5.093);
var attrSelection = new Array();

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

    //$("#oq-body-content").append('<div id="categoryTabs"><ul><li><a href="#economy">Economy</a></li><li><a href="#population">Governance</a></li><li><a href="#tabs-3">Population</a></li><li><a href="#tabs-4">Education</a></li></ul><br><div id="economy"><table id="svir-table" ><thead id="tablehead"><tr><th>Index </th><th>Value</th></tr></thead></table><!--first chart --><div><div id="areaSpline" style="width:100%; height:400px; display:inline-block;"></div></div></div><div id="population"></div><div id="tabs-3"></div><div id="tabs-4"></div></div>');

    $("#oq-body-sidebar").append('<div><input id="spiderChart-open" type="button" value="Select Attributes"/></div>');

    $("#oq-body-sidebar").append('<form id="tile-form-list"><br>Category:<br> <select id="layer-category"></select><br>Indicator:<br> <select id="layer-list"></select><br><input type="button" id="addTileLayer" value="Add Layer"><input type="button" id="removeTileLayer" value="Remove Layer"></form>');

    // Append the layer-selection to the oq-context-ribbon div
    //document.getElementById("oq-context-ribbon").appendChild("test");
    //var foo = document.getElementById("oq-body-sidebar");
    //foo.innerHTML = "<div id='svir-buttons'><input id='layer-selection' type='button' value='Layers'/></div>";
    //$("#oq-body-sidebar").append("<div id='svir-buttons'><input id='layer-selection' type='button' value='Layers'/></div>");

    //$("#layer-selection").button().click(function() {
      //  $("#dialog-layers").dialog("open");
    //});

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

    // Spider chart variable selection dialog
    $("#chartOptions").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true
    });

    $("#spiderChart-open").button().click(function() {
        $("#chartOptions").dialog("open");
    });

    $(function() {
        $( "#categoryTabs" ).tabs({
            collapsible: true
        });
    });

    // Set up the data table
    $(document).ready(function() {
        $('#svir-table').dataTable({
            "aaSorting": [ [0,'asc'], [1,'asc'] ],
            "sPaginationType": "full_numbers",
            //"aoColumnDefs": [
              //  { "sWidth": "20%", "aTargets": [ 0 ] }
            //],
        });
    });


    function BuildDataTable(e) {
        var values = [];
        for (var d in e.data) {
            values.push(e.data[d]);
        }
        var keys = Object.keys(e.data);
        for (var i=0, il=values.length; i<il; i++){
            $('#svir-table').dataTable().fnAddData( [
                keys[i],
                values[i]
                ]
            );
        }
    };

    function buildMyCharts(countryName, attrSelection, selectedValue1, selectedValue2, selectedValue3, selectedValue4, countriesArray){

        $('#areaSpline').highcharts({
            chart: {
                type: 'areaspline'
            },
            title: {
                text: 'test foo bar'
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF'
            },
            xAxis: {
                categories: 
                    countriesArray,
                plotBands: [{ // visualize the weekend
                    from: 4.5,
                    to: 6.5,
                    color: 'rgba(68, 170, 213, .2)'
                }]
            },
            yAxis: {
                title: {
                    text: 'Foo units'
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' units'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: [{
                name: attrSelection[0],
                data: [selectedValue1[0], selectedValue1[1], selectedValue1[2], selectedValue1[3]]
            }, {
                name: attrSelection[1],
                data: [selectedValue2[0], selectedValue2[1], selectedValue2[2], selectedValue2[3]]
            }, {
                name: attrSelection[2],
                data: [selectedValue3[0], selectedValue3[1], selectedValue3[2], selectedValue3[3]]
            }, {
                name: attrSelection[3],
                data: [selectedValue4[0], selectedValue4[1], selectedValue4[2], selectedValue4[3]]
            }]
        });
    };

    var utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/svir-econ-sample/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});

    // TODO change the utfgrid layer when the tabs are clicked
    //$("#gov a").click(function(){
      //  map.removeLayer(utfGrid);
        //utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/svir-pop-sample/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});
        //map.addLayer(utfGrid); 

    //});
    

    utfGrid.on('click', function (e) {
        $("#chartOptions").empty();
        // When the map is clikced the table needs to be cleared out and recreated 
        var countryTable = $("#svir-table").dataTable();
        countryTable.fnClearTable();

        BuildDataTable(e);

        if (e.data) {
            // Populate a drop down list so the user can select attributes to be used in the spider chart
            var values = [];
            for (var d in e.data) {
                values.push(e.data[d]);
            }
            var keys = Object.keys(e.data);
        
            for (var i in values) {
                var value = values[i];

                var spiderDropDown = '<input class="attributeOption" type="checkbox" name="'+keys[i]+'" value="'+value[i]+'">'+keys[i]+'<br>';
                //var spiderDropDown = '<p>'+data+'</p>';
                $('#chartOptions').append(spiderDropDown);
            }

            $('#chartOptions').append('<input id="spiderChartButton" type="button" value="Render"/>');
            
            $("#spiderChartButton").click(function(){
                // Grab the check box values to be used in the chart
                attrSelection = $('#chartOptions input[class="attributeOption"]:checked')
                    .map(function(){
                        return this.name;
                    });
                    if (attrSelection > 4) {
                        attrSelection.pop();
                    } 
            });

            if (attrSelection.length == 0) {
                attrSelection = ["ecoeac006", "ecoeac012", "ecoeac027", "ecoeac033"];
            }
    
            selectedValue1.unshift(e.data[attrSelection[0]]);
            if (selectedValue1.length > 4) {
                selectedValue1.pop();
            }
            
            selectedValue2.unshift(e.data[attrSelection[1]]);
            if (selectedValue2.length > 4) {
                selectedValue2.pop();
            }

            selectedValue3.unshift(e.data[attrSelection[2]]);
            if (selectedValue3.length > 4) {
                selectedValue3.pop();
            }

            selectedValue4.unshift(e.data[attrSelection[3]]);
            if (selectedValue4.length > 4) {
                selectedValue4.pop();
            }
            
            var countryName = e.data.country_na;           

            countriesArray.unshift(countryName);

            if (countriesArray.length > 4) {
                countriesArray.pop();
            }

            buildMyCharts(countryName, attrSelection, selectedValue1, selectedValue2, selectedValue3, selectedValue4, countriesArray);
            
        } else {
            document.getElementById('click').innerHTML = 'click: nothing';
        }

    }); 

    map.addLayer(utfGrid); 

};

app.initialize(startApp);