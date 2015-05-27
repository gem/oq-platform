

beforeEach(function() {
    jasmine.Ajax.install();
});


describe("Hello world", function() {
  it("says hello", function() {
    expect(helloWorld()).toEqual("Hello world!");
  });
});

describe("1st Async call", function () {
    it("should fetch from GeoServer", function () {
    	console.log('hi there:');
        var async = new GeoServerAjaxCall();

        // creating our spied callback
        var callback = jasmine.createSpy('callback');
        console.log('callback:');
        console.log(callback);
        var data = [
              {x: 0,  y: 0},
        ];

        // this does nothing
        spyOn($, 'ajax').and.callFake(function (req) {
        	console.log('req:');
        	console.log(req);
            var d = $.Deferred();
           // resolve using our mock data
            d.resolve(data);
            return d.promise();
        });

        console.log('async:');
        console.log(async);

        async.fetch(callback);

        // grabbing the returned arguments from the spied call:
        var fakeData = callback.calls.mostRecent().args[0];
        expect(fakeData[0].x).toEqual(data[0].x);
    });
});


afterEach(function() {
    jasmine.Ajax.uninstall();
});
