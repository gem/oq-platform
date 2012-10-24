Ext.namespace('faulted_earth');

faulted_earth.Model = function(prefix_id, title) {
    this.prefix_id = prefix_id;
    this.title = title;
}

faulted_earth.Model.prototype.grid_id = function() {
    return this.prefix_id + '_grid';
}

faulted_earth.Model.prototype.form_id = function() {
    return this.prefix_id + '_form';
}

faulted_earth.Model.prototype.manager_id = function() {
    return this.prefix_id + '_manager';
}

faulted_earth.Model.prototype.form_title = function() {
    return this.title + " Form";
}

faulted_earth.models = [
    faulted_earth.Model("site_events", 'Observations: Events'),
    faulted_earth.Model("site_displacement", 'Observations: Displacement'),
    faulted_earth.Model("site_sliprates", 'Observations: Slip Rates'),
    faulted_earth.Model("site_faultgeometry", 'Observations: Fault Geometry'),
    faulted_earth.Model("trace", 'Traces'),
    faulted_earth.Model("summary", 'Fault Section Summary'),
    faulted_earth.Model("fault", 'Faults'),
    faulted_earth.Model("source", 'Fault Sources')
];

/*
  Copyright (c) 2010-2012, GEM Foundation.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/agpl.html>. */
