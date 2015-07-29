

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
    it("The Risk indicator was combined correctly", function() {
        var nameLookUp = 'RI';
        var testSessionProjectDef = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"SVIR analysis result SA test","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_1","operator":"Weighted sum","svir_plugin_version":"1.5.0","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_1","operator":"Weighted sum","type":"Risk Index","children":[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}],"depth":1,"parent":"undefined","x":248.57142857142856,"y":180,"id":4,"x0":248.57142857142856,"y0":180},{"field":"SVI_1","type":"Social Vulnerability Index","name":"SVI","weight":0.5,"level":"2.0","depth":1,"parent":"undefined","x":414.2857142857143,"y":180,"id":1,"x0":414.2857142857143,"y0":180}],"description":"","x0":331.4285714285714,"y0":0,"depth":0,"x":331.4285714285714,"y":0,"id":5}';
        var themeObj = '[{"region":"Argentina","ECOEACGUS":15.754,"EDUEOCEYS":10529.796},{"region":"Colombia","ECOEACGUS":13.648,"EDUEOCEYS":7158.977},{"region":"Bolivia","ECOEACGUS":13.713,"EDUEOCEYS":2356.498},{"region":"Brazil","ECOEACGUS":13.775,"EDUEOCEYS":12082.41},{"region":"Chile","ECOEACGUS":14.698,"EDUEOCEYS":14006.838},{"region":"Peru","ECOEACGUS":12.907,"EDUEOCEYS":5814.679},{"region":"Ecuador","ECOEACGUS":13.984,"EDUEOCEYS":4436.152},{"region":"Paraguay","ECOEACGUS":12.068,"EDUEOCEYS":3668.233},{"region":"Guyana","ECOEACGUS":11.948,"EDUEOCEYS":3035.457},{"region":"Suriname","ECOEACGUS":12.606,"EDUEOCEYS":8730.511},{"region":"Uruguay","ECOEACGUS":15.51,"EDUEOCEYS":12916.37},{"region":"Venezuela","ECOEACGUS":14.187,"EDUEOCEYS":11430.238}]';
        var JSONthemes = '[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}]';
        themeObj = JSON.parse(themeObj);
        JSONthemes = JSON.parse(JSONthemes);
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
        	console.log('params:');
        	console.log(params);

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
