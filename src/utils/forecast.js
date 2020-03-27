const request=require('request')


const forecast=function(lat,long,callback){
	const url='https://api.darksky.net/forecast/67d88b1113a0fbd89f25ce05e62c208e/'+lat+','+long+'?lang=en&units=si' //query parameters always start with question marks and passed like key=value&key2=value2. The '&' sign is used to seperate query params.

	request({url,json:true},(error,{body})=>{
		// const data=JSON.parse(response.body) //we can either parse json manually by write this line or we can set json:true in the options object to automatically parse it for us.
		// console.log(response.body.currently)
		if(error){
			callback('Unable to connect to weather service')
		}else if(body.error){
			callback('Unable to find location')
		}
		else{
			console.log(body.daily.data[0].apparentTemperatureHigh)
			callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+ ' degrees out. There is '+body.currently.precipProbability+'% chance of rain.Temperature can be as high as '+body.daily.data[0].temperatureMax+ 'and lowset temperature recorded is '+body.daily.data[0].temperatureMin)
		}
	
	})

}

module.exports=forecast