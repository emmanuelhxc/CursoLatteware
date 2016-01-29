// http://openweathermap.org/current
var inquirer = require('inquirer')
var request = require('request')
var _ = require('underscore')

var token = 'beb15a42317841529f919445dabb3444'

var cityCodes = {
	'Ciudad de México' : 'Mexico City,mx',
	'Londres' : 'London,uk'
}

var opt = {
	'Pronostico actual' : 1,
	'Pronostico a futuro ' : 2
}

var ciudad = null;


inquirer.prompt([{
	type: 'list',
	name: 'cities',
	message: 'De que ciudad deseas saber el clima?',
	choices: Object.keys(cityCodes)
}], function( answers ) {
	ciudad = answers.cities;

	var cityCode = cityCodes[answers.cities];
	inquirer.prompt([{
		type: 'list',
		name: 'op',
		message: 'Elije una opcion',
		choices: Object.keys(opt)
	}], function( answers ){
			

			var opcion = opt[answers.op]

			if(opcion === 1){
			
				var url = 'http://api.openweathermap.org/data/2.5/weather?q='+ cityCode +'&appid='+token+'&units=metric'

				request(url, function (error, response, body) {
				if(error) {
					return console.log('No pude conseguir el clima de esta ciudad', error);
				}

				var data = JSON.parse(body);

				var description = data.weather[0].description;
				var temp = data.main.temp;

				console.log('Clima actual en ', ciudad, description, temp);

				})
			}
			else
			{
				var url = 'http://api.openweathermap.org/data/2.5/forecast?q='+ cityCode +'&appid='+token+'&units=metric'	

				request(url, function (error, response, body) {
				if(error) {
					return console.log('No pude conseguir el clima de esta ciudad', error);
				}

				var data = JSON.parse(body);

				

				data.list.forEach(function(climafuturo){

					var des = climafuturo.weather[0].description;

					 console.log('Clima ' +  climafuturo.dt_txt , data.city.name, des, climafuturo.main.temp);


				})

				});

			}	
	});
});
