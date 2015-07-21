// Mapboxgl demo app
'use strict';

var map;

$('#base-map-menu').remove();

$('#map').css({'height': '600px'});

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuamFtaW4td3lzcyIsImEiOiJVcm5FdEw4In0.S8HRIEq8NqdtFVz2-BwQog';

// init the map
map = new mapboxgl.Map({
    container: 'map',
    // Load default mapbox basemap
    style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v7.json',

    // Load the mapbox basemap + ecuador proto buf
    //style: "../data/source.json",

    center: [-1.83, -78.183],
    zoom: 6.3,
});


map.on('style.load', function() {

    map.addSource("ecuador", {
        "type": "geojson",
        "data": "/static/js/losses-poly.json" // served locally
        //"data": 'https://raw.githubusercontent.com/bwyss/template-mapbox-gl-js-v8/master/app/data/losses-poly.json' // served via the web
    });

    // create the thematic layer on page load
    createLayer();

});

// Setup the attribute filters
var selAttribute = 'QHHNOBATH';

$('#breakSelection').change(function() {
    map.removeLayer('borders');
    if ($('#breakSelection').val() == '1') {
        try {
            map.removeLayer('ec-layer1');
            map.removeLayer('ec-layer2');
            map.removeLayer('ec-layer3');
            map.removeLayer('ec-layer4');
            map.removeLayer('ec-layer5');
            map.removeLayer('ec-layer-label');
            map.render();

        } catch (e) {
            // continue
        }

        // set Attribute scheme
        selAttribute = 'GM_EDU';
        createLayer();
        var filter = ['<=', selAttribute, 0.49];
        map.setFilter ('ec-layer1', filter);
    }
    else if ($('#breakSelection').val() == '2') {
        try {
            map.removeLayer('ec-layer1');
            map.removeLayer('ec-layer2');
            map.removeLayer('ec-layer3');
            map.removeLayer('ec-layer4');
            map.removeLayer('ec-layer5');
            map.removeLayer('ec-layer-label');
            map.render();
        } catch (e) {
            // continue
        }

        // set Attribute scheme
        selAttribute = 'GM_INFRAST';
        createLayer();
        var filter = ['<=', selAttribute, 0.49];
        map.setFilter ('ec-layer1', filter);
    }
    else if ($('#breakSelection').val() == '3') {
        try {
            map.removeLayer('ec-layer1');
            map.removeLayer('ec-layer2');
            map.removeLayer('ec-layer3');
            map.removeLayer('ec-layer4');
            map.removeLayer('ec-layer5');
            map.removeLayer('ec-layer-label');
            map.render();
        } catch (e) {
            // continue
        }

        // set Attribute scheme
        selAttribute = 'QDNOELECTR';
        createLayer();
        var filter = ['<=', selAttribute, 0.49];
        map.setFilter ('ec-layer1', filter);
    }
    else if ($('#breakSelection').val() == '4') {
        try {
            map.removeLayer('ec-layer1');
            map.removeLayer('ec-layer2');
            map.removeLayer('ec-layer3');
            map.removeLayer('ec-layer4');
            map.removeLayer('ec-layer5');
            map.removeLayer('ec-layer-label');
            map.render();
        } catch (e) {
            // continue
        }

        // set Attribute scheme
        selAttribute = 'QDNOWATER';
        createLayer();
        var filter = ['<=', selAttribute, 0.49];
        map.setFilter ('ec-layer1', filter);
    }
    else if ($('#breakSelection').val() == '5') {
        try {
            map.removeLayer('ec-layer1');
            map.removeLayer('ec-layer2');
            map.removeLayer('ec-layer3');
            map.removeLayer('ec-layer4');
            map.removeLayer('ec-layer5');
            map.removeLayer('ec-layer-label');
            map.render();
        } catch (e) {
            // continue
        }

        // set Attribute scheme
        selAttribute = 'QHHNOBATH';
        createLayer();
        var filter = ['<=', selAttribute, 0.49];
        map.setFilter ('ec-layer1', filter);
    }
    else if ($('#breakSelection').val() == '6') {
        try {
            map.removeLayer('ec-layer1');
            map.removeLayer('ec-layer2');
            map.removeLayer('ec-layer3');
            map.removeLayer('ec-layer4');
            map.removeLayer('ec-layer5');
            map.removeLayer('ec-layer-label');
            map.render();
        } catch (e) {
            // continue
        }

        // set Attribute scheme
        selAttribute = 'HOUDENSITY';
        createLayer();
        var filter = ['<=', selAttribute, 0.49];
        map.setFilter ('ec-layer1', filter);
    }
});


// Set up the color options
var colorsPalRed = ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'];
var colorsPalBlue = ['#f1eef6', '#bdc9e1', '#74a9cf', '#2b8cbe', '#045a8d'];
var colorsPalGreen = ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c'];
var colorsPalBrown = ['#ffffd4', '#fed98e', '#fe9929', '#d95f0e', '#993404'];
var colorsPal = colorsPalRed;


$('#colorSelection').change(function() {
    map.removeLayer('borders');
    if ($('#colorSelection').val() === 'red') {
        try {
            map.removeLayer('ec-layer1');
            map.removeLayer('ec-layer2');
            map.removeLayer('ec-layer3');
            map.removeLayer('ec-layer4');
            map.removeLayer('ec-layer5');
            map.removeLayer('ec-layer-label');
            map.render();

        } catch (e) {
            // continue
        }

        // set color scheme
        colorsPal = colorsPalRed;
        createLayer();
        //map.update();
    }
    else if ($('#colorSelection').val() === 'blue') {
        try {
            map.removeLayer('ec-layer1');
            map.removeLayer('ec-layer2');
            map.removeLayer('ec-layer3');
            map.removeLayer('ec-layer4');
            map.removeLayer('ec-layer5');
            map.removeLayer('ec-layer-label');
            map.render();

        } catch (e) {
            // continue
        }

        // set color scheme
        colorsPal = colorsPalBlue;

        // Set some styles on the proto buf ecuador layer
        //map.addClass('foo');
        createLayer();
    }
    else if ($('#colorSelection').val() === 'green') {
        try {
            map.removeLayer('ec-layer1');
            map.removeLayer('ec-layer2');
            map.removeLayer('ec-layer3');
            map.removeLayer('ec-layer4');
            map.removeLayer('ec-layer5');
            map.removeLayer('ec-layer-label');
            map.render();

        } catch (e) {
            // continue
        }

        // set color scheme
        colorsPal = colorsPalGreen;
        createLayer();
    }
        else if ($('#colorSelection').val() === 'brown') {
        try {
            map.removeLayer('ec-layer1');
            map.removeLayer('ec-layer2');
            map.removeLayer('ec-layer3');
            map.removeLayer('ec-layer4');
            map.removeLayer('ec-layer5');
            map.removeLayer('ec-layer-label');
            map.render();

        } catch (e) {
            // continue
        }

        // set color scheme
        colorsPal = colorsPalBrown;
        createLayer();
    }
});



// Create the layer
function createLayer () {

/*
//////////////////////////
// style for point data //
//////////////////////////

	map.addLayer({
        'id': 'ec-layer',
        'type': 'symbol',
        'source': 'ecuador',
        "source-layer": "ec-layer11",
        'interactive': true,
    	'layout': {
    	  	'icon-image': '{marker-symbol}-12',
    	  	'text-field': '{title}',
    	  	'text-font': 'Open Sans Semibold, Arial Unicode MS Bold',
    	  	'text-offset': [0, 0.6],
    	  	'text-anchor': 'top'
    	},
    	'paint': {
    	  	'text-size': 12
    	}
    });
*/

////////////////////////////
// style for polygon data //
////////////////////////////

    map.addLayer({
        'id': 'ec-layer1',
        'type': 'fill',
        'source': 'ecuador',
        "source-layer": "eq-simple",
        'interactive': true,
        'text-field': '{DPA_DESPAR}',
        'paint': {
            'fill-color': colorsPal[0],
            //'fill-opacity': 0.8,
            //'fill-outline-color': '#CCCCFF'
        },
        'filter': [
            '<=', selAttribute, 0.49
        ]
    });

    map.addLayer({
        'id': 'ec-layer2',
        'type': 'fill',
        'source': 'ecuador',
        "source-layer": "eq-simple",
        'interactive': true,
        'paint': {
            'fill-color': colorsPal[1],
            //'fill-opacity': 0.8,
            //'fill-outline-color': '#CCCCFF'
        },
        'filter': ['all',['>', selAttribute, 0.49], ['<=', selAttribute, 0.815]]
    });

    map.addLayer({
        'id': 'ec-layer3',
        'type': 'fill',
        'source': 'ecuador',
        "source-layer": "eq-simple",
        'interactive': true,
        'paint': {
            'fill-color': colorsPal[2],
            //'fill-opacity': 0.8,
            //'fill-outline-color': '#CCCCFF'
        },
        'filter': ['all',['>', selAttribute, 0.815], ['<=', selAttribute, 1.139]]
    });

    map.addLayer({
        'id': 'ec-layer4',
        'type': 'fill',
        'source': 'ecuador',
        "source-layer": "eq-simple",
        'interactive': true,
        'paint': {
            'fill-color': colorsPal[3],
            //'fill-opacity': 0.8,
            //'fill-outline-color': '#CCCCFF'
        },
        'filter': ['all',['>', selAttribute, 1.139], ['<=', selAttribute, 1.46]]
    });

    map.addLayer({
        'id': 'ec-layer5',
        'type': 'fill',
        'source': 'ecuador',
        "source-layer": "eq-simple",
        'interactive': true,
        'paint': {
            'fill-color': colorsPal[4],
            //'fill-opacity': 0.8,
            //'fill-outline-color': '#CCCCFF'
        },
        'filter': [
            '>=', selAttribute, 1.46
        ]
    });

    map.addLayer({
        'id': 'borders',
        'type': 'line',
        'source': 'ecuador',
        "source-layer": "eq-simple",
        'paint': {
            'line-color': "#000",
            'line-opacity': 0.3,
            'line-blur': 4
        }
    });
/*
    // text lables
    map.addLayer({
        'id': 'ec-layer-label',
        'type': 'symbol',
        'source': 'ecuador',
        "source-layer": "ec-layer11",
        'layout': {
            //'symbol-placement':'center',
            'text-field': '{REGION}',
            'text-font': 'DIN Offc Pro Bold, Arial Unicode MS Regular',
            'text-max-size': 22,
            //'text-max-width': 14,
            //'text-letter-spacing': 0.1,
            'text-padding': 4,
            //'text-anchor': 'center',
        },
    });
*/

    // mouse click event
    map.on('click', function(e) {
      	map.featuresAt(e.point, { radius : 6}, function(err, features) {
          	if (err) throw err;
                $('#name').empty();
                $('#name').append('District: ' + features[0].properties.REGION);
          		//document.getElementById('features').innerHTML = 'Data value from JSON: ' + JSON.stringify(features[0].properties.LOG_AV_SVI, null, 2);
                // Hard coded attributes list
                var keys = ["QWKHOME", "QPOVERTY", "GM_ECONOMY", "AV_ECONOMY", "QFEMALE", "QAGEDEP", "QDISABLED", "QINDIGINOU", "QHRENTERS", "QNOHEALTHI", "QNONATID", "QNOSTATREG", "QGRPHMDOM", "PPUNIT", "GM_VPOP", "AV_VPOP", "AV_EDU", "GM_EDU1", "AV_EDU1", "GM_SVI", "AV_SVI", "LOG_AV_SVI"];
                var values = [];
                var name = '';

                for (var i = 0; i < keys.length; i++) {
                    var tmp = keys[i];
                    values.push(features[0].properties[tmp]);
                }
                chart(keys, values, name);
      		});
  	});


    /////////////////////////////////////////
    //////////// D3.js Pie Chart ////////////
    /////////////////////////////////////////

    function chart(keys, values, name) {
        $('#features').empty();
        var w = 250,
            h = 250,
            r = 100,
            inner = 40,
            color = d3.scale.category20c();

        var data = [];

        for (var i = 0; i < values.length; i++) {
           data[i] = {"label":keys[i], "value":values[i]};
        }

        var total = d3.sum(data, function(d) {
            return d3.sum(d3.values(d));
        });

        var vis = d3.select("#features")
            .append("svg:svg")
            .data([data])
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(" + r * 1.1 + "," + r * 1.1 + ")");

        var textTop = vis.append("text")
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("class", "textTop")
            .text( "TOTAL" )
            .attr("y", -10);

        var textBotecuador = vis.append("text")
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("class", "textBotecuador")
            .text(total.toFixed(2))
            .attr("y", 10);

        vis.append("text")
            .attr("text-anchor", "left")
            .style("font-size", "16px")
            .text(name)
            .attr("y", -185)
            .attr("x", -195);

        var arc = d3.svg.arc()
            .innerRadius(inner)
            .outerRadius(r);

        var arcOver = d3.svg.arc()
            .innerRadius(inner + 5)
            .outerRadius(r + 5);

        var pie = d3.layout.pie()
            .value(function(d) { return d.value; });

        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
                .append("svg:g")
                    .attr("class", "slice")
                    .on("mouseover", function(d) {
                        d3.select(this).select("path").transition()
                            .duration(200)
                            .attr("d", arcOver);
                        textTop.text(d3.select(this).datum().data.label)
                            .attr("y", -10);
                        textBotecuador.text(d3.select(this).datum().data.value.toFixed(3))
                            .attr("y", 10);
                    })
                    .on("mouseout", function(d) {
                        d3.select(this).select("path").transition()
                            .duration(100)
                            .attr("d", arc);
                        textTop.text( "TOTAL" )
                            .attr("y", -10);
                        textBotecuador.text(total.toFixed(2));
                    });

        arcs.append("svg:path")
            .attr("fill", function(d, i) { return color(i); } )
            .attr("d", arc);
/*
        // Chart legend
        var legend = d3.select("#features").append("svg")
            .attr("class", "legend-hazus")
            .attr("width", 400)
            .attr("height", 40)
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(" + i * 27 + ",0)"; });

        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d, i) { return color(i); });

        legend.append("text")
            .attr("x", 0)
            .attr("y", 30)
            .attr("dy", ".35em")
            .text(function(d) { return d.label; });
*/
    }

};

