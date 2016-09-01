var http = require('http'),
    router = require('../tivoli'),
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
    },
    server = http.createServer();

router.add('GET', '/', [logger, shouter]);
router.add('GET', '/', finalHandler);

server.on('request', router.go.bind(router));

server.listen(8080, function(){
  console.log('Server running..');
});
