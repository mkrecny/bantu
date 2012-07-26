var http = require('http')
, querystring = require('querystring');

module.exports = function(host, port, path, data, user, pwd, cb){
  data = JSON.stringify(data);

  var opts = {
    host : host, 
    port : port,
    path : path,
    method : 'POST',
    auth : user+':'+pwd,
    headers : {
      'Content-Type' : 'application/json',
      'Content-Length' : data.length
    }
  };

  var req = http.request(opts, function(res){
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function(d){
      data+=d;
    });
    res.on('end', function(){
      return cb(JSON.parse(data));
    });
  });

  req.write(data);
  req.end();
};
