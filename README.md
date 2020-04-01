# Node.js Module for tinyUrl

Built over [TINYURL](http://tinyurl.com) API

## Getting Started

This module provides two functions:
Shorten and Convert

Alnog with two Utill functions:
extractHostname and extractRootDomain

### Installation
[![NPM](https://nodei.co/npm/@ehtashamali/tinyurl.png?mini=true)](https://npmjs.com/package/@ehtashamali/tinyurl/)

Using npm:

```
npm i @ehtashamali/tinyurl
```

### Example

```javascript
let {
  shorten,
  convert,
  extractHostname,
  extractRootDomain
} = require("tiny-url");

shorten("https://stackoverflow.com")
  .then(link => {
    //returns shorten url ex: tinyurl.com/adwa222
    console.log("Short Url:", link);
  })
  .catch(error => console.log(error.message));

convert(link)
  .then(result => {
    //returns target url
    console.log("Converted: ", result);
  })
  .catch(error => console.log(error.message));

extractHostname("https://stackoverflow.com")
  .then(result => {
    //returns stackoverflow.com
    console.log("Hostname: ", result);
  })
  .catch(error => console.log(error.message));

extractRootDomain("https://stackoverflow.com")
  .then(result => {
    //returns stackoverflow.com
    console.log("RootDomain: ", result);
  })
  .catch(error => console.log(error.message));
```

## Built With

- [http](https://nodejs.org/api/http.html) - HTTP

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

I use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Author

- **Ehtasham Ali**

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

[![emoji-log](https://cdn.rawgit.com/ahmadawais/stuff/ca97874/emoji-log/non-flat-round.svg)](https://github.com/ahmadawais/Emoji-Log/)

## Connect

<div align="left">
    <p><a href="https://github.com/EhtashamAli"><img alt="GitHub @EhtashamAli" align="center" src="https://img.shields.io/badge/GITHUB-gray.svg?colorB=6cc644&colorA=6cc644&style=flat" /></a>&nbsp;<small><strong>(follow)</strong></small></p>
    <p><a href="https://www.linkedin.com/in/ehtashamali786/"><img alt="LinkedIn @ehtashamali786" align="center" src="https://img.shields.io/badge/LINKEDIN-gray.svg?colorB=0077b5&colorA=0077b5&style=flat" /></a>&nbsp;<small><strong>(connect)</strong></small></p>
</div>
