var http = require('http'),
    router = require('./temp/router');

module.exports = {
  opts: {
    port: 8080
  },
  add: function(method, url, fn) {
    // add options
    if (Object.prototype.toString.call(method) === '[object Object]') {
      var opts = method;
      for (var k in opts) {
        if (k in this.opts) {
          this.opts[k] = opts[k];
        }
      }
    }
    // add routes to router
    if (arguments.length === 3) {
      router.add.apply(router, arguments);
    }
  },
  start: function() {
    // apply opts
    var port = process.env.PORT || this.opts.port;
    // init
    var server = http.createServer();
    server.on('request', router.go.bind(router));
    server.listen(port, function(){
      console.log('Server running on port ' + port);
    });
  }
};
