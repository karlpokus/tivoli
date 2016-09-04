var http = require('http'),
    router = require('karusell');

module.exports = {
  opts: {
    port: 8080,
    quiet: false
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
  start: function(cb) {
    // apply opts
    var port = process.env.PORT || this.opts.port,
        quiet = this.opts.quiet,
        feedback = function(){
          console.log('Server running on port ' + port);
        };
    // init
    this.server = http.createServer();
    this.server.on('request', router.go);
    this.server.listen(port, function(){
      if (!quiet) {feedback()};
      if (cb) return cb();
    });
  },
  stop: function(cb) {
    this.server.close(cb);
  }
};
