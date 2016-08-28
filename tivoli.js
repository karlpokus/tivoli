module.exports = {
  GET: {},
  POST: {},
  add: function(method, url, fn) {
    this[method][url] = fn;
  },
  go: function(req, res) {
    this[req.method][req.url](req, res);
  }
}
