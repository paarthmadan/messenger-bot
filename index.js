var login = require('facebook-chat-api');
var config = require('./config');
var weather = require('weather-js');
var request = require('request');
var yahooFinance = require('yahoo-finance');

const fs = require('fs');


login({email: config.fb.email, password: config.fb.password}, function callback(err, api){
	
	if(err) return console.error(err);

	api.setOptions({
		logLevel:"silent"
	});

	api.listen(function callback(err, msg){

		if(err) return console.error(err);

		var currentMessage = msg.body;
		console.log(currentMessage);

		if(currentMessage == undefined){
			return;
		}
		else if(includes("/paarth", currentMessage)){
			api.sendMessage({body:"Paarth is my creator!"}, msg.threadID, function callback(err, messageInfo){
				if(err) return console.error(err);
			});
		}
		else if(includes("/colour", currentMessage)){
			var startOfColour = currentMessage.indexOf("#");
			
			var hexCode = "#000000";
			
			try{
			hexCode = currentMessage.substring(startOfColour, startOfColour + 7);
			}catch(err){
				console.error(err);
			}	
			console.log(hexCode);

			api.sendMessage({body:"Changing chat colour to " + hexCode}, msg.threadID);
			api.changeThreadColor(hexCode, msg.threadID, function callback(err){
				if(err) return console.error(err);
			});

		}else if(includes("/weather", currentMessage) && includes("**", currentMessage)){
			var indexOfLocation = currentMessage.indexOf("**");
			var location = currentMessage.substring(indexOfLocation + 2);
			
			if(includes("**", location)){
				location = location.substring(0, location.indexOf("**"));
			}

			weather.find({search: location, degreeType: 'C'}, function(err, result) {
  			
  			if(err) console.log(err);
 			
  			var currentInfo = result[0].current;

 			var currentTemperature = currentInfo.temperature;
 			var humidity = currentInfo.humidity;
 			var imageUrl = currentInfo.imageUrl;

 			var constructedMsg = {body: "The temperature in " + location + " is " + currentTemperature + "˚C.\n" 
 			+ "The humidity is at " + humidity + "."};

 			api.sendMessage(constructedMsg, msg.threadID);

 			request(imageUrl).pipe(fs.createWriteStream('weather.gif'));

 			var constructedImageMsg = {
      			body: "Image",
      			attachment: fs.createReadStream(__dirname + '/weather.gif')
    		};
   
 			api.sendMessage(constructedImageMsg, msg.threadID);

			});	
		}else if(includes("/stock", currentMessage) && includes("**", currentMessage)){
			var indexOfSymbol = currentMessage.indexOf("**");
			var symbol = currentMessage.substring(indexOfSymbol + 2);
			
			if(includes("**", symbol)){
				symbol = symbol.substring(0, symbol.indexOf("**"));
			}

			console.log(symbol);
	});
});

function includes(string, msg){
	if(msg.toLowerCase().indexOf(string.toLowerCase()) != -1){
		return true;
	}else{
		return false;
	}
}