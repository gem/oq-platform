

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
    it("Should fire success event from GeoServer", function () {

    	//var url = "/geoserver/ows?service=WFS&version=1.0.0&REQUEST=GetCapabilities&SRSNAME=EPSG:4326&outputFormat=json&format_options=callback:getJson";
    	var url = "fooabr";
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

describe("Post New Project Definition", function () {
    it("Should post to GeoServer", function () {

        var selectedLayer = "Layer Name";
        var projectDefStg = {"some values" : Math.random()};

        spyOn($, "ajax").and.callFake( function() {
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
