let { shorten, convert } = require("../../index");
let should = require("should");
describe("Index tests ", function() {
  var _url;
  var _alias;

  it("should return url", async function() {
    _url = "https://facebook.com";
    _alias = "asdasdasda";
    var result = await shorten(_url, _alias);
    result.should.be.type("string");
  });
  it("should return url", async function() {
    _url = "https://facebook.com";
    var result = await shorten(_url);
    result.should.be.type("string");
  });

  it("should return url", async function() {
    _url = "http://tinyurl.com/ycnnqxlu";
    var result = await convert(_url);
    result.should.be.type("string");
    // expect(result)
  });
  it("should throw error", async function() {
    _url = "http://tinyurl.com/ycnasdalu";
    convert(_url).catch(error => {
      error.message.should.equal("Invalid url");
    });
  });
  it("should throw error", async function() {
    _url = "https://tinyurl.com/ycnasdalu";
    convert(_url).catch(error => {
      error.message.should.equal(
        `Protocol "https:" not supported. Expected "http:"`
      );
    });
  });

  it("should throw error", async function() {
    _url = "";
    convert(_url).catch(error => {
      error.message.should.equal(`Unable to determine the domain name`);
    });
  });
});
