let { shorten } = require("./index");

shorten("http:")
  .then(res => console.log(res))
  .catch(error => console.log(error));
