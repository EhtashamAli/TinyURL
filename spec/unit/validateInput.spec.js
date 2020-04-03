let { validateInput } = require("../../util/util");
let should = require("should");
var assert = require("assert");
describe("validateInput tests ", function() {
  var _url;
  var _alias;

  it("should return true", function() {
    _url = "https://facebook.com";
    _alias = "asdasdasda";
    var result = validateInput({ url: _url, alias: _alias });
    result.should.equal(true);
  });
  it("should return error", function() {
    _url = "";
    _alias = "asdasdads";
    (function() {
      validateInput({ url: _url, alias: _alias });
    }.should.throw(new Error("The url can not be an empty string.")));
  });
  it("should return error", function() {
    _url = "https://facebook.com";
    _alias = "dads";
    (function() {
      validateInput({ url: _url, alias: _alias });
    }.should.throw(new Error("The alias must be at least 5 characters.")));
  });
});
