
/////////////////////////////////////
///////// Mixed Hazard Chart ////////
/////////////////////////////////////

function buildMixedD3Chart(chartData, selectedCurves, curveType) {

    if (selectedCurves.indexOf("iml") > -1) {
        var inx = selectedCurves.indexOf("iml");
        selectedCurves.splice(inx, 1);
    }

    var lat, lon, poe, xAxisLable, yAxisLable, yAxisVariable, curve_vals, curve_coup, curve_name, legend, colors, chartHeader;
    var min_value = 1000.0, min_value_k = '', max_value = -1, max_value_k = '';

    if(!(AppVars.layerIml instanceof Array)) {
        AppVars.layerIml = AppVars.layerIml.split(' ');
        for (i = 0 ; i < AppVars.layerIml.length ; i++) {
            AppVars.layerIml[i] = parseFloat(AppVars.layerIml[i]);
        }
    }

    /* associative array of arrays of values */
    curve_vals = [];
    /* associative array of arrays [ x, y ] to describe the curve on the plane */
    curve_coup = [];

    /* associative array of curves produced with d3.line */
    lat = chartData.lat;
    lon = chartData.lon;
    if (curveType == 'uhs') {
        poe = AppVars.layerPoe;
        chartHeader = 'Investigation Time: '+AppVars.layerInvestigationTime+', Probability of exceedance: '+poe;
    } else {
        chartHeader = 'Investigation Time: '+AppVars.layerInvestigationTime;
    }

    invest_time = AppVars.layerInvestigationTime;
    if (curveType == 'hc') {
        yAxisLable =  'Probability of exceedance in '+AppVars.layerInvestigationTime+' years';
    } else if (curveType == 'uhs') {
        yAxisLable = 'Spectral acceleration (g)';
    }

    if (curveType == 'hc') {
        // The imt variable needs to be formated i.e. SA = Spectral Acceleration (g)
        // SA-0.1 = Spectral Acceleration (0.1 s)

        xAxisLable = AppVars.layerImt;
        var xAxisLableValue;
        if (xAxisLable.indexOf('SA-') === 0 ) {
            xAxisLableValue = xAxisLable.substring(xAxisLable.indexOf('-') + 1);
            xAxisLable = 'Spectral Acceleration (' + xAxisLableValue + ' s) [g]';
        } else if (xAxisLable.indexOf('PGA-') === 0) {
            xAxisLableValue = xAxisLable.substring(xAxisLable.indexOf('-') + 1);
            xAxisLable = 'Peak Ground Acceleration [g]';
        } else if (xAxisLable.indexOf('PGV-') === 0) {
            xAxisLableValue = xAxisLable.substring(xAxisLable.indexOf('-') + 1);
            xAxisLable = 'Peak Ground Velocity [cm/s]';
        } else if (xAxisLable.indexOf('PGD-') === 0) {
            xAxisLableValue = xAxisLable.substring(xAxisLable.indexOf('-') + 1);
            xAxisLable = 'Peak Ground Displacement [cm]';
        }
    } else if (curveType == 'uhs') {
        xAxisLable = 'Period (s)';
    }

    for (var k in selectedCurves) {
        curve_name = selectedCurves[k];
        try {
            curve_vals[curve_name] = chartData[curve_name].split(',');
        } catch (e) {
            // continue
        }
    }

    for (var k in selectedCurves) {
        curve_name = selectedCurves[k];
        var i;
        for (i = 0 ; i < curve_vals[curve_name].length ; i++) {
            curve_vals[curve_name][i] = parseFloat(curve_vals[curve_name][i]);
        }
    }

    // Set the y axis variable depending on the type of curve
    if (curveType == 'hc') {
        yAxisVariable = AppVars.layerIml;
    } else if (curveType == 'uhs') {
        yAxisVariable = curve_vals.periods;
    }

    var old_value = -100;
    for (var i = 0 ; i < yAxisVariable.length ; i++) {
        if (yAxisVariable[i] == old_value) {
            yAxisVariable.splice(i, 1);
            i--;
        }
        else {
            old_value = yAxisVariable[i];
        }
    }

    for (var k in selectedCurves) {
        curve_name = selectedCurves[k];

        if (curveType == 'hc' && curve_name == 'iml')
            continue;
        if (curveType == 'uhs' && curve_name == 'periods')
            continue;

        curve_coup[curve_name] = [];
        for (var i = 0 ; i < curve_vals[curve_name].length ; i++) {
            if (yAxisVariable[i] > 0.0 && curve_vals[curve_name][i] > 0.0) {
                curve_coup[curve_name].push([ yAxisVariable[i], curve_vals[curve_name][i] ]);
            }
        }
    }

    for (var k in selectedCurves) {
        var curve_name = selectedCurves[k];
        var min_cur = 1000.0, max_cur = -1;

        if (curveType == 'hc' && curve_name == 'iml')
            continue;
        if (curveType == 'uhs' && curve_name == 'periods')
            continue;

        for (var i = 0 ; i < curve_vals[curve_name].length ; i++) {
            if (curve_vals[curve_name][i] === 0)
                continue;

            if (min_cur > curve_vals[curve_name][i])
                min_cur = curve_vals[curve_name][i];
            if (max_cur < curve_vals[curve_name][i])
                max_cur = curve_vals[curve_name][i];
        }
        if (max_value < max_cur) {
            max_value = max_cur;
            max_value_k = curve_name;
        }
        if (min_value > min_cur) {
            min_value = min_cur;
            min_value_k = curve_name;
        }
    }

    // grid line functions
    function x_grid() {
        return d3.svg.axis()
            .scale(x_scale)
            .orient('bottom')
            .ticks(5);
    }

    function y_grid() {
        return d3.svg.axis()
            .scale(y_scale)
            .orient('left')
            .ticks(5);
    }

    function makeCircles(circleData, k, color, curveTitle) {
        // Points along the line
        svg.selectAll("circle.line")
            .data(circleData)
            .enter().append("circle")
            .attr("class", "line"+k)
            .attr("cx", function(d) { return x_scale(d[0]); })
            .attr("cy", function(d) { return y_scale(d[1]); })
            .attr("r", 2.5)
            .style("fill", color)
            .on("mouseover", function() {
                d3.select(this)
                    .attr('r', 6)
                    .text(circleX + ", " + circleY)
                    .style("fill", "gray");
                var circleX = d3.select(this.__data__[0]);
                circleX = circleX.toString();

                var circleY = d3.select(this.__data__[1]);
                circleY = circleY.toString();

                textBottom.text(curveTitle+" point value (x/y): " + circleX + ", " + circleY);

            }).on("mouseout", function() {
                d3.select(this)
                    .attr('r', 2.5)
                    .style("fill", color);
            });
    }

    var margin = {top: 55, right: 10, bottom: 60, left: 60};
    var width = 450 - margin.left - margin.right;
    var height = 380 - margin.top - margin.bottom;
    var x_scale;
    var y_scale;

    if (curveType == 'hc') {
        x_scale = d3.scale.log().range([0, width]).domain([d3.min(yAxisVariable), d3.max(yAxisVariable)]);
        y_scale = d3.scale.log().range([0, height]).domain([max_value, min_value]);
    } else if (curveType == 'uhs') {
        x_scale = d3.scale.linear().range([0, width]).domain([d3.min(yAxisVariable), d3.max(yAxisVariable)]);
        y_scale = d3.scale.linear().range([0, height]).domain([max_value, min_value]);
    }

    var xAxis = [], xAxis_n = 1;
    var xAxis_vals = [];

    xAxis_n = parseInt(Math.ceil(yAxisVariable.length / 5));
    if (xAxis_n > 4)
        xAxis_n = 4;

    for (var i = 0 ; i < xAxis_n ; i++) {
        xAxis_vals[i] = [];
        for (var e = i ; e < yAxisVariable.length ; e += xAxis_n) {
            xAxis_vals[i].push(yAxisVariable[e]);
        }
        if (curveType == 'hc') {
            xAxis[i] = d3.svg.axis()
                .scale(x_scale)
                .ticks(4)
                .innerTickSize(i === 0 ? 8 : 4)
                .outerTickSize(0)
                .tickValues(xAxis_vals[i])
                .orient("bottom");

        } else if (curveType == 'uhs') {
            xAxis[i] = d3.svg.axis()
                .scale(x_scale)
                .ticks(4)
                .orient("bottom");
        }

        if (i === 0) {
            // FIXME: we have to check this
            xAxis[i].tickFormat(function (d) { return d; });
        }
        else {
            xAxis[i].tickFormat('');
        }
    }

    var yAxis = d3.svg.axis()
        .scale(y_scale)
        .orient("left");

    var line = d3.svg.line()
        .x(function(d,i) {
            return x_scale(d[0]);
        })
        .y(function(d) {
            return y_scale(d[1]);
        });

    var svg = d3.select("#chartDialog").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // grid lines
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .attr('opacity', 0.6)
        .call(x_grid()
            .tickSize(-height, 0, 0)
            .tickFormat('')
        );

    svg.append("g")
        .attr("class", "grid")
        .attr('opacity', 0.6)
        .call(y_grid()
            .tickSize(-width, 0, 0)
            .tickFormat('')
        );

    legend = d3.select("#chartDialog").append("svg")
        .attr("height", 35*(selectedCurves.length - 1));

    for (var i = 0; i < selectedCurves.length; i++) {

        var curve_name = selectedCurves[i];

        if (curveType == 'hc' && curve_name == "iml")
            continue;
        if (curveType == 'uhs' && curve_name == "periods")
            continue;

        var data = curve_coup[curve_name];

        svg.append("path")
            .data([data])
            .attr("class", "line"+i)
            .attr("d", line);

        // Update the css for each line
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

        var gray = "A0A0A0";
        var color = colors[i % colors.length];
        $(".line"+i).css({'fill':'none','opacity':'0.4', 'stroke':'black'});

        var str = selectedCurves[i];
        str = str.replace(/_/g, " ");
        var curveTitle = capitalize(str);

        makeCircles(data, i, color, curveTitle);

        legend.append("text")
            .attr("x", 90)
            .attr("y", 20*(i+1))
            .attr("dy", ".35em")
            .text(curveTitle);

        legend.append("svg:circle")
            .attr("cy", 20*(i+1))
            .attr("cx", 80)
            .attr("r", 3)
            .style("fill", color);

        $("."+selectedCurves[i]).css({'stroke':colors[i]});
    }

    for (i = 0 ; i < xAxis_n ; i++) {
        var g = svg.append("g");

        g.attr("class", "x axis");

        g.attr("transform", "translate(0," + height + ")")
        .call(xAxis[i]);
        if (i == (xAxis_n - 1))
            g.append("text")
            .attr("x", 160)
            .attr("y", 30)
            .attr("dy", ".71em")
            .attr("text-anchor", "middle")
            .style("font-size","12px")
            .text(xAxisLable);
    }
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -60)
        .attr("x", -20)
        .attr("dy", ".71em")
        .style("font-size","12px")
        .style("text-anchor", "end")
        .text(yAxisLable);

    textTopTitle = svg.append("text")
        .attr("x", 0)
        .attr("y", -47)
        .attr("dy", ".35em")
        .style("font-weight", "bold")
        .attr("font-size","14px")
        .text(AppVars.mappedValue);

    textTopSubTitle = svg.append("text")
        .attr("x", 0)
        .attr("y", -32)
        .attr("dy", ".35em")
        .attr("font-size","12px")
        .text(chartHeader);

    textTopSubTitle = svg.append("text")
        .attr("x", 0)
        .attr("y", -20)
        .attr("dy", ".35em")
        .attr("font-size","12px")
        .text("(Lon/Lat): "+lon+", "+lat);

    textBottom = svg.append("text")
        .attr("x", 0)
        .attr("y", 315)
        .attr("dy", ".35em")
        .style("font-size","11px")
        .text('');

    $('#chartDialog').append('<div id="downloadCurve"><p style="color: blue;">Download Curve</p></div>');
    $('#downloadCurve').on("hover", function(){
        $(this).css("cursor", "pointer");
    });

    var h = $("#chartDialog").height();
    h = h + 40;
    $("#chartDialog").css({"height": h+"px"});

    // Prep data for download to CSV
    $('#downloadCurve').click(function(event) {
        var csvHeader = selectedCurves;
        var csvData = [];
        csvData = csvData.concat(csvHeader);
        csvData.push("investigationTime");
        csvData.push("poE");
        csvData.push("lon");
        csvData.push("lat");
        csvData = JSON.stringify(csvData);
        csvData += lineBreak;
        var quotationMark = '"';

        for (var k in selectedCurves) {
            curve_name = selectedCurves[k];
            var curveValue = chartData[curve_name];
            csvData = csvData.concat(quotationMark);
            csvData = csvData.concat(curveValue);
            csvData = csvData.concat(quotationMark);
        }

        csvData += ',' + invest_time + ',' + poe + ',' + lon + ',' + lat;

        csvData = csvData
            .replace(/lineBreak/, '\r\n')
            .replace(/\[/g, '')
            .replace(/\]/g, '')
            .replace(/''/g, '","');
        downloadJSON2CSV(csvData);
    });
} //End chart
