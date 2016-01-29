
///////////////////////////////////////
///////// Mixed Spectrum Chart ////////
///////////////////////////////////////

function buildMixedSpectrumChart(spectrumCurves, lat, lng) {
    var legend;
    // Find min and max y axis values
    var maxYAxis = 0;
    var minYAxis = 0;
    for (var k in spectrumCurves) {
        for (var i = 0; i < spectrumCurves[k].length; i++) {
            if (maxYAxis < spectrumCurves[k][i][1]) {
                maxYAxis = spectrumCurves[k][i][1];
            }
        }

    }

    var margin = {top: 60, right: 20, bottom: 60, left: 70},
    width = 580 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');
    var line = d3.svg.line()
        .x(function(d) {
            return x(d.x);
        })
        .y(function(d) {
            return y(d.y);
        });

    var svg = d3.select('#chartDialog').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var dataCallback = function(d) {
        d.x = +d[0];
        d.y = +d[1];
    };

    var count = 0;
    colors = [
        "#984ea3",
        "#1f78b4",
        "#666666",
        "#33a02c",
        "#fb9a99",
        "#e31a1c",
        "#fdbf6f",
        "#ff7f00",
        "#f781bf",
        "#a6cee3"
    ];

    legend = d3.select("#chartDialog").append("svg");

    for (var key in spectrumCurves) {

        ++count;
        var data = spectrumCurves[key];

        data.forEach(dataCallback);
        x.domain(d3.extent(data, function(d) { return d.x; }));
        y.domain([minYAxis, maxYAxis]);

        svg.append('path')
            .data([data])
            .attr('class', 'spectrum-line')
            .style({"stroke": colors[count], "fill": "none"})
            .attr('d', line);

        legend.append("text")
            .attr("x", 90)
            .attr("y", 20*(count))
            .attr("dy", ".35em")
            .text(key);

        legend.append("svg:circle")
            .attr("cy", 20*(count))
            .attr("cx", 80)
            .attr("r", 4)
            .attr('class', 'spectrum-line')
            .style("fill", colors[count]);

        var dialogHeight = $('#chartDialog').height();
        $('#chartDialog').css("height", (dialogHeight + 10));
    }

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
            return "rotate(-35)";
            });
    svg.append('g')
        .attr('class', 'x axis')
        .append('text')
        .attr('x', width / 2)
        .attr('y',  (height + margin.bottom)- 7)
        .attr('text-anchor', 'middle')
        .style('font-size','14px')
        .text(AppVars.layerImt);
    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -70)
        .attr('x', -120)
        .attr('dy', '.71em')
        .style('font-size','12px')
        .style('text-anchor', 'middle')
        .text('Spectral Acceleration, Sa [g]');
    textTopTitle = svg.append("text")
        .attr("x", 0)
        .attr("y", -45)
        .attr("dy", ".35em")
        .style("font-weight", "bold")
        .attr("font-size","14px")
        .text('Spectrum Curve');
    textTopTitle2 = svg.append("text")
        .attr("x", 0)
        .attr("y", -30)
        .attr("dy", ".35em")
        .style("font-weight", "bold")
        .attr("font-size","14px")
        .text(AppVars.selectedLayerValue);
    textTopLable = svg.append("text")
        .attr("x", 0)
        .attr("y", -15)
        .attr("dy", ".35em")
        .attr("font-size","12px")
        .text('Point coordinates (lon, lat [in DD]): '+lng+', '+lat);
    textBottom = svg.append('text')
        .attr('x', 0)
        .attr('y', 335)
        .attr('dy', '.35em')
        .text('');

    $('#chartDialog').append('<div id="downloadCurve"><p style="color: blue;">Download Curve</p></div>');
    var finalDialogHeight = $('#chartDialog').height();
    $('#chartDialog').css("height", (finalDialogHeight + 40));
    $('#downloadCurve').on('hover', function(){
        $(this).css('cursor', 'pointer');
    });

    var h = $('#chartDialog').height();
    h = h + 20;

    $('#chartDialog').css({'height': h+'px'});

    // Prep data for download to CSV
    $('#downloadCurve').click(function() {
        var csvData = [];
        csvData = csvData.concat('curveName');
        csvData = csvData.concat('vectorofPeriods');
        csvData = csvData.concat('acceleration');
        csvData = csvData.concat('lon');
        csvData = csvData.concat('lat');
        csvData = JSON.stringify(csvData);
        var lineBreak = 'lineBreak';
        csvData = csvData.concat(lineBreak);
        var quotationMark = '"';
        var comma = ',';

        for (var l in spectrumCurves) {
            var curveName = l;
            var vectorofPeriod = [];
            var acceleration = [];
            ct = 0;
            for (var i = 0; i < spectrumCurves[l].length; i++) {
                    vectorofPeriod.push(spectrumCurves[l][i][0]);
                    acceleration.push(spectrumCurves[l][i][1]);
            }

            csvData = csvData.concat(curveName);
            csvData = csvData.concat(comma);
            csvData = csvData.concat(quotationMark);
            csvData = csvData.concat(vectorofPeriod);
            csvData = csvData.concat(quotationMark);
            csvData = csvData.concat(comma);
            csvData = csvData.concat(quotationMark);
            csvData = csvData.concat(acceleration);
            csvData = csvData.concat(quotationMark);
            csvData = csvData.concat(comma);
            csvData = csvData.concat(lng);
            csvData = csvData.concat(comma);
            csvData = csvData.concat(lat);
            csvData = csvData.concat(lineBreak);
        }
            csvData = csvData
                .replace(/lineBreak/g, '\r\n')
                .replace(/\[/g, '')
                .replace(/\]/g, '')
                .replace(/''/g, '","');

        downloadJSON2CSV(csvData);
    });
}