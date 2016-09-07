// this is a working copy of https://github.com/karlpokus/karusell
// npm link only works locally so that is not an option

var pype = require('pype-stack'),
    dataparser = require('./dataparser');

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
      if (!this[method][url]) {
        this[method][url] = [];
      }
      this[method][url] = this[method][url].concat(fns);
    }
  },
  go: function(req, res) {
    if (this[req.method] && this[req.method][req.url]) {
      var stack = this.defaultStack.concat(this[req.method][req.url]);
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