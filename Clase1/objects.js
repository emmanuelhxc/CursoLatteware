var coche =
{
	placas : 'MTZ-7917',
	verificado: true,
	modelo: 'Lancer',
	serie: '2G61M5S3XE9191455',
	marca: 'Mitsubishi',
	color: 'Rojo',
	precio: 280000,
	dueño:{
		nombre: 'Emmanuel Morales',
		edad: 29
	}
}

console.log(coche.placas, coche.verificado, coche.precio);

coche.verificado = false;

coche.precio  = coche.precio * .09;

console.log(coche.placas, coche.verificado, coche.precio);




// console.log('\n');

// var mueble = 
// {
// 	tipo : 'silla',
// 	color : 'chocolate',
// 	precio: 3000
// }

// console.log(mueble);
