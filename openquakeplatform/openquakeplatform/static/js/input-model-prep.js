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

var hot;

$( document ).ready(function() {
    $('#updateBtn').css('display', 'block');
});


$('#updateBtn').click(function() {
    // Remove any existing table
    try {
        hot.destroy();
    } catch (e) {
        // continue
    }
    // get info from form
    var structureArea = $("#structuralSelect option:selected").val();
    var nonStructureArea = $("#nonStructuralSelect option:selected").val();
    var contentsCost = $("#contentsSelect option:selected").val();
    var businessCost = $("#businessSelect option:selected").val();

    var header = [structureArea, nonStructureArea, contentsCost, businessCost];
    var headerLength =  header.length;
    console.log('header:');
    console.log(header);

    var container = document.getElementById('hot');
    hot = new Handsontable(container,
    {
        //data: data,
        colHeaders: header,
        rowHeaders: true,
        minSpareRows: 1,
        //colHeaders: true,
        contextMenu: true,
        startCols: headerLength,
        maxCols: headerLength
    });


});


