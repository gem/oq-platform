
///////////////////////////////////////
///////// Mixed Spectrum Chart ////////
///////////////////////////////////////

function buildMixedSpectrumChart(spectrumCurves, lat, lng) {

    console.log('spectrumCurves:');
    console.log(spectrumCurves);

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

    var margin = {top: 60, right: 20, bottom: 80, left: 70},
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
        "darkred",
        "blue",
        "green",
        "orange",
        "red",
        "sandybrown",
        "yellowgreen",
        "darksalmon",
        "lightseagreen",
        "skyblue"
    ];

    for (var key in spectrumCurves) {

        ++count;
        console.log('count:');
        console.log(count);
        var data = spectrumCurves[key];

        data.forEach(dataCallback);
        x.domain(d3.extent(data, function(d) { return d.x; }));
        y.domain([minYAxis, maxYAxis]);

        svg.append('path')
            .data([data])
            .attr('class', 'spectrum-line')
            .style("stroke", colors[count])
            .attr('d', line);
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
            .attr('y',  (height + margin.bottom)- 17)
            .attr('text-anchor', 'middle')
            .style('font-size','14px')
            .text(AppVars.layerImt);
        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -70)
            .attr('x', -20)
            .attr('dy', '.71em')
            .style('font-size','12px')
            .style('text-anchor', 'end')
            .text('yAxisLable');
        var legend = d3.select('#chartDialog').append('svg')
            .attr('height', 25);
        textTopTitle = svg.append("text")
            .attr("x", 0)
            .attr("y", -45)
            .attr("dy", ".35em")
            .style("font-weight", "bold")
            .attr("font-size","14px")
            .text(AppVars.selectedHazardLayerName);
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

        $('#chartDialog').append('<div id="downloadCurve"><font color="blue">Download Curve</font></div>');
        $('#downloadCurve').on('hover', function(){
            $(this).css('cursor', 'pointer');
        });

        var h = $('#chartDialog').height();
        h = h + 20;

        $('#chartDialog').css({'height': h+'px'});

        // Prep data for download to CSV
        $('#downloadCurve').click(function(event) {
            var csvData = [];
            csvData = csvData.concat('prob');
            csvData = csvData.concat('iml');
            csvData = csvData.concat('investigationTime');
            csvData = csvData.concat('lon');
            csvData = csvData.concat('lat');
            csvData = JSON.stringify(csvData);
            var lineBreak = 'lineBreak';
            csvData = csvData.concat(lineBreak);
            var quotationMark = '"';
            csvData = csvData.concat('"');
            csvData = csvData.concat(probArray);
            csvData = csvData.concat('","');
            csvData = csvData.concat(layerIml);
            csvData = csvData.concat('",');
            csvData = csvData.concat(AppVars.layerInvestigationTime);
            csvData = csvData.concat(',');
            csvData = csvData.concat(lng);
            csvData = csvData.concat(',');
            csvData = csvData.concat(lat);
            csvData = csvData
                .replace(/lineBreak/, '\r\n')
                .replace(/\[/g, '')
                .replace(/\]/g, '')
                .replace(/''/g, '","');
            downloadJSON2CSV(csvData);
        });
}