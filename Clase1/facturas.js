var facturas = [

{
    DueDate: '2013-02-15',
    DocNumber: 'SAMP001',
    currency: "USD",
    Customer: {
          custome_id: '0001',
          name: 'Emmanuel Morales',
          age: 30,
          gender: 'Masculino',
        },
	Status: 'PAGADA',
   	Desciption: 'Venta 1',
   	TotalAmt: 1990.19

},
{
    DueDate: '2013-02-15',
    DocNumber: 'SAMP002',
    currency: "USD",
    Customer: {
          custome_id: '0001',
          name: 'Arturo Gomez',
          age: 25,
          gender: 'Masculino',
        },
	Status: 'PAGADA',
   	Desciption: 'Venta 2',
   	TotalAmt: 123420.19

},
{
    DueDate: '2013-02-15',
    DocNumber: 'SAMP003',
    currency: "USD",
    Customer: {
          custome_id: '0001',
          name: 'Francisco Valencia',
          age: 30,
          gender: 'Masculino',
        },
	Status: 'PAGADA',
   	Desciption: 'Venta 3',
   	TotalAmt: 1120.19

},
{
    DueDate: '2013-02-15',
    DocNumber: 'SAMP004',
    currency: "USD",
    Customer: {
          custome_id: '0001',
          name: 'Armando Ramirez',
          age: 34,
          gender: 'Masculino',
        },
	Status: 'PAGADA',
   	Desciption: 'Venta 3',
   	TotalAmt: 5645.19

},
{
    DueDate: '2013-02-15',
    DocNumber: 'SAMP005',
    currency: "USD",
    Customer: {
          custome_id: '0001',
          name: 'Luis Lopez',
          age: 40,
          gender: 'Masculino',
        },
	Status: 'PAGADA',
   	Desciption: 'Venta 5',
   	TotalAmt: 54.1934

},
{
    DueDate: '2013-02-15',
    DocNumber: 'SAMP006',
    currency: "USD",
    Customer: {
          custome_id: '0001',
          name: 'Jorge Hernandez',
          age: 35,
          gender: 'Masculino',
        },
	Status: 'PAGADA',
   	Desciption: 'Venta 6',
   	TotalAmt: 23427.345345

},
{
    DueDate: '2013-02-15',
    DocNumber: 'SAMP007',
    currency: "USD",
    Customer: {
          custome_id: '0001',
          name: 'Ismael de La Rosa',
          age: 32,
          gender: 'Masculino',
        },
	Status: 'PAGADA',
   	Desciption: 'Venta 7',
   	TotalAmt: 65563

},
{
    DueDate: '2013-02-15',
    DocNumber: 'SAMP008',
    currency: "USD",
    Customer: {
          custome_id: '0001',
          name: 'Paola Martinez',
          age: 33,
          gender: 'Femenino',
        },
	Status: 'PAGADA',
   	Desciption: 'Venta 8',
   	TotalAmt: 4375.19

},
{
    DueDate: '2013-02-15',
    DocNumber: 'SAMP009',
    currency: "USD",
    Customer: {
          custome_id: '0001',
          name: 'Rene Oramas',
          age: 50,
          gender: 'Masculino',
        },
	Status: 'PAGADA',
   	Desciption: 'Venta 9',
   	TotalAmt: 9872.19

},
{
    DueDate: '2013-02-15',
    DocNumber: 'SAMP0010',
    currency: "USD",
    Customer: {
          custome_id: '0001',
          name: 'Celia Aguilar',
          age: 60,
          gender: 'Femenino',
        },
	Status: 'PAGADA',
   	Desciption: 'Venta 10',
   	TotalAmt: 982.124

}
];


var contarFacturas = function(data){
	
	return data.length;
}


var CalcularTotales = function(data)
{
	var Iva = 0;
	var Total= 0;
	var TotalConIva=0;

	data.forEach(function(factura){

		Iva = parseFloat((Iva + (factura.TotalAmt * .16)).toFixed(2));

		Total = parseFloat((Total + factura.TotalAmt).toFixed(2));

		

	})
	
	TotalConIva = parseFloat(TotalConIva + Iva + Total);
	
	var res = [];

	res.push(Iva);
	res.push(Total);
	res.push(TotalConIva);

	return res;

}


var num = contarFacturas(facturas);

var resultado = CalcularTotales(facturas);


console.log('Total de facturas: ' + num);

console.log('Iva Total de Todas las facturas: ' + resultado[0]);

console.log('Total de Todas las facturas sin iva: ' + resultado[1]);

console.log('Total de Todas las facturas con Iva: ' + resultado[2]);










