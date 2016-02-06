var express = require('express')
var swig = require('swig')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var uuid = require('uuid')
var schema = mongoose.Schema

var titlepp = 'Beans Bnb'
var ciudades = [
{	
	name: 'mexico-city',
	clave: 1
},
{
	name:'guadalajara',
	clave: 2
},
{
	name:'monterrey',
	clave: 3
}
]

mongoose.connect('mongodb://localhost/beansbnb')

var toDoSchema = new schema({

	title: String,
	description: String,
	address: String,
	city: String,
	country: String,
	uuid: {type:String, default: uuid.v4},
	createdOn: Date,
	modifiedOn: Date,

})

var ToDo = mongoose.model('Todo',toDoSchema);

// eliminar Datos
// ToDo.collection.remove();

var app = express()

// configuracion de swig

app.engine('html',swig.renderFile)

app.set('view engine','html')
app.set('views',__dirname + '/views')
app.set('view cache',false)

//archivos estaticos a express
app.use('/static', express.static(__dirname + '/static'));

//configurar body-parser a express
app.use(bodyParser.urlencoded({extended:false}))

swig.setDefaults({cache: false}) //activar cache en prod


app.get('/',function(req,res){

		ToDo.find({

},function(err,docs){
	if(err){

		return res.send(500,'Internal Server Error');
	}

	res.render('index',{
		title: titlepp,
		data: docs 
	})
})

})


app.get('/add-listing',function(req,res){


	res.render('add-listing',{
		title:titlepp,
		
	})

})

app.get('/city/:name',function(req,res){


	var clave = 0;

	ciudades.forEach(function(obj){

		if(req.params.name === obj.name )
		{
			clave = obj.clave 
		}
	})

	ToDo.find({city: clave}, function (err, doc) {
		if(err){
			return res.send(500, 'Internal Server Error')
		}

		if(!doc){
			return res.send(404, 'Not found')
		}
	
		res.render('sort-listing', {
			url: '/city/' + req.params.name,
			city: req.params.name,
			title: titlepp,
			data:doc
		})
	})


})

app.get('/city/:name/:uuid',function(req,res){


	var clave = 0;

	ciudades.forEach(function(obj){

		if(req.params.name === obj.name )
		{
			clave = obj.clave 
		}
	})

	ToDo.findOne({uuid:req.params.uuid }, function (err, doc) {
		if(err){
			return res.send(500, 'Internal Server Error')
		}

		if(!doc){
			return res.send(404, 'Not found')
		}
		
		res.render('view-listing', {
			city: req.params.name,
			titleadd : doc.title,
			title: titlepp,
			data:doc
		})
	 })


})

app.post('/:uuid/Update',function(req,res){

	ToDo.findOne({uuid: req.params.uuid}, function (err, doc) {
		if(err){
			return res.send(500, 'Internal Server Error')
		}

		if(!doc){
			return res.send(404, 'Not found')
		}

		doc.description = req.body.description

		doc.save(function (err) {
			if(err){
				return res.send(500, 'Internal Server Error')
			}

			res.redirect('/')
		})		
	})

})

app.post('/:uuid/Remove',function(req,res){
	ToDo.findOne({uuid:req.params.uuid}, function (err, doc) {
		if(err){
			return res.send(500, 'Internal Server Error')
		}

		if(!doc){
			return res.send(404, 'Not found')
		}

		doc.remove(function (err) {
			if(err){
				return res.send(500, 'Internal Server Error')
			}

			res.redirect('/')
		})		
	})


})

app.post('/add-to-do',function(req,res){


	ToDo.create({

	title: req.body.title,
	description: req.body.description,
	address: req.body.address,
	city: req.body.city,
	country: req.body.country,
	createdOn: new Date(),
	modifiedOn: new Date()


		},function(err,doc){
		if(err){
			return res.send(500,'Internal Server Error');
		}
		res.redirect('/')
	})


})



app.listen(3000,function(){

console.log('Server OK!');

})