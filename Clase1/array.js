var asistentes = [


	{
		nombre:'Xhanil Lopez',
		teacher: false,
		altura: 200
	},
	{
		nombre:'Manu Uribe',
		teacher: false,
		altura: 200
	},
	{
		nombre:'Richad Kaufman',
		teacher: true,
		altura: 200
	}

]


console.log('Asistentes: ', asistentes.length)

console.log(asistentes[1])



asistentes.push(
{
	nombre: 'Sergio Ortega',
	teacher: false,
	altura: 200
}
	)
console.log('Asistentes: ', asistentes.length)

var Sergio = asistentes.pop();

console.log('Asistentes: ', asistentes.length)
console.log('Sergio: ', Sergio)