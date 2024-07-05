const mongoose = require('mongoose')
require('dotenv').config();
async function connection(){
	try{
		await mongoose.connect(process.env.URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected2')
	}
	catch(err){
		console.log(err)
	}
}
connection()
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
	userid:String,
    username: String,
	description: {type: String, required: true},
	duration: {type: Number, required: true},
	date: Date
})

let Exercise = mongoose.model("Exercise", exerciseSchema)

module.exports = Exercise