/*
   Copyright (c) 2014, GEM Foundation.

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


/////////////////////////////////////////////////
////// Category Parallel Coordinates Chart //////
/////////////////////////////////////////////////

function Primary_PCP_Chart(projectDef, layerAttributes, selectedRegion) {
    // Find the theme data and create selection dropdown menu
    console.log('projectDef:');
    console.log(projectDef);
    console.log('layerAttributes:');
    console.log(layerAttributes);

    var themesWithChildren = [];
    for (var i = 0; i < projectDef.children.length; i++) {
        for (var j = 0; j < projectDef.children[i].children.length; j++) {
            if (projectDef.children[i].children[j].children) {
                themesWithChildren.push(projectDef.children[i].children[j].name);
            }
        }
    }

    for (var l = 0; l < themesWithChildren.length; l++) {
        var theme = themesWithChildren[l];
        $('#primary_indicator').append('<option value="'+ theme +'">' + theme + '</option>');
    }
    $('#primary_indicator').show();

    $('#primary_indicator').change(function() {
        var selectedTheme = $('#primary_indicator').val();
        // Find the children of selected theme
        var selectedThemeChildren;
        for (var i = 0; i < projectDef.children.length; i++) {
            for (var j = 0; j < projectDef.children[i].children.length; j++) {
                if (projectDef.children[i].children[j].name === selectedTheme) {
                    selectedThemeChildren = projectDef.children[i].children[j].children;
                }
            }
        }
        console.log('selectedThemeChildren:');
        console.log(selectedThemeChildren);

        // Get the data for each selected theme child
        var data = [];
        // first setup an object with all regions and the plot element
        var la = layerAttributes.features;
        for (var ia = 0; ia < selectedThemeChildren.length; ia++) {
            var temp = {};
            temp.plotElement = selectedThemeChildren[ia].field;
            for (var s = 0; s < la.length; s++) {
                var bar = la[s].properties[selectedRegion];
                temp[bar] = 0;
            }
            data.push(temp);
        }

        for (var n = 0; n < data.length; n++) {
            for (var m = 0; m < layerAttributes.features.length; m++) {
                var field = data[n].plotElement;
                var value = layerAttributes.features[m].properties[field];
                var region = layerAttributes.features[m].properties[selectedRegion];
                data[n][region] = value;
            }
        }

        console.log('data:');
        console.log(data);

    });
}

