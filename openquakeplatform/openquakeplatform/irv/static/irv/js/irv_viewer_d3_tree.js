/*
   Copyright (c) 2014-2016, GEM Foundation.

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

    var DEFAULT_OPERATOR = "Weighted sum";
    var CIRCLE_SCALE = 30.0;
    var MAX_STROKE_SIZE = 4.0;
    var MIN_CIRCLE_SIZE = 0.001;
    var NODE_TYPES = {
        'IRI': 'Integrated Risk Index',
        'RI': 'Risk Index',
        'RISK_INDICATOR': 'Risk Indicator',
        'SVI': 'Social Vulnerability Index',
        'SV_THEME': 'Social Vulnerability Theme',
        'SV_INDICATOR': 'Social Vulnerability Indicator'
    };
    var projectDefUpdated;

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

    function loadPD(selectedPDef) {
        // Rebuild the d3 tree, based on the given project definition

        // default tab window size
        var winH = 600;
        var winW = 700;

        // detect tab window resize
        $('#project-def-widget').resize(function(event) {
            winH = event.clientY;
            winW = event.clientX;
        });

        var qt_page = typeof qt_page !== 'undefined' ? qt_page : false;
        var margin = {top: 0, right: 20, bottom: 20, left: 20},
            width = winW - margin.right - margin.left,
            height = winH - margin.top - margin.bottom;

        var i = 0,
            duration = 750,
            root;

        var tooltipdiv = d3.select("#projectDefDialog").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        var tree = d3.layout.tree()
            .size([height, width])
            .separation(function separation(a,b) {
                // at least the sum of radius of two sibling nodes, plus the text for weight
                return getRadius(a) + getRadius(b) + 8;
            });


        var nodeEnter;

        var diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });

        function isComputable(node) {
            if (node.type === NODE_TYPES.IRI) {
                if (typeof node.children === 'undefined') {
                    return false;
                }
                // check if both RI and SVI are computable
                var areRiAndSviComputable = true;
                for (var i = 0; i < node.children.length; i++) {
                    if (!isComputable(node.children[i])) {
                        areRiAndSviComputable = false;
                    }
                }
                if (areRiAndSviComputable) {
                    return true;
                } else {
                    return false;
                }
            }
            if (node.type === NODE_TYPES.SVI) {
                if (typeof node.children === 'undefined') {
                    return false;
                }
                // Check if all themes are computable
                var areAllThemesComputable = true;
                for (var j = 0; j < node.children.length; j++) {
                    if (!isComputable(node.children[j])) {
                        areAllThemesComputable = false;
                    }
                }
                if (areAllThemesComputable) {
                    return true;
                } else {
                    return false;
                }
            }
            if (node.type === NODE_TYPES.RI || node.type === NODE_TYPES.SVI || node.type == NODE_TYPES.SV_THEME) {
                if (typeof node.children === 'undefined' || (typeof node.children !== 'undefined' && node.children.length === 0)) {
                    return false;
                } else {
                    return true;
                }
            }
            return true;
        }

        function createSpinner(id, weight, name, operator, isInverted) {
            pdTempSpinnerIds.push("spinner-"+id);
            $('#projectDefWeightDialog').dialog("open");
            var content = '<p><label for="spinner'+id+'">'+name+':';

            if (typeof operator !== 'undefined') {
                content += ' ('+ operator +') ';
            }

            content += '</label><input id="spinner-' + id + '" element="' + name + '" name="spinner" value="' + weight + '">';
            if (isInverted) {
                content += '<input type="checkbox" id="inverter-spinner-' + id + '" checked>';
            } else {
                content += '<input type="checkbox" id="inverter-spinner-' + id + '">';
            }
            content += '<label style="font-size: 0.8em; "for="inverter-spinner-' + id + '"'+
                'title="Select to invert the contribution of the variable to the calculation">Invert</label></p>';

            $('#projectDefWeightDialog').append(content);

            $(function() {
                var inverter = $("#inverter-spinner-" + id);
                inverter.button();
                inverter.prop("checked", isInverted);
                inverter.button("refresh");
            });

            $(function() {
                $("#spinner-"+id).width(100).spinner({
                    min: 0,
                    max: 100,
                    step: 0.001,
                    numberFormat: "n",
                    incremental: true
                });
            });
        }

        $('#submitPD').attr('disabled',true);

        $('#saveBtn').click(function() {
            $('#checkboxPD').attr('checked', false);
            $('#saveState-spinner').hide();
            var pdLicenseName = license.substring(0, license.indexOf('('));
            var pdLicenseURL = license.split('(')[1];
            pdLicenseURL = pdLicenseURL.replace(')', '');

            $('#saveState-spinner').hide();
            $('#saveStateDialog').dialog('open');
            $('#licenseName').empty();
            $('#licenseURL').empty();
            $('#inputName').empty();
            $('#inputName').append('<p>The current title is: '+ sessionProjectDef.title +'</p><p> <input id="giveNamePD" type="text" name="pd-name"></p><br><br>');
            $('#licenseName').append(
                '<p>This project has been created using the '+ pdLicenseName +' license ' +
                '<a class="btn btn-blue btn-xs" target="_blank" href="'+ pdLicenseURL +'"> Info</a><br> </p>'
            );

            $('#checkboxPD').change(function() {
                if (this.checked) {
                    $('#submitPD').attr('disabled', false);
                } else {
                    $('#submitPD').attr('disabled', true);
                }
            });
        });


        function updateButton() {
            $('#projectDefWeightDialog').append('<br/><br/><button type="button" id="update-spinner-value" class="btn btn-blue">Update</button>');
            $('#update-spinner-value').click(function() {
                $('#absoluteSpinner').show();
                $('#projectDefWeightDialog').append('<div id="projectDefWeight-spinner" >Loading ...<img src="/static/img/ajax-loader.gif" /></div>');
                setTimeout(function() {
                    $('#saveBtn').prop('disabled', false);
                    var weightChangeLevel;
                    pdTempWeights = [];
                    pdTempWeightsComputed = [];
                    pdTempInverters = [];

                    // Get the values of the spinners and inverters
                    for (var i = 0; i < pdTempSpinnerIds.length; i++) {
                        var isInverted = $('#inverter-' + pdTempSpinnerIds[i]).is(':checked');
                        var spinnerValue = $('#'+pdTempSpinnerIds[i]).val();

                        pdTempInverters.push(isInverted);
                        pdTempWeights.push(spinnerValue);
                    }

                    // Adjust the values into percentages
                    pdTempWeights = pdTempWeights.map(Number);
                    var totalWeights = 0;
                    $.each(pdTempWeights,function() {
                        totalWeights += parseFloat(this);
                    });

                    for (var ia = 0; ia < pdTempWeights.length; ia++) {
                        if (totalWeights === 0) {
                            pdTempWeightsComputed.push(0);
                        } else {
                            pdTempWeightsComputed.push(pdTempWeights[ia] / totalWeights);
                        }
                    }

                    // Update the results back into the spinners and to the d3.js chart
                    for (var ib = 0; ib < pdTempSpinnerIds.length; ib++) {
                        $('#'+pdTempSpinnerIds[ib]).spinner("value", pdTempWeightsComputed[ib]);
                    }

                    // Upadte the json with new values
                    for (var ic = 0; ic < pdTempWeightsComputed.length; ic++) {
                        updateTreeBranch(pdData, [pdTempIds[ic]], pdTempWeightsComputed[ic], pdTempInverters[ic]);
                    }

                    for (var id = 0; id < pdTempSpinnerIds.length; id++) {
                        // get the elements that have been modified
                        var tempNewWeight = [];
                        var value = $('#'+pdTempSpinnerIds[id]).val();
                        var element = $('#'+pdTempSpinnerIds[id]).attr('element');
                        tempNewWeight.push(element);
                        tempNewWeight.push(parseFloat(value));
                        weightChangeLevel = traverse(pdData, tempNewWeight);
                    }

                    nodeEnter.remove("text");

                    processIndicators(projectLayerAttributes, projectDefUpdated, weightChangeLevel);
                    updateD3Tree(pdData);
                }, 100);
            });
        }

        // update the JSON with new weights
        function traverse(projectDef, tempNewWeight) {

            projectDefUpdated = projectDef;
            var weightChangeLevel = 0;

            // Check each level of the project definition and update the weight if a match is found
            if (projectDef.name == tempNewWeight[0]) {
                projectDefUpdated.weight = tempNewWeight[1];
                weightChangeLevel = 1; // IRI
            }

            for (var i = 0; i < projectDef.children.length; i++) {
                if (projectDef.children[i].name == tempNewWeight[0]) {
                    projectDefUpdated.children[i].weight = tempNewWeight[1];
                    weightChangeLevel = 2; // SVI or RI
                }
                if (projectDef.children[i].children !== undefined) {
                    for (var j = 0; j < projectDef.children[i].children.length; j++) {
                        if (projectDef.children[i].children[j].name == tempNewWeight[0]) {
                            weightChangeLevel = 3; // SVI or RI theme
                            projectDefUpdated.children[i].children[j].weight = tempNewWeight[1];
                        }
                        if (projectDef.children[i].children[j].children !== undefined) {
                            for (var g = 0; g < projectDef.children[i].children[j].children.length; g++) {
                                if (projectDef.children[i].children[j].children[g].name == tempNewWeight[0]) {
                                    weightChangeLevel = 4; // Primary indicator
                                    projectDef.children[i].children[j].children[g].weight = tempNewWeight[1];
                                }
                            }
                        }
                    }
                }
            }

            return weightChangeLevel;
        }

        function getRadius(d) {
            var radius = MIN_CIRCLE_SIZE;
            if (typeof d.weight != 'undefined') {
                radius = Math.max(d.weight * CIRCLE_SCALE, MIN_CIRCLE_SIZE);
            }
            if (typeof d.parent != 'undefined') {
                if (typeof d.parent.operator != 'undefined') {
                    if (d.parent.operator.indexOf('ignore weights') != -1) {
                        radius = Math.max(1.0 / d.parent.children.length * CIRCLE_SCALE, MIN_CIRCLE_SIZE);
                    }
                }
            }
            return radius;
        }

        function findTreeBranchInfo(pdData, pdName, pdLevel) {
            // Find out how many elements are in tree branch
            if (pdLevel.some(function(currentValue) {
                return (pdData.level == currentValue);

            })) {
                pdTempIds.push(pdData.id);
                createSpinner(pdData.id, pdData.weight, pdData.name, pdData.operator, pdData.isInverted);
            }

            (pdData.children || []).forEach(function(currentItem) {
                findTreeBranchInfo(currentItem, [pdName], [pdLevel]);
            });
        }

        function updateTreeBranch(pdData, id, pdWeight, pdIsInverted) {

            if (id.some(function(currentValue) {
                return (pdData.id == currentValue);
            })) {
                pdData.weight = pdWeight;
                pdData.isInverted = pdIsInverted;
            }

            (pdData.children || []).forEach(function(currentItem) {
                updateTreeBranch(currentItem, id, pdWeight, pdIsInverted);
            });
        }

        // empty any previously drawen chart
        $('#projectDef-tree').empty();
        var svg = d3.select("#projectDef-tree")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", "-60 10 " + winW +" " + winH)
            .attr("id", "primary-svg-element")
            .call(d3.behavior.zoom().scaleExtent([0.1, 5]).on("zoom", function () {
                svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
            }))
            .append("svg:g")
            .attr("transform", "translate(" + margin.left + ",5)");

            data = selectedPDef;

            root = data;
            root.x0 = height / 2;
            root.y0 = 0;

            updateD3Tree(root);

        $('#project-definition-svg').hide();

        d3.select(self.frameElement).style("height", "800px");

        function onTreeWeightClick(d) {
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
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })
                .on("mouseover", function(d) {
                    var info;
                    if (typeof d.field !== 'undefined') {
                        info = d.field;
                        tooltipdiv .transition()
                            .duration(500)
                            .style("opacity", 0.7);
                        tooltipdiv .html(info)
                            .style("left", (d3.event.pageX) + "px")
                            // TODO: find a better way to place the tooltip instead of hardcoding 100
                            .style("top", (d3.event.pageY - 100) + "px");
                    }
                })
                .on("mouseout", function(d) {
                    tooltipdiv .transition()
                        .duration(500)
                        .style("opacity", 0);
                });

            // tree indicator label
            nodeEnter.append("text")
                .attr("class", (function(d) { return "level-" + d.level; }))
                .attr("id", "svg-text")
                .attr("value", (function(d) { return d.weight; }))
                .attr("x", function(d) { return -(getRadius(d) + 5); })

                .attr("x", function(d) {
                    if (d.type === NODE_TYPES.SV_INDICATOR || d.type === NODE_TYPES.RISK_INDICATOR) {
                        return getRadius(d) + 5;
                    } else {
                        return -(getRadius(d) + 5);
                    }
                })
                .attr("dy", function(d) {
                    // Place the label always at the same height of the node
                    return "0.3em";
                })
                .attr("text-anchor", function(d) {
                    if (d.type === NODE_TYPES.SV_INDICATOR || d.type === NODE_TYPES.RISK_INDICATOR) {
                        return "start";
                    } else {
                        return "end";
                    }
                })
                .text(function(d) {
                    // Render a minus before the name of a variable which weight is negative
                    if (d.isInverted) {
                        return "- " + d.name;
                    } else {
                        return d.name;
                    }
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "20px")
                .style("fill-opacity", 1e-6);

            // tree operator label
            nodeEnter.append("text")
                .text(function(d) {
                    if (d.children){
                        var operator = d.operator? d.operator : DEFAULT_OPERATOR;
                        d.operator = operator;
                        if (operator.indexOf('ignore weights') != -1 || operator.indexOf('no recalculation') != -1) {
                            parts = operator.split('(');
                            operator = parts[0];
                        }
                        return operator;
                    }
                })
                .style("fill", function(d) {
                    if (d.operator != 'undefined') {
                        // Check for operators that ignore weights and style accordingly
                        var color = 'black';
                        return color;
                    }
                })
                .attr("id", function(d) {return "operator-label-" + d.level;})
                .attr("x", function(d) { return getRadius(d) + 5; })
                .attr("dy", function(d) { return '0.3em'; });


            // Render 'ignore weights' into a new line when present
            nodeEnter.append("text")
                .text(function(d) {
                    if (d.children){
                        var ignoreWeightsStr = '';
                         if (d.operator.indexOf('ignore weights') != -1 || d.operator.indexOf('no recalculation') != -1) {
                            parts = d.operator.split('(');
                            ignoreWeightsStr = '(' + parts[1];
                        }
                        return ignoreWeightsStr;
                    }
                })
                .style("fill", function(d) {
                    if (d.operator != 'undefined') {
                        // Check for operators that ignore weights and style accordingly
                        var color = '#660000';
                        return color;
                    }
                })
                .attr("id", function(d) {return "ignore-weights-label-" + d.level;})
                .attr("x", function(d) { return getRadius(d) + 15; })
                .attr("transform", "translate(0, 12)");

            // Render weight values in tree
            nodeEnter.append("text")
                .attr("class", "pointer")
                .style("fill", "#0000EE")
                .attr("x", function(d) {
                    if (d.type == NODE_TYPES.SVI) {
                        if (getRadius(d) >= 15 && getRadius(d) < 20 ) {
                            return "-4em";
                        } else if (getRadius(d) >= 20) {
                            return "-5em";
                        } else {
                            return "-2.7em";
                        }
                    } else{
                        return "-1em";
                    }
                })
                .attr("dy", function(d) {
                    if (typeof d.parent != "undefined" && d.x > d.parent.x && d.type == NODE_TYPES.SVI){
                        return 30;
                    } else if(typeof d.parent != "undefined" && d.x > d.parent.x){
                        return -(getRadius(d) + 5);
                    } else {
                        return getRadius(d) + 12;
                    }})
                .text(function(d) {
                    if (d.parent === 'undefined') {
                        return "";
                    }
                    return (d.weight * 100).toFixed(1) + '%';
                })
                .on("click", function(d) {
                    onTreeWeightClick(d);
                });

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

            nodeUpdate.select("circle")
                .attr("r", function (d) {
                    // d.weight is expected to be between 0 and 1
                    // Nodes are displayed as circles of size between 1 and CIRCLE_SCALE
                    return d.weight ? Math.max(getRadius(d), MIN_CIRCLE_SIZE): MIN_CIRCLE_SIZE;
                })
                .style("opacity", function(d) {
                    if (isComputable(d)) {
                        return 1;
                    } else {
                        return 0.3;
                    }
                })
                .style("stroke", function(d) {
                    if (d.isInverted) {
                        return "PowderBlue";
                    } else {
                        return "RoyalBlue";
                    }
                })
                .style("stroke-width", function(d) {
                    return d.weight ? Math.min(getRadius(d) / 2.0, MAX_STROKE_SIZE): 4.0;
                })
                .style("fill", function(d) {
                    // return d.source ? d.source.linkColor: d.linkColor;
                    if (d.isInverted) {
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
                .style("opacity", function(d) {
                    if (isComputable(d.source)) {
                        return 1;
                    } else {
                        return 0.1;
                    }
                })
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
            $('#projectDefWeight-spinner').remove();
        }
        $('#projectDef-spinner').hide();
    } //end loadPD

    $('#submitPD').click(function () {
        $('#submitPD').attr('disabled',true);
        $('#checkboxPD').attr('checked', false);
        $('#saveState-spinner').show();
        var inputNamePD = $('#giveNamePD').val();
        if (inputNamePD === '' || inputNamePD === null) {
            $('#ajaxErrorDialog').empty();
            $('#ajaxErrorDialog').append(
                '<p>A valid name was not provided</p>'
            );
            $('#ajaxErrorDialog').dialog('open');
            $('#saveState-spinner').hide();
        } else {
            projectDefUpdated.title = inputNamePD;

            var projectDefStg = JSON.stringify(projectDefUpdated, function(key, value) {
                //avoid circularity in JSON by removing the parent key
                if (key == "parent") {
                    return 'undefined';
                }
                return value;
            });

            // Temporarily disable the project definition selector
            $('#pdSelection').prop("disabled", true);
            // Hit the API endpoint and grab the very very latest version of the PD object
            $.post( "../svir/add_project_definition", {
                layer_name: selectedLayer,
                project_definition: projectDefStg
                },
                function() {
                }).done(function() {
                    tempProjectDef.push(JSON.parse(projectDefStg));
                    $('#saveStateDialog').dialog('close');
                    $('#saveState-spinner').hide();
                    $('#saveBtn').prop('disabled', true);
                    // append the new element into the dropdown menu
                    $('#pdSelection').append('<option value="'+ inputNamePD +'">'+ inputNamePD +'</option>');
                    // access the last or newest element in the dropdown menu
                    var lastValue = $('#pdSelection option:last-child').val();
                    // select the newest element in the dropdown menu
                    $('#pdSelection').val(lastValue);
                }).fail(function(resp) {
                    $('#ajaxErrorDialog').empty();
                    var error_msg = "<p>This application was not able to write the project definition to the database:</p><p>" + resp.responseText + "</p>";
                    $('#ajaxErrorDialog').append(error_msg);
                    $('#ajaxErrorDialog').dialog('open');
                    $('#submitPD').attr('disabled',true);
                    $('#saveState-spinner').hide();
                }).always(function() {
                    $('#pdSelection').prop("disabled", false);
            });
        }
    });
