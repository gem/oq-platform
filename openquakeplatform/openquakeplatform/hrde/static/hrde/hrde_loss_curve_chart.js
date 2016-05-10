
////////////////////////////////////////////
////////////// Loss Curve Chart ////////////
////////////////////////////////////////////

function LossD3Chart(chartData, assetArray, lat, lon) {
    var lat, lon, xAxisLable, yAxisLable, curve_vals, curve_coup, curve_name, colors;
    var min_value = 1000.0, min_value_k = '', max_value = -1, max_value_k = '';

    /* associative array of arrays of values */
    curve_valsX = [];
    curve_valsY = [];
    /* associative array of arrays [ x, y ] to describe the curve on the plane */
    curve_coup = [];

    /* associative array of curves produced with d3.line */
    yAxisLable = "Probability of exceedance";

    var selectedCurves = assetArray;

    for (var i = 0 ; i < assetArray.length ; i++) {
        var curve_name = selectedCurves[i];
        curve_valsX[curve_name] = chartData[curve_name][0].split(",");
        curve_valsY[curve_name] = chartData[curve_name][1].split(",");
    }

    var length = (curve_valsX[curve_name].length);

    for (var k in selectedCurves) {
        var curve_name = selectedCurves[k];
        var i;
        for (i = 0 ; i < length ; i++) {
            curve_valsX[curve_name][i] = Math.log(parseFloat(curve_valsX[curve_name][i]));
            curve_valsY[curve_name][i] = parseFloat(curve_valsY[curve_name][i]);
        }
    }

    for (var k in selectedCurves) {
        var curve_name = selectedCurves[k];
        curve_coup[curve_name] = [];

        for (var i = 0 ; i < length ; i++) {
            if (curve_valsX[curve_name][i] > 0.0) {
                curve_coup[curve_name].push([curve_valsX[curve_name][i], curve_valsY[curve_name][i] ]);
            }
        }
    }

    for (var k in selectedCurves) {
        var curve_name = selectedCurves[k];
        var min_cur = 1000.0, max_cur = -1;

        for (var i = 0 ; i < length ; i++) {
            if (min_cur > curve_valsX[curve_name][i])
                min_cur = curve_valsX[curve_name][i];
            if (max_cur < curve_valsX[curve_name][i])
                max_cur = curve_valsX[curve_name][i];
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
            .orient("bottom")
            .ticks(5);
    }

    function y_grid() {
        return d3.svg.axis()
            .scale(y_scale)
            .orient("left")
            .ticks(5);
    }

    function makeCircles(circleData, k, color, curve_name) {
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

                textTop.text(curve_name+" point value (x/y): " + Math.pow(10, circleX) + ", " + circleY);

            }).on("mouseout", function() {
                d3.select(this)
                    .attr('r', 2.5)
                    .style("fill", color);
            });
    }

    var margin = {top: 55, right: 100, bottom: 45, left: 60};
    var width = 480 - margin.left - margin.right;
    var height = 380 - margin.top - margin.bottom;

    var x_scale = d3.scale.linear().domain([0, max_value]).range([0, width]);
    var y_scale = d3.scale.linear().domain([0, 1]).range([height, 0]);

    var xAxis = d3.svg.axis()
        .ticks(6)
        .scale(x_scale)
        .orient("bottom");

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

    for (var k = 0; k < selectedCurves.length; k++) {
        var curve_name = selectedCurves[k];
        var data = curve_coup[curve_name];

        svg.append("path")
            .data([curve_coup[curve_name]])
            .attr("class", "line"+k)
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

        var gray = "#A0A0A0";
        $(".line"+k).css({'fill':'none','opacity':'0.5', 'stroke':gray});

        var color = colors[k % colors.length];

        makeCircles(data, k, color, curve_name);

        svg.append("text")
            .attr("x", 360)
            .attr("y", 20*(k))
            .attr("dy", ".35em")
            .text(selectedCurves[k]);

        svg.append("svg:circle")
            .attr("cx", 350)
            .attr("cy", 20*(k))
            .attr("r", 3)
            .style("fill", color);

        $("."+selectedCurves[k]).css({'stroke':colors[k]});
    }

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("x", 160)
        .attr("y", 30)
        .attr("dy", ".71em")
        .attr("text-anchor", "middle")
        .style("font-size","12px")
        .text("Losses");

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

    textTopLonLat = svg.append("text")
        .attr("x", 0)
        .attr("y", -32)
        .attr("dy", ".35em")
        .attr("font-size","12px")
        .text("Location (Lon/Lat): "+lon+", "+lat);

    textTopLable = svg.append("text")
        .attr("x", 0)
        .attr("y", -47)
        .attr("dy", ".35em")
        .style("font-weight", "bold")
        .attr("font-size","12px")
        .text('Loss Curve');

    textTop = svg.append("text")
        .attr("x", 0)
        .attr("y", -15)
        .attr("dy", ".35em")
        .attr("font-size","11px")
        .text('');

    $('#chartDialog').append('<div id="downloadCurve"><p style="color: blue;">Download Curve</p></div>');

    $('#downloadCurve').on("hover", function(){
        $(this).css("cursor", "pointer");
    });

    // Prep data for download to CSV
    // TODO extend this when there is more definition of the data
    $('#downloadCurve').click(function(event) {
        var jsonObject = JSON.stringify(chartData);
        jsonObject = jsonObject
            .replace(/{/g, '')
            .replace(/}/g, '')
            .replace(/\],/g, '\r\n')
            .replace(/\[/g, '')
            .replace(/\]/g, '')
            .replace(/:/g, ','+lon+','+lat+',');
        downloadJSON2CSV(jsonObject);
    });
} //End chart
