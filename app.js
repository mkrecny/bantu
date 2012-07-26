var port = process.argv[2];

if (!port){
  console.error('Please specify a port for me to listen on');
  console.error('usage: node app.js <port number here>');
  process.exit();
}

var routes = require('./routes')
, get_app = require('./lib/get_app.js')
, auth = require('./lib/auth');

var app = module.exports = get_app();

app.post('/execute', routes.execute);

app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
