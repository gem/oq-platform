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

var startApp = function() {
    /******************
     * Overlay layers *
     ******************/

    var strain = L.tileLayer(TS_URL + '/v2/strain/{z}/{x}/{y}.png');
    var overlays = {
        "Geodetic-Strain" : strain,
    };

    app.createMap();
    L.control.layers(app.baseLayers, overlays).addTo(map);
    L.wax(map);

    // Automatically display the strain layer (otherwise, you have to check the box
    // in the layer control to see it first.
    map.addLayer(strain);

    /*
     * Sliding side panel animation functions:
     */
    var legendSlidingPanel = function() {
        $('#panelHandle-leg').hover(
            function() {
                $('#sidePanel-leg').stop(true, false).animate(
                    {left: '0px'}, 900
                );
            },
            function() {
                // Do nothing
            }
        );

        $('#sidePanel-leg').hover(
            function() {
                // Do nothing
            },
            function() {
                $('#sidePanel-leg').animate(
                    { left: '-201px' }, 800
                );
            }
        );
    };
    $(document).ready(legendSlidingPanel);
};
app.initialize(startApp);
