let { shorten, convert } = require("./index");

convert("https://tinyurl.com/y4c5dx")
  .then(res => console.log(res))
  .catch(error => console.log(error.message));
