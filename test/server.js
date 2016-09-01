var http = require('http'),
    router = require('../tivoli'),
    server = http.createServer();

router.add('GET', '/', function(req, res){
  res.end('end from router');
});

server.on('request', router.go.bind(router));

server.listen(8080, function(){
  console.log('Server running..');
});
