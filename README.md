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
`port` *number* defaults to process.env.PORT || 8080

`logOnStart` *boolean* defaults to false

`dataparser` *boolean* defaults to false

`queryparser` *boolean* defaults to false

`cors` *boolean* defaults to false

`finalhandler` *boolean* or *function* defaults to false

`errorhandler` *boolean* or *function* defaults to false

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
- [ ] [logfile](https://nodejs.org/api/fs.html#fs_fs_appendfile_file_data_options_callback)
- [x] use hello for tests
- [ ] karusell

# license
MIT
