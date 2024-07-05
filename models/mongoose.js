const mongoose = require('mongoose')
require('dotenv').config();
async function connection(){
	try{
		await mongoose.connect(process.env.URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected1')
	}
	catch(err){
		console.log(err)
	}
}
connection()
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true}
})

let User = mongoose.model("User", userSchema);

module.exports = User