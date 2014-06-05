/*
   Copyright (c) 2014, GEM Foundation.

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

/////////////////////////////////
//////// Jquery Stuff ///////////
/////////////////////////////////

// Remove GeoNode artifact
$(".span12").remove();

$(function() {
    $("#fraAccordion").accordion({
        collapsible: true,
        //heightStyle: "fill"
    });
});

/////////////////////////////////
/// Create Fragility Metadata ///
/////////////////////////////////

var assessmentType = gl.fields.type_of_assessment;
var id = gl.fields.fragility_func.fields.general_information;
var funcName = gl.fields.name;
var year = gl.fields.year;
var webLink = gl.fields.web_link;
var genComments = gl.fields.general_comments;
var useCase = gl.fields.use_case_information;
var authors = gl.fields.authors;
var taxType = gl.fields.taxonomy_type.fields.name;
var taxText = gl.fields.taxonomy_text;
var category = gl.fields.category;
var publication = gl.fields.publication_conference_name;
var method = gl.fields.fragility_func.fields.method_of_estimation;
var articleTitle = gl.fields.article_title;
var funcDistrType = gl.fields.fragility_func.fields.func_distr_type;
var imtTitle = gl.fields.fragility_func.fields.predictor_var.fields.intensity_measure_type;
var imtUnite = gl.fields.fragility_func.fields.predictor_var.fields.intensity_measure_unit;
var countriesArray = [];
var geoApp = gl.fields.geo_applicability.fields.countries;
var typeOfPeriod = gl.fields.fragility_func.fields.predictor_var.fields.type_of_period;
var period = gl.fields.fragility_func.fields.predictor_var.fields.period;
if (funcDistrType == "Continuous") {
    var cvOfMean = gl.fields.fragility_func.fields.func_distr_frag_cont.fields.coeff_variation_mean;
    var cvOfSD = gl.fields.fragility_func.fields.func_distr_frag_cont.fields.coeff_variation_std_dev;
}

for (var i = geoApp.length - 1; i >= 0; i--) {
    var tmp = " "+geoApp[i].fields.name;
    countriesArray.push(tmp);
}


// Generral information
if (assessmentType !== undefined && assessmentType !== "") {
    $("#genInfo").append('<p><b>Assessment Type: </b>'+assessmentType+'</p>');
}

if (funcName !== undefined && funcName !== "") {
    $("#genInfo").append('<p><b>Name: </b>'+funcName+' ('+id+')</p>');
}

if (category !== undefined && category !== "") {
    $("#genInfo").append('<p><b>Category: </b>'+category+'</p>');
}

if (taxText !== undefined && taxText !== "") {
    $("#genInfo").append('<p><b>Taxonomy: </b>'+taxText+' ('+taxType+')</p>');
}

if (articleTitle !== undefined && articleTitle !== "") {
    $("#genInfo").append('<p><b>Reference: </b>'+articleTitle+' ('+authors+', '+year+') - '+publication+'</p>');
}

if (countriesArray.length > 0) {
    $("#genInfo").append('<p><b>Geographical Applicability: </b>'+countriesArray+'</p>');
}

if (method !== undefined && method !== "") {
    $("#genInfo").append('<p><b>Methodology: </b>'+method+'</p>');
}

if (genComments !== undefined && genComments !== "") {
    $("#genInfo").append('<p><b>General Comments: </b>'+genComments+'</p>');
}

if (useCase !== undefined && useCase !== "") {
    $("#genInfo").append('<p><b>Use Case Information: </b>'+useCase+'</p>');
}


// Modelling information
if (gl.fields.fragility_func.fields.analytical_model_info !== undefined) {
    var analysisType = gl.fields.fragility_func.fields.analytical_model_info.fields.analysis_type.fields.name;
    if (analysisType !== undefined && analysisType !== "") {
        $("#modellingInfo").append('<p><b>Analysis Type: </b>'+analysisType+'</p>');
    }
    
    var modelType = gl.fields.fragility_func.fields.analytical_model_info.fields.model_type;
    if (modelType !== undefined && modelType !== "") {
        $("#modellingInfo").append('<p><b>Model Type: </b>'+modelType+'</p>');
    }
    
    var methodUncertPropag = gl.fields.fragility_func.fields.analytical_model_info.fields.method_uncert_propag;
    if (methodUncertPropag !== undefined && methodUncertPropag !== "") {
        $("#modellingInfo").append('<p><b>Method of Uncertainty Propagation: </b>'+methodUncertPropag+'</p>');
    }
    
    var modelsNum = gl.fields.fragility_func.fields.analytical_model_info.fields.models_num;
    if (modelsNum !== undefined && modelsNum !== "") {
        $("#modellingInfo").append('<p><b>Number of Distinct Structural Models Analysed: </b>'+modelsNum+'</p>');
    }
}

if (gl.fields.fragility_func.fields.empirical_model_info !== undefined) {
    var empiricalDataSrc = gl.fields.fragility_func.fields.empirical_model_info.fields.empirical_data_src;
    if (empiricalDataSrc !== undefined && empiricalDataSrc !== "") {
        $("#modellingInfo").append('<p><b>Source of Empirical Data: </b>'+empiricalDataSrc+'</p>');
    }

    var buildingAggr = gl.fields.fragility_func.fields.empirical_model_info.fields.building_aggr;
    if (buildingAggr !== undefined && buildingAggr !== "") {
        $("#modellingInfo").append('<p><b>Building Aggregation: </b>'+buildingAggr+'</p>');
    }

    var aggrUnitDef = gl.fields.fragility_func.fields.empirical_model_info.fields.aggr_unit_def;
    if (aggrUnitDef !== undefined && aggrUnitDef !== "") {
        $("#modellingInfo").append('<p><b>Definitions of Aggregated Units: </b>'+aggrUnitDef+'</p>');
    }
}

// Statistical Information
if (gl.fields.fragility_func.fields.stat_info !== undefined) {
    var statModel = gl.fields.fragility_func.fields.stat_info.fields.stat_model.fields.name;
    if (statModel !== undefined && statModel !== "") {
        $("#statInfo").append('<p><b>Statistical Model: </b>'+statModel+'</p>');
    }
    
    var statModelFittingMethod = gl.fields.fragility_func.fields.stat_info.fields.stat_model_fitting_method.fields.name;
    if (statModelFittingMethod !== undefined && statModelFittingMethod !== "") {
        $("#statInfo").append('<p><b>Statistical model fitting method: </b>'+statModelFittingMethod+'</p>');
    }
    
    var modelFittingMethodAssumptions = gl.fields.fragility_func.fields.stat_info.fields.model_fitting_method_assumptions;
    if (modelFittingMethodAssumptions !== undefined && modelFittingMethodAssumptions !== "") {
        $("#statInfo").append('<p><b>Model Fitting Method Assumption: </b>'+modelFittingMethodAssumptions+'</p>');
    }
    
    var fitAssessmentGoodness = gl.fields.fragility_func.fields.stat_info.fields.fit_assessment_goodness.fields.name;
    if (fitAssessmentGoodness !== undefined && fitAssessmentGoodness !== "") {
        $("#statInfo").append('<p><b>Goodness of fit assessment (GLM/GAM): </b>'+fitAssessmentGoodness+'</p>');
    }
    
    var procConstrPredInt = gl.fields.fragility_func.fields.stat_info.fields.proc_constr_pred_int.fields.name;
    if (procConstrPredInt !== undefined && procConstrPredInt !== "") {
        $("#statInfo").append('<p><b>Procedure for the Construction of Prediction Intervals: </b>'+procConstrPredInt+'</p>');
    }
}

//////////////////////////////////////////////
/// Create Fragility Curves - Continuous /////
//////////////////////////////////////////////

if(funcDistrType === "Continuous") {
    // Get values out of JSON
    var dataObj = {};
    var chartData = [];
    var iml = [];
    var stddevArray = gl.fields.fragility_func.fields.func_distr_frag_cont.fields.std_dev;
    stddevArray = stddevArray.split(";");
    var meanArray = gl.fields.fragility_func.fields.func_distr_frag_cont.fields.mean;
    meanArray = meanArray.split(";");

    var lastMean = meanArray.length-1;
    var min = gl.fields.fragility_func.fields.predictor_var.fields.minimum_im;
    if (gl.fields.fragility_func.fields.predictor_var.fields.maximum_im === undefined) {
        var max = (2 * meanArray[lastMean]);
    } else {
        var max = gl.fields.fragility_func.fields.predictor_var.fields.maximum_im;
    }
    
    var inc = ((max - min) / 100);
    var limitStatesArray =  gl.fields.fragility_func.fields.limit_states_desc;
    limitStatesArray = limitStatesArray.split(";");
    
    for (var i = 0; i < limitStatesArray.length; i++)
        limitStatesArray[i] = limitStatesArray[i].trim();
    
    for (var i = 0; i < limitStatesArray.length; i++) {
        dataObj[limitStatesArray[i]] = [];
    };
    
    for (var i = 0; i < limitStatesArray.length; i++) {
        dataObj[limitStatesArray[i]] = [parseFloat(meanArray[i]), parseFloat(stddevArray[i])];
    };
    
    // create the x axis values
    for(var i=min; i<max;i=i+inc) {
        iml.push(Math.round(i*1000) / 1000);
    }
    iml.push(max);
    
    for (var k in dataObj) {
        var tmp = makeFragilityFunctionContinuous(dataObj[k][0], dataObj[k][1]);
        chartData[k] = [];
        for (var i = 0; i < iml.length; i++) {
            var val = tmp(iml[i]);
            chartData[k].push([iml[i], val]);
        }
    }
    
    // create the x axis values
    for(var i=min; i<max;i=i+inc) {
        iml.push(Math.round(i*1000) / 1000);
    }
    iml.push(max);
    
    function normalCumulativeProbability(z) {
        var b1 = 0.31938153;
        var b2 = -0.356563782;
        var b3 = 1.781477937;
        var b4 = -1.821255978;
        var b5 = 1.330274429;
        var p = 0.2316419;
        var c2 = 0.3989423;
        if (z > 6.0){
            return 1.0};  // this guards against overflow
        if (z < -6.0){
            return 0.0};
        var a = Math.abs(z);
        var t = 1.0 / (1.0 + a * p);
        var b = c2 * Math.exp((-z)*(z / 2.0));
        var n = ((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t;
        var n = 1.0 - b * n;
        if (z < 0.0){
            n = 1.0 - n};
        return n;
    }
    
    function makeFragilityFunctionContinuous(mean, stddev) {
        var variance = stddev * stddev;
        var sigma = Math.sqrt(Math.log((variance / (mean * mean)) + 1.0));
    
        mu = (mean * mean) / Math.sqrt(variance + mean * mean);
    
        return function(iml) {
           return normalCumulativeProbability((Math.log(iml / mu)) / sigma);
        };
    }
    
    function capitalize(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    
    function fragilityData() {
        $("#fragilityDataDialog").append("<b>Limit States, Mean, Stddev: </b></br>");
        for (var i = 0; i < limitStatesArray.length; i++) {
            var ls = capitalize(limitStatesArray[i]);
            $("#fragilityDataDialog").append(ls +", "+ meanArray[i] +", "+ stddevArray[i] +"</br>");
        } 
    }
    continuousTable();
    buildChart(chartData);

    /////////////////////////////////
    ///// Continuous Data Table /////
    /////////////////////////////////
    
    function continuousTable() {
    
        var aaData = [];

        cvOfMean = cvOfMean.split(";");
        cvOfSD = cvOfSD.split(";");
        
        //var tmp = [];
        var tmp2 = [];
        var tmp3 = [];
        var tmp4 = [];
        var tmp5 = [];

        tmp2.push("Mean");
        tmp3.push("Standard Deviation (SD)");

        if(cvOfMean !== "") {
            tmp4.push("Coefficient of variation of the Mean");
        }

        if (cvOfSD !== "") {
            tmp5.push("Coefficient of variation of the SD");
        }
        
        for (var i = 0; i < limitStatesArray.length; i++) {
            //tmp.push(limitStatesArray[i]);
            tmp2.push(parseFloat(meanArray[i]));
            tmp3.push(parseFloat(stddevArray[i]));
            tmp4.push(parseFloat(cvOfMean[i]));
            tmp5.push(parseFloat(cvOfSD[i]));
        }

        aaData.push(tmp2, tmp3);

        if(cvOfMean !== "") {
            aaData.push(tmp4);
        }
        if(cvOfSD !== "") {
            aaData.push(tmp5);
        }

        $('#fragility-table-continuous').append(
            '<thead id="tablehead">'+
                '<tr>'+
                    '<th rowspan="1">Intensity Measure</th>'+
                    '<th colspan="4">'+imtTitle+'('+imtUnite+')</th>'+
                '</tr>'+
                '<tr>'+
                    '<th>placeHolder</th>'+
                    '<th>placeHolder</th>'+
                    '<th>placeHolder</th>'+
                    '<th>placeHolder</th>'+
                    '<th>placeHolder</th>'+
                '</tr>'+
            '</thead>'
        );
    
        $('#fragility-table-continuous').dataTable({
            "aaData": aaData,
            "aoColumns": [
                {"sTitle": "Damage State:"},
                {"sTitle": limitStatesArray[0]},
                {"sTitle": limitStatesArray[1]},
                {"sTitle": limitStatesArray[2]},
                {"sTitle": limitStatesArray[3]}
            ],
            "aaSorting": [],  
            "bLengthChange": false,
            "bFilter": false
        });
    };


    ////////////////////////////////////////////
    /// Create Fragility Curves - Discrete /////
    ////////////////////////////////////////////

} else if (funcDistrType === "Discrete") {
    var chartData = [];

    var limitStatesArray =  gl.fields.fragility_func.fields.limit_states_desc;
    var limitStatesArray = limitStatesArray.split(";");
    var limitStateVal = gl.fields.fragility_func.fields.func_distr_frag_discr.fields.limit_state_prob_exceed;
    limitStateVal = limitStateVal.split('\n');

    var bar = gl.fields.fragility_func.fields.func_distr_frag_discr.fields.limit_state_prob_exceed;
    bar = bar.split(";");
    // yAxisVals is used to get the max value for the chart
    yAxisVals = [];
    for (var i = 0; i < bar.length; i++) {
        yAxisVals.push(parseFloat(bar[i]));
    };

    for (var i = 0; i < limitStateVal.length; i++) {
        limitStateVal[limitStatesArray[i]] = limitStateVal[i].split(";");
    };
    limitStateVal.shift();
    limitStateVal.shift();
    limitStateVal.shift();
    limitStateVal.shift();

    var predVarVal = gl.fields.fragility_func.fields.func_distr_frag_discr.fields.predictor_var_im_val;
    predVarVal = predVarVal.split(";");

    for (var i = 0; i < limitStatesArray.length; i++) {
        chartData[limitStatesArray[i]] = [];
    };

    for(var k in chartData) {
        var bar = [];
        for (var i = 0; i < predVarVal.length; i++) {
            var foo = [parseFloat(predVarVal[i]), parseFloat(limitStateVal[k][i])];
            bar.push(foo);  
        };
        chartData[k] = bar;
    };

    discreteTable();
    buildChart(chartData);
}


////////////////////////////////
///// Discrete Data Table //////
////////////////////////////////

function discreteTable() {
    var aaData = [];

    var limitState = gl.fields.fragility_func.fields.func_distr_frag_discr.fields.limit_state_prob_exceed;
    limitState = limitState.split('\n');

    for (var i = limitState.length - 1; i >= 0; i--) {
        limitState[i] = limitState[i].split(";");
    };

    if (gl.fields.fragility_func.fields.func_distr_frag_discr.fields.limit_state_prob_exceed_05 !== "") {
        var limitState05 = gl.fields.fragility_func.fields.func_distr_frag_discr.fields.limit_state_prob_exceed_05;
        var limitState95 = gl.fields.fragility_func.fields.func_distr_frag_discr.fields.limit_state_prob_exceed_95;
        limitState05 = limitState05.split('\n');
        limitState95 = limitState95.split('\n');

        for (var i = limitState05.length - 1; i >= 0; i--) {
            limitState05[i] = limitState05[i].split(";");
        };

        for (var i = limitState95.length - 1; i >= 0; i--) {
            limitState95[i] = limitState95[i].split(";");
        };

        for (var i = predVarVal.length - 1; i >= 0; i--) {
            var tmp = [];
            tmp.push(predVarVal[i]);
            for (var j = limitState.length - 1; j >= 0; j--) {
                tmp.push(limitState[j][i]);
                tmp.push(limitState05[j][i]);
                tmp.push(limitState95[j][i]);
            };
            aaData.push(tmp);
        };

        // build the table header
        var header = [];
        header.push({"sTitle": "PGA (g)"});
        var placeHolder = "<th>place holder</th>";
        var length = limitStatesArray.length;

        for (var i = 0; i < limitStatesArray.length; i++) {
            var tmpObj = {};
            tmpObj.sTitle = limitStatesArray[i]
            header.push(tmpObj);
            placeHolder = placeHolder.concat("<th>place holder</th>");
        };

        for (var i = 0; i < limitStatesArray.length; i++) {
            var tmpObj = {};
            tmpObj.sTitle = limitStatesArray[i]
            header.push(tmpObj);
            placeHolder = placeHolder.concat("<th>place holder</th>");
        };

        for (var i = 0; i < limitStatesArray.length; i++) {
            var tmpObj = {};
            tmpObj.sTitle = limitStatesArray[i]
            header.push(tmpObj);
            placeHolder = placeHolder.concat("<th>place holder</th>");
        };

        $('#fragility-table-discrete').append(
            '<thead id="tablehead">'
                + '<tr>'
                    + '<th rowspan="1">'+imtTitle+' '+imtUnite+'</th>'
                    + '<th colspan="4">Probability of limit state exceedance</th>'
                    + '<th colspan="4">Probability of limit state exceedance (5% prediction interval)</th>'
                    + '<th colspan="4">Probability of limit state exceedance (95% prediction interval)</th>'
                +'</tr>'
                +'<tr>'
                    +placeHolder
                +'</tr>'
            +'</thead>'
        );

        $('#fragility-table-discrete').dataTable({
            "aaData": aaData,
            "aoColumns": header,
            "bLengthChange": false,
            "bFilter": false
        });

    } else {
        for (var i = predVarVal.length - 1; i >= 0; i--) {
            var tmp = [];
            tmp.push(predVarVal[i]);
            for (var j = limitState.length - 1; j >= 0; j--) {
                tmp.push(limitState[j][i]);
            };
            aaData.push(tmp);
        };

        predVarVal = predVarVal.map(parseFloat);

        // build the table header
        var header = [];
        header.push({"sTitle": "PGA (g)"});

        var placeHolder = "<th>place holder</th>";
        var length = limitStatesArray.length;

        for (var i = 0; i < limitStatesArray.length; i++) {
            var tmpObj = {};
            tmpObj.sTitle = limitStatesArray[i]
            header.push(tmpObj);
            placeHolder = placeHolder.concat("<th>place holder</th>");
        };

        $('#fragility-table-discrete').append(
            '<thead id="tablehead">'
                +'<tr>'
                    +'<th rowspan="1">Intensity Measure</th>'
                    +'<th colspan="'+length+'">Probability of limit state exceedance</th>'
                +'</tr>'
                +'<tr>'
                    +placeHolder
                +'</tr>'
            +'</thead>'
        );

        $('#fragility-table-discrete').dataTable({
            "aaData": aaData,
            "aoColumns": header,
            "bLengthChange": false,
            "bFilter": false
        });
    }
};


///////////////////////////
///// Fragility Chart  ////
///////////////////////////

function buildChart(chartData) {

    //prep the X axis lable
    var xAxisLable = "";
    if (imtTitle === "PGA") {
        xAxisLable = imtTitle+" ["+imtUnite+"]";
    } else if (imtTitle === "Sa(T)") {
        xAxisLable = "Sa (" +typeOfPeriod+" = "+period+"s ["+imtUnite+"]";
    } else if (imtTitle === "Sd(T)") {
        xAxisLable = "Sd (" +typeOfPeriod+" = "+period+"s ["+imtUnite+"]";
    };

     // grid line functions
    function make_x_axis() {        
        return d3.svg.axis()
            .scale(x_scale)
            .orient("bottom")
            .ticks(5)
    }
    function make_y_axis() {        
        return d3.svg.axis()
            .scale(y_scale)
            .orient("left")
            .ticks(5)
    }
    function capitalise(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    function makeCircles(chartData, color) {
        // Points along the line

        svg.selectAll("circle.line") 
            .data(chartData) 
            .enter().append("circle") 
            .attr("class", "line"+k) 
            .attr("cx", function(d) { return x_scale(d[0]); }) 
            .attr("cy", function(d) { return y_scale(d[1]); }) 
            .attr("r", 2.5)
            .style("fill", color)
            .style("opacity", 1)
            .on("mouseover", function() {
                d3.select(this)
                    .attr('r', 6)
                    .text(circleX + ", " + circleY)
                    .style("fill", color)
                    .style("opacity", 1)
                var circleX = d3.select(this.__data__[0]);
                circleX = circleX.toString();
                circleX = circleX.split(","[0]);

                var circleY = d3.select(this.__data__[1]);
                circleY = circleY.toString();
                circleY = circleY.split(","[0]);

                textTop.text("Point value (x/y): " + Math.round(circleX * 1000) / 1000 + ", " + Math.round(circleY * 1000) / 1000);

            }).on("mouseout", function() {
                d3.select(this)
                    .attr('r', 2.5)
                    .style("opacity", 1)
                    .style("fill", color);
            });
    }
   
    var margin = {top: 55, right: 100, bottom: 80, left: 60},
    width = 480 - margin.left - margin.right,
    height = 440 - margin.top - margin.bottom;

    if (funcDistrType === "Continuous") {
        var x_scale = d3.scale.linear().range([0, width]).domain([d3.min(iml), d3.max(iml)]);
        var y_scale = d3.scale.linear().range([0, height]).domain([1, 0]);
    };

    if(funcDistrType === "Discrete") {
        var x_scale = d3.scale.linear().range([0, width]).domain([d3.min(predVarVal), d3.max(predVarVal)]);
        var y_scale = d3.scale.linear().range([0, height]).domain([d3.max(yAxisVals), d3.min(yAxisVals)]);
    };

    var xAxis = d3.svg.axis()
        .scale(x_scale)
        .tickFormat(function (d) { return d; })
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(y_scale)
        .orient("left");
    var line = d3.svg.line()
        .x(function(d) {
            return x_scale(d[0]);
        })
        .y(function(d) {
            return y_scale(d[1]);
        });
    var svg = d3.select("#fragilityChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // grid lines
    svg.append("g")         
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_axis()
            .tickSize(-height, 0, 0)
            .tickFormat("")
        );

    svg.append("g")         
        .attr("class", "grid")
        .call(make_y_axis()
            .tickSize(-width, 0, 0)
            .tickFormat("")
        );
    var legend = d3.select("#chartDialog").append("svg")
        .attr("height", 25);
    var count = 0;

    for (var k in chartData) {

        svg.append("path")
            .data([chartData[k]])
            .attr("class", "line"+k)
            .attr("d", line);

        // Update the css for each line
        if (chartData.hasOwnProperty(k)) {
            ++count;
        }
        colors = [
            "darkred",
            "blue",
            "green",
            "orange",
            "darksalmon",
            "red",
            "lightseagreen",
            "skyblue",
            "sandybrown",
            "yellowgreen"
        ];
        
        var color = colors[count % colors.length];
        $(".line"+k).css({'fill': "none",'opacity':'0.6', 'stroke-width': '2', 'stroke':color});
        var data = chartData[k];
        var curveTitle = k;

        if (funcDistrType === "Discrete") {
            makeCircles(chartData[k], color)
        };
        curveTitle = capitalise(curveTitle);
        
        // Curve lables
        svg.append("text")
            .attr("x", 340)
            .attr("y", 20*(count))
            .attr("dy", ".35em")
            .text(curveTitle);
            
        svg.append("svg:circle")
            .attr("cy", 20*(count))
            .attr("cx", 330)
            .attr("r", 3)
            .attr("opacity", 0.6)
            .style("fill", color)
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("x", 160)
            .attr("y", 30)
            .attr("dy", ".71em")
            .attr("text-anchor", "middle")
            .style("font-size","14px")
            .style("font-weight", "bold")
            .text(xAxisLable);
            
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -60)
            .attr("x", -60)
            .attr("dy", ".71em")
            .style("font-size","14px")
            .style("font-weight", "bold")
            .style("text-anchor", "end")
            .text("Probabability of exceedance");

        textTopLable = svg.append("text")
            .attr("x", 0)
            .attr("y", -35)
            .attr("dy", ".35em")
            //.style("font-weight", "bold")
            .attr("font-size"," 14px")
            .text(assessmentType+ ' ' +funcName);
            
        textTop = svg.append("text")
            .attr("x", 0)
            .attr("y", -15)
            .attr("dy", ".35em")
            .text("");
    }
} // End Chart

