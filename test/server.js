var tivoli = require('../tivoli'),
    logger = function(req, res, next) {
      console.log('Logging');
      next();
    },
    shouter = function(req, res, next) {
      console.log('HELLO WORLD!');
      next();
    },
    finalHandler = function(req, res) {
      res.end('Response ended');
    };

tivoli.add('GET', '/', [logger, shouter]);
tivoli.add('GET', '/', finalHandler);
tivoli.start();
