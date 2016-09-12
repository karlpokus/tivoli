var http = require('http'),
    router = require('./lib/router'), // 'karusell'
    semver = require('semver'),
    polyFill = function(t){
      if (semver.lt(process.version, 'v5.7.0')) {
        t.server.on('listening', function(){
          t.server.listening = true;
        });
        t.server.on('close', function(){
          t.server.listening = false;
        });
      }
    };

module.exports = {
  opts: {
    // defaults
    port: 8080,
    logOnStart: true,
    dataparser: false,
    queryparser: false,
    cors: false,
    finalhandler: false,
    errorhandler: false,
    log: false
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
    // fix
    if (cb) {cb = cb.bind(this)};
    // pass opts to router
    router.add(this.opts);
    // apply opts to server
    var port = process.env.PORT || this.opts.port,
        logOnStart = this.opts.logOnStart,
        feedback = function(){
          console.log('Server running on port ' + port);
        };
    // init
    this.server = http.createServer();
    this.server.on('request', router.go);
    polyFill(this);
    this.server.listen(port, function(){
      if (logOnStart) {feedback()};
      if (cb) return cb();
    });
  },
  stop: function(cb) {
    if (cb) {cb = cb.bind(this)};
    this.server.close(cb);
  }
};
