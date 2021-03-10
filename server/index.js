const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const uri = "mongodb+srv://admin:admin@pizzacluster.qkfyq.mongodb.net/pizzaCluster?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);


const startApp = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected!');
    app.listen(3012, function () {
      console.log('API app started');
    });
  } catch (e) {
    console.log('Unable to connect to DB', e);
    startApp();
  }
}

startApp();
