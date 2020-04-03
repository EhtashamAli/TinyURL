let { shorten } = require("../../index");
let should = require("should");
describe("Index tests ", function() {
  var _url;
  var _alias;

  it("should return url", async function() {
    _url = "https://facebook.com";
    _alias = "asdasdasda";
    var result = await shorten(_url, _alias);
    result.should.be.type("string");
    // expect(result)
  });
});
