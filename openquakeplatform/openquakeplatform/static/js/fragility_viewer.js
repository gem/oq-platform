/*
   Copyright (c) 2013, GEM Foundation.

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
    $("#accordion").accordion();
    collapsible: true
});

/////////////////////////////////
////// Fragility Information ////
/////////////////////////////////
// the json to be expected from the other app
var jsonObj = {"pk": 1, "model": "vulnerability.generalinformation", "fields": {"category": "Structure class", "article_title": "Reinforced concrete buildings", "name": "RC_LR_High_code", "publication_conference_name": "RISK-UE", "fragility_func": {"pk": 1, "model": "vulnerability.fragilityfunc", "fields": {"analytical_model_info": {"pk": 1, "model": "vulnerability.analyticalmodelinfo", "fields": {"damage_to_loss_func": null, "capacity_curve_func": null, "fragility_func": 1, "model_type": "2D element-by-element", "vulnerability_func": null, "analysis_type": {"pk": 1, "model": "vulnerability.analysistype", "fields": {"name": "Nonlinear dynamic analysis (NLD)"}}, "method_uncert_propag": "Random Monte-Carlo or Latin Hypercube sampling", "models_num": null}}, "func_distr_frag_cont": {"pk": 1, "model": "vulnerability.funcdistrfragcont", "fields": {"coeff_variation_std_dev": "", "predictor_var_corr_matrix": "", "fragility_func": 1, "coeff_variation_mean": "", "std_dev": "0.006; 0.064; 0.140; 0.215; 0.277", "func_distr_shape": {"pk": 1, "model": "vulnerability.funcdistrshape", "fields": {"name": "Lognormal"}}, "mean": "0.008; 0.076; 0.166; 0.255; 0.328"}}, "general_information": 1, "qrs_analytical": {"pk": 1, "model": "vulnerability.qrsanalytical", "fields": {"structural_details": "Average", "documentation_quality": "Superior", "hazard_model": "Average", "model_completeness": "Superior", "documentation_type": "Superior", "fragility_func": 1, "site_specific": "Average", "vulnerability_func": null, "seismic_demand": "Average", "typology_repr": "Superior", "overall_rating": null}}, "predictor_var": {"pk": 1, "model": "vulnerability.predictorvar", "fields": {"minimum_im": 0.0, "intensity_measure_type": "PGA", "fragility_func": 1, "vulnerability_func": null, "maximum_im": 1.5, "intensity_measure_unit": "Acceleration (g)", "evaluation_of_im": "Natural Accelerograms"}}, "limit_states_desc": "DS1; DS2; DS3; DS4; DS5", "damage_scale": "EMS98", "engineering_demand_par": {"pk": 1, "model": "vulnerability.engineeringdemandpar", "fields": {"name": "Interstory drift"}}, "method_of_estimation": "Analytical", "func_distr_type": "Continuous", "limit_states_num": 5}}, "type_of_assessment": "Fragility", "year": 2003, "web_link": "", "general_comments": "Sample Data: earthquake damaged greek buildings + a large number of building types are modeled and analysed. Seismic Hazard: real earthquakes (1978 Thessaloniki earthquake) and 16 accelerograms.", "use_case_information": "", "authors": "Kappos et al.", "taxonomy_type": {"pk": 1, "model": "vulnerability.taxonomytype", "fields": {"name": "PAGER"}}, "taxonomy_text": "C1L"}};

/////////////////////////////////
/// Create Fragility Metadata ///
/////////////////////////////////

var assessmentType = jsonObj.fields.type_of_assessment;
var id = jsonObj.fields.fragility_func.fields.general_information;
var name = jsonObj.fields.name;
var year = jsonObj.fields.year;
var webLink = jsonObj.fields.web_link;
var genComments = jsonObj.fields.general_comments;
var useCase = jsonObj.fields.use_case_information;
var authors = jsonObj.fields.authors;
var taxType = jsonObj.fields.taxonomy_type.fields.name;
var taxText = jsonObj.fields.taxonomy_text;
var category = jsonObj.fields.category;
var publication = jsonObj.fields.publication_conference_name;
var geoApp = "temp";
var method = jsonObj.fields.fragility_func.fields.method_of_estimation;
var articleTitle = jsonObj.fields.article_title;

// Generral information
$("#genInfo").append('<p><b>Assessment Type: </b>'+assessmentType+'</p>');
$("#genInfo").append('<p><b>Name: </b>'+name+' ('+id+')</p>');
$("#genInfo").append('<p><b>Category: </b>'+category+'</p>');
$("#genInfo").append('<p><b>Taxonomy: </b>'+taxText+' ('+taxType+')</p>');
$("#genInfo").append('<p><b>Publication: </b>'+articleTitle+' ('+authors+', '+year+') - '+publication+'</p>');
//$("#genInfo").append('<p><b>Geographical Applicability: </b>'+geoApp+'</p>');
$("#genInfo").append('<p><b>Geographical Applicability: </b>Mediterranean</p>');
$("#genInfo").append('<p><b>Methodology: </b>'+method+'</p>');



/*
$(".content-wrap").append('<p>Year: '+year+'</p>');
$(".content-wrap").append('<p>Web Link: <a href="'+webLink+'">'+webLink+'</a></p>');
$(".content-wrap").append('<p>Authors: '+authors+'</p>');
$(".content-wrap").append('<p>Taxonomy Type: '+taxType+'</p>');
$(".content-wrap").append('<p>General Comments: '+genComments+'</p>');
$(".content-wrap").append('<p>Use Case Information: '+useCase+'</p>');
*/

// Modelling information
if (jsonObj.fields.fragility_func.fields.analytical_model_info != undefined) {
    var analysisType = jsonObj.fields.fragility_func.fields.analytical_model_info.fields.analysis_type.fields.name;
    if (analysisType != undefined) {
        $("#modellingInfo").append('<p><b>Analysis Type: </b>'+analysisType+'</p>');
    };
    
    var modelType = jsonObj.fields.fragility_func.fields.analytical_model_info.fields.model_type;
    if (modelType != undefined) {
        $("#modellingInfo").append('<p><b>Model Type: </b>'+modelType+'</p>');
    };
    
    var methodUncertPropag = jsonObj.fields.fragility_func.fields.analytical_model_info.fields.method_uncert_propag;
    if (methodUncertPropag != undefined) {
        $("#modellingInfo").append('<p><b>Method of Uncertainty Propagation: </b>'+methodUncertPropag+'</p>');
    };
    
    var modelsNum = jsonObj.fields.fragility_func.fields.analytical_model_info.fields.models_num;
    if (modelsNum != undefined) {
        $("#modellingInfo").append('<p><b>Number of Distinct Structural Models Analysed: </b>'+modelsNum+'</p>');
    };

};


if (jsonObj.fields.fragility_func.fields.empirical_model_info != undefined) {
    var empiricalDataSrc = jsonObj.fields.fragility_func.fields.empirical_model_info.fields.empirical_data_src;
    if (empiricalDataSrc != undefined) {
        $("#modellingInfo").append('<p><b>Source of Empirical Data: </b>'+empiricalDataSrc+'</p>');
    };

    var buildingAggr = jsonObj.fields.fragility_func.fields.empirical_model_info.fields.building_aggr;
    if (buildingAggr != undefined) {
        $("#modellingInfo").append('<p><b>Building Aggregation: </b>'+buildingAggr+'</p>');
    };

    var aggrUnitDef = jsonObj.fields.fragility_func.fields.empirical_model_info.fields.aggr_unit_def;
    if (aggrUnitDef != undefined) {
        $("#modellingInfo").append('<p><b>Definitions of Aggregated Units: </b>'+aggrUnitDef+'</p>');
    };
};

// Statistical Information
if (jsonObj.fields.fragility_func.fields.stat_info != undefined) {
    var statModel = jsonObj.fields.fragility_func.fields.stat_info.fields.stat_model.fields.name;
    if (statModel != undefined) {
        $("#statInfo").append('<p><b>Statistical Model: </b>'+statModel+'</p>');
    };
    
    var statModelFittingMethod = jsonObj.fields.fragility_func.fields.stat_info.fields.stat_model_fitting_method.fields.name;
    if (statModelFittingMethod != undefined) {
        $("#statInfo").append('<p><b>Statistical model fitting method: </b>'+statModelFittingMethod+'</p>');
    };
    
    var modelFittingMethodAssumptions = jsonObj.fields.fragility_func.fields.stat_info.fields.model_fitting_method_assumptions;
    if (modelFittingMethodAssumptions != undefined) {
        $("#statInfo").append('<p><b>Model Fitting Method Assumption: </b>'+modelFittingMethodAssumptions+'</p>');
    };
    
    var fitAssessmentGoodness = jsonObj.fields.fragility_func.fields.stat_info.fields.fit_assessment_goodness.fields.name;
    if (fitAssessmentGoodness != undefined) {
        $("#statInfo").append('<p><b>Goodness of fit assessment (GLM/GAM): </b>'+fitAssessmentGoodness+'</p>');
    };
    
    var procConstrPredInt = jsonObj.fields.fragility_func.fields.stat_info.fields.proc_constr_pred_int.fields.name;
    if (procConstrPredInt != undefined) {
        $("#statInfo").append('<p><b>Procedure for the Construction of Prediction Intervals: </b>'+procConstrPredInt+'</p>');
    };
};



// Quality rating system
// TODO add Quality rating information when it is avalable.
//var procConstrPredInt = jsonObj.fields.fragility_func.fields.stat_info.fields.proc_constr_pred_int.fields.name;
//if (procConstrPredInt != undefined) {
  //  $("#QualitySys").append('<p><b>Procedure for the Construction of Prediction Intervals: </b>'+procConstrPredInt+'</p>');
//};


/////////////////////////////////
/// Create Fragility Curves /////
/////////////////////////////////

// Get values out of JSON
var dataObj = {};
var chartData = [];
var iml = [];
var plotTitle = jsonObj.fields.article_title;
var min = jsonObj.fields.fragility_func.fields.predictor_var.fields.minimum_im;
var max = jsonObj.fields.fragility_func.fields.predictor_var.fields.maximum_im;
var imtTitle = jsonObj.fields.fragility_func.fields.predictor_var.fields.intensity_measure_type;
var inc = ((max - min) / 100);
var limitStatesArray =  jsonObj.fields.fragility_func.fields.limit_states_desc;
limitStatesArray = limitStatesArray.split(";");

for (var i = 0; i < limitStatesArray.length; i++)
    limitStatesArray[i] = limitStatesArray[i].trim();

var meanArray = jsonObj.fields.fragility_func.fields.func_distr_frag_cont.fields.mean;
meanArray = meanArray.split(";");

var stddevArray = jsonObj.fields.fragility_func.fields.func_distr_frag_cont.fields.std_dev;
stddevArray = stddevArray.split(";");

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
    };
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
};

function makeFragilityFunctionContinuous(mean, stddev) {
    var variance = stddev * stddev;
    var sigma = Math.sqrt(Math.log((variance / (mean * mean)) + 1.0));

    mu = (mean * mean) / Math.sqrt(variance + mean * mean);

    return function(iml) {
       return normalCumulativeProbability((Math.log(iml / mu)) / sigma);
    };
};

function capitalize(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function fragilityData() {
    $("#fragilityDataDialog").append("<b>Limit States, Mean, Stddev: </b></br>");
    for (var i = 0; i < limitStatesArray.length; i++) {
        var ls = capitalize(limitStatesArray[i]);
        $("#fragilityDataDialog").append(ls +", "+ meanArray[i] +", "+ stddevArray[i] +"</br>");
    };
    
}

buildMixedD3Chart(chartData);

/////////////////////////////////
///// Fragility Data Table //////
/////////////////////////////////

$(document).ready(function() {
    var aaData = [];
        
    for (var i = 0; i < limitStatesArray.length; i++) {
        var tmp = [];
        tmp.push(limitStatesArray[i]);
        tmp.push(meanArray[i]);
        tmp.push(stddevArray[i]);
        aaData.push(tmp);
    };

    $('#fragility-table').dataTable({
        "aaData": aaData,
        // TODO make thias dynamic
        "aoColumns": [
            {"sTitle": "Limit State"},
            {"sTitle": "Mean"},
            {"sTitle": "Standard Deviation"}
        ],
        "bLengthChange": false,
        "bFilter": false
    });
});


/////////////////////////////////////////////
///////////// Fragility Chart ///////////////
/////////////////////////////////////////////

function buildMixedD3Chart(chartData) {
    var min_value = 1000.0, min_value_k = "", max_value = -1, max_value_k = "";

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
    function makeCircles(data, k, color, curveTitle) {
        // Points along the line
        svg.selectAll("circle.line") 
            .data(data) 
            .enter().append("circle") 
            .attr("class", "line"+k) 
            .attr("cx", function(d) { return x_scale(d[0]); }) 
            .attr("cy", function(d) { return y_scale(d[1]); }) 
            .attr("r", 6.5)
            .style("fill", color)
            .style("opacity", 0)
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

                textTop.text(curveTitle+" point value (x/y): " + Math.round(circleX * 1000) / 1000 + ", " + Math.round(circleY * 1000) / 1000);

            }).on("mouseout", function() {
                d3.select(this)
                    .attr('r', 2.5)
                    .style("opacity", 0)
                    .style("fill", color);
            });
    }
    var margin = {top: 55, right: 100, bottom: 80, left: 60},
    width = 480 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;
    var x_scale = d3.scale.linear().range([0, width]).domain([d3.min(iml), d3.max(iml)]);
    var y_scale = d3.scale.linear().range([0, height]).domain([1, 0]);
    var xAxis = d3.svg.axis()
        .scale(x_scale)
        //.ticks(4)
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
            //"sandybrown",
            //"yellowgreen",
            "lightseagreen",
            "skyblue"
        ];
        var gray = "A0A0A0";
        
        var color = colors[count % colors.length];
        $(".line"+k).css({'fill': "none",'opacity':'1', 'stroke':color});
        var data = chartData[k];
        var curveTitle = k;
        curveTitle = capitalise(curveTitle);
        makeCircles(data, k, color, curveTitle);
        // Curve lables
        svg.append("text")
            .attr("x", 340)
            .attr("y", 20*(count))
            .attr("dy", ".35em")
            .text(curveTitle);
        svg.append("svg:circle")
            //.attr("cx", 50)
            .attr("cy", 20*(count))
            .attr("cx", 330)
            .attr("r", 3)
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
            .style("font-size","12px")
            .text(imtTitle);
            
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
            .text("Probabability of exceedance");
        textTopLable = svg.append("text")
            .attr("x", 0)
            .attr("y", -35)
            .attr("dy", ".35em")
            //.style("font-weight", "bold")
            .attr("font-size","14px")
            .text(assessmentType+ ' ' +name);
            
        textTop = svg.append("text")
            .attr("x", 0)
            .attr("y", -15)
            .attr("dy", ".35em")
            .text("");
    }
    $('#chartDialog').append('<div id="downloadCurve"><font color="blue">Download Curve</font></div>');
    $('#downloadCurve').on("hover", function(){
        $(this).css("cursor", "pointer");
    });
    var h = $("#chartDialog").height();
    h = h + 20;
    $("#chartDialog").css({"height": h+"px"});
    // Prep data for download to CSV
    $('#downloadCurve').click(function(event) {
        var csvData = [];
        csvData = csvData.concat("prob");
        csvData = csvData.concat("iml");
        csvData = csvData.concat("investigationTime");
        csvData = csvData.concat("lon");
        csvData = csvData.concat("lat");
        csvData = JSON.stringify(csvData);
        var lineBreak = "lineBreak";
        csvData = csvData.concat(lineBreak);
        var quotationMark = '"';
        csvData = csvData.concat('"');
        csvData = csvData.concat(probArray);
        csvData = csvData.concat('","');
        csvData = csvData.concat(imlArray);
        csvData = csvData.concat('",');
        csvData = csvData.concat(invest_time);
        csvData = csvData.concat(',');
        csvData = csvData.concat(lon);
        csvData = csvData.concat(',');
        csvData = csvData.concat(lat);
        csvData = csvData
            .replace(/lineBreak/, '\r\n')
            .replace(/\[/g, '')
            .replace(/\]/g, '')
            .replace(/""/g, '","');
        console.log(csvData);
        downloadJSON2CSV(csvData);
    });
} // End Chart
