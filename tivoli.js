var http = require('http'),
    router = require('./temp/router');
    
module.exports = {
  add: function(method, url, fn) {
    router.add(method, url, fn);
  },
  start: function() {
    var server = http.createServer();
    server.on('request', router.go.bind(router));
    server.listen(8080, function(){
      console.log('Server running..');
    });
  }
};
