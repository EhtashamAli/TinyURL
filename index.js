"use strict";
let http = require("http");
let {
  validateInput,
  parseResponse,
  extractHostname,
  extractRootDomain
} = require("./util/util");

module.exports = {
  shorten: async (url, alias = "") => {
    return new Promise((_resolve, _reject) => {
      validateInput({ url, alias });
      http
        .get(
          `http://tinyurl.com/create.php?source=indexpage&url=${encodeURI(
            url
          )}&alias=${alias}`,
          resp => {
            const { statusCode } = resp;
            const contentType = resp.headers["content-type"];
            let error;
            if (statusCode !== 200) {
              error = new Error(
                "Request Failed.\n" + `Status Code: ${statusCode}`
              );
            } else if (!/^text\/html/.test(contentType)) {
              error = new Error(
                "Invalid content-type.\n" +
                  `Expected text/html but received ${contentType}`
              );
            }
            if (error) {
              // Consume response data to free up memory
              resp.resume();
              _reject(error);
            }

            let rawData = "";
            resp.on("data", chunk => (rawData += chunk));
            // The whole response has been received. resolve the result.
            resp.on("end", () => _resolve(parseResponse(rawData)));
          }
        )
        .on("error", error => _reject(error));
    });
  },
  convert: async url => {
    return new Promise((_resolve, _reject) => {
      try {
        http.get(encodeURI(url), resp => {
          if (resp.headers["location"]) _resolve(resp.headers["location"]);
          else _reject(new Error("Invalid url"));
        });
      } catch (error) {
        _reject(error);
      }
    });
  },
  extractRootDomain,
  extractHostname
};
