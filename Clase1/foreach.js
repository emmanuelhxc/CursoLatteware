var precios =[

20,
45,
55,
100,
33
];

var total = 0;
var cont = 0;
var dinerodisponible = 200;

precios.forEach(function(precio){

	++cont;

	console.log('Compra: ', typeof cont, cont)
	console.log('Antes de la operación: ',total, precio, dinerodisponible)

	if(dinerodisponible >= precio)
	{

	total = total + precio;
	dinerodisponible = dinerodisponible - precio;
	console.log('Total despues de sumar: ',total, cont, dinerodisponible);
	}
	else
	{
	console.log('NO GASTES!!!')	;
	}

	console.log('********************');

})

console.log(total);