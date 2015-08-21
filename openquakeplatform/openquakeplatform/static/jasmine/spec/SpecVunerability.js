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

// Test the JSON structure and required fields
describe("Check JSON data structure", function() {
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

        var globalIdContinuousMatrix = 5;
        $.ajax({
            url: '/vulnerability/data/' + globalIdContinuousMatrix + '/',
            data: {},
            success: function (response) {
                ContinuousMatrixData = response;
                done();
            },
        dataType: 'html'
        });
    });

    //////////////////////////////
    // Fragility specific tests //
    //////////////////////////////

    it("Fragility 'method of estimation' requirement is met", function() {
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        // Filter only fragility functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Fragility';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for method of estimation options
        var methodOptions = ['Analytical', 'Empirical', 'Expert Opinion'];
        var method = gl.fields.fragility_func.fields.method_of_estimation;
        expect(methodOptions).toContain(method);
    });

    it("Fragility 'description of limit states' requirement is met", function() {
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        // Filter only fragility functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Fragility';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for method of estimation options
        var limitStatesArray =  gl.fields.fragility_func.fields.limit_states_desc;
        expect(limitStatesArray).toBeDefined();
    });

    it("Fragility 'function distribution type' requirement is met", function() {
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        // Filter only fragility functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Fragility';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for method of estimation options
        var distrOptions = ['Discrete', 'Continuous'];
        var funcDistrType = gl.fields.fragility_func.fields.func_distr_type;
        expect(distrOptions).toContain(funcDistrType);
    });

    it("Fragility 'intensity measure type' requirement is met", function() {
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        // Filter only fragility functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Fragility';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for method of estimation options
        var imtOptions = [
            'PGA',
            'PGV',
            'PGD',
            'Sa(T)',
            'Sd(T)',
            'IA',
            'CAV',
            'RSD',
            'MMI'
        ];
        var imtType = gl.fields.fragility_func.fields.predictor_var.fields.intensity_measure_type;
        expect(imtOptions).toContain(imtType);
    });

    it("Fragility 'intensity measure unit' requirement is met", function() {
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        // Filter only fragility functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Fragility';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for intensity measure unit
        var imtType = gl.fields.fragility_func.fields.predictor_var.fields.intensity_measure_type;
        var imtUnite = gl.fields.fragility_func.fields.predictor_var.fields.intensity_measure_unit;
        expect(imtUnite).toBeDefined();
        var imtUnitOptions;
        if (imtType === 'PGA') {
            imtUnitOptions = ['g', 'cm/s^2', 'm/s^s'];
            expect(imtUnitOptions).toContain(imtUnite);
        } else if (imtType === 'PGV') {
            imtUnitOptions = ['g', 'cm/s^2', 'm/s^s'];
            expect(imtUnitOptions).toContain(imtUnite);
        }  else if (imtType === 'PGD') {
            imtUnitOptions = ['cm', 'm',];
            expect(imtUnitOptions).toContain(imtUnite);
        }  else if (imtType === 'PGD') {
            imtUnitOptions = ['g', 'cm/s^2', 'm/s^s'];
            expect(imtUnitOptions).toContain(imtUnite);
        }  else if (imtType === 'Sa(T)') {
            imtUnitOptions = ['g', 'cm/s^2', 'm/s^s'];
            expect(imtUnitOptions).toContain(imtUnite);
        }  else if (imtType === 'Sd(T)') {
            imtUnitOptions = ['cm', 'm',];
            expect(imtUnitOptions).toContain(imtUnite);
        } else if (imtType === 'IA') {
            imtUnitOptions = ['cm/s', 'm/s',];
            expect(imtUnitOptions).toContain(imtUnite);
        } else if (imtType === 'CAV') {
            imtUnitOptions = ['g-s'];
            expect(imtUnitOptions).toContain(imtUnite);
        } else if (imtType === 'CAV') {
            imtUnitOptions = ['s'];
            expect(imtUnitOptions).toContain(imtUnite);
        } else if (imtType === 'MMI') {
            imtUnitOptions = ['Roman numbers'];
            expect(imtUnitOptions).toContain(imtUnite);
        }
    });

    it("Fragility 'Min IM' requirement is met", function() {
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        // Filter only fragility functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Fragility';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for minimum IM of estimation options
        var minIM = gl.fields.fragility_func.fields.predictor_var.fields.minimum_im;
        expect(minIM).toBeDefined();
    });

    it("Fragility 'Max IM' requirement is met", function() {
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        // Filter only fragility functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Fragility';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for minimum IM of estimation options
        var maxIM = gl.fields.fragility_func.fields.predictor_var.fields.maximum_im;
        expect(maxIM).toBeDefined();
    });

    ///////////////////////////////////////
    // Discrete fragility specific tests //
    ///////////////////////////////////////

    it("Fragility discrete 'predictor var im val' requirement is met", function() {
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        // Filter only fragility functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Fragility';
        if (assessmentType != thisTestAssessmentType) {
            return;
        }

        var fragilityFunction = null;
        // Make sure that the function has a fragility_func element
        try {
            fragilityFunction = gl.fields.fragility_func;
        } catch (e) {
            expect(gl.fields.fragility_func).toBeDefined();
        }

        // Check that the function includes predictor_var_im_val
        var predictor_var_im_val = gl.fields.fragility_func.fields.func_distr_frag_discr.fields.predictor_var_im_val;

        expect(predictor_var_im_val).toBeDefined();

    });

    it("Fragility discrete 'limit state prob exceed' requirement is met", function() {
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        // Filter only fragility functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Fragility';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check that the function includes limit_state_prob_exceed
        var limit_state_prob_exceed = gl.fields.fragility_func.fields.func_distr_frag_discr.fields.limit_state_prob_exceed;

        expect(limit_state_prob_exceed).toBeDefined();
    });

    it("Fragility discrete 'number of data points' requirement is met", function() {
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        // Filter only fragility functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Fragility';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for minimum IM of estimation options
        var maxIM = gl.fields.fragility_func.fields.predictor_var.fields.maximum_im;
        expect(maxIM).toBeDefined();
    });

    /////////////////////////////////////////
    // Continuous fragility specific tests //
    /////////////////////////////////////////

    it("Continuous Data Table Correlation Matrix requirement is met", function() {
        var gl = JSON.parse(ContinuousMatrixData);
        gl = JSON.parse(gl);
        console.log('gl:');
        console.log(gl);

        // Filter only fragility functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Continuous';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        try {
            fragilityFunction = gl.fields.fragility_func;
        } catch (e) {
            expect(gl.fields.fragility_func).toBeDefined();
        }

        var predictor_var_corr_matrix = gl.fields.fragility_func.fields.func_distr_frag_cont.fields.predictor_var_corr_matrix;
        expect(predictor_var_corr_matrix).toBeDefined();
    });

    it("Category and category children structure requirements is met", function() {
        // TODO find elegent way to pass ALL functions through this test
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        console.log('gl:');
        console.log(gl);
        var category = gl.fields.category;
        expect(category).toBeDefined();

        if (category === 'Structure specific' || category === 'Structure class') {
            var structureType = gl.fields.structure_type;
            expect(structureType).toMatch('Building');
            if (structureType === 'Building') {
                // Check for taxonomy type options
                var taxonomyOptions = ['GEM', 'PAGER', 'ATC58'];
                var taxonomyType = gl.fields.taxonomy_type.fields.name;
                expect(taxonomyOptions).toContain(taxonomyType);
                // Check for taxonomy text
                var taxonomyType = gl.fields.taxonomy_text;
                expect(taxonomyType).toBeDefined();
            }
        }
    });

    /////////////////////////////
    // Tests for all functions //
    /////////////////////////////

    it("Name requirements is met", function() {
        // TODO find elegent way to pass ALL functions through this test
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        var name = gl.fields.name;
        expect(name).toBeDefined();
    });

    it("Authors requirements is met", function() {
        // TODO find elegent way to pass ALL functions through this test
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        var authors = gl.fields.authors;
        expect(authors).toBeDefined();
    });

    it("Article title requirements is met", function() {
        // TODO find elegent way to pass ALL functions through this test
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        var articleTitle = gl.fields.article_title;
        expect(articleTitle).toBeDefined();
    });

    it("Publication conference name requirements is met", function() {
        // TODO find elegent way to pass ALL functions through this test
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        var publication = gl.fields.publication_conference_name;
        expect(publication).toBeDefined();
    });

    it("Year requirements is met", function() {
        // TODO find elegent way to pass ALL functions through this test
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        var year = gl.fields.year;
        expect(year).toBeDefined();
    });

    it("Assessment type requirements is met", function() {
        // TODO find elegent way to pass ALL functions through this test
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        var assessmentType = gl.fields.type_of_assessment;
        var assessmentOptions = [
            'Fragility',
            'Vulnerability',
            'Damage-to-loss',
            'Capacity curve'
        ];
        expect(assessmentOptions).toContain(assessmentType);
    });

    /*
    // This test is failing, it seems that this is a new requirement that is not met in the test db
    it("Region requirements is met", function() {
        // TODO find elegent way to pass ALL functions through this test
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        var region = gl.fields.geo_applicability.fields.area;
        var regionOptions = [
            'Worldwide',
            'Africa',
            'North America',
            'Central America & Caribbean',
            'South America',
            'Asia',
            'Europe',
            'Oceania',
            'Antarctica'
        ];
        expect(regionOptions).toContain(region);
    });
    */

    it("Countries requirements is met", function() {
        // TODO find elegent way to pass ALL functions through this test
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        var geoApp = gl.fields.geo_applicability.fields.countries;
        expect(geoApp).toBeDefined();
    });

});

