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

var count_down = 50;
var bing;
var bing_key;
var bingMapApiStatus;

////////////////////////
// Bing map api stuff //
////////////////////////

try {
    bing_key = BING_KEY.bing_key;
} catch(e) {
    bing_key = null;
}

if (bing_key != null) {
    bing = new L.BingLayer(bing_key);
    setTimeout(function () { checkBingApi(bing); }, 100);
}

function checkBingApi(binz) {
    if (typeof(binz.meta.statusCode) == 'undefined') {
        count_down--;
        setTimeout(function () { checkBingApi(binz); }, 100);
        return;
    }
    if (binz.meta.statusCode == 200) {
        //continue
    }
    else {
        bingMapApiStatus = false;
        $("#base-map-menu option[value=2]").remove();
    }
}

// switch base maps
$('#base-map-menu').change(function() {
    var baseMapSelection = document.getElementById('base-map-menu').value;
    map.removeLayer(baseMapUrl);
    switch(baseMapSelection) {
        case 'osm':
            baseMapUrl = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
            break;
        case 'bing':
            baseMapUrl = new L.BingLayer(bing_key, {type: 'AerialWithLabels'});
            break;
    }
    map.addLayer(baseMapUrl);
});

$('#base-map-menu').css({ 'margin-bottom' : 0 });
