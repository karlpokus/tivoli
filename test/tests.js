var test = require('tape'),
    hello = require('hello-http'),
    tivoli = require('../tivoli'),
    isEmptyObject = function(o){
      return Object.keys(o).length === 0;
    },
    janitor = function(req, res, next){
      req.out = {
        data: req.data,
        query: req.query
      };
      res.statusCode = 200;
      return next();
    };

// setup
tivoli.add('GET', '/', janitor);
tivoli.add('POST', '/cats', janitor);
tivoli.add({
  port: 6789,
  logOnStart: false,
  dataparser: true,
  queryparser: true,
  cors: true,
  errorhandler: true,
  finalhandler: function(req, res){
    res.end(JSON.stringify(req.out));
  }
});

test('.start', function(t){
  tivoli.start(function(){
    t.true(this.server.listening, '.start');
    t.end();
  });
});

test('GET', function(t){
  hello({method: 'GET', port:6789}, function(err, res){
    t.false(err, 'err');
    t.equal(res.raw.statusCode, 200, 'res.raw.statusCode');
    t.equal(isEmptyObject(res.data.data), true, 'res.data.data');
    t.equal(isEmptyObject(res.data.query), true, 'res.data.query');
    t.end();
  });
});

test('POST', function(t){
  hello({
    method:'POST',
    port:6789,
    path:'/cats?cat=bixa',
    headers: {'content-type':'application/json'},
    data: {cat: 'rex'}
  }, function(err, res){
    t.false(err, 'err');
    t.equal(res.raw.statusCode, 200, 'res.raw.statusCode');
    t.equal(res.data.data.cat, 'rex', 'res.data.data');
    t.equal(res.data.query.cat, 'bixa', 'res.data.query');
    t.end();
  });

});

test('.stop', function(t){
  tivoli.stop(function(){
    t.false(this.server.listening, '.stop');
    t.end();
  });
});
