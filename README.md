[![npm version](https://badge.fury.io/js/tivoli.svg)](https://badge.fury.io/js/tivoli)

# tivoli
A node development server for everyday tinkering. A poor mans express clone if you will. Built-in router and some useful options. Very experimental. Not for production.

# install
```
$ npm i tivoli
```

# usage
```javascript
var tivoli = require('tivoli');
// add routes
tivoli.add('GET', '/', fn); // pass single fn or array of fns
// add options
tivoli.add({
  port: 6789, // defaults to process.env.PORT || 8080
  logOnStart: true, // defaults to false
  dataparser: false, // defaults to false
  queryparser: false // defaults to false
});
// start
tivoli.start();
```

# test
```
$ npm test
```

# todos
options
- [x] port
- [ ] default finalHandler
- [ ] errorHandler
- [ ] cors
- [x] dataparser
- [ ] dataparser - fix types for urlencoded strings
- [x] querystringparser
- [ ] fileparser - multipart/form-data

# license
MIT
