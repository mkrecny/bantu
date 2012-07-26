var client = require('./lib/client')
, routes = require('./routes')
, get_app = require('./lib/get_app.js')
, auth = require('./lib/auth');

module.exports = {

  createClient : function(){
    return client;   
  },

  createServer : function(username, password, port, cb){
    var app = get_app();
    app.post('/execute', function(res, req){auth.header(username, password, res, req, routes.execute)});
    app.listen(port || 4000, function(){
      console.log("Server:", "Bantu server listening on port", app.address().port, "in",  app.settings.env, "mode");
      return cb(app);
    });
  }

};
