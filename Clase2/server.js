var express = require('express');
var swig= require('swig');
var mongoose  = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');

//codigo bd
mongoose.connect('mongodb://localhost/clase-2')

var toDoSchema = new Schema({

	name: String,
	description: String

})

var ToDo = mongoose.model('Todo',toDoSchema);

//termina codigo bd

var app = express();

//Configuracion de swig

app.engine('html',swig.renderFile)

app.set('view engine','html')
app.set('views',__dirname + '/views')

app.set('view cache',false)

swig.setDefaults({cache: false}) //activar cache en prod

//termina config swig

// agregamos body parser a express

app.use(bodyParser.urlencoded({extended:false}))



app.get('/',function(req,res){

	ToDo.find({

},function(err,docs){
	if(err){

		return res.send(500,'Internal Server Error');
	}

	res.render('index',{
		title:'Esta es mi app',
		data: docs })

})
})

app.post('/add-to-do',function(req,res){

	ToDo.create(req.body,function(err,doc){
		if(err){
			return res.send(500,'Internal Server Error');
		}
		res.redirect('/')
	})


})

app.listen(3000,function(){

console.log('Ejemplo app listening on port 3000!');

})