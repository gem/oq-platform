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

// NOTE: This `map` var needs to be in global scope
// for stuff like wax interaction to work.
var map;

var OQLeaflet = {
    OQLeafletApp: (function() {
        /**
         * @baseMapUrl - Tilestream url (with any of the s/x/y/z tokens) for
         * the base layer.
         */
        var OQLeafletApp = function(baseMapUrl) {
            this.MAX_ZOOM_LEVEL = 16;
            this.baseMapUrl = baseMapUrl;
            this.baseLayers = null;
        };
        OQLeafletApp.prototype.mapFit = function() {
            var headerHeight = $('#oq-page-header').height();
            var footerHeight = $('#oq-page-footer').height();

            var clientHeight = window.innerHeight;

            // Resize the map so that everything fits on one page:
            var mapHeight = (clientHeight - headerHeight - footerHeight) - 10;
            $('#map').css("height", mapHeight + "px");
            // this.map.invalidateSize(false);
        };
        OQLeafletApp.prototype.createMap = function() {
            this.baseLayers = {
                'Base Map' : new L.TileLayer(this.baseMapUrl,
                                             {subdomains: ['a', 'b', 'c', 'd'],
                                              noWrap: true})
            };
            map = L.map('map', {
                center: [20, 20],
                zoom: 3,
                maxZoom: this.MAX_ZOOM_LEVEL,
                maxBounds: new L.LatLngBounds(new L.LatLng(-90, -185), new L.LatLng(90, 185)),
                layers: [this.baseLayers['Base Map']],
                attributionControl: false,
            });
        };
        OQLeafletApp.prototype.initialize = function(startFunc) {

            // Hook map sizing, so the map and the rest of the UI still looks
            // good if the browser window is resized.
            $(document).ready(this.mapFit);
            $(window).resize(this.mapFit);

            // Finally, start the app once the page is fully loaded.
            $(document).ready(startFunc);
        };
        return OQLeafletApp;
    })(),
};
