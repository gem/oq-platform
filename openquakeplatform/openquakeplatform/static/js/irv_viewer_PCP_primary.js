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

function Primary_PCP_Chart(projectDef) {
    // Find the theme data and create selection dropdown menu
    console.log('projectDef:');
    console.log(projectDef);

    var themesWithChildren = [];
    for (var i = 0; i < projectDef.children.length; i++) {
        for (var j = 0; j < projectDef.children[i].children.length; j++) {
            console.log('projectDef.children[i].children[j]:');
            console.log(projectDef.children[i].children[j]);
            if (projectDef.children[i].children[j].children) {
                themesWithChildren.push(projectDef.children[i].children[j].name);
            }
        }
    }
    console.log('themesWithChildren:');
    console.log(themesWithChildren);
    for (var l = 0; l < themesWithChildren.length; l++) {
        console.log('themesWithChildren[l]:');
        console.log(themesWithChildren[l]);
        var theme = themesWithChildren[l];
        $('#primary_indicator').append('<option value="'+ theme +'">' + theme + '</option>');
    }


}

