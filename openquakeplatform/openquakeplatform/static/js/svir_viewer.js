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

    //var utfGrid = new L.UtfGrid('http://{s}.tiles.mapbox.com/v3/mapbox.geography-class/{z}/{x}/{y}.grid.json?callback={cb}');

   var utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/svir-test3/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});

    // Build the html table
    var createTable = function (countryName, foo, bar, bob, tom) {
        $("#tableBody").html("");
           // $("#tablehead").html("");
        $("#svir-table").append("<tr><td>"+countryName+"</td><td>"+foo+"</td><td>"+bar+"</td><td>"+bob+"</td><td>"+tom+"</td></tr>");
    };

    utfGrid.on('click', function (e) {
        if (e.data) {
            //document.getElementById('click').innerHTML = 'click: ' + e.data.gadm_name;
            console.log(e.data);
            var countryName = e.data.country_na;
            var foo = e.data.ecoeac092;
            var bar = e.data.ecoeac082;
            var bob = e.data.ecoeac027;
            var tom = e.data.ecoeac012;
            console.log(foo);
            console.log(bar);
            //console.log(e.data.popsnpita);

            createTable(countryName, foo, bar, bob, tom);


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