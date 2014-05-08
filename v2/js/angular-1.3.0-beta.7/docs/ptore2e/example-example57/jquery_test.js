describe("module:ng.filter:json", function() {
  beforeEach(function() {
    browser.get("./examples/example-example57/index-jquery.html");
  });

  it('should jsonify filtered objects', function() {
    expect(element(by.binding("{'name':'value'}")).getText()).toMatch(/\{\n  "name": ?"value"\n}/);
  });
});