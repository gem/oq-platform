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

var app = new OQLeaflet.OQLeafletApp(THIRD_PARTY_URLS.leaflet_base_map);

var DIALOG_HEIGHT = {min: 320, max: 480};
var DIALOG_WIDTH = {min: 416, max: 640};

var layers;
var layerControl;

var startApp = function() {
    app.createMap();
    layers = {};
    var lcOpts = {
        position: 'topleft'
    };
    layerControl = L.control.layers(app.baseLayers, {}, lcOpts);
    map.addControl(layerControl);

    map.on('overlayadd', function(e) {
        $('input[name="' + e.layer.name + '"]').prop('checked', true);
    });
    map.on('overlayremove', function(e) {
        $('input[name="' + e.layer.name + '"]').prop('checked', false);
    });


    var showDialog = function(divTarget, title, content, options) {
        $(divTarget).empty();
        if (options === undefined) {
            options = {};
        }
        options.modal = true;
        options.title = title;
        options.minHeight = DIALOG_HEIGHT.min;
        options.maxHeight = DIALOG_HEIGHT.max;
        options.minWidth = DIALOG_WIDTH.min;
        options.maxWidth = DIALOG_WIDTH.max;
        options.resizable = false;
        options.draggable = false;

        $(divTarget).append(content);
        options.close = function() {
            $(divTarget).empty();
        };

        $(divTarget).dialog(options);
    };


    // TODO(LB): Show progress while the form is loading.
    var newCalculation = function(calcFormUrl) {
        return function () {
            $.ajax({
                type: 'GET',
                url: calcFormUrl,
                success: function(data, textStatus, jqXHR) {
                    var formDiv = $(data).filter('#calc-form-wrapper')[0];
                    prepCalcForm(formDiv);
                    showDialog('#oq-calc-dialog', 'Run calculation',
                               formDiv);

                    // hook the form functionality for adding more input
                    // files...
                    $('#add-input-model').click(addInputModel);
                    // ... and prevent a page redirect on form submit
                    $('#calc-form').submit(function() {
                        // TODO(LB): If we wanted to get the calculation ID
                        // here, we should beable to get it from the ajaxSubmit
                        // by adding a 'success' handler.
                        $(this).ajaxSubmit();
                        $('#oq-calc-dialog').dialog('close');
                        return false;
                    });

                }
            });
        };
    };


    // Shamelessly copied from the oq-engine-server run calc template.
    var addInputModel = function() {
        var modelCount = $('input[id^="id_model_"]').length;
        modelCount++;

        var newID = 'id_model_' + modelCount;
        var modelLabel = '<label for="' + newID
            + '">Input model ' + modelCount + '</label>';
        var modelField = '<input type="file" name="input_model_'
            + modelCount + '" id="' + newID + '" />';
        $('#additional-fields').append(
            '<p>' + modelLabel + modelField + '</p>'
        );
    };

    // Auto-populate the callback url and user fields,
    // and then hide the elements.
    // We don't want to expose this sort of thing to the user.
    var prepCalcForm = function(formDiv) {
        $(formDiv)
            .find('input[id=id_migration_callback_url]')
            .val(ICEBOX_URLS.artifacts_import)
            .parent()
            .hide();
        $(formDiv)
            .find('input[id=id_owner_user]')
            .val(CURRENT_USER)
            .parent()
            .hide();
    };

    var openCalculation = function() {
        // TODO(LB): Filter out results with group_type!="calculation"
        // TODO(LB): This means adding a url param `group_type` to
        // the artifact_groups icebox API.
        $.ajax({
            type: 'GET',
            url: ICEBOX_URLS.artifact_groups,
            success: function(data, textStatus, jqXHR) {
                // show the dialog with the selection list:
                var html = '<div id="open-calc-wrapper">'
                    + '<select id="artifact-groups-list"></select>'
                    + '<br /><br />'
                    + '<input type="button" id="button-do-open-calc" '
                    + 'value="Open">'
                    + '</div>';
                showDialog('#oq-calc-dialog', 'Open calculation',
                           html);

                // populate the list of artifact groups/calculations
                // from the ajax response:
                for (var i = 0; i < data.length; i++) {
                    // TODO(LB): Filter out results with group_type!="calculation"
                    var url = data[i].url;
                    var name = data[i].name;
                    var opt = (
                        '<option value="' + url + '">' + name + '</option>'
                    );
                    $('#artifact-groups-list').append(opt);
                }

                $('#button-do-open-calc').click(function() {
                    var selectedGroupUrl = $('#artifact-groups-list').val();
                    $('#oq-calc-dialog').dialog('close');
                    showDialog('#oq-calc-dialog', 'Loading...',
                               '<img id="download-button-spinner" src="/static/img/ajax-loader.gif" />',
                               {dialogClass: 'no-close'});
                    populateLayerTreeFromUrl(selectedGroupUrl, function() {
                        // Close the `Loading...` when it is done.
                        $('#oq-calc-dialog').dialog('close');
                    });
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                showDialog('#oq-calc-dialog', 'Nothing here',
                           'No calculations are available at this time.');
            }
        });
    };

    var clearAllLayers = function() {
        for (key in layers) {
            var theLayer = layers[key];
            map.removeLayer(theLayer);
            layerControl.removeLayer(theLayer);
        }
        layers = {};

        // Clear the layer tree too:
        $('#oq-layer-tree').empty();
    };


    // TODO: show progress indicator, somewhere!
    var populateLayerTreeFromUrl = function(url, complete) {
        // TODO:  First, clear everything
        clearAllLayers();

        $.ajax({
            type: 'GET',
            url: url,
            success: function(data, textStatus, jqXHR) {
                var layerCount = 1;
                for (var i = 0; i < data.artifacts.length; i++) {
                    var art = data.artifacts[i];
                    if (art.artifact_type == 'calculation') {
                        // TODO(LB): we need to support visualization of calculation
                        // geometry, etc.
                        continue;
                    }
                    // TODO(LB): handle 404s with a 'error' callback.
                    // NOTE(LB): The layer name needs to be wrapped in an
                    // object in order to create a proper closure of the layer
                    // name in the callback function below.
                    // Pay attention to the scope!!!
                    var layerInfo = {
                        name: art.name
                    };
                    var layerLoadedCallback = function(info) {
                        return function(innerData, innerTextStatus) {
                            // Convert the json text to a json obj
                            var artData = JSON.parse(innerData);
                            var layer = createGeoJSONLayer(
                                artData.artifact_type, artData
                            );
                            if (layer != null) {
                                // TODO: what if the names are the same???
                                // TODO: the hash will break if any names are duplicated
                                layers[info.name] = layer;
                                layerControl.addOverlay(layer, info.name);
                                var layerCheckable = '<input class="oq-layer-tree-node" '
                                    + 'type="checkbox" name="' + info.name + '" />'
                                    + info.name + '<br />';
                                $('#oq-layer-tree').append(layerCheckable);
                            }
                            // increment the counter so we can keep track of progress and
                            // know when to execute the `complete` callback.
                            layerCount++;
                            if (layerCount == data.artifacts.length) {
                                complete();
                                // hook the checkbox functionality
                                $('#oq-layer-tree :checkbox').click(function() {
                                    if ($(this).is(':checked')) {
                                        map.addLayer(layers[this.name]);
                                    }
                                    else {
                                        map.removeLayer(layers[this.name]);
                                    }
                                });
                            }
                        };  // End inner function
                    };
                    $.ajax({
                        type: 'GET',
                        url: art.url,
                        success: layerLoadedCallback(layerInfo)
                    });
                }
            }
        });
    };


    var getColor = function(iml, minClip, maxClip) {
        // clip the iml to the min/max
        if (iml < minClip) {
            iml = minIML;
        }
        else if (iml > maxClip) {
            iml = maxIML;
        }
        var ratio = iml / maxClip;

        var maxColor = 30.0;
        var colorRatio = ratio * maxColor;

        // This colormap came from
        // http://soliton.vm.bytemark.co.uk/pub/cpt-city/jjg/misc/tn/seminf-haxby.png.index.html
        var colorMap = [
            [ 0.00, 'rgb( 255, 255, 255)'],
            [ 1.25, 'rgb( 255, 255, 255)'],
            [ 2.50, 'rgb( 208, 216, 251)'],
            [ 3.75, 'rgb( 186, 197, 247)'],
            [ 5.00, 'rgb( 143, 161, 241)'],
            [ 6.25, 'rgb(  97, 122, 236)'],
            [ 7.50, 'rgb(   0,  39, 224)'],
            [ 8.75, 'rgb(  25, 101, 240)'],
            [10.00, 'rgb(  12, 129, 248)'],
            [11.25, 'rgb(  24, 175, 255)'],
            [12.50, 'rgb(  49, 190, 255)'],
            [13.75, 'rgb(  67, 202, 255)'],
            [15.00, 'rgb(  96, 225, 240)'],
            [16.25, 'rgb( 105, 235, 225)'],
            [17.50, 'rgb( 123, 235, 200)'],
            [18.75, 'rgb( 138, 236, 174)'],
            [20.00, 'rgb( 172, 245, 168)'],
            [21.25, 'rgb( 205, 255, 162)'],
            [22.50, 'rgb( 223, 245, 141)'],
            [23.75, 'rgb( 240, 236, 120)'],
            [25.00, 'rgb( 247, 215, 103)'],
            [26.25, 'rgb( 255, 189,  86)'],
            [27.50, 'rgb( 255, 160,  68)'],
            [28.75, 'rgb( 244, 116,  74)'],
            [30.00, 'rgb( 238,  79,  77)']
        ];

        var selectedColor;
        for (var i = 1; i < colorMap.length; i++) {
            var prevVal = colorMap[i - 1][0];
            var val = colorMap[i][0];
            var color = colorMap[i][1];
            if (colorRatio >= prevVal && colorRatio <= val) {
                selectedColor = color;
                break;
            }
        }

        return selectedColor;
    };


    // TODO(LB): for hazard maps
    // This is prototype code.
    var minIML = 0.0;
    var maxIML = 0.6;

    // Create leaflet layer object.
    var createGeoJSONLayer = function(artifactType, geojson) {
        // TODO: do different stuff (styling) for different artifact types
        // Focus on hazard maps right now.
        if (artifactType == 'calculation') {
            // TODO: deal with calculation layers
            return null;
        }
        var style = {
            color:'white',
            radius: 3,
            opacity: 0.2,
            fillOpacity: 0.7,
            weight: 2,
            clickable: false
        };

        var gjLayer = new L.GeoJSON(geojson, {
            pointToLayer: function (data, latlng) {
                style.fillColor = getColor(
                    data.properties.iml, minIML, maxIML
                );
                return L.circleMarker(latlng, {style: style});
            },
            style: function(feature){
                return style;
            }
        });
        return gjLayer;
    };

    $('#button-new-hazard-calc').click(
        newCalculation(OQ_ENGINE_SERVER_URLS.run_hazard_calc_form)
    );
    $('#button-new-risk-calc').click(
        newCalculation(OQ_ENGINE_SERVER_URLS.run_risk_calc_form)
    );
    $('#button-open-calc').click(openCalculation);
};

app.initialize(startApp);
