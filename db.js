const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pizzaSchema = new Schema({
  name: String,
  date: Date
});

const Pizzas = mongoose.model('Pizzas', pizzaSchema);
module.exports = Pizzas;