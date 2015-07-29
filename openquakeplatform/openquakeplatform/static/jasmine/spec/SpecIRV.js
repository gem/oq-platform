

///////////////////////////////////////////
// Unit Test for the IRV web application //
///////////////////////////////////////////

// Test the createIndex function
describe("Test CreateIndex", function() {
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
