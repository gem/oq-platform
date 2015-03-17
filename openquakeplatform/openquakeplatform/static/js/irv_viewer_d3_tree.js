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

    var CIRCLE_SCALE = 30;

    $(document).ready(function() {
        //  Project definition weight dialog
        // TODO adjust the dialog height based on the number of indicators passed
        $("#projectDefWeightDialog").dialog({
            autoOpen: false,
            height: 500,
            width: 500,
            modal: true
        });
    });


    ////////////////////////////////////////////
    //// Project Definition Collapsible Tree ///
    ////////////////////////////////////////////

    function loadPD(selectedPDef, qt_page) {
        var qt_page = typeof qt_page !== 'undefined' ? qt_page : false;
        var margin = {top: 0, right: 80, bottom: 20, left: 80},
            width = 960 - margin.right - margin.left,
            height = 800 - margin.top - margin.bottom;

        var i = 0,
            duration = 750,
            root;

        var tree = d3.layout.tree()
            .size([height, width]);

        var diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });

        function createSpinner(id, weight, name, operator) {

            if (operator === undefined) {
                operator = 'n/a';
            }

            pdTempSpinnerIds.push("spinner-"+id);
            $('#projectDefWeightDialog').dialog("open");
            $('#projectDefWeightDialog').append(
                '<p>'+
                    '<label for="spinner'+id+'">'+name+': </label>'+
                    '<input id="spinner-'+id+'" element="'+name+'" name="spinner" value="'+weight+'">'+
                '</p>'
            );

            $(function() {
                $("#spinner-"+id).width(100).spinner({
                    min: 0,
                    max: 100,
                    step: 0.01,
                    numberFormat: "n",
                });
            });
        }

        var nodeEnter;
        function updateButton(){
            $('#projectDefWeightDialog').append('<br/><br/><button type="button" id="update-spinner-value">Update</button>');
            $('#update-spinner-value').click(function() {
                pdTempWeights = [];
                pdTempWeightsComputed = [];

                // Get the values of the spinners
                for (var i = 0; i < pdTempSpinnerIds.length; i++) {
                    pdTempWeights.push($('#'+pdTempSpinnerIds[i]).val());
                }

                // Adjust the values into percentages
                pdTempWeights = pdTempWeights.map(Number);
                var totalWeights = 0;
                $.each(pdTempWeights,function() {
                    totalWeights += this;
                });

                for (var i = 0; i < pdTempWeights.length; i++) {
                    var tempMath = Math.floor((pdTempWeights[i] * 100) / totalWeights);
                    pdTempWeightsComputed.push(tempMath / 100);
                }

                // Uopdate the results back into the spinners and to the d3.js chart
                for (var i = 0; i < pdTempSpinnerIds.length; i++) {
                    $('#'+pdTempSpinnerIds[i]).spinner("value", pdTempWeightsComputed[i]);
                }

                // Upadte the json with new values
                for (var i = 0; i < pdTempWeightsComputed.length; i++) {
                    updateTreeBranch(pdData, [pdTempIds[i]], pdTempWeightsComputed[i]);
                }

                for (var i = 0; i < pdTempSpinnerIds.length; i++) {
                    // get the elements that have been modified
                    var tempNewWeight = [];
                    var value = $('#'+pdTempSpinnerIds[i]).val();
                    var element = $('#'+pdTempSpinnerIds[i]).attr('element');
                    tempNewWeight.push(element);
                    tempNewWeight.push(parseFloat(value));
                    traverse(sessionProjectDef, tempNewWeight);
                }

                nodeEnter.remove("text");
                updateD3Tree(pdData);
            });
        }

        // update the JSON with new weights
        function traverse(projectDef, tempNewWeight) {
            var projectDefUpdated = projectDef;
            var ct = 0;
            if (projectDef.name == tempNewWeight[0]) {
                projectDefUpdated.weight = tempNewWeight[1];
            } else {
                for (var i = 0; i < projectDef.children.length; i++) {
                    if (projectDef.children[i].name == tempNewWeight[0]) {
                        projectDefUpdated.children[i].weight = tempNewWeight[1];
                    } else {
                        for (var j = 0; j < projectDef.children[i].children.length; j++, ct++) {
                            if (projectDef.children[i].children[j].name == tempNewWeight[0]) {
                                projectDefUpdated.children[i].children[j].weight = tempNewWeight[1];
                            }
                        }
                    }
                }
            }
            processIndicators(projectLayerAttributes, projectDefUpdated);
        }

        function findTreeBranchInfo(pdData, pdName, pdLevel) {
            // Find out how many elements are in tree branch
            if (pdLevel.some(function(currentValue) {
                return (pdData.level == currentValue);

            })) {
                pdTempIds.push(pdData.id);
                createSpinner(pdData.id, pdData.weight, pdData.name, pdData.operator);
            }

            (pdData.children || []).forEach(function(currentItem) {
                findTreeBranchInfo(currentItem, [pdName], [pdLevel]);
            });
        }

        function updateTreeBranch(pdData, id, pdWeight) {

            if (id.some(function(currentValue) {
                return (pdData.id == currentValue);
            })) {
                pdData.weight = pdWeight;
            }

            (pdData.children || []).forEach(function(currentItem) {
                updateTreeBranch(currentItem, id, pdWeight);
            });
        }

        // empty any previously drawen chart
        $('#project-def').empty();
        var svg = d3.select("#project-def").append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id", "project-definition-svg")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            data = JSON.parse(selectedPDef);

            root = data;
            root.x0 = height / 2;
            root.y0 = 0;

            //root.children.forEach(collapse);
            updateD3Tree(root);

        $('#project-definition-svg').hide();

        d3.select(self.frameElement).style("height", "800px");

        function updateD3Tree(source) {
            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(function(d) { d.y = d.depth * 180; });

            // Update the nodes…
            var node = svg.selectAll("g.node")
                .data(nodes, function(d) { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; });

            nodeEnter.append("circle")
                .attr("r", 1e-6)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            // tree indicator label
            nodeEnter.append("text")
                .attr("class", (function(d) { return "level-" + d.level; }))
                .attr("id", "svg-text")
                .attr("value", (function(d) { return d.weight; }))
                .attr("x", function(d) { return -(d.weight * CIRCLE_SCALE + 5); })
                .attr("dy", function(d) {
                    // NOTE are x and y swapped?
                    // set te text above or below the node depending on the
                    // parent position
                    if (typeof d.parent != "undefined" && d.x > d.parent.x){
                        return "2em";
                    }
                    return "-1em";
                })
                .attr("text-anchor", function(d) { return "end"; })
                .text(function(d) {
                    return d.name;
                })
                .style("fill-opacity", 1e-6)
                .on("click", function(d) {
                    pdName = d.name;
                    pdData = data;
                    pdWeight = d.weight;
                    pdLevel = d.level;
                    pdTempSpinnerIds = [];
                    pdTempIds = [];
                    $('#projectDefWeightDialog').empty();
                    findTreeBranchInfo(pdData, [pdName], [pdLevel]);
                    updateButton();
                });

            // tree operator label
            nodeEnter.append("text")
                .text(function(d) {
                    if (d.children){
                        var operator = d.operator? d.operator : DEFAULT_OPERATOR;
                        d.operator = operator;
                        return operator;
                    }
                })
                .style("fill", function(d) {
                    if (d.operator != undefined) {
                        // Check for operators that ignore weights and style accordingly
                        var color;
                        if (d.operator.indexOf('ignore') != -1) {
                            color = '#660000';
                        } else {
                            color = 'black';
                        }
                        return color;
                    }
                })
                .attr("id", function(d) {return "operator-label-" + d.level;})
                .attr("x", function(d) { return d.weight * CIRCLE_SCALE + 15; });

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

            nodeUpdate.select("circle")
                .attr("r", function (d) {
                    if (d.weight <= 0.10) {
                        return 2;
                    }
                    else if (d.weight > 0.10 && d.weight <= 0.20 ) {
                        return 4;
                    }
                    else if (d.weight > 0.20 && d.weight <= 0.30 ) {
                        return 6;
                    }
                    else if (d.weight > 0.30 && d.weight <= 0.40 ) {
                        return 8;
                    }
                    else if (d.weight > 0.40 && d.weight <= 0.50 ) {
                        return 10;
                    }
                    else if (d.weight > 0.50 && d.weight <= 0.60 ) {
                        return 12;
                    }
                    else if (d.weight > 0.60 && d.weight <= 0.70 ) {
                        return 14;
                    }
                    else if (d.weight > 0.70 && d.weight <= 0.80 ) {
                        return 16;
                    }
                    else if (d.weight > 0.80 && d.weight <= 0.90 ) {
                        return 18;
                    }
                    else if (d.weight > 0.90 && d.weight <= 100 ) {
                        return 20;
                    }
                })
                .style("fill", function(d) {
                    return d.source ? d.source.linkColor: d.linkColor;
                });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = svg.selectAll("path.link")
                .data(links, function(d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                  var o = {x: source.x0, y: source.y0};
                  return diagonal({source: o, target: o});
                });

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                  var o = {x: source.x, y: source.y};
                  return diagonal({source: o, target: o});
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
            if (qt_page){
                if (typeof pdData !== 'undefined'){
                    qt_page.json_updated(pdData);
                }
            }
        }
    } //end d3 tree


