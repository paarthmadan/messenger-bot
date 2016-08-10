var login = require('facebook-chat-api');
var config = require('./config');


login({email: config.fb.email, password: config.fb.password}, function callback(err, api){

	if(err) return console.error(err);

	api.setOptions({
		logLevel:"silent"
	});

	api.listen(function callback(err, msg){

		var currentMessage = msg.body;

		if(includes("/paarth", currentMessage)){
			api.sendMessage({body:"Paarth is my creator!"}, msg.threadID, function callback(err, messageInfo){
				if(err) return console.error(err);
			});
		}else{
			api.sendMessage("Bot Says: " + msg.body, msg.threadID);
		}

	});


});

function includes(string, msg){
	if(msg.toLowerCase().indexOf(string.toLowerCase()) != -1){
		return true;
	}else{
		return false;
	}
}