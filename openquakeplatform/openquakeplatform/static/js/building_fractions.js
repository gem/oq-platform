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
var utfGrid = new Object;

// Keep track of the layer names
var layers;

var baseMapUrl = (
    "http://{s}.tiles.mapbox.com/v3/unhcr.map-8bkai3wa/{z}/{x}/{y}.png"
);

var app = new OQLeaflet.OQLeafletApp(baseMapUrl);

var startApp = function() {

    app.createMap();

    layers = {};

    layerControl = L.control.layers(app.baseLayers);


    map.addControl(layerControl.setPosition("topleft"));
    // TODO set the map max zoom to 9
    // The interactivity of the map/charts will not work with a map zoom greater then 9
    


    ////////////////////////////////////////////
    //////// Parallel Coordinates Chart ////////
    ////////////////////////////////////////////

    /*

    function buildD3SpiderChart(chartCat, countryName, attrSelection, selectedValue1, selectedValue2, selectedValue3, selectedValue4, selectedValue5, selectedValue6, countriesArray) {

        obj1.country = countriesArray[0];
        obj1[attrSelection[0]] = selectedValue1[0];
        obj1[attrSelection[1]] = selectedValue2[0];
        obj1[attrSelection[2]] = selectedValue3[0];
        obj1[attrSelection[3]] = selectedValue4[0];
        obj1[attrSelection[4]] = selectedValue5[0];
        obj1[attrSelection[5]] = selectedValue6[0];

        obj2.country = countriesArray[1];
        obj2[attrSelection[0]] = selectedValue1[1];
        obj2[attrSelection[1]] = selectedValue2[1];
        obj2[attrSelection[2]] = selectedValue3[1];
        obj2[attrSelection[3]] = selectedValue4[1];
        obj2[attrSelection[4]] = selectedValue5[1];
        obj2[attrSelection[5]] = selectedValue6[1];

        obj3.country = countriesArray[2];
        obj3[attrSelection[0]] = selectedValue1[2];
        obj3[attrSelection[1]] = selectedValue2[2];
        obj3[attrSelection[2]] = selectedValue3[2];
        obj3[attrSelection[3]] = selectedValue4[2];
        obj3[attrSelection[4]] = selectedValue5[2];
        obj3[attrSelection[5]] = selectedValue6[2];

        obj4.country = countriesArray[3];
        obj4[attrSelection[0]] = selectedValue1[3];
        obj4[attrSelection[1]] = selectedValue2[3];
        obj4[attrSelection[2]] = selectedValue3[3];
        obj4[attrSelection[3]] = selectedValue4[3];
        obj4[attrSelection[4]] = selectedValue5[3];
        obj4[attrSelection[5]] = selectedValue6[3];

        obj5.country = countriesArray[4];
        obj5[attrSelection[0]] = selectedValue1[4];
        obj5[attrSelection[1]] = selectedValue2[4];
        obj5[attrSelection[2]] = selectedValue3[4];
        obj5[attrSelection[3]] = selectedValue4[4];
        obj5[attrSelection[4]] = selectedValue5[4];
        obj5[attrSelection[5]] = selectedValue6[4];

        obj6.country = countriesArray[5];
        obj6[attrSelection[0]] = selectedValue1[5];
        obj6[attrSelection[1]] = selectedValue2[5];
        obj6[attrSelection[2]] = selectedValue3[5];
        obj6[attrSelection[3]] = selectedValue4[5];
        obj6[attrSelection[4]] = selectedValue5[5];
        obj6[attrSelection[5]] = selectedValue6[5];
    
        array[0] = obj1;
        array[1] = obj2;
        array[2] = obj3;
        array[3] = obj4;
        array[4] = obj5;
        array[5] = obj6;

        console.log(selectedValue1);

        console.log(obj1);

        console.log(array);

        var country = [countriesArray[0], countriesArray[1], countriesArray[2], countriesArray[3], countriesArray[4], countriesArray[5]],
            attributes = [attrSelection[0], attrSelection[1], attrSelection[2], attrSelection[3], attrSelection[4], attrSelection[5]];

        var m = [80, 160, 200, 160],
            w = 1280 - m[1] - m[3],
            h = 500 - m[0] - m[2];
        
        var x = d3.scale.ordinal().domain(attributes).rangePoints([0, w]),
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
            attributes.forEach(function(d) {
                // Coerce values to numbers.
                array.forEach(function(p) { p[d] = +p[d]; });

                y[d] = d3.scale.linear()
                    .domain(d3.extent(array, function(p) { return p[d]; }))
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
                .data(array)
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
*/
    // This layer is used for the visual representation of the data
    var building_fractions = L.tileLayer('http://tilestream.openquake.org/v2/ged_hazus_US_building_fractions_black/{z}/{x}/{y}.png');
    layerControl.addOverlay(building_fractions, "Building Fractions");
    map.addLayer(building_fractions);

    utfGrid = new L.UtfGrid('http://tilestream.openquake.org/v2/ged_hazus_US_building_fractions/{z}/{x}/{y}.grid.json?callback={cb}', {Default: false, JsonP: false});

    map.addLayer(utfGrid);
 
    var utfGridClickEvent = function() {
        utfGrid.on('click', function (e) {

            // TODO When the map is clikced the table needs to be cleared out and recreated 
    
            if (e.data) {
                console.log(e.data);
               
            } else {
                document.getElementById('click').innerHTML = 'click: nothing';
            }
        }); // End utfGrid click
    } // End utfGridClickEvent
    utfGridClickEvent();
};

app.initialize(startApp);