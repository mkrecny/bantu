var respond = require('../lib/respond.js')
, spawn = require('child_process').spawn;

function run(path, cb){
  var child = spawn(path);  
  var data = '';
  var error = '';
  child.stdout.setEncoding('utf8');
  child.stderr.setEncoding('utf8');
  child.stdout.on('data', function(d){
    data+=d;
  });
  child.stderr.on('data', function(e){
    error+=e;
  });
  child.on('exit',function(){
    console.log('Server: result', {error:error, data:data});
    return cb(error, data);  
  });
};

exports.execute = function(req, res){
  console.log('Server: running', req.body);
  run(req.body.run, function(e,r){
    respond(e, r, res);
  });
};
