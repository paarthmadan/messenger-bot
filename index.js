var login = require('facebook-chat-api');
var config = require('./config');


login({email: config.fb.email, password: config.fb.password}, function callback(err, api){

	if(err) return console.error(err);
	api.listen(function callback(err, msg){
		api.sendMessage(message.body, message.threadId);
	});


});