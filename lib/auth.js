var respond = require('./respond.js');

//failure condition
function fail(req, res){
  respond('Authentication failed. You should use Basic Authentication w/ the correct username and password', null, res);
}

function parse_basic_auth(header){
  token = header.split(/\s+/).pop() ||'', // and the encoded auth token
  auth = new Buffer(token, 'base64').toString(); // convert from base64
  parts = auth.split(/:/); // split on colon
  return {
    username : parts[0],
    password : parts[1]
  };
};

//check the xyz combo
exports.header = function(u, p, req, res, next){
  var basic_auth = parse_basic_auth(req.headers.authorization || '');
  req.username = basic_auth.username;
  req.password = basic_auth.password;

  console.log('Server: authing w/', 'u:', req.username, 'p:', req.password);
  
  if (req.username===u && req.password===p){
    console.log('Server: auth successful');
    return next(req, res);
  } else {
    fail(req, res);
  }
};
