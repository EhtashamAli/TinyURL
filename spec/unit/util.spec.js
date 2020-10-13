let { parseResponse } = require("../../util/util.js");
let should = require("should");
describe("utils parse", function() {
  var _html;

  it("should return a string", async function() {
    _html = "<html> ... <b>http://tinyurl.com/abcd</b> ... </html>";
    var url = parseResponse(_html);
    url.should.be.type("string"); 
  });
  it("should return a string", async function() {
    _html = "<html> ... <b>https://tinyurl.com/abcd</b> ... </html>";
    var url = parseResponse(_html);
    url.should.be.type("string"); 
  });
});
