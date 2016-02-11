var express = require('express')
var swig = require('swig')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var uuid = require('uuid')
var bcrypt = require('bcrypt-nodejs')

var session = require('express-session')
var MongoStore = require('express-session-mongo')
var flash = require('flash')

var Schema = mongoose.Schema

var titlepp = 'Beans Bnb'


mongoose.connect('mongodb://localhost/base-server')

// Declara tus modelos en este espacio
var userSchema = Schema({
	username: String,
	email: String,
	displayName: String,
	password: String,
	createdOn: Date,
	uuid : {type: String, default: uuid.v4}
})

var User = mongoose.model('User', userSchema)

var toDoSchema = Schema({

	address: String,
	city: String,
	createdBy: String,
	createdOn: Date,
	description: String,
	modifiedOn: Date,
	title: String,
	uuid: {type:String, default: uuid.v4},
})

var ToDo = mongoose.model('Todo',toDoSchema);

var citySchema = Schema({
	name: String,
	createdBy: String,
	createdOn: Date,
	uuid : {type: String, default: uuid.v4}
})

var Cities = mongoose.model('city', citySchema)



// Termina la declaracion de modelos

var app = express()

// Add sessions and flash
app.use(session({
	secret: 'keyboard cat',
	store: new MongoStore(),
	saveUninitialized: true,
	resave: true
}))
// Correr en MongoDB:
// use express-sessions
// db.sessions.ensureIndex( { "lastAccess": 1 }, { expireAfterSeconds: 3600 } )
app.use( flash() )

// Configurar de swig!
app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

// Configurar cache
app.set('view cache', false)
swig.setDefaults({cache:false})// <-- Cambiar a true en produccion

// Agregamos body parser a express
app.use( bodyParser.urlencoded({ extended:false }) )

// Declara tus url handlers en este espacio
app.use(function (req, res, next) {
	
	
	if(!req.session.userId){
		 return next()
	}

	User.findOne({uuid: req.session.userId}, function(err, user){
		if(err){
			return res.send(500, 'Internal Server Error')
		}

		res.locals.user = user

		next()
	})

});

app.get('/',function (req, res) {

res.render('index')
	
})

app.get('/sign-up', function (req, res){
	var error = res.locals.flash.pop()

	res.render('sign-up', {
		error: error
	})
})

app.get('/log-in', function (req, res){
	var error = res.locals.flash.pop()

	res.render('log-in',{
		error: error
	})
})

app.get('/log-out', function (req, res){
	req.session.destroy()
	res.redirect('/')
})

app.post('/sign-up', function (req, res){
	if(!req.body.username || !req.body.password){
		req.flash('sign-up-error', 'To sign up you need a username and a password')
		return res.redirect('/sign-up')		
	}

	User.findOne({username: req.body.username}, function(err, doc){
		if(err){
			return res.send(500, 'Internal Server Error')
		}

		if(doc){
			req.flash('sign-up-error', 'Username is taken')
			return res.redirect('/sign-up')
		}

		bcrypt.hash(req.body.password, null/* Salt */, null, function(err, hashedPassword) {
			if(err){
				return res.send(500, 'Internal Server Error')
			}

			User.create({
				username: req.body.username,
				password: hashedPassword,
				displayName: req.body.displayname,
				createdOn: new Date(),
				email: req.body.email,
			}, function(err, doc){
				if(err){
					return res.send(500, 'Internal Server Error')
				}

				req.session.userId = doc.uuid
				res.redirect('/')
			})
		});
	})
})

app.post('/log-in', function (req, res){
	if(!req.body.username || !req.body.password){
		req.flash('log-in-error', 'To log in you need a username and a password')
		return res.redirect('/log-in')
	}

	User.findOne({username: req.body.username}, function(err, doc){
		if(err){
			return res.send(500, 'Internal Server Error')
		}

		if(!doc){
			req.flash('log-in-error', 'Invalid user')
			return res.redirect('/log-in')
		}

		bcrypt.compare(req.body.password, doc.password, function(err, result){
			if(err){
				return res.send(500, 'Internal Server Error')
			}

			req.session.userId = doc.uuid
			res.redirect('/main')
		})
	})
})

app.get('/main',function(req,res){


	if(!res.locals.user)
	{
		res.redirect('/')
	}
	else{

		Cities.find({},function(err,docs){
			res.render('main',{
				title: titlepp,
				data: docs 
			})
		})
	}
})



app.get('/add-listing',function(req,res){

	if(!res.locals.user)
	{
		res.redirect('/')
	}
	else{

		Cities.find({},function(err,cities){
			res.render('add-listing',{
						title: titlepp,
						cities:cities
			})
		})
	}
})
	

app.get('/city/:name',function(req,res){

if(!res.locals.user)
	{
		res.redirect('/')
	}
	else{

		Cities.findOne({name: req.params.name},function(err,ciudad){
			if(err){
					return res.send(500, 'Internal Server Error')
				}
			if(!ciudad){
					return res.send(404, 'Not found')
			}

			ToDo.find({city: ciudad.uuid}, function (err, doc) {
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
	}
})

app.get('/city/:name/:uuid',function(req,res){

if(!res.locals.user)
	{
		res.redirect('/')
	}
	else{

	
		ToDo.findOne({uuid:req.params.uuid }, function (err, doc) {
			if(err){
				return res.send(500, 'Internal Server Error')
			}

			if(!doc){
				return res.send(404, 'Not found')
			}

			User.findOne({uuid: doc.createdBy}, function(err,user){
					if(err){
					return res.send(500, 'Internal Server Error')
				}

				if(!user){
					return res.send(404, 'Not found')
				}

				res.render('view-listing', {
					city: req.params.name,
					titleadd : doc.title,
					title: titlepp,
					user: user,
					data:doc
				})
			})		
		})
	}

})

app.post('/:uuid/update',function(req,res){
	if(!res.locals.user)
	{
		res.redirect('/')
	}
	else{

		ToDo.findOne({uuid: req.params.uuid}, function (err, doc) {
			if(err){
				return res.send(500, 'Internal Server Error')
			}

			if(!doc){
				return res.send(404, 'Not found')
			}

			doc.description = req.body.description
			doc.modifiedOn = new Date()


			doc.save(function (err) {
				if(err){
					return res.send(500, 'Internal Server Error')
				}

				res.redirect('/main')
			})		
		})
	}

})

app.post('/:uuid/remove',function(req,res){
	if(!res.locals.user)
	{
		res.redirect('/')
	}
	else{


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

}
})

app.post('/add-to-do',function(req,res){

	if(!res.locals.user)
	{
		res.redirect('/')
	}
	else
	{

		ToDo.create({

		title: req.body.title,
		description: req.body.description,
		address: req.body.address,
		city: req.body.city,
		createdBy: res.locals.user.uuid,
		createdOn: new Date(),
		modifiedOn: new Date()
		
		},function(err,doc){
			if(err)
			{
				return res.send(500,'Internal Server Error');
			}
			res.redirect('/main')
		})
	}

})

app.get('/users/:uuid',function(req,res){

	if(!res.locals.user)
	{
		res.redirect('/')
	}
	else
	{

		User.findOne({uuid:req.params.uuid}, function(err,user){

			if(err)
			{
				return res.send(500,'Internal Server Error')
			}

			if(!user){
			return res.send(404, 'Not found')

			}


			ToDo.findOne({createdBy: user.uuid},function(erro,list){
				
				if(erro)
				{
					return res.send(500,'Internal Server Error')
				}

				if(!list){
					return res.send(404, 'Not found')
				}

				Cities.findOne({uuid: list.city},function(error,ciudad){
					if(error){
						return res.send(500, 'Internal Server Error')
					}

					if(!ciudad){
						return res.send(404, 'Not found')
					}


					res.render('view-user', {
					city: ciudad.name,
					title: titlepp,
					user: user,
					list: list
						
					})
				})		
			})
		})
	}
})

app.get('/add-city',function(req,res){
	if(!res.locals.user)
	{
		res.redirect('/')
	}
	else
	{
		res.render('add-city')
	}
})

app.post('/add-city',function(req,res){
	if(!res.locals.user)
	{
		res.redirect('/')
	}
	else
	{

		Cities.create({

		name: req.body.name,
		createdBy: res.locals.user.uuid,
		createdOn: new Date(),
		
		},function(err,doc){
			if(err)
			{
				return res.send(500,'Internal Server Error');
			}
			res.redirect('/main')
		})
	}

})



// Termina la declaracion de url handlers
app.listen(3000, function () {

// eliminar Datos
// User.collection.remove();
// ToDo.collection.remove();
// Cities.collection.remove();

	console.log('Example app listening on port 3000! ' + new Date())
})