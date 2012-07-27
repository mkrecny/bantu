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
  
  console.log("Client: making request with opts:", opts);
  client.exec(opts, function(response){
    console.log("Client: received response:", response);
    if (response.data==="Hi I'm Simple\n"){
      console.log('TEST PASS');
    } else {
      console.log('TEST FAIL');
    }
    process.exit();
  });

});
