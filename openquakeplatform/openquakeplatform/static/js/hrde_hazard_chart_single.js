
////////////////////////////////////////////////////////////
//// Single hazard UHS, curveChart and hazard map plots ////
////////////////////////////////////////////////////////////

function drawSingleChart(data, probArray, layerIml, curveType, yAxisLable, lat, lng) {

    // Find min and max y axis values
    maxYAxis = Math.max.apply(Math, probArray);
    minYAxis = Math.min.apply(Math, probArray);
    percent = 0.1 * maxYAxis;
    maxYAxis = percent + maxYAxis;

    var margin = {top: 60, right: 20, bottom: 80, left: 70},
    width = 580 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    if (curveType === 'uhs' || curveType === 'spectrum') {
        var x = d3.scale.linear().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);
    } else {
        var x = d3.scale.log().range([0, width]);
        var y = d3.scale.log().range([height, 0]);
    }

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

    data.forEach(dataCallback);
    x.domain(d3.extent(data, function(d) { return d.x; }));

    if (curveType === 'uhs' || curveType === 'spectrum') {
        y.domain([minYAxis, maxYAxis]);
    } else {
        y.domain([d3.extent(data, function(d) { return d.y; })[0], 3]);
    }

    // grid line functions
    function make_x_axis() {
        return d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .ticks(5);
    }

    function make_y_axis() {
        return d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(5);
    }

    // grid lines
    svg.append('g')
        .attr('class', 'grid')
        .attr('transform', 'translate(0,' + height + ')')
        .call(make_x_axis()
            .tickSize(-height, 0, 0)
            .tickFormat('')
        );
    svg.append('g')
        .attr('class', 'grid')
        .call(make_y_axis()
            .tickSize(-width, 0, 0)
            .tickFormat('')
        );
    svg.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('d', line);
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
        .text(yAxisLable);
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

    $('#chartDialog').append('<div id="downloadCurve"><p style="color: blue;">Download Curve</p></div>');
    $('#downloadCurve').on('hover', function(){
        $(this).css('cursor', 'pointer');
    });

    var h = $('#chartDialog').height();
    h = h + 20;

    $('#chartDialog').css({'height': h+'px'});

    var prob, iml;

    if (curveType === 'spectrum') {
        prob = 'period';
        iml = 'acceleration';
    } else {
        prob = 'prob';
        iml = 'iml';
    }

    // Prep data for download to CSV
    $('#downloadCurve').click(function() {
        var csvData = [];
        csvData = csvData.concat('prob');
        csvData = csvData.concat('iml');
        csvData = csvData.concat('investigationTime');
        csvData = csvData.concat('lon');
        csvData = csvData.concat('lat');
        csvData = JSON.stringify(csvData);
        var lineBreak = 'lineBreak';
        csvData += lineBreak;
        csvData += '"' + probArray + '","' + layerIml + '",' + AppVars.layerInvestigationTime + ',' + lng + ',' + lat;
        csvData = csvData
            .replace(/lineBreak/, '\r\n')
            .replace(/\[/g, '')
            .replace(/\]/g, '')
            .replace(/''/g, '","');
        downloadJSON2CSV(csvData);
    });
}
