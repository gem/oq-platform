/*
   Copyright (c) 2015, GEM Foundation.

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

/////////////////////////////////////
// Dynamic GEM supplemental layers //
/////////////////////////////////////
var supplementalLayerTitle = {};
var supplementalLayerName = {};

function getGeoServerLayers() {
    var url = "/geoserver/ows?service=WFS&version=1.0.0&REQUEST=GetCapabilities&SRSNAME=EPSG:4326&outputFormat=json&format_options=callback:getJson";
    // Get layers from GeoServer and populate the layer selection menu
    $.ajax({
        url: url,
        contentType: 'application/json',
        success: function(xml) {
            // Convert XML to JSON
            var xmlText = new XMLSerializer().serializeToString(xml);
            var x2js = new X2JS();

            var jsonElement = x2js.xml_str2json(xmlText);

            var featureType = jsonElement.WFS_Capabilities.FeatureTypeList.FeatureType;

            // Find the supplemental layer keywords
            var stringToLookFor = 'GEM-supplemental-layer';

            for (var i = 0; i < featureType.length; i++) {
                if (featureType[i].Keywords.indexOf(stringToLookFor) > -1) {
                    var tempTitle = featureType[i].Title;
                    var tempName = featureType[i].Name;
                    supplementalLayerTitle[i] = tempTitle;
                    supplementalLayerName[i] = tempName;
                }
            }

            // Populate dropdown menu
            for (var k in supplementalLayerTitle) {
                $('#supplemental-layer-menu').append('<option value="'+k+'">'+supplementalLayerTitle[k]+'</option>');
            }
        },
        error: function() {
        }
    });
}

getGeoServerLayers();

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

// check for empty menu
$('#supplemental-layer-menu').mousedown(function() {
    if(isEmpty(supplementalLayerName)) {
        // run the api call again
        getGeoServerLayers();
    } else {
        return;
    }
});
