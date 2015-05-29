

/*
beforeEach(function() {
    jasmine.Ajax.install();
});
*/

/*
describe("Hello world", function() {
  it("says hello", function() {
    expect(helloWorld()).toEqual("Hello world!");
  });
});
*/

describe("ServerFunctions", function () {
	var url = "/geoserver/ows?service=WFS&version=1.0.0&REQUEST=GetCapabilities&SRSNAME=EPSG:4326&outputFormat=json&format_options=callback:getJson";

    it("Should fire success event from GeoServer", function () {
    	// call andCallFake so that it calls the success function. Note that andCallFake receive the same parameters as the spied function.
        spyOn($, "ajax").and.callFake( function() {
        	return {
        		done: function() {
        			return {
        				fail: function() {}
        			};
        		}
        	};
        });

        GeoServerAjaxCall.send(url);

        expect($.ajax).toHaveBeenCalledWith({
        	method: "GET",
        	url: url,
        });

    });
});
/*
describe("Post New Project Definition", function () {
	var selectedLayer = "Layer Name";
    var projectDefStg = {"some values" : Math.random()};

	beforeEach(function (done) {
		var selectedLayer = "Layer Name";
    	var projectDefStg = {"some values" : Math.random()};
		$.ajax({
            url: 'http://192.168.56.10:8000/svir/add_project_definition',
            data: [selectedLayer, projectDefStg],
            success: function (html) {
            }
        });
	});

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

/*
afterEach(function() {
    jasmine.Ajax.uninstall();
});
*/
