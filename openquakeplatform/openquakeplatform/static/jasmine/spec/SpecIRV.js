

///////////////////////////////////////////
// Unit Test for the IRV web application //
///////////////////////////////////////////

// Test the createRiskIndicator function
describe("Test Create Risk Indicator Function", function() {
    it("The index was created", function() {
        var selectedRegion = 'COUNTRY_NA';
        var layerAttributes = '[{"type":"Feature","id":"qgis_svir_c0d75859_78e4_4dcb_bcd1_fbd9e0013aa9.1","geometry":{"type":"MultiPolygon","coordinates":[[[[-66.30249786376953,-55.01680374145508],[-66.30361175537098,-55.01680374145508],[-66.30416870117173,-55.01652908325197],[-66.3047256469726,-55.016250610351584]]]]},"geometry_name":"the_geom","properties":{"ISO":"VEN","COUNTRY_NA":"Venezuela","ECOEACGUS":14.187,"ECOIDPGIN":7.604,"EDUEOCEYS":11430.238,"HEAHSTLEX":74.402,"GNIPCAP":0.588281660535996,"GINI":0.166146645865835,"EXPYSCHOOL":0.778839072507755,"LIFEEXPEC":0.622620380739082,"SVI":-0.34141510001530717,"RI":0,"IRI":-0.17070755000765359,"LOSS_PTS":0,"SUM_field_":0,"AVG_field_":0,"SVI_1":null,"RI_1":5722.2125,"IRI_1":null}}]';
        var index = '[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}]';
        layerAttributes = JSON.parse(layerAttributes);
        index = JSON.parse(index);

        expect(createRiskIndicator(layerAttributes, index, selectedRegion)[0]).toEqual(jasmine.objectContaining({
            region: "Venezuela",
            ECOEACGUS: 14.187,
            EDUEOCEYS: 11430.238
        }));
    });
});

// Test the combineIndicators function
describe("Test Combine Indicators Function", function() {

        var themeObj = '[{"region":"Argentina","ECOEACGUS":15.754,"EDUEOCEYS":10529.796},{"region":"Colombia","ECOEACGUS":13.648,"EDUEOCEYS":7158.977},{"region":"Bolivia","ECOEACGUS":13.713,"EDUEOCEYS":2356.498},{"region":"Brazil","ECOEACGUS":13.775,"EDUEOCEYS":12082.41},{"region":"Chile","ECOEACGUS":14.698,"EDUEOCEYS":14006.838},{"region":"Peru","ECOEACGUS":12.907,"EDUEOCEYS":5814.679},{"region":"Ecuador","ECOEACGUS":13.984,"EDUEOCEYS":4436.152},{"region":"Paraguay","ECOEACGUS":12.068,"EDUEOCEYS":3668.233},{"region":"Guyana","ECOEACGUS":11.948,"EDUEOCEYS":3035.457},{"region":"Suriname","ECOEACGUS":12.606,"EDUEOCEYS":8730.511},{"region":"Uruguay","ECOEACGUS":15.51,"EDUEOCEYS":12916.37},{"region":"Venezuela","ECOEACGUS":14.187,"EDUEOCEYS":11430.238}]';
        var JSONthemes = '[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}]';
        themeObj = JSON.parse(themeObj);
        JSONthemes = JSON.parse(JSONthemes);
        var nameLookUp = 'RI';

    it("The Risk indicator was combined correctly using the 'Simple sum (ignore weights)' operator", function() {
        var operator = "Simple sum (ignore weights)";
        var testSessionProjectDef = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"SVIR analysis result SA test","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_1","operator":"Weighted sum","svir_plugin_version":"1.5.0","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_1","operator":"'+operator+'","type":"Risk Index","children":[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}],"depth":1,"parent":"undefined","x":248.57142857142856,"y":180,"id":4,"x0":248.57142857142856,"y0":180},{"field":"SVI_1","type":"Social Vulnerability Index","name":"SVI","weight":0.5,"level":"2.0","depth":1,"parent":"undefined","x":414.2857142857143,"y":180,"id":1,"x0":414.2857142857143,"y0":180}],"description":"","x0":331.4285714285714,"y0":0,"depth":0,"x":331.4285714285714,"y":0,"id":5}';

        testSessionProjectDef = JSON.parse(testSessionProjectDef);

        expect(combineIndicators(nameLookUp, themeObj, JSONthemes, testSessionProjectDef)).toEqual(jasmine.objectContaining({
            Argentina: 10545.550000000001,
            Colombia: 7172.625,
            Bolivia: 2370.2110000000002,
            Brazil: 12096.185,
            Chile: 14021.536,
            Peru: 5827.586,
            Ecuador: 4450.136,
            Paraguay: 3680.3010000000004,
            Guyana: 3047.4049999999997,
            Suriname: 8743.117,
            Uruguay: 12931.880000000001,
            Venezuela: 11444.425
        }));
    });

    it("The Risk indicator was combined correctly using the 'weighted sum' operator", function() {
        var operator = "Weighted sum";
        var testSessionProjectDef = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"SVIR analysis result SA test","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_1","operator":"Weighted sum","svir_plugin_version":"1.5.0","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_1","operator":"'+operator+'","type":"Risk Index","children":[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}],"depth":1,"parent":"undefined","x":248.57142857142856,"y":180,"id":4,"x0":248.57142857142856,"y0":180},{"field":"SVI_1","type":"Social Vulnerability Index","name":"SVI","weight":0.5,"level":"2.0","depth":1,"parent":"undefined","x":414.2857142857143,"y":180,"id":1,"x0":414.2857142857143,"y0":180}],"description":"","x0":331.4285714285714,"y0":0,"depth":0,"x":331.4285714285714,"y":0,"id":5}';

        testSessionProjectDef = JSON.parse(testSessionProjectDef);

        expect(combineIndicators(nameLookUp, themeObj, JSONthemes, testSessionProjectDef)).toEqual(jasmine.objectContaining({
            Argentina: 5272.775000000001,
            Colombia: 3586.3125,
            Bolivia: 1185.1055000000001,
            Brazil: 6048.0925,
            Chile: 7010.768,
            Peru: 2913.793,
            Ecuador: 2225.068,
            Paraguay: 1840.1505000000002,
            Guyana: 1523.7024999999999,
            Suriname: 4371.5585,
            Uruguay: 6465.9400000000005,
            Venezuela: 5722.2125
        }));
    });

    it("The Risk indicator was combined correctly using the 'Average (ignore weights)' operator", function() {
        var operator = "Average (ignore weights)";
        var testSessionProjectDef = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"SVIR analysis result SA test","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_1","operator":"Weighted sum","svir_plugin_version":"1.5.0","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_1","operator":"'+operator+'","type":"Risk Index","children":[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}],"depth":1,"parent":"undefined","x":248.57142857142856,"y":180,"id":4,"x0":248.57142857142856,"y0":180},{"field":"SVI_1","type":"Social Vulnerability Index","name":"SVI","weight":0.5,"level":"2.0","depth":1,"parent":"undefined","x":414.2857142857143,"y":180,"id":1,"x0":414.2857142857143,"y0":180}],"description":"","x0":331.4285714285714,"y0":0,"depth":0,"x":331.4285714285714,"y":0,"id":5}';

        testSessionProjectDef = JSON.parse(testSessionProjectDef);

        expect(combineIndicators(nameLookUp, themeObj, JSONthemes, testSessionProjectDef)).toEqual(jasmine.objectContaining({
            Argentina: 5272.775000000001,
            Colombia: 3586.3125,
            Bolivia: 1185.1055000000001,
            Brazil: 6048.0925,
            Chile: 7010.768,
            Peru: 2913.793,
            Ecuador: 2225.068,
            Paraguay: 1840.1505000000002,
            Guyana: 1523.7024999999999,
            Suriname: 4371.5585,
            Uruguay: 6465.9400000000005,
            Venezuela: 5722.2125
        }));
    });

    it("The Risk indicator was combined correctly using the 'Simple multiplication (ignore weights)' operator", function() {
        var operator = "Simple multiplication (ignore weights)";
        var testSessionProjectDef = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"SVIR analysis result SA test","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_1","operator":"Weighted sum","svir_plugin_version":"1.5.0","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_1","operator":"'+operator+'","type":"Risk Index","children":[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}],"depth":1,"parent":"undefined","x":248.57142857142856,"y":180,"id":4,"x0":248.57142857142856,"y0":180},{"field":"SVI_1","type":"Social Vulnerability Index","name":"SVI","weight":0.5,"level":"2.0","depth":1,"parent":"undefined","x":414.2857142857143,"y":180,"id":1,"x0":414.2857142857143,"y0":180}],"description":"","x0":331.4285714285714,"y0":0,"depth":0,"x":331.4285714285714,"y":0,"id":5}';

        testSessionProjectDef = JSON.parse(testSessionProjectDef);

        expect(combineIndicators(nameLookUp, themeObj, JSONthemes, testSessionProjectDef)).toEqual(jasmine.objectContaining({
            Argentina: 165886.406184,
            Colombia: 97705.718096,
            Bolivia: 32314.657074,
            Brazil: 166435.19775,
            Chile: 205872.504924,
            Peru: 75050.061853,
            Ecuador: 62035.149568,
            Paraguay: 44268.235844,
            Guyana: 36267.640236,
            Suriname: 110056.821666,
            Uruguay: 200332.89870000002,
            Venezuela: 162160.78650599997
        }));
    });

    it("The Risk indicator was combined correctly using the 'Weighted multiplication' operator", function() {
        var operator = "Weighted multiplication";
        var testSessionProjectDef = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"SVIR analysis result SA test","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_1","operator":"Weighted sum","svir_plugin_version":"1.5.0","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_1","operator":"'+operator+'","type":"Risk Index","children":[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}],"depth":1,"parent":"undefined","x":248.57142857142856,"y":180,"id":4,"x0":248.57142857142856,"y0":180},{"field":"SVI_1","type":"Social Vulnerability Index","name":"SVI","weight":0.5,"level":"2.0","depth":1,"parent":"undefined","x":414.2857142857143,"y":180,"id":1,"x0":414.2857142857143,"y0":180}],"description":"","x0":331.4285714285714,"y0":0,"depth":0,"x":331.4285714285714,"y":0,"id":5}';

        testSessionProjectDef = JSON.parse(testSessionProjectDef);

        expect(combineIndicators(nameLookUp, themeObj, JSONthemes, testSessionProjectDef)).toEqual(jasmine.objectContaining({
            Argentina: 41471.601546,
            Colombia: 24426.429524,
            Bolivia: 8078.6642685,
            Brazil: 41608.7994375,
            Chile: 51468.126231,
            Peru: 18762.51546325,
            Ecuador: 15508.787392,
            Paraguay: 11067.058961,
            Guyana: 9066.910059,
            Suriname: 27514.2054165,
            Uruguay: 50083.224675000005,
            Venezuela: 40540.196626499994
        }));
    });

    it("The Risk indicator was combined correctly using the 'Geometric mean (ignore weights)' operator", function() {
        var operator = "Geometric mean (ignore weights)";
        var testSessionProjectDef = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"SVIR analysis result SA test","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_1","operator":"Weighted sum","svir_plugin_version":"1.5.0","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_1","operator":"'+operator+'","type":"Risk Index","children":[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}],"depth":1,"parent":"undefined","x":248.57142857142856,"y":180,"id":4,"x0":248.57142857142856,"y0":180},{"field":"SVI_1","type":"Social Vulnerability Index","name":"SVI","weight":0.5,"level":"2.0","depth":1,"parent":"undefined","x":414.2857142857143,"y":180,"id":1,"x0":414.2857142857143,"y0":180}],"description":"","x0":331.4285714285714,"y0":0,"depth":0,"x":331.4285714285714,"y":0,"id":5}';

        testSessionProjectDef = JSON.parse(testSessionProjectDef);

        expect(combineIndicators(nameLookUp, themeObj, JSONthemes, testSessionProjectDef)).toEqual(jasmine.objectContaining({
            Argentina: 407.29154936482536,
            Colombia: 312.5791389328469,
            Bolivia: 179.762780001868,
            Brazil: 407.96470159806717,
            Chile: 453.73175437035485,
            Peru: 273.9526635260187,
            Ecuador: 249.06856398991826,
            Paraguay: 210.4001802375654,
            Guyana: 190.44064754143218,
            Suriname: 331.7481298605917,
            Uruguay: 447.5856328123145,
            Venezuela: 402.69192505686027
        }));
    });

});

/*
describe("Get asynchronous request", function() {
    it("says hi", function() {
        // Asynchronous jQuery.ajax mock
        spyOn($, 'ajax').and.callFake(function(url) {
            var ajaxMock = $.Deferred();

            setTimeout(function() {
                switch (url) {
                    case undefined:
                        ajaxMock.resolve({
                            'error': 'Please use POST request'
                        });
                        break;
                    case 'valid_url':
                        ajaxMock.resolve('some data');
                        break;
                    default:  // invalid url
                        ajaxMock.reject();
                }
            }, 5);

            return ajaxMock.promise();
        });
    });
});
*/

describe("Mock Post New Project Definition", function () {
	var selectedLayer = "Layer Name";
    var projectDefStg = {"some values" : Math.random()};

    it("Should post to GeoServer", function () {
    	// call andCallFake so that it calls the success function.
        spyOn($, "ajax").and.callFake( function(params) {
        	return {
        		done: function() {
        			return {
        				fail: function() {}
        			};
        		}
        	};
        });

        addProjectDefinition.send(selectedLayer, projectDefStg);

        expect($.ajax).toHaveBeenCalledWith({
        	method: "POST",
        	url: "../svir/add_project_definition",
        	data: [selectedLayer, projectDefStg]
        });
    });

	it("does correct ajax requests", function () {
        spyOn($, 'ajax').and.callFake(function(params) {

            return {
        		done: function() {
        			return {
        				fail: function() {}
        			};
        		}
        	};
        });

		addProjectDefinition.send(selectedLayer, projectDefStg);

		expect($.ajax).toHaveBeenCalledWith({
        	method: "POST",
        	url: "../svir/add_project_definition",
        	data: [selectedLayer, projectDefStg]
        });
    });
});
