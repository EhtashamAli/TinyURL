let http = require("http");
function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }

  //find & remove port number
  hostname = hostname.split(":")[0];
  //find & remove "?"
  hostname = hostname.split("?")[0];

  return hostname;
}
async function extractRootDomain(url) {
  var domain = extractHostname(url),
    splitArr = domain.split("."),
    arrLen = splitArr.length;

  //extracting the root domain here
  //if there is a subdomain
  if (arrLen > 2) {
    domain = splitArr[arrLen - 2] + "." + splitArr[arrLen - 1];
    //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
    if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
      //this is using a ccTLD
      domain = splitArr[arrLen - 3] + "." + domain;
    }
  }
  //change . to _
  domain = domain.replace(".", "_");
  return domain;
}

module.exports = {
  shorten: async url =>
    new Promise((_resolve, _reject) =>
      http
        .get(`http://tinyurl.com/api-create.php?url=${url}`, resp => {
          const { statusCode } = resp;
          const contentType = resp.headers["content-type"];
          let error;
          if (statusCode !== 200) {
            error = new Error(
              "Request Failed.\n" + `Status Code: ${statusCode}`
            );
          } else if (!/^text\/plain/.test(contentType)) {
            error = new Error(
              "Invalid content-type.\n" +
                `Expected text/plain but received ${contentType}`
            );
          }
          if (error) {
            // Consume response data to free up memory
            resp.resume();
            _reject(error.message);
          }

          let rawData = "";
          resp.on("data", chunk => (rawData += chunk));
          // The whole response has been received. resolve the result.
          resp.on("end", () => _resolve(rawData));
        })
        .on("error", error => _reject(error.message))
    ),
  extractRootDomain,
  extractHostname
};
