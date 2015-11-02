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

var webGl;
var mbToken = MAPBOXGL_ACCESSTOKEN;
console.log('mbToken:');
console.log(mbToken);

$(document).ready(function() {

    // Error dialog
    $('#errorDialog').dialog({
        autoOpen: false,
        height: 150,
        width: 400,
        closeOnEscape: true,
        modal: true
    });

    // Check the browser for webGL support
    function webglDetect(return_context) {
        if (!!window.WebGLRenderingContext) {
            var canvas = document.createElement("canvas"),
                names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
                context = false;

            for(var i=0;i<4;i++) {
                try {
                    context = canvas.getContext(names[i]);
                    if (context && typeof context.getParameter == "function") {
                        // WebGL is enabled
                        if (return_context) {
                            // Return WebGL object if the function's argument is present
                            return {name:names[i], gl:context};
                        }
                        // Else, return just true
                        return true;
                    }
                } catch(e) {}
            }

            // WebGL is supported, but disabled
            return false;
        }

        // WebGL not supported
        return false;
    }

    webGl = webglDetect();

    if (webGl === false) {
        $('#errorDialog').empty();
        $('#errorDialog').append(
            '<p>This application requires a moder web browser that supports webGl</p>'
        );
        $('#errorDialog').dialog('open');
    } else {
        setupMapboxGlMap();
    }
});


function setupMapboxGlMap() {
    // Create mapbox map element
    mapboxgl.accessToken = mbToken;

    map = new mapboxgl.Map({
        container: 'map',
        // Load default mapbox basemap
        style: 'mapbox://styles/mapbox/streets-v8',
        center: [0, 20],
        zoom: 2,
    });

}
