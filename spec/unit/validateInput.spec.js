let { validateInput } = require("../../util/util");
let should = require("should");
describe("validateInput tests ", function() {
  var _url;
  var _alias;

  it("should return true", function() {
    _url = "https://facebook.com";
    _alias = "asdasdasda";
    var result = validateInput({ url: _url, alias: _alias });
    expect(result).toEqual(true);
  });
  it("should return error", function() {
    _url = "";
    _alias = "asdasdads";
    expect(function() {
      validateInput({ url: _url, alias: _alias });
    }).toThrow(new Error("The url can not be an empty string."));
  });
  it("should return error", function() {
    _url = "https://facebook.com";
    _alias = "dads";
    expect(function() {
      validateInput({ url: _url, alias: _alias });
    }).toThrow(new Error("The alias must be at least 5 characters."));
  });
});
