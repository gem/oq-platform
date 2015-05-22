

beforeEach(function() {
    jasmine.Ajax.install();
});


describe("Hello world", function() {
  it("says hello", function() {
    expect(helloWorld()).toEqual("Hello world!");
  });
});


afterEach(function() {
    jasmine.Ajax.uninstall();
});
