
/////////////////////////////////////
//////// Input Hazard Chart /////////
/////////////////////////////////////

function hazardInputD3Chart(mfdsJsonObj) {

    var mappedValue1 = AppVars.mappedValue.split(':')[0];
    var mappedValue2 = AppVars.mappedValue.substring(AppVars.mappedValue.indexOf(":") + 1);

    var xAxisLable, yAxisLable, yAxisVariable, curve_vals, curve_coup, curve_name, colors;
    var min_value = 1000.0, min_value_k = '', max_value = -1, max_value_k = '';
    var selectedCurves = [];
    // associative array of arrays of values
    curve_vals = [];

    yAxisLable = 'Number of events / year';
    xAxisLable = 'Magnitude';

    // find the min and max value when there are multipe MFDs
    var keys = Object.keys(mfdsJsonObj).length
    var max = [];
    for (var k in mfdsJsonObj) {
        for (var i = 0; i < mfdsJsonObj[k].mags.length; i++) {
            max.push(mfdsJsonObj[k].mags[i]);
        }
    }

    function findMaxMagValue( max ){
        return Math.max.apply( Math, max );
    };

    function findMinMagValue( max ){
        return Math.min.apply( Math, max );
    };

    var multipleMfdsMinValue = findMinMagValue(max);
    var multipleMfdsMaxValue = findMaxMagValue(max);

    // prep data for multiple curve plots
    var multiplePlotData = [];
    var allyAxisVariable = [];

    for (var m in mfdsJsonObj) {
        var bar = [];
        for (var i = 0; i < mfdsJsonObj[m].mags.length; i++) {
            allyAxisVariable.push(mfdsJsonObj[m].mags[i]);
            bar.push([mfdsJsonObj[m].mags[i], mfdsJsonObj[m].occur_rates[i]]);
            multiplePlotData[m] = bar;
        }
    }

    for (var k in mfdsJsonObj) {
        curve_name = k;
        curve_vals[curve_name] = mfdsJsonObj[k].occur_rates;
        selectedCurves.push(k);
        yAxisVariable = mfdsJsonObj[k].mags;
    }

    for (var k in selectedCurves) {
        var curve_name = selectedCurves[k];
        var min_cur = 1000.0, max_cur = -1;

        for (var i = 0 ; i < curve_vals[curve_name].length ; i++) {
            if (curve_vals[curve_name][i] == 0)
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
                var circleX = d3.select(this.__data__[0]);
                circleX = circleX.toString();

                var circleY = d3.select(this.__data__[1]);
                circleY = circleY.toString();
                circleY = circleY.split(","[0]);

                textTop.text(curveTitle+" point value (x/y): " + circleX + ", " + circleY);

            });
    }

    var margin = {top: 55, right: 80, bottom: 45, left: 60};
    var width = 580 - margin.left - margin.right;
    var height = 380 - margin.top - margin.bottom;
    if (keys == 1) {
        var x_scale = d3.scale.log().range([0, width]).domain([d3.min(yAxisVariable), d3.max(yAxisVariable)]);
    } else {
        var x_scale = d3.scale.log().range([0, width]).domain([multipleMfdsMinValue, multipleMfdsMaxValue]);
    }

    var y_scale = d3.scale.log().range([0, height]).domain([max_value, min_value]);

    var xAxis = [], xAxis_n = 1;
    var xAxis_vals = [];

    xAxis_n = parseInt(Math.ceil(allyAxisVariable.length / 5));

    if (xAxis_n > 4)
        xAxis_n = 4;

    for (var i = 0 ; i < xAxis_n ; i++) {
        xAxis_vals[i] = [];
        for (var e = i ; e < allyAxisVariable.length ; e += xAxis_n) {
            xAxis_vals[i].push(allyAxisVariable[e]);
        }

        xAxis[i] = d3.svg.axis()
            .scale(x_scale)
            .ticks(4)
            .innerTickSize(i == 0 ? 8 : 4)
            .outerTickSize(0)
            .tickValues(xAxis_vals[i])
            .orient("bottom");

        if (i == 0) {
            xAxis[i].tickFormat(function (d) { return d; })
        }
        else {
            xAxis[i].tickFormat(function (d) { return ''; })
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
        })

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

    svg.append("text")
        .attr("x", 460)
        .attr("y", -25)
        .attr("dy", ".35em")
        .text("MFDS *");

    for (k in selectedCurves) {
        var curve_name = selectedCurves[k];
        var data = multiplePlotData[curve_name];

        // Update the css for each line
        colors = [
            "#4020F7",
            "#1869DB",
            "#158406",
            "#08A100",
            "#99C400",
            "#E76F00",
            "#FF3F00",
            "#FFFA00",
            "#4CFF06",
            "#29FF89",
            "#51DFFF",
            "#7782FF",
            "#DA97FF",
            "#FFBDE5",
            "#377CFC"
        ];

        var gray = "darkGray";
        $(".line"+k).css({'fill':'none','opacity':'0.5', 'stroke':gray});

        var color = colors[k % colors.length];

        var str = selectedCurves[k];
        str = str.replace(/_/g, " ");
        var curveTitle = capitalize(str)

        makeCircles(data, k, color, curveTitle);

        svg.append("text")
            .attr("x", 465)
            .attr("y", 0+(k*20))
            .attr("dy", ".35em")
            .text(curveTitle);

        svg.append("svg:circle")
            //.attr("cx", 50)
            .attr("cy", 0+(k*20))
            .attr("cx", 460)
            .attr("r", 3)
            .style("fill", color)

        $("."+selectedCurves[k]).css({'stroke':colors[k]});
    }

    for (i = 0 ; i < xAxis_n ; i++) {
        var g = svg.append("g");
        g.attr("class", "x axis")
        g.attr("transform", "translate(0," + height + ")")
        .call(xAxis[i]);
        if (i == (xAxis_n - 1))
            g.append("text")
            .attr("x", width / 2)
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
        .attr("x", -120)
        .attr("dy", ".71em")
        .style("font-size","12px")
        .style("text-anchor", "middle")
        .text(yAxisLable);

    textTopTitle = svg.append("text")
        .attr("x", 0)
        .attr("y", -47)
        .attr("dy", ".35em")
        .style("font-weight", "bold")
        .attr("font-size","14px")
        .text(mappedValue1);

    textTopTitle2 = svg.append("text")
        .attr("x", 0)
        .attr("y", -30)
        .attr("dy", ".35em")
        .style("font-weight", "bold")
        .attr("font-size","14px")
        .text(mappedValue2);

    textTop = svg.append("text")
        .attr("x", 0)
        .attr("y", -15)
        .attr("dy", ".35em")
        .style("font-size","11px")
        .text('');

    $('#chartDialog').append('<div>* Magnitude Frequency Distributions</div>');
    $('#chartDialog').append('<div id="downloadCurve"><font color="blue">Download Curve</font></div>');
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

        //csvData = csvData.concat(csvHeader);
        csvData.push("mfds");
        csvData.push("binWidth");
        csvData.push("minMag");
        csvData.push("occurRate");
        csvData.push("mags");
        csvData = JSON.stringify(csvData);
        var lineBreak = "lineBreak";
        csvData = csvData.concat(lineBreak);
        var quotationMark = '"';

        csvData = csvData
            .replace(/lineBreak/, '\r\n')
            .replace(/\[/g, '')
            .replace(/\]/g, '')
            .replace(/","/g, ',')
            .replace(/"/g, '');

        for (var k in selectedCurves) {
            curve_name = selectedCurves[k];
            var curveValue = mfdsJsonObj[curve_name];

            csvData += curve_name;
            csvData += ',';
            csvData += curveValue.bin_width;
            csvData += ',';
            csvData += curveValue.min_mag;
            csvData += ',';
            csvData += quotationMark;
            csvData += curveValue.occur_rates;
            csvData += quotationMark;
            csvData += ',';
            csvData += quotationMark;
            csvData += curveValue.mags;
            csvData += quotationMark;
            csvData += '\r\n';
        }

        downloadJSON2CSV(csvData);
    });
} //End chart

