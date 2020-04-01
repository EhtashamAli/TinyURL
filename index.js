"use strict";
let http = require("http");

let extractHostname = url => {
  new Promise((_resolve, _reject) => {
    try {
      //find & remove protocol (http, ftp, etc.) and get hostname
      let hostname =
        url.indexOf("//") > -1 ? url.split("/")[2] : url.split("/")[0];
      //find & remove port number
      hostname = hostname.split(":")[0];
      //find & remove "?"
      hostname = hostname.split("?")[0];
      _resolve(hostname);
    } catch (error) {
      _reject(error);
    }
  });
};

let extractRootDomain = url => {
  return new Promise((_resolve, _reject) => {
    try {
      let domain = extractHostname(url),
        splitArr = domain.split("."),
        arrLen = splitArr.length;
      //extracting the root domain here
      //if there is a subdomain
      if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + "." + splitArr[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (
          splitArr[arrLen - 2].length == 2 &&
          splitArr[arrLen - 1].length == 2
        ) {
          //this is using a ccTLD
          domain = splitArr[arrLen - 3] + "." + domain;
        }
      }
      //change . to _
      domain = domain.replace(".", "_");
      _resolve(domain);
    } catch (error) {
      _reject(error);
    }
  });
};

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
        .on("error", error => _reject(error))
    ),
  convert: async url =>
    new Promise((_resolve, _reject) =>
      http
        .get(url, resp => {
          if (resp.headers["location"]) _resolve(resp.headers["location"]);
          else _reject(new Error("Invalid url"));
        })
        .on("error", error => {
          _reject(error);
        })
    ),
  extractRootDomain,
  extractHostname
};
