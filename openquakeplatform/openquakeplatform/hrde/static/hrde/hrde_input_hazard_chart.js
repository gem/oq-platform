
/////////////////////////////////////
//////// Input Hazard Chart /////////
/////////////////////////////////////

function hazardInputD3Chart(mfdsJsonObj, latlng) {

    var mappedValue1 = AppVars.mappedValue.split(':')[0];
    var mappedValue2 = AppVars.mappedValue.substring(AppVars.mappedValue.indexOf(":") + 1);
    var barWidth;

    // associative array of arrays of values
    curve_vals = [];

    yAxisLable = 'Number of events / year';
    xAxisLable = 'Magnitude';

    // find the min and max value when there are multipe MFDs
    var allOccurRatesArray = [];
    var chartData = [];
    for (var k in mfdsJsonObj) {
        for (var i = 0; i < mfdsJsonObj[k].mags.length; i++) {
            // Append only values > 0
            if (mfdsJsonObj[k].occur_rates[i] > 0) {
                allOccurRatesArray.push(mfdsJsonObj[k].occur_rates[i]);
                var tempObj = {
                    mags: mfdsJsonObj[k].mags[i],
                    occur_rates: mfdsJsonObj[k].occur_rates[i]
                };
            chartData.push(tempObj);
            }
        }
    }

    if (chartData.length >= 30) {
        barWidth = 10;
    } else if (chartData.length < 30 && chartData.length >= 15) {
        barWidth = 20;
    } else if (chartData.length < 15) {
        barWidth = 30;
    }

    Array.prototype.max = function() {
        return Math.max.apply(null, this);
    };

    Array.prototype.min = function() {
        return Math.min.apply(null, this);
    };

    var max = allOccurRatesArray.max();
    var min = allOccurRatesArray.min();

    var margin = {top: 60, right: 60, bottom: 80, left: 80},
        width = 600 - margin.left - margin.right,
        height = 440 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], 0.1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.log()
        .range([height, 0]).domain([min, max]);

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6"]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom")
        .ticks(5);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5);

    var svg = d3.select("#chartDialog").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = chartData;

    var keys = d3.keys(data[0]).filter(function(key) { return key !== "mags"; });

    data.forEach(function(d) {
        d.ages = keys.map(function(name) { return {name: name, value: +d[name]}; });
    });

    x0.domain(data.map(function(d) { return d.mags; }));
    x1.domain(keys).rangeRoundBands([0, x0.rangeBand()]);
    //y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

    // grid line functions
    function make_x_axis() {
        return d3.svg.axis()
            .scale(x0)
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

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-90)";
                })
        .append("text");

    // x axis lable
    svg.append("text")
        .attr("x", width / 2 )
        .attr("y",  360)
        .style("font-size","14px")
        .style("text-anchor", "middle")
        .text(xAxisLable);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -120)
        .attr("y", 480)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .attr("font-size","14px")
        .text(yAxisLable);

    var name = svg.selectAll(".name")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x0(d.mags) + ",0)"; });

    name.selectAll("rect")
        .data(function(d) { return d.ages; })
        .enter().append("rect")
        .attr("width", barWidth)
        .attr("x", function(d) { return (x1(d.mags)+25); })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .style("fill", function(d) { return color(d.mags); });

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
        .attr("font-size","14px")
        .text(mappedValue2 + ' lat/long ' + Math.round(latlng.lat * 100) / 100 + '/' + Math.round(latlng.lng * 100) / 100 );

    $('#chartDialog').append('<div id="downloadCurve"><p style="color: blue;">Download Curve</p></div>');
    $('#downloadCurve').on('hover', function(){
        $(this).css('cursor', 'pointer');
    });

    // Prep data for download to CSV
    $('#downloadCurve').click(function() {
        // access the mag and occurance rate arrays
        var magsArray, occurRatesArray;
        for (var k in mfdsJsonObj) {
            magsArray = mfdsJsonObj[k].mags;
            occurRatesArray = mfdsJsonObj[k].occur_rates;
        }

        var lat = latlng.lat;
        var lng = latlng.lng;

        var csvData = [];
        csvData = csvData.concat('magnitude');
        csvData = csvData.concat('occurrence_rate');
        csvData = csvData.concat('lon');
        csvData = csvData.concat('lat');
        csvData = JSON.stringify(csvData);
        var lineBreak = 'lineBreak';
        csvData += lineBreak;
        csvData += '"' + magsArray + '","' + occurRatesArray + ',' + lng + ',' + lat;
        csvData = csvData
            .replace(/lineBreak/, '\r\n')
            .replace(/\[/g, '')
            .replace(/\]/g, '')
            .replace(/''/g, '","');
        downloadJSON2CSV(csvData);
    });
} //End chart

