let http = require("http");

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
    )
};
