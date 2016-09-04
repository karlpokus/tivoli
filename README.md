# tivoli
A node server for everyday tinkering. A poor mans express clone if you will. Built-in router and some useful options. Very experimental. Not for production.

# install
```
$ npm i tivoli
```

# usage
```javascript
var tivoli = require('tivoli');
// add middleware - method, path, middleware (array or single fn)
tivoli.add('GET', '/', log); // add log to GET to /
tivoli.add('POST', '/user', [db, parse]); // add db and parse to POST to /user
// add options
tivoli.add({
  port: 6789
});
// start
tivoli.start();
```

# todos
options
- [x] port
- [ ] default finalHandler
- [ ] errorHandler
- [ ] cors
- [ ] bodyParsing
- [ ] queryParsing

# license
MIT
