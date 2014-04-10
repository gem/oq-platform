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
////// Damage Information ///////
/////////////////////////////////
// the json to be expected from the other app
var jsonObj = {"pk": 2, "model": "vulnerability.generalinformation", "fields": {"category": "Structure class", "article_title": "Vulnerabilit\u00e0 funzionale ed economica degli edifici residenziali  colpiti dai recenti eventi sismici italiani", "name": "DR_Muratura_Italy", "damage_to_loss_func": {"pk": 1, "model": "vulnerability.damagetolossfunc", "fields": {"general_information": 2, "func_distr_dtl_discr": {"pk": 1, "model": "vulnerability.funcdistrdtldiscr", "fields": {"damage_to_loss_func": 1, "func_distr_shape": {"pk": 2, "model": "vulnerability.funcdistrshape", "fields": {"name": "Histogram"}}, "var_val_coeff": "1.317; 0.725; 0.515; 0.182; 0.312", "var_mean_val": "0.041; 0.218; 0.41; 0.781; 0.814"}}, "limit_states_desc": "DS1; DS2; DS3; DS4; DS5", "damage_scale": "EMS98", "method_of_estimation": "Empirical", "resp_var": "Damage factor", "limit_states_num": 5}}, "publication_conference_name": "X Congresso Nazionale \u201cL\u2019ingegneria Sismica in Italia\u201d, Potenza-Matera 9-13 settembre 2001", "type_of_assessment": "Damage-to-loss", "year": 2001, "web_link": "http://earthquake.usgs.gov/research/pager/prodandref/Jaiswal_Wald_DAyala_2011_Empirical_Collapse.pdf", "general_comments": "This is an example taken from Figure 6 in the paper: Costo relativo di riparazione medio  per diverse classi di vulnerabilit\u00e0 e per danno  medio all'edificio ", "use_case_information": "Earthquakes in Italy (Irpinia '80, Abruzzo '84, Sicilia '90)", "authors": "G. Di Pasquale e A. Goretti", "taxonomy_type": {"pk": 2, "model": "vulnerability.taxonomytype", "fields": {"name": "GEM Taxonomy"}}, "taxonomy_text": "MUR/LWAL"}};

/////////////////////////////////
/// Create Damage Metadata //////
/////////////////////////////////

var respVar = jsonObj.fields.damage_to_loss_func.fields.resp_var;
var typeOfAssessment = jsonObj.fields.type_of_assessment;
var dlName = jsonObj.fields.name;
var taxText = jsonObj.fields.taxonomy_text;
var taxType = jsonObj.fields.taxonomy_type.fields.name
var publication = jsonObj.fields.publication_conference_name;
var articleTitle = jsonObj.fields.article_title;
var authors = jsonObj.fields.authors;
var generalComments = jsonObj.fields.general_comments;
var year = jsonObj.fields.year;

$("#genInfo").append('<p><b>Assessment Type: </b>'+typeOfAssessment+'</p>');
$("#genInfo").append('<p><b>Response Variable: </b>'+respVar+'</p>');
$("#genInfo").append('<p><b>Name: </b>'+dlName+'</p>');
$("#genInfo").append('<p><b>Taxonomy: </b>'+taxText+' ('+taxType+')</p>');
$("#genInfo").append('<p><b>Reference: </b>'+articleTitle+' ('+authors+', '+year+') - '+publication+'</p>');
$("#genInfo").append('<p><b>Geographical Applicability: </b>Mediterranean</p>');
$("#genInfo").append('<p><b>General Comments: </b>'+generalComments+'</p>');

/////////////////////////////////
/// Create Fragility Curves /////
/////////////////////////////////

var meanDamage = jsonObj.fields.damage_to_loss_func.fields.func_distr_dtl_discr.fields.var_mean_val;
meanDamage = meanDamage.split(";");

var coeff = jsonObj.fields.damage_to_loss_func.fields.func_distr_dtl_discr.fields.var_val_coeff;
coeff = coeff.split(";");

var limitStates = jsonObj.fields.damage_to_loss_func.fields.limit_states_desc;
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
    
    var svg = d3.select("#chart").append("svg")
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
        .attr("x", -50)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
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
        .text(typeOfAssessment+ ' ' +dlName);

    var legend = svg.selectAll(".legend")
        .data(ageNames.slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 28)
        .attr("width", 18)
        .attr("height", 18)
        .attr("y", -30)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 34)
        .attr("y", -20)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });
    
} // End Chart
