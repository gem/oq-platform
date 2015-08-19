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

//////////////////////////////////////////////////////////////
// Unit Test for the physical vulnerability web application //
//////////////////////////////////////////////////////////////

// Test the fragility JSON structure
describe("Check discete fragility data structure", function() {
    // TODO find an elegant way to get a list of available curves from the vulnerability view

    var discreteFragilityData;
    var ContinuousMatrixData;
    beforeEach(function(done) {
        var globalIdDiscreteFragility = 2;
        $.ajax({
            url: '/vulnerability/data/' + globalIdDiscreteFragility + '/',
            data: {},
            success: function (response) {
                discreteFragilityData = response;
                done();
            },
        dataType: 'html'
        });



    it("Fragility discrete 'limit state prob exceed' requirement is met", function() {
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        console.log('gl:');
        console.log(gl);

        if (gl.fields.fragility_func === undefined) {
            var fragilityFunction = gl.fields.fragility_func;
            expect(fragilityFunction).toBeDefined();
        }

        if (gl.fields.fragility_func.fields.func_distr_type !== 'Discrete') {
            var functionType = gl.fields.fragility_func.fields.func_distr_type;
            expect(functionType).toMatch('Discrete');
        }

        var limit_state_prob_exceed = gl.fields.fragility_func.fields.func_distr_frag_discr.fields.limit_state_prob_exceed;

        expect(limit_state_prob_exceed).toBeDefined();
    });

    it("Fragility discrete 'predictor var im val' requirement is met", function() {
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        if (gl.fields.fragility_func === undefined) {
            var fragilityFunction = gl.fields.fragility_func;
            expect(fragilityFunction).toBeDefined();
        }

        if (gl.fields.fragility_func.fields.func_distr_type !== 'Discrete') {
            var functionType = gl.fields.fragility_func.fields.func_distr_type;
            expect(functionType).toMatch('Discrete');
        }

        var predictor_var_im_val = gl.fields.fragility_func.fields.func_distr_frag_discr.fields.predictor_var_im_val;

        expect(predictor_var_im_val).toBeDefined();
    });
});

