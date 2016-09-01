var pype = require('pype-stack');

module.exports = {
  GET: {},
  POST: {},
  add: function(method, url, fn) {
    if (typeof fn === 'function') {
      fn = [fn];
    }
    if (Object.prototype.toString.call(fn) === '[object Array]') {
      if (!this[method][url]) {
        this[method][url] = [];
      }
      this[method][url] = this[method][url].concat(fn);
    }
  },
  go: function(req, res) {
    if (this[req.method] && this[req.method][req.url]) {
      pype(null, this[req.method][req.url])(req, res);
    } else {
      res.statusCode = 404;
      res.end('Error: No such path exists.');
    }
  }
}
