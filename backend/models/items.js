const mongoose = require('mongoose');
const CONFIG = require('../config')


//Se face conexiunea la baza de date cu mongoose
mongoose.connect(CONFIG.DB_ADDRESS, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(data => {
		console.log("Connected to DB")
	})
	.catch(err => {
		console.log(err);
	})
//Se extrage contructorul de schema
var Schema = mongoose.Schema;

//Se creeaza schema utilizatorului cu toate constrangerile necesare
var UserSchema = new Schema({
	name: { type: String,  required: true, unique: true },
	amount: { type: Number, required: true },
	category: { type: String, lowercase: true }
})

//Se adauga schema sub forma de "Colectie" in baza de date
var Item = mongoose.model("items", UserSchema);
//Se exporta modelul de control
module.exports = Item;