var coche =
{
	placas : 'MTZ-7917',
	verificado: true,
	modelo: 'Lancer',
	serie: '2G61M5S3XE9191455',
	marca: 'Mitsubishi',
	color: 'Rojo',
	precio: 280000,
	lavado: false,
	gasolina: 30,
	dueno:{
		nombre: 'Emmanuel Morales',
		edad: 29
	}
}

console.log(coche);

if(coche.dueno.nombre === 'David Zavala')
{
	console.log('wujuuu!! es tu coche');

} else if(coche.dueno.nombre === 'Santiago Zavala')
{
	console.log('Pide el coche');
	coche.lavado = true;
	coche.gasolina = 25;
}
else if(coche.dueno.nombre === 'Emmanuel Morales')
{
	console.log('Pide el coche');
	coche.gasolina = coche.gasolina- 5 + 15;
}
else
{
	console.log('pide un uber');
}

console.log('coche', coche.gasolina, coche.lavado);

