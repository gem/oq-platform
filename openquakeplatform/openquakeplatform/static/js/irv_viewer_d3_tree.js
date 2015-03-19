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
    var MAX_STROKE_SIZE = 4;
    var MIN_CIRCLE_SIZE = 0.001;

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
                    min: -100,
                    max: 100,
                    step: 0.000001,
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
                    totalWeights += Math.abs(this);
                });

                for (var i = 0; i < pdTempWeights.length; i++) {
                    var tempMath = (pdTempWeights[i] * 100) / totalWeights;
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

        function onTreeElementClick(d) {
            pdName = d.name;
            pdData = data;
            pdWeight = d.weight;
            pdLevel = d.level;
            pdTempSpinnerIds = [];
            pdTempIds = [];
            $('#projectDefWeightDialog').empty();
            findTreeBranchInfo(pdData, [pdName], [pdLevel]);
            updateButton();
        }

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
                .attr("x", function(d) { return -(Math.abs(d.weight) * CIRCLE_SCALE + 5); })
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
                    if (d.weight < 0) {
                        return "- " + d.name;
                    } else {
                        return d.name;
                    }
                })
                .style("fill-opacity", 1e-6)
                .on("click", function(d) {
                    onTreeElementClick(d);
                });

            // tree operator label
            nodeEnter.append("text")
                .text(function(d) {
                    if (d.children){
                        var operator = d.operator? d.operator : DEFAULT_OPERATOR;
                        d.operator = operator;
                        if (operator.indexOf('ignore weights') != -1) {
                            parts = operator.split('(');
                            operator = parts[0];
                        }
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
                .attr("x", function(d) { return Math.abs(d.weight) * CIRCLE_SCALE + 15; })
                .on("click", function(d) {
                    onTreeElementClick(d);
                });

            // Render 'ignore weights' into a new line when present
            nodeEnter.append("text")
                .text(function(d) {
                    if (d.children){
                        var ignoreWeightsStr = '';
                         if (d.operator.indexOf('ignore weights') != -1) {
                            parts = d.operator.split('(');
                            ignoreWeightsStr = '(' + parts[1];
                        }
                        return ignoreWeightsStr;
                    }
                })
                .style("fill", function(d) {
                    if (d.operator != undefined) {
                        // Check for operators that ignore weights and style accordingly
                        var color = '#660000';
                        return color;
                    }
                })
                .attr("id", function(d) {return "operator-label-" + d.level;})
                .attr("x", function(d) { return Math.abs(d.weight) * CIRCLE_SCALE + 15; })
                .attr("transform", "translate(0, 12)")
                .on("click", function(d) {
                    onTreeElementClick(d);
                });

            // Render weight values in tree
            nodeEnter.append("text")
                .attr("id", (function(d) {return 'node-weight-' + d.name.replace(' ', '-'); }))
                .attr("x", function(d) { return "-1em"; })
                .attr("dy", function(d) {
                    if (typeof d.parent != "undefined" && d.x > d.parent.x){
                        return -(Math.abs(d.weight) * CIRCLE_SCALE + 5);
                    } else {
                        return Math.abs(d.weight) * CIRCLE_SCALE + 12;
                    }})
                .text(function(d) {
                    if (d.parent === undefined) {
                        return "";
                    }
                    return (d.weight * 100).toFixed(1) + '%';
                })
                .on("click", function(d) {
                    onTreeElementClick(d);
                });

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

            nodeUpdate.select("circle")
                .attr("r", function (d) {
                    // d.weight is expected to be between 0 and 1
                    // Nodes are displayed as circles of size between 1 and CIRCLE_SCALE
                    return d.weight ? Math.max(Math.abs(d.weight) * CIRCLE_SCALE, MIN_CIRCLE_SIZE): MIN_CIRCLE_SIZE;
                })
                .style("stroke", function(d) {
                    if (d.weight < 0) {
                        return "PowderBlue";
                    } else {
                        return "RoyalBlue";
                    }
                })
                .style("stroke-width", function(d) {
                    return d.weight ? Math.min(Math.abs(d.weight) * CIRCLE_SCALE / 2, MAX_STROKE_SIZE): 4;
                })
                .style("fill", function(d) {
                    // return d.source ? d.source.linkColor: d.linkColor;
                    if (d.parent !== undefined && d.parent.operator.indexOf("ignore weights") > -1) {
                        return "Gold";
                    }
                    if (d.weight < 0) {
                        return "RoyalBlue";
                    } else {
                        return "PowderBlue";
                    }
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


