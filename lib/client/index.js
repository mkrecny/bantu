var post = require('./_post.js');

module.exports = {

  exec : function(opts, cb){

    //validate opts : expecting path, data, user, password, cb
    ['host', 'port', 'run','username','password'].forEach(function(key){
      if (!opts.hasOwnProperty(key)){
        return cb('Error: opts is missing '+key);
      }
    });
    var data = {
      run : opts.run
    };
    post(opts.host, opts.port, '/execute', data, opts.username, opts.password, cb);
  }

};
