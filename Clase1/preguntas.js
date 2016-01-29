var inquirer = require('inquirer')
var valorsecreto = 8;


var intentos = 3;
var contadorintentos = 0;
var Nombre;

var preguntas = [
{
		type: 'input',
  		name: 'firstName',
  		message: '¿Como te llamas?'
},
{
		type: 'input',
		name: 'adivina',
		message: 'Adivina un número del 1 al 10? (tienes 3 intentos en total)',
		validate: function( value ) {
      	var pass = value.match(/^\d+$/);
      	if (pass) {
        	return true;
      	} else {
        return value + " No es un número";
      }
    }

}

];

function accion(answers) {

++contadorintentos;


 		if(contadorintentos === 1)
			{
				preguntas.shift();
				Nombre = answers.firstName;	
			}

		
		if(intentos >= contadorintentos)
		{
			
			var numero = Number.parseInt(answers.adivina)

			if(numero === valorsecreto) 
			{
				console.log('\n ' + Nombre+ ' ' + 'Adivinaste!!!! en el ' + contadorintentos +' intento :D \n' );
			}
			else
			{
			    if(contadorintentos < intentos)
			    {
				 	console.log('\n ' + Nombre + ' ' + 'No Adivinaste, te quedan ' + (intentos - contadorintentos) + ' intentos \n' );
					return inquirer.prompt(preguntas, accion);
				}
				else
				{
					console.log('\n ' + Nombre + ' Se terminaron tus intentos :( (el número secreto era \'' + valorsecreto+'\')\n');
				}
			}
		}
		else
		{
			console.log('\n ' + Nombre + ' Se terminaron tus intentos :( \n');
		}

  }


inquirer.prompt(	
	preguntas
	,accion);
