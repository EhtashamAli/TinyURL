let {
  shorten,
  convert,
  extractRootDomain,
  extractHostname
} = require("./index");

shorten("https://facebook.com", "zxcdsaytr")
  .then(link => {
    console.log("withAlias:", link);
    convert(link)
      .then(result => {
        console.log("convert: ", result);
      })
      .catch(error => console.log(error.message));
  })
  .catch(error => console.log(error.message));

extractHostname("https://stackoverflow.com")
  .then(result => {
    console.log("Hostname: ", result);
  })
  .catch(error => console.log(error));
extractRootDomain("https://stackoverflow.com")
  .then(result => {
    console.log("RootDomain: ", result);
  })
  .catch(error => console.log(error));
