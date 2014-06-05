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
    $("#capAccordion").accordion({
        collapsible: true
    });
});

/////////////////////////////////
/// Create Capacity Metadata ///
/////////////////////////////////

var capName = gl.fields.name;

var assessmentType = gl.fields.type_of_assessment;
var dlName = gl.fields.name;
var taxText = gl.fields.taxonomy_text;
var taxType = gl.fields.taxonomy_type.fields.name
var publication = gl.fields.publication_conference_name;
var articleTitle = gl.fields.article_title;
var authors = gl.fields.authors;
var generalComments = gl.fields.general_comments;
var year = gl.fields.year;
var analysisType = gl.fields.capacity_curve_func.fields.analytical_model_info.fields.analysis_type.fields.name;
var modelType = gl.fields.capacity_curve_func.fields.analytical_model_info.fields.model_type;
var methodUncertPropag = gl.fields.capacity_curve_func.fields.analytical_model_info.fields.method_uncert_propag;
var useCase = gl.fields.use_case_information;
var modelsNum = gl.fields.capacity_curve_func.fields.analytical_model_info.fields.models_num;
var geoApp = "Mediterranean";

if (assessmentType != undefined && assessmentType != "") {
    $("#genInfo").append('<p><b>Assessment Type: </b>'+assessmentType+'</p>');
};

if (assessmentType != undefined && assessmentType != "") {
    $("#genInfo").append('<p><b>Name: </b>'+capName+'</p>');
};

if (taxText != undefined && taxText != "") {
    $("#genInfo").append('<p><b>Taxonomy: </b>'+taxText+' ('+taxType+')</p>');
};

if (articleTitle != undefined && articleTitle != "") {
    $("#genInfo").append('<p><b>Reference: </b>'+articleTitle+' ('+authors+', '+year+') - '+publication+'</p>');
};

if (geoApp != undefined && geoApp != "") {
    $("#genInfo").append('<p><b>Geographical Applicability: </b>'+geoApp+'</p>');
};

if (generalComments != undefined && generalComments != "") {
    $("#genInfo").append('<p><b>General Comments: </b>'+generalComments+'</p>');
};

if (useCase != undefined && useCase != "") {
    $("#genInfo").append('<p><b>Use Case Information: </b>'+useCase+'</p>');
};

if (analysisType != undefined && analysisType != "") {
    $("#modellingInfo").append('<p><b>Analysis Type: </b>'+analysisType+'</p>');
};

if (modelType != undefined && modelType != "") {
    $("#modellingInfo").append('<p><b>Model Type: </b>'+modelType+'</p>');
};

if (methodUncertPropag != undefined && methodUncertPropag != "") {
    $("#modellingInfo").append('<p><b>Method of Uncertainty Propagation: </b>'+methodUncertPropag+'</p>');
};

if (modelsNum != undefined && modelsNum != "") {
    $("#modellingInfo").append('<p><b>Number of Distinct Structural Models Analysed: </b>'+modelsNum+'</p>');
};


/////////////////////////////////
/// Create Capacity Curves /////
/////////////////////////////////

var respVarUnits = gl.fields.capacity_curve_func.fields.resp_var_val;
respVarUnits = respVarUnits.split(";");
for (var i = 0; i < respVarUnits.length; i++)
    respVarUnits[i] = respVarUnits[i].trim();
for (var i = 0; i < respVarUnits.length; i++) {
    respVarUnits[i] = parseFloat(respVarUnits[i]);
};

var predVarVal = gl.fields.capacity_curve_func.fields.cc_predictor_var.fields.pred_var_val
predVarVal = predVarVal.split(";");
for (var i = 0; i < predVarVal.length; i++)
    predVarVal[i] = predVarVal[i].trim();
for (var i = 0; i < predVarVal.length; i++) {
    predVarVal[i] = parseFloat(predVarVal[i]);
};

var chartData = [];

for (var i = 0; i < predVarVal.length; i++) {
    chartData.push([predVarVal[i], respVarUnits[i]]);
};

buildMixedD3Chart(chartData);

/////////////////////////////////
///// Capacity Data Table //////
/////////////////////////////////

$(document).ready(function() {
    var aaData = [];
        
    for (var i = 0; i < respVarUnits.length; i++) {
        var tmp = [];
        tmp.push(predVarVal[i]);
        tmp.push(respVarUnits[i]);
        aaData.push(tmp);
    };

    $('#capacity-table').dataTable({
        "aaData": aaData,
        "aoColumns": [
            {"sTitle": "Lateral Roof Displacement ( m)"},
            {"sTitle": "Base Shear (kN)"}
            
        ],
        "bLengthChange": false,
        "bFilter": false
    });
});


/////////////////////////////////////////////
///////////// Capacity Chart ///////////////
/////////////////////////////////////////////

function buildMixedD3Chart(chartData) {
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
    function makeCircles(data) {
        // Points along the line
        svg.selectAll("circle.line") 
            .data(data) 
            .enter().append("circle") 
            .attr("class", "line") 
            .attr("cx", function(d) { return x_scale(d[0]); }) 
            .attr("cy", function(d) { return y_scale(d[1]); }) 
            .attr("r", 2.5)
            .style("fill", "blue")
            .style("opacity", 1)
            .on("mouseover", function() {
                d3.select(this)
                    .attr('r', 6)
                    .text(circleX + ", " + circleY)
                    .style("fill", "blue")
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
                    .style("fill", "blue");
            });
    }
    var margin = {top: 55, right: 100, bottom: 80, left: 60},
    width = 480 - margin.left - margin.right,
    height = 440 - margin.top - margin.bottom;

    var x_scale = d3.scale.linear().range([0, width]).domain([d3.min(predVarVal), d3.max(predVarVal)]);
    var y_scale = d3.scale.linear().range([0, height]).domain([d3.max(respVarUnits), d3.min(respVarUnits)]);
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
    var svg = d3.select("#capacityChart").append("svg")
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

    svg.append("path")
        .data([chartData])
        .attr("class", "line")
        .attr()
        .attr("d", line);
        
    var data = chartData;

    makeCircles(data);
   
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("x", 160)
        .attr("y", 30)
        .attr("dy", ".71em")
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .attr("font-size","14px")
        .text("Lateral roof displacement (m)");
        
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -60)
        .attr("x", -90)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-weight", "bold")
        .attr("font-size","14px")
        .text("Base Shear (kN)");
        
    textTopLable = svg.append("text")
        .attr("x", 0)
        .attr("y", -35)
        .attr("dy", ".35em")
        .style("font-weight", "bold")
        .attr("font-size","14px")
        .text(assessmentType +' '+ capName);
        
    textTop = svg.append("text")
        .attr("x", 0)
        .attr("y", -15)
        .attr("dy", ".35em")
        .text("");
} // End Chart
