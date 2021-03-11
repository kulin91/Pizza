const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

const expressSwagger = require("express-swagger-generator")(app);

const uri =
  "mongodb+srv://admin:admin@pizzacluster.qkfyq.mongodb.net/pizzaCluster?retryWrites=true&w=majority";

const Port = 3012;

expressSwagger({
  swaggerDefinition: {
    info: {
      title: "Pizzas server api",
      version: "1.0.0",
    },
    host: `localhost:${Port}`,
    basePath: "/",
    produces: ["application/json"],
    schemes: ["http"],
  },
  basedir: __dirname,
  files: ["./routes.js"],
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

const startApp = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
    app.listen(Port, function () {
      console.log("API app started");
    });
  } catch (e) {
    console.log("Unable to connect to DB", e);
    startApp();
  }
};

startApp();
