var respond = require('../lib/respond.js')
, spawn = require('child_process').spawn
, exec = require('child_process').exec;

function run(cmd, cb){
  console.log(cmd.split());
  var child = spawn(cmd);  
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

function exec(cmd, cb){
  child = exec(cmd,
    function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}

exports.execute = function(req, res){
  console.log('Server: running', req.body);
  /*run(req.body.run, function(e,r){
    respond(e, r, res);
  });*/
  exec(req.body.run, function(e,r){
    respond(e, r, res);
  });
};
