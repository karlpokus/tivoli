module.exports = function(req, res, next) {
  
  var data = '';
  req.on('data', function(chunk){
    data += chunk;
  }).on('error', next)
   .on('end', function(){
    var o = {};
    
    // body is urlencoded
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      data.split('&').forEach(function(part){
        var parts = part.split('='),
            k = parts[0],
            v = parts[1];
        o[k] = v;
      });
    }
    // body is json
    if (req.headers['content-type'] === 'application/json') {
      try {
        o = JSON.parse(data);
      } catch(e) {
        return next(e);
      }
    }
    
    req.data = o;
    return next();
  });  
}