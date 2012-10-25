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

Ext.namespace('gem.utils');

gem.utils.fromFieldToDescription = function(field){
    /* e.g. upper_seismogenic_min =>   Upper Seismogenic Min */
    var ret = field.replace(/(\_[a-z])/g, 
			    function($1){
				return $1.toUpperCase().replace('_',' ');
			    });
    ret = ret.replace(/^[a-z]/g, function($1) { return $1.toUpperCase() });
    return ret;
};

gem.utils.fieldSuffix = function(field) {
    return field.split('_').reverse()[0];
}

gem.utils.fieldPrefix = function(field) {
    return field.split('_').slice(0, -1).join('_');
}

/* Validation utility */
/* makes some assumption about the field naming convention */
checkInterval = function(grid, field, value) {
    var max_val, min_val, pref_val, op;
    var suffix = gem.utils.fieldSuffix(field);
    var prefix = gem.utils.fieldPrefix(field);
    var description = gem.utils.fromFieldToDescription(prefix);
    if (!value) 
	return;
    switch(suffix) {
    case 'max':
	min_val = grid.getCurrentValue(prefix + '_min', parseFloat);
	pref_val = grid.getCurrentValue(prefix + '_pref', parseFloat);
	max_val = value;
	op = "less"
	break;
    case 'min':
	max_val = grid.getCurrentValue(prefix + '_max', parseFloat);
	pref_val = grid.getCurrentValue(prefix + '_pref', parseFloat);
	min_val = value;
	op = "greater"
	break;
    case 'pref':
	min_val = grid.getCurrentValue(prefix + '_min', parseFloat);
	max_val = grid.getCurrentValue(prefix + '_max', parseFloat);
	pref_val = value;
	break;
    }
    if (min_val && max_val && min_val >= max_val) {
	return description + " interval wrong. Max " + description + " has to be greater than the minimum " + description;
    }
    if (min_val && max_val && pref_val && (pref_val < min_val || pref_val > max_val)) {
	return "Preferred " + description + " has to be between the minimum and the maximum " + description;
    }
}

function checkBetween(field, value, min, max) {
    value = parseFloat(value);
    var description = gem.utils.fromFieldToDescription(field);
    if (!value)
	return;
    if (value <= min || value >= max) {
	return description + " has to be between " + min + " and " + max;
    }
}

function checkCompleteness(field, value) {
    value = parseFloat(value);
    checkBetween(field, value, 1, 4) || gem.utils.checkInteger(field, value);
}

function checkAngle(field, value) {
    value = parseFloat(value);
    checkBetween(field, value, 0, 360);
}

function checkQuadrant(field, value) {
    value = parseFloat(value);
    checkBetween(field, value, 0, 90);
}

gem.utils.checkPositive = function(field, value) {
    var description = gem.utils.fromFieldToDescription(field);
    value = parseFloat(value);
    if (!value)
	return;
    if (value < 0) {
	return description + " has to be strictly positive";
    }
}

gem.utils.checkValueIn = function(field, value, possibilities) {
    var description = gem.utils.fromFieldToDescription(field);
    var possibilities_string = possibilities.join(', ');
    if (possibilities.indexOf(value) == -1) {
	return description + " can be only one of the following values " + possibilities_string;
    }
}

gem.utils._checkWidthRule = function(a, b, c) {
    if (a && b && c) {
	return (a - b) / Math.sin(Math.PI / 2 * c) <= 0;
    }
    return false;
}

gem.utils.checkWidthRule = function(fieldname, grid) {
    var description = gem.utils.fromFieldToDescription(fieldName);

    var low_d_min = grid.getCurrentValue('low_d_min', parseFloat);
    var low_d_pref = grid.getCurrentValue('low_d_pref', parseFloat);
    var low_d_max = grid.getCurrentValue('low_d_max', parseFloat);

    var u_sm_d_min = grid.getCurrentValue('u_sm_d_min', parseFloat);
    var u_sm_d_pref = grid.getCurrentValue('u_sm_d_pref', parseFloat);
    var u_sm_d_max = grid.getCurrentValue('u_sm_d_max', parseFloat);

    var dip_min = grid.getCurrentValue('dip_min', parseFloat);
    var dip_pref = grid.getCurrentValue('dip_pref', parseFloat);
    var dip_max = grid.getCurrentValue('dip_max', parseFloat);

    if (gem.utils._checkWidthRule(low_d_min, u_sm_d_max, dip_max) ||
	gem.utils._checkWidthRule(low_d_max, u_sm_d_min, dip_min) ||
	gem.utils._checkWidthRule(low_d_pref, u_sm_d_pref, dip_pref)) {
	return "The current value of " + description + " implies a negative width";
    }
}

gem.utils.checkInteger = function(fieldName, value) {
    var description = gem.utils.fromFieldToDescription(fieldName);
    var intValue = parseInt(value);
    var floatValue = parseFloat(value);
    if (intValue != floatValue) {
	return description + " is not an integer";
    }
}

function pushError(errors, error) {
    if (error) {
	errors.push(error);
    }
}