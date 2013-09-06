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

Ext.namespace('faulted_earth.utils');

faulted_earth.utils.fromFieldToDescription = function(field){
    for (var i = 0; i < faulted_earth.properties.length; i++) {
	var field = faulted_earth.properties[i];
	if (field.id == field) {
	    return field.label
	}
    }
    return field;
};

faulted_earth.utils.fieldSuffix = function(field) {
    return field.split('_').reverse()[0];
}

faulted_earth.utils.fieldPrefix = function(field) {
    return field.split('_').slice(0, -1).join('_');
}

/* Validation utility */
/* makes some assumption about the field naming convention */
faulted_earth.utils.checkInterval = function(grid, field, value) {
    var max_val, min_val, pref_val, op;
    var suffix = faulted_earth.utils.fieldSuffix(field);
    var prefix = faulted_earth.utils.fieldPrefix(field);
    var description = faulted_earth.utils.fromFieldToDescription(prefix);
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

faulted_earth.utils.checkBetween = function(field, value, min, max) {
    value = parseFloat(value);
    var description = faulted_earth.utils.fromFieldToDescription(field);
    if (!value)
	return;
    if (value <= min || value >= max) {
	return description + " has to be between " + min + " and " + max;
    }
}

faulted_earth.utils.checkCompleteness = function(field, value) {
    value = parseFloat(value);
    faulted_earth.utils.checkBetween(field, value, 1, 4) || faulted_earth.utils.checkInteger(field, value);
}

faulted_earth.utils.checkAngle = function(field, value) {
    value = parseFloat(value);
    faulted_earth.utils.checkBetween(field, value, 0, 360);
}

faulted_earth.utils.checkQuadrant = function(field, value) {
    value = parseFloat(value);
    faulted_earth.utils.checkBetween(field, value, 0, 90);
}

faulted_earth.utils.checkPositive = function(field, value) {
    var description = faulted_earth.utils.fromFieldToDescription(field);
    value = parseFloat(value);
    if (!value)
	return;
    if (value < 0) {
	return description + " has to be strictly positive";
    }
}

faulted_earth.utils.checkValueIn = function(field, value, possibilities) {
    var description = faulted_earth.utils.fromFieldToDescription(field);
    var possibilities_string = possibilities.join(', ');
    if (possibilities.indexOf(value) == -1) {
	return description + " can be only one of the following values " + possibilities_string;
    }
}

faulted_earth.utils._checkWidthRule = function(a, b, c) {
    if (a && b && c) {
	return (a - b) / Math.sin(Math.PI * c / 180) <= 0;
    }
    return false;
}

faulted_earth.utils.checkWidthRule = function(fieldName, grid) {
    var description = faulted_earth.utils.fromFieldToDescription(fieldName);

    var low_d_min = grid.getCurrentValue('low_d_min', parseFloat);
    var low_d_pref = grid.getCurrentValue('low_d_pref', parseFloat);
    var low_d_max = grid.getCurrentValue('low_d_max', parseFloat);

    var u_sm_d_min = grid.getCurrentValue('u_sm_d_min', parseFloat);
    var u_sm_d_pref = grid.getCurrentValue('u_sm_d_pref', parseFloat);
    var u_sm_d_max = grid.getCurrentValue('u_sm_d_max', parseFloat);

    var dip_min = grid.getCurrentValue('dip_min', parseFloat);
    var dip_pref = grid.getCurrentValue('dip_pref', parseFloat);
    var dip_max = grid.getCurrentValue('dip_max', parseFloat);

    if (faulted_earth.utils._checkWidthRule(low_d_min, u_sm_d_max, dip_max) ||
	faulted_earth.utils._checkWidthRule(low_d_max, u_sm_d_min, dip_min) ||
	faulted_earth.utils._checkWidthRule(low_d_pref, u_sm_d_pref, dip_pref)) {
	return "The current value of " + description + " implies a negative width";
    }
}

faulted_earth.utils.checkInteger = function(fieldName, value) {
    var description = faulted_earth.utils.fromFieldToDescription(fieldName);
    var intValue = parseInt(value);
    var floatValue = parseFloat(value);
    if (intValue != floatValue) {
	return description + " is not an integer";
    }
}

faulted_earth.utils.pushError = function(errors, error) {
    if (error) {
	errors.push(error);
    }
}