

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

describe("Post New Project Definition", function () {
    it("should post to GeoServer", function () {

    	//var url = "/geoserver/ows?service=WFS&version=1.0.0&REQUEST=GetCapabilities&SRSNAME=EPSG:4326&outputFormat=json&format_options=callback:getJson";
        //var async = GeoServerAjaxCall;
        console.log('addProjectDefinition:');
        console.log(addProjectDefinition);
        var information = {"i am": Math.random()};
        console.log('information:');
        console.log(information);

        spyOn($, "ajax").and.callFake( function() {
        	return {
        		done: function() {
        			return {
        				fail: function() {}
        			};
        		}
        	};
        });

        addProjectDefinition.send(information);

        expect($.ajax).toHaveBeenCalledWith({
        	method: "POST",
        	url: "../svir/add_project_definition",
        	data: information
        });

    });
});

/*
afterEach(function() {
    jasmine.Ajax.uninstall();
});
*/
