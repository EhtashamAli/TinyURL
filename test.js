let {
  shorten,
  convert,
  extractHostname,
  extractRootDomain
} = require("./index");

shorten("https://stackoverflow.com")
  .then(link => {
    console.log("Short Url:", link);
    convert(link)
      .then(result => {
        console.log("Converted: ", result);
      })
      .catch(error => console.log(error.message));
  })
  .catch(error => console.log(error.message));

extractHostname("https://stackoverflow.com")
  .then(result => {
    console.log("Hostname:", result);
  })
  .catch(error => console.log(error.message));
// extractRootDomain("https://stackoverflow.com");
