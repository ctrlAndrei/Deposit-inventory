// Baza de date produse
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
	category: { type: String, lowercase: true },
    code: { type: Number, required: true, unique: true}
})

//Se adauga schema sub forma de "Colectie" in baza de date
var Product = mongoose.model("products", UserSchema);
//Se exporta modelul de control
module.exports = Product;