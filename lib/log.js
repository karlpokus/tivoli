var fs = require('fs'),
    path = require('path'),
    url = require('url');

module.exports = function(req, res, next){
  var file = path.join(process.env.PWD, 'logs.txt'),
      pathWithQuery = url.parse(req.url).path,
      d = new Date(),
      ts = d.toJSON(),
      data = ts + ' ' + req.method + ' ' + pathWithQuery + '\n';  
  
  fs.appendFile(file, data, function(err){
    if (err) return next(err);
    
    return next();
  });
}