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
    $("#damageAccordion").accordion({
        collapsible: true
    });
});


/////////////////////////////////
/// Create Damage Metadata //////
/////////////////////////////////

var respVar = gl.fields.damage_to_loss_func.fields.resp_var;
var assessmentType = gl.fields.type_of_assessment;
var dlName = gl.fields.name;
var taxText = gl.fields.taxonomy_text;
var taxType = gl.fields.taxonomy_type.fields.name
var publication = gl.fields.publication_conference_name;
var articleTitle = gl.fields.article_title;
var authors = gl.fields.authors;
var generalComments = gl.fields.general_comments;
var year = gl.fields.year;
var useCase = gl.fields.use_case_information;
var geoApp = "Mediterranean";

if (assessmentType != undefined && assessmentType != "") {
    $("#genInfo").append('<p><b>Assessment Type: </b>'+assessmentType+'</p>');
};

if (respVar != undefined && respVar != "") {
    $("#genInfo").append('<p><b>Response Variable: </b>'+respVar+'</p>');
};

if (dlName != undefined && dlName != "") {
    $("#genInfo").append('<p><b>Name: </b>'+dlName+'</p>');
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

/////////////////////////////////
/// Create Damage Curves /////
/////////////////////////////////

var meanDamage = gl.fields.damage_to_loss_func.fields.func_distr_dtl_discr.fields.var_mean_val;
meanDamage = meanDamage.split(";");

var coeff = gl.fields.damage_to_loss_func.fields.func_distr_dtl_discr.fields.var_val_coeff;
coeff = coeff.split(";");

var limitStates = gl.fields.damage_to_loss_func.fields.limit_states_desc;
limitStates = limitStates.split(";");

var chartData = [];

for (var i = 0; i < limitStates.length; i++) {
    var dataObj = {};
    dataObj["mean"] = parseFloat(meanDamage[i]);
    //dataObj["coeff"] = parseFloat(coeff[i]);
    dataObj["name"] = limitStates[i];
    chartData.push(dataObj);
};

buildMixedD3Chart(chartData);

/////////////////////////////////
///// Damage Data Table /////////
/////////////////////////////////

$(document).ready(function() {
    var aaData = [];
        
    for (var i = 0; i < limitStates.length; i++) {
        var tmp = [];
        tmp.push(limitStates[i]);
        tmp.push(meanDamage[i]);
        tmp.push(coeff[i]);
        aaData.push(tmp);
    };

    $('#damage-table').dataTable({
        "aaData": aaData,
        // TODO make thias dynamic
        "aoColumns": [
            {"sTitle": "Limit State"},
            {"sTitle": "Mean"},
            {"sTitle": "Coefficient"}
        ],
        "bLengthChange": false,
        "bFilter": false
    });
});


/////////////////////////////////////////////
///////////// Damage to loss Chart //////////
/////////////////////////////////////////////

function buildMixedD3Chart(chartData) {

    var margin = {top: 60, right: 20, bottom: 30, left: 40},
        width = 480 - margin.left - margin.right,
        height = 420 - margin.top - margin.bottom;
    
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
        .tickFormat(d3.format(".2s"));
    
    var svg = d3.select("#damageChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = chartData;

    var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "name"; });

    data.forEach(function(d) {
      d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
    });

    x0.domain(data.map(function(d) { return d.name; }));
    x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("x", -90)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-weight", "bold")
        .attr("font-size","14px")
        .text(respVar);

    var name = svg.selectAll(".name")
        .data(data)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x0(d.name) + ",0)"; });

    name.selectAll("rect")
        .data(function(d) { return d.ages; })
      .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.name); })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .style("fill", function(d) { return color(d.name); });

     textTopLable = svg.append("text")
        .attr("x", 0)
        .attr("y", -35)
        .attr("dy", ".35em")
        .style("font-weight", "bold")
        .attr("font-size","14px")
        .text(assessmentType+ ' ' +dlName);

    var legend = svg.selectAll(".legend")
        .data(ageNames.slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    
} // End Chart
