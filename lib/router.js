// this is a working copy of https://github.com/karlpokus/karusell
// npm link only works locally so that is not an option

var pype = require('pype-stack'),
    url = require('url'),
    dataparser = require('./dataparser'),
    queryparser = require('./queryparser');

var o = {
  opts: {},
  GET: {},
  POST: {},
  PUT: {},
  PATCH: {},
  DELETE: {},
  defaultStack: [],
  _setDefaultStack: function() {
    if (this.opts.dataparser) {
      this.defaultStack.push(dataparser);
    }
    if (this.opts.queryparser) {
      this.defaultStack.push(queryparser);
    }
  },
  add: function(method, url, fn) {
    // add options
    if (Object.prototype.toString.call(method) === '[object Object]') {
      var opts = method;
      for (var k in opts) {
        this.opts[k] = opts[k];
      }
      this._setDefaultStack();
    }
    // add routes
    if (typeof fn === 'function') {
      fn = [fn];
    }
    if (Object.prototype.toString.call(fn) === '[object Array]') {
      var fns = fn.filter(function(x){
        return typeof x === 'function';
      });
      if (fns.length > 0) {
        if (!this[method][url]) {
          this[method][url] = [];
        }
        this[method][url] = this[method][url].concat(fns);
      }
    }
  },
  go: function(req, res) {
    // normalize
    var method = req.method,
        path = url.parse(req.url).pathname;
    
    if (this[method] && this[method][path]) {
      var stack = this.defaultStack.concat(this[method][path]);
      pype(null, stack)(req, res);
    } else {
      res.statusCode = 404;
      res.end('Error: No such method or path');
    }
  }
}

for (var k in o) {
  if (typeof o[k] === 'function') {
    o[k] = o[k].bind(o);
  }
}

module.exports = o;