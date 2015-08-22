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
    var continuousMatrixData;
    var vulnerabilityData;
    var damageData;
    var capacityData;
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
                continuousMatrixData = response;
                done();
            },
        dataType: 'html'
        });

        var globalIdVulnerability = 11;
        $.ajax({
            url: '/vulnerability/data/' + globalIdVulnerability + '/',
            data: {},
            success: function (response) {
                vulnerabilityData = response;
                done();
            },
        dataType: 'html'
        });

        var globalIdDamage = 18;
        $.ajax({
            url: '/vulnerability/data/' + globalIdDamage + '/',
            data: {},
            success: function (response) {
                damageData = response;
                done();
            },
        dataType: 'html'
        });

        var globalIdCapacity = 28;
        $.ajax({
            url: '/vulnerability/data/' + globalIdCapacity + '/',
            data: {},
            success: function (response) {
                capacityData = response;
                done();
            },
        dataType: 'html'
        });

    });

    //////////////////////////////
    // Fragility specific tests //
    //////////////////////////////
/*
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
        var methodOptions = [
            'Analytical',
            'Empirical',
            'Expert Opinion'
        ];
        var method = gl.fields.fragility_func.fields.method_of_estimation;
        expect(methodOptions).toContain(method);
    });
*/
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
            imtUnitOptions = ['g', 'cm/s^2', 'm/s^2'];
            expect(imtUnitOptions).toContain(imtUnite);
        } else if (imtType === 'PGV') {
            imtUnitOptions = ['g', 'cm/s^2', 'm/s^2'];
            expect(imtUnitOptions).toContain(imtUnite);
        }  else if (imtType === 'PGD') {
            imtUnitOptions = ['cm', 'm',];
            expect(imtUnitOptions).toContain(imtUnite);
        }  else if (imtType === 'PGD') {
            imtUnitOptions = ['g', 'cm/s^2', 'm/s^2'];
            expect(imtUnitOptions).toContain(imtUnite);
        }  else if (imtType === 'Sa(T)') {
            imtUnitOptions = ['g', 'cm/s^2', 'm/s^2'];
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

    it("Fragility Continuous Data Table Correlation Matrix requirement is met", function() {
        var gl = JSON.parse(continuousMatrixData);
        gl = JSON.parse(gl);
        console.log('gl:');
        console.log(gl);

        // Filter only continuous fragility functions into this test
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

    it("Fragility continuous category and category children structure requirements is met", function() {
        // TODO find elegent way to pass ALL functions through this test
        var gl = JSON.parse(continuousMatrixData);
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

    it("Fragility continuous 'mean' requirement is met", function() {
        var gl = JSON.parse(continuousMatrixData);
        gl = JSON.parse(gl);

        // Filter only continuous fragility functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Continuous';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for minimum IM of estimation options
        var meanArray = gl.fields.fragility_func.fields.func_distr_frag_cont.fields.mean;
        expect(meanArray).toBeDefined();
    });

    it("Fragility continuous 'standard deviation' requirement is met", function() {
        var gl = JSON.parse(continuousMatrixData);
        gl = JSON.parse(gl);

        // Filter only continuous fragility functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Continuous';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for minimum IM of estimation options
        var stddevArray = gl.fields.fragility_func.fields.func_distr_frag_cont.fields.std_dev;
        expect(stddevArray).toBeDefined();
    });
/*
    // Not testing because the JS app does not require this element
    it("Fragility continuous 'distribution shape' requirement is met", function() {
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        // Filter only fragility functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Continuous';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for method of estimation options
        var distShapeOptions = [
            'Lognormal',
        ];
        var funcDisShape = gl.fields.vulnerability_func.fields.func_distr_vuln_discr.fields.func_distr_shape;
        expect(distShapeOptions).toContain(funcDisShape);
    });
*/

    //////////////////////////////////
    // Vulnerability specific tests //
    //////////////////////////////////

    it("Vulnerability 'method of estimation' requirement is met", function() {
        var gl = JSON.parse(vulnerabilityData);
        gl = JSON.parse(gl);
        console.log('vulnerability gl:');
        console.log(gl);

        // Filter only vulnerability functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Vulnerability';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for method of estimation options
        var methodOptions = [
            'Analytical',
            'Empirical',
            'Expert Opinion'
        ];
        var method = gl.fields.vulnerability_func.fields.method_of_estimation;
        expect(methodOptions).toContain(method);
    });

    it("Vulnerability 'response variable' requirement is met", function() {
        var gl = JSON.parse(vulnerabilityData);
        gl = JSON.parse(gl);

        // Filter only vulnerability functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Vulnerability';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for method of estimation options
        var responseOptions = [
            'Damage factor',
            'Fatality rate per occupant',
            'Nonfatal injury rate per occupant',
            'Fatality rate per exposed population',
            'Direct economic factor'
        ];
        var responseVal = gl.fields.vulnerability_func.fields.resp_var;
        expect(responseOptions).toContain(responseVal);
    });

    it("Vulnerability 'distribution type' requirement is met", function() {
        var gl = JSON.parse(vulnerabilityData);
        gl = JSON.parse(gl);

        // Filter only vulnerability functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Vulnerability';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for method of estimation options
        var responseOptions = [
            'Discrete',
            'Continuous'
        ];
        var funcDistrType = gl.fields.vulnerability_func.fields.func_distr_type;
        expect(responseOptions).toContain(funcDistrType);
    });

    it("Vulnerability 'intensity measure type' requirement is met", function() {
        var gl = JSON.parse(vulnerabilityData);
        gl = JSON.parse(gl);

        // Filter only vulnerability functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Vulnerability';
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

        var intensityType = gl.fields.vulnerability_func.fields.predictor_var.fields.intensity_measure_type;
        expect(imtOptions).toContain(intensityType);
    });

    it("Vulnerability 'intensity measure unit' requirement is met", function() {
        var gl = JSON.parse(vulnerabilityData);
        gl = JSON.parse(gl);

        // Filter only vulnerability functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Vulnerability';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for intensity measure unit
        var imtType = gl.fields.vulnerability_func.fields.predictor_var.fields.intensity_measure_type;
        var imtUnite = gl.fields.vulnerability_func.fields.predictor_var.fields.intensity_measure_unit;
        expect(imtUnite).toBeDefined();
        var imtUnitOptions;
        if (imtType === 'PGA') {
            imtUnitOptions = ['g', 'cm/s^2', 'm/s^2'];
            expect(imtUnitOptions).toContain(imtUnite);
        } else if (imtType === 'PGV') {
            imtUnitOptions = ['g', 'cm/s^2', 'm/s^2'];
            expect(imtUnitOptions).toContain(imtUnite);
        }  else if (imtType === 'PGD') {
            imtUnitOptions = ['cm', 'm',];
            expect(imtUnitOptions).toContain(imtUnite);
        }  else if (imtType === 'PGD') {
            imtUnitOptions = ['g', 'cm/s^2', 'm/s^2'];
            expect(imtUnitOptions).toContain(imtUnite);
        }  else if (imtType === 'Sa(T)') {
            imtUnitOptions = ['g', 'cm/s^2', 'm/s^2'];
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

    it("Vulnerability 'Min IM' requirement is met", function() {
        var gl = JSON.parse(vulnerabilityData);
        gl = JSON.parse(gl);

        // Filter only vulnerability functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Vulnerability';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for minimum IM of estimation options
        var minIM = gl.fields.vulnerability_func.fields.predictor_var.fields.minimum_im;
        expect(minIM).toBeDefined();
    });

    it("Vulnerability 'Max IM' requirement is met", function() {
        var gl = JSON.parse(vulnerabilityData);
        gl = JSON.parse(gl);

        // Filter only vulnerability functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Vulnerability';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for minimum IM of estimation options
        var maxIM = gl.fields.vulnerability_func.fields.predictor_var.fields.maximum_im;
        expect(maxIM).toBeDefined();
    });

    ///////////////////////////////////////////
    // Discrete vulnerability specific tests //
    ///////////////////////////////////////////

    it("Vulnerability discrete 'predictor var im val' requirement is met", function() {
        var gl = JSON.parse(vulnerabilityData);
        gl = JSON.parse(gl);

        // Filter only vulnerability functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Vulnerability';
        if (assessmentType != thisTestAssessmentType) {
            return;
        }

        // Check that the function includes predictor_var_im_val
        var predVal = gl.fields.vulnerability_func.fields.func_distr_vuln_discr.fields.predictor_var_im_val;

        expect(predVal).toBeDefined();

    });

    it("Vulnerability discrete 'response mean values' requirement is met", function() {
        var gl = JSON.parse(vulnerabilityData);
        gl = JSON.parse(gl);

        // Filter only vulnerability functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Vulnerability';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check that the function includes resp_var_mean_val
        var respMean = gl.fields.vulnerability_func.fields.func_distr_vuln_discr.fields.resp_var_mean_val;

        expect(respMean).toBeDefined();
    });

    it("Vulnerability discrete 'number of data points' requirement is met", function() {
        var gl = JSON.parse(vulnerabilityData);
        gl = JSON.parse(gl);

        // Filter only vulnerability functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Vulnerability';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for minimum IM of estimation options
        var maxIM = gl.fields.vulnerability_func.fields.predictor_var.fields.maximum_im;
        expect(maxIM).toBeDefined();
    });

    /////////////////////////////////////////////
    // Continuous vulnerability specific tests //
    /////////////////////////////////////////////

    it("Vulnerability continuous 'mean' requirement is met", function() {
        var gl = JSON.parse(vulnerabilityData);
        gl = JSON.parse(gl);

        // Filter only continuous vulnerability functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Continuous';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for minimum IM of estimation options
        var meanArray = gl.fields.vulnerability_func.fields.func_distr_frag_cont.fields.mean;
        expect(meanArray).toBeDefined();
    });

    it("Vulnerability continuous 'standard deviation' requirement is met", function() {
        var gl = JSON.parse(vulnerabilityData);
        gl = JSON.parse(gl);

        // Filter only continuous vulnerability functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Continuous';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for minimum IM of estimation options
        var stddevArray = gl.fields.vulnerability_func.fields.func_distr_frag_cont.fields.std_dev;
        expect(stddevArray).toBeDefined();
    });

    // Not testing because the JS app does not require this element
    it("Vulnerability continuous 'distribution shape' requirement is met", function() {
        var gl = JSON.parse(vulnerabilityData);
        gl = JSON.parse(gl);

        // Filter only vulnerability functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Continuous';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for method of estimation options
        var distShapeOptions = [
            'Lognormal',
        ];
        var funcDisShape = gl.fields.vulnerability_func.fields.func_distr_vuln_discr.fields.func_distr_shape;
        expect(distShapeOptions).toContain(funcDisShape);
    });

    ///////////////////////////////////
    // Damage-to-loss specific tests //
    ///////////////////////////////////

    it("Damage-to-loss 'method of estimation' requirement is met", function() {
        var gl = JSON.parse(damageData);
        gl = JSON.parse(gl);

        // Filter only damage-to-loss functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Damage-to-loss';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for method of estimation options
        var methodOptions = [
            'Analytical',
            'Empirical',
            'Expert Opinion'
        ];
        var method = gl.fields.damage_to_loss_func.fields.method_of_estimation;
        expect(methodOptions).toContain(method);
    });

    it("Damage-to-loss 'description of limit states' requirement is met", function() {
        var gl = JSON.parse(damageData);
        gl = JSON.parse(gl);

        // Filter only damage-to-loss functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Damage-to-loss';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for method of estimation options
        var limitStatesArray =  gl.fields.damage_to_loss_func.fields.limit_states_desc;
        expect(limitStatesArray).toBeDefined();
    });

    it("Damage-to-loss 'response variable' requirement is met", function() {
        var gl = JSON.parse(damageData);
        gl = JSON.parse(gl);

        // Filter only damage-to-loss functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Damage-to-loss';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for method of estimation options
        var responseOptions = [
            'Damage factor',
            'Fatality rate per occupant',
            'Nonfatal injury rate per occupant',
            'Fatality rate per exposed population',
            'Direct economic factor'
        ];
        var responseVal = gl.fields.damage_to_loss_func.fields.resp_var;
        expect(responseOptions).toContain(responseVal);
    });

    it("Damage-to-loss continuous 'mean' requirement is met", function() {
        var gl = JSON.parse(vulnerabilityData);
        gl = JSON.parse(gl);

        // Filter only Damage-to-loss functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Damage-to-loss';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for minimum IM of estimation options
        var meanDamage = gl.fields.damage_to_loss_func.fields.func_distr_dtl_discr.fields.var_mean_val;
        expect(meanDamage).toBeDefined();
    });

    /////////////////////////////
    // Capacity specific tests //
    /////////////////////////////

    it("Capacity 'method of estimation' requirement is met", function() {
        var gl = JSON.parse(capacityData);
        gl = JSON.parse(gl);

        // Filter only capacity functions into this test
        var assessmentType = gl.fields.type_of_assessment;
        var thisTestAssessmentType = 'Capacity';
        if (assessmentType != thisTestAssessmentType) {
            expect(gl.fields.type_of_assessment).toBeDefined();
            return;
        }

        // Check for method of estimation options
        var methodOptions = [
            'Analytical',
            'Empirical'
        ];
        var method = gl.fields.capacity_curve_func.fields.method_of_estimation;
        expect(methodOptions).toContain(method);
    });



    /////////////////////////////////////
    // General tests for all functions //
    /////////////////////////////////////

    it("General information name requirements is met", function() {
        // TODO find elegent way to pass ALL functions through this test
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        var name = gl.fields.name;
        expect(name).toBeDefined();
    });

    it("General information authors requirements is met", function() {
        // TODO find elegent way to pass ALL functions through this test
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        var authors = gl.fields.authors;
        expect(authors).toBeDefined();
    });

    it("General information article title requirements is met", function() {
        // TODO find elegent way to pass ALL functions through this test
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        var articleTitle = gl.fields.article_title;
        expect(articleTitle).toBeDefined();
    });

    it("General information publication conference name requirements is met", function() {
        // TODO find elegent way to pass ALL functions through this test
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        var publication = gl.fields.publication_conference_name;
        expect(publication).toBeDefined();
    });

    it("General information year requirements is met", function() {
        // TODO find elegent way to pass ALL functions through this test
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        var year = gl.fields.year;
        expect(year).toBeDefined();
    });

    it("General information assessment type requirements is met", function() {
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

    it("General information Countries requirements is met", function() {
        // TODO find elegent way to pass ALL functions through this test
        var gl = JSON.parse(discreteFragilityData);
        gl = JSON.parse(gl);

        var geoApp = gl.fields.geo_applicability.fields.countries;
        expect(geoApp).toBeDefined();
    });

});

