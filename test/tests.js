var test = require('tape'),
    hello = require('hello-http'),
    tivoli = require('../tivoli'),
    isEmptyObject = function(o){
      return Object.keys(o).length === 0;
    },
    janitor = function(req, res, next){
      req.out = JSON.stringify({
        data: req.data,
        query: req.query
      });
      return next();
    },
    finalHandler = function(req, res) {
      res.statusCode = 200;
      res.end(req.out);
    };

// setup
tivoli.add('GET', '/', [janitor, finalHandler]);
tivoli.add('POST', '/cats', [janitor, finalHandler]);
tivoli.add({
  port: 6789,
  logOnStart: false,
  dataparser: true,
  queryparser: true,
  cors: true
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
