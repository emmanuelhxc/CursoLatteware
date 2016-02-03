var inquirer = require('inquirer');
var mongoose  = require('mongoose');
var Schema =  mongoose.Schema;

var questions = [{
type:'input',
name:'name',
message:'¿Cual es el nombre de esta tarea?'
},
{
	type:'input',
	name:'description',
	message: 'Cual es la descripcion de la tarea'

}]

mongoose.connect('mongodb://localhost/clase-2')

var toDoSchema = new Schema({

	name: String,
	description: String,
})

var ToDo = mongoose.model('ToDo',toDoSchema)

inquirer.prompt(
	questions
,function(answers){

	console.log('Tarea',answers);


	ToDo.create(answers,function(err,doc){
		if(err){
			console.log('Hubo error',err);
			return;
		}

		console.log('El ToDo a sido creado',doc);


	})

})