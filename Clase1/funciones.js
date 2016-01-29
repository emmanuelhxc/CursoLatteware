var contarCochesRojos = function(coches) {
	
	
	var cont = 0;
	var totalcochesrojos=0;

	coches.forEach(function(coche){

	console.log(coche.color);

		++cont;

		if(coche.color === 'rojo')
		{

			++totalcochesrojos;
			console.log('Este coche es rojo', totalcochesrojos);
		}
		else {

			console.log('el coche no es rojo');

		}
		console.log('***************************');

	})


return totalcochesrojos

}

var estacionamiento = [

{color: 'azul'},
{color: 'rojo'},
{color: 'verde'},
{color: 'rojo'},

];

var cochesRojos = contarCochesRojos(estacionamiento);


console.log('Total de coches', estacionamiento.length);
console.log('Total de coches rojos', cochesRojos);