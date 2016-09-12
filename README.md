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
// add routes - pass function or array of functions
tivoli.add('GET', '/', fn);
// add options object
tivoli.add({});
// start
tivoli.start();
```

### Options
`port` *number* Defaults to `process.env.PORT || 8080`

`logOnStart` *boolean* Defaults to false

`dataparser` *boolean* Parse json or urlencoded data based on `headers: content-type`. Defaults to false

`queryparser` *boolean* Parse querystring in url into an object. Defaults to false

`cors` *boolean* Enable cors on all routes. Defaults to false

`log` *boolean* Log timestamp and request data to `logs.txt` at `process.env.PWD`. Defaults to false

`finalhandler` *boolean* || *function* End response with stringified `req.out`. Defaults to false

`errorhandler` *boolean* || *function* End response, log stringified error, set statusCode to 500. Defaults to false

# test
```
$ npm test
```

# todos
- [x] port
- [x] finalHandler
- [x] errorHandler
- [x] cors
- [x] dataparser
- [ ] dataparser and queryparser - fix data types
- [x] queryparser
- [ ] fileparser - multipart/form-data
- [x] logger
- [x] use hello for tests
- [ ] karusell

# license
MIT
