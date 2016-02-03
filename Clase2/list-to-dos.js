var mongoose  = require('mongoose');
var Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost/clase-2')




var toDoSchema = new Schema({

	name: String,
	description: String

})

var ToDo = mongoose.model('Todo',toDoSchema);


ToDo.find({

},function(err,docs){
	if(err){

		console.log('hubo un error',err);
		return;
	}

	console.log('hay ',docs.length, ' to dos' );

	console.log(docs)

	docs.forEach(function(todo){

		console.log('\n => ', todo.name +' '+todo.description);

	})

})

