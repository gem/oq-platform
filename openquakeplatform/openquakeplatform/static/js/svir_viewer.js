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

    // Layer selection dialog
    $("#dialog-layers").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true
    });

    // Append the layer-selection to the oq-context-ribbon div
    //document.getElementById("oq-context-ribbon").appendChild("test");
    var foo = document.getElementById("oq-body-sidebar");
    foo.innerHTML = "<div id='svir-buttons'><input id='layer-selection' type='button' value='Layers'/></div>";

    $("#layer-selection").button().click(function() {
        $("#dialog-layers").dialog("open");
    });

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

    $("#table-selection").button().click(function() {
        $("#dialog-datagrid").dialog("open");
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
            "sPaginationType": "full_numbers"
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

    var utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/svir-test3/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});

    utfGrid.on('click', function (e) {
        // When the map is clikced the table needs to be cleared out and recreated 
        var countryTable = $("#svir-table").dataTable();
        countryTable.fnClearTable();

        BuildDataTable(e);

        if (e.data) {
            console.log(e.data);

            var countryName = e.data.country_na;
            var foo = e.data.ecoeac092;
            var bar = e.data.ecoeac082;
            var bob = e.data.ecoeac027;
            var tom = e.data.ecoeac012;
            console.log(foo);
            console.log(bar);

            // Create the Charts
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'container',
                    events: {
                        redraw: function() {
                            console.log('the chart');
                        }
                    },
                    type: 'bar'
                },
                title: {
                    text: countryName
                },
                xAxis: {
                    categories: ['Test', 'Test2', 'test3']
                },
                yAxis: {
                    title: {
                        text: 'This is a test'
                    }
                },
                series: [{
                    name: 'ecoeac092',
                    data: [foo, bob]
                }, {
                    name: 'ecoeac082',
                    data: [bar, tom]
                }],

            })

            var pieChart = new Highcharts.Chart({

                chart: {
                    renderTo: 'container2',
                    events: {
                        redraw: function() {
                            console.log('the chart');
                        }
                    },
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Foo Bar test'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'temp test',
                    data: [
                        ['foo',   foo],
                        ['bar',       bar],
                        {
                            name: 'tom',
                            y: tom,
                            sliced: true,
                            selected: true
                        },
                        ['bob',    bob],
                    ]
                }]
        


            })

            


         

            
        } else {
            document.getElementById('click').innerHTML = 'click: nothing';
        }
    }); 

    map.addLayer(utfGrid); 

};

app.initialize(startApp);