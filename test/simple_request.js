var bantu = require('../index.js');

var auth_user = 'foo';
var auth_pwd = 'bar';

var client = bantu.createClient();
var server = bantu.createServer(auth_user, auth_pwd, 3000, function(server){

  var opts = {
    host : 'localhost',
    port : '3000',
    run : './sample_script.sh',
    username : auth_user,
    password : auth_pwd 
  };

  client.exec(opts, function(response){
    console.log("Client receivedd response:", response);
    process.exit();
  });

});
