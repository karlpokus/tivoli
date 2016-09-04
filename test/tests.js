var test = require('tape'),
    http = require('http'),
    tivoli = require('../tivoli'),
    finalHandler = function(req, res) {
      res.statusCode = 200;
      res.end();
    };

tivoli.add('GET', '/', finalHandler);
tivoli.add({
  port: 6789,
  quiet: true
});

test('the basics', function(t){

  tivoli.start(function(){
    t.true(tivoli.server.listening, '.start');

    http.get('http://localhost:6789', function(res){
      t.equal(res.statusCode, 200, 'ok 200');

      tivoli.stop(function(){
        t.false(tivoli.server.listening, '.stop');

        t.end();
      });
    });
  });
});
