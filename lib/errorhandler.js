module.exports = function(err, req, res){
  if (typeof err !== 'string') {
    err = err.toString();
  }
  console.error(err);
  res.statusCode = 500;
  res.end();
}
