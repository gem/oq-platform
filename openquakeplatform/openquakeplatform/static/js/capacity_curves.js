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
    $("#capAccordion").accordion({
        collapsible: true
    });
});

/////////////////////////////////
////// Capacity Information ////
/////////////////////////////////
// the json to be expected from the other app
var jsonObj = {"pk": 5, "model": "vulnerability.generalinformation", "fields": {"category": "Structure specific", "article_title": "Curva de capacidad como ejemplo para la IGU que est\u00e1 haciendo Ben", "name": "RC Low-rise bare frame in Quito", "capacity_curve_func": {"pk": 1, "model": "vulnerability.capacitycurvefunc", "fields": {"analytical_model_info": {"pk": 2, "model": "vulnerability.analyticalmodelinfo", "fields": {"damage_to_loss_func": null, "capacity_curve_func": 1, "fragility_func": null, "model_type": "2D story-by-story", "vulnerability_func": null, "analysis_type": {"pk": 2, "model": "vulnerability.analysistype", "fields": {"name": "Static analysis"}}, "method_uncert_propag": "Single index building", "models_num": 5}}, "general_information": 5, "resp_var_units": "kN", "resp_var_par": "Base shear", "resp_var_val": "0; 90; 135; 175; 199; 216; 247; 255; 267; 286; 292; 298; 301; 303; 297; 276; 255; 245; 233; 218; 217; 212; 211; 210; 206", "cc_predictor_var": {"pk": 1, "model": "vulnerability.cc_predictorvar", "fields": {"pred_var_units": "m", "engineering_demand_param": {"pk": 1, "model": "vulnerability.cc_engineeringdemandpar", "fields": {"name": "Top displacement"}}, "pred_var_val": "0; 0.025; 0.05; 0.075; 0.1; 0.125; 0.15; 0.175; 0.2; 0.225; 0.25; 0.275; 0.3; 0.325; 0.35; 0.375; 0.4; 0.425; 0.45; 0.475; 0.5; 0.525; 0.55; 0.575; 0.6", "capacity_curve_func": 1, "data_pts_num": 25}}}}, "publication_conference_name": "GEM Foundation, Global Component Report ", "type_of_assessment": "Capacity curve", "year": 2014, "web_link": "http://www.nexus.globalquakemodel.org/gem-vulnerability/posts/existing-empirical-vulnerability-and-fragility-relationships-compendium-and-guide-for-selection", "general_comments": "Para la taxonom\u00eda del edificio se tom\u00f3 como referencia una de las tipolog\u00edas de edificios en Ecuador, seg\u00fan el Workshop en Medell\u00edn", "use_case_information": "Este es un ejemplo utilizando informaci\u00f3n general para crear una entrada en la GVD.", "authors": "Catalina Mu\u00f1oz C\u00e1rdenas", "taxonomy_type": {"pk": 2, "model": "vulnerability.taxonomytype", "fields": {"name": "GEM Taxonomy"}}, "taxonomy_text": "DX+PF/MUR//DY+OF/CR+CIP/LFM+DUC/HBET:1,12+HBAPP:1+HFAPP:2.7/YBET:1960,2014/MIX+MIX2//PLFR/IRIR+IRPP:TOR/EWMA/RSH1+RMN+RC+RC1+RWCP/FC+FC1+FWCP/FOSSL"}};


/////////////////////////////////
/// Create Capacity Metadata ///
/////////////////////////////////

var capName = jsonObj.fields.name;

var typeOfAssessment = jsonObj.fields.type_of_assessment;
var dlName = jsonObj.fields.name;
var taxText = jsonObj.fields.taxonomy_text;
var taxType = jsonObj.fields.taxonomy_type.fields.name
var publication = jsonObj.fields.publication_conference_name;
var articleTitle = jsonObj.fields.article_title;
var authors = jsonObj.fields.authors;
var generalComments = jsonObj.fields.general_comments;
var year = jsonObj.fields.year;
var analysisType = jsonObj.fields.capacity_curve_func.fields.analytical_model_info.fields.analysis_type.fields.name;
var modelType = jsonObj.fields.capacity_curve_func.fields.analytical_model_info.fields.model_type;
var methodUncertPropag = jsonObj.fields.capacity_curve_func.fields.analytical_model_info.fields.method_uncert_propag;
var useCase = jsonObj.fields.use_case_information;
var modelsNum = jsonObj.fields.capacity_curve_func.fields.analytical_model_info.fields.models_num;

$("#genInfo").append('<p><b>Assessment Type: </b>'+typeOfAssessment+'</p>');
//$("#genInfo").append('<p><b>Response Variable: </b>'+respVar+'</p>');
$("#genInfo").append('<p><b>Name: </b>'+capName+'</p>');
$("#genInfo").append('<p><b>Taxonomy: </b>'+taxText+' ('+taxType+')</p>');
$("#genInfo").append('<p><b>Reference: </b>'+articleTitle+' ('+authors+', '+year+') - '+publication+'</p>');
$("#genInfo").append('<p><b>Geographical Applicability: </b>Mediterranean</p>');
$("#genInfo").append('<p><b>General Comments: </b>'+generalComments+'</p>');
$("#genInfo").append('<p><b>Use Case Information: </b>'+useCase+'</p>');

$("#modellingInfo").append('<p><b>Analysis Type: </b>'+analysisType+'</p>');
$("#modellingInfo").append('<p><b>Model Type: </b>'+modelType+'</p>');
$("#modellingInfo").append('<p><b>Method of Uncertainty Propagation: </b>'+methodUncertPropag+'</p>');
$("#modellingInfo").append('<p><b>Number of Distinct Structural Models Analysed: </b>'+modelsNum+'</p>');

/////////////////////////////////
/// Create Capacity Curves /////
/////////////////////////////////

var respVarUnits = jsonObj.fields.capacity_curve_func.fields.resp_var_val;
respVarUnits = respVarUnits.split(";");
for (var i = 0; i < respVarUnits.length; i++)
    respVarUnits[i] = respVarUnits[i].trim();
for (var i = 0; i < respVarUnits.length; i++) {
    respVarUnits[i] = parseFloat(respVarUnits[i]);
};

var predVarVal = jsonObj.fields.capacity_curve_func.fields.cc_predictor_var.fields.pred_var_val
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
        .attr("x", -20)
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
        .text(typeOfAssessment +' '+ capName);
        
    textTop = svg.append("text")
        .attr("x", 0)
        .attr("y", -15)
        .attr("dy", ".35em")
        .text("");


} // End Chart
