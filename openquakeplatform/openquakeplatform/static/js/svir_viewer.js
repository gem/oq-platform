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

var baseMapUrl = (
    "http://{s}.tiles.mapbox.com/v3/unhcr.map-8bkai3wa/{z}/{x}/{y}.png"
);

var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

var startApp = function() {

    app.createMap();

    $(function() {
        $( "#categoryTabs" ).tabs();
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