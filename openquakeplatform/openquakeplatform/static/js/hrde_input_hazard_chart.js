
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
    var keys = Object.keys(mfdsJsonObj).length;
    var max = [];
    var chartData = [];
    for (var k in mfdsJsonObj) {
        for (var i = 0; i < mfdsJsonObj[k].mags.length; i++) {
            max.push(mfdsJsonObj[k].mags[i]);
            var tempObj = {
                mags: mfdsJsonObj[k].mags[i],
                occur_rates: mfdsJsonObj[k].occur_rates[i]
            };
            chartData.push(tempObj);
        }
    }

    var margin = {top: 60, right: 20, bottom: 50, left: 60},
        width = 480 - margin.left - margin.right,
        height = 440 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6"]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2r"));

    var svg = d3.select("#chartDialog").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = chartData;

    var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "occur_rates"; });

    data.forEach(function(d) {
      d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
    });

    x0.domain(data.map(function(d) { return d.occur_rates; }));
    x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("y", 30)
        .attr("x", 225)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-weight", "bold")
        .text("Damage State");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -55)
        .attr("x", -90)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-weight", "bold")
        .attr("font-size","14px")
        //.text(respVar);

    var name = svg.selectAll(".name")
        .data(data)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x0(d.occur_rates) + ",0)"; });

    name.selectAll("rect")
        .data(function(d) { return d.ages; })
      .enter().append("rect")
        .attr("width", 35)
        .attr("x", function(d) { return (x1(d.occur_rates)+25); })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .style("fill", function(d) { return color(d.occur_rates); });

     textTopLable = svg.append("text")
        .attr("x", 0)
        .attr("y", -35)
        .attr("dy", ".35em")
        .style("font-weight", "bold")
        .attr("font-size","14px")
        //.text(assessmentType+ ' ' +dlName);

    var legend = svg.selectAll(".legend")
        .data(ageNames.slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
} //End chart

