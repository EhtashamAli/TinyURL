let extractHostname = url => {
  return new Promise((_resolve, _reject) => {
    try {
      if (!url && url.length === 0) {
        throw new Error("The url can not be an empty string.");
      }
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

module.exports = {
  validateInput: ({ url, alias }) => {
    if (url.length === 0)
      throw new Error("The url can not be an empty string.");
    if (alias.length > 0 && alias.length < 5)
      throw new Error("The alias must be at least 5 characters.");
    return true;
  },
  parseResponse: res => {
    return res
      .match(/<b>(http\:\/\/tinyurl\.com\/\S+)<\/b>/)[0]
      .replace("<b>", "")
      .replace("</b>", "");
  },
  extractRootDomain: url => {
    return new Promise((_resolve, _reject) => {
      extractHostname(url)
        .then(domain => {
          let splitArr = domain.split(".");
          let arrLen = splitArr.length;
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
          _resolve(domain);
        })
        .catch(error => _reject(error));
    });
  },
  extractHostname
};
