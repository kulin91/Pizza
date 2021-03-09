const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Pizzas = require('./db');

const app = express();
const uri = "mongodb+srv://admin:admin@pizzacluster.qkfyq.mongodb.net/pizzaCluster?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let pizzas = [
  {
    id: 1,
    name: "Peperoni"
  },
  {
    id: 2,
    name: 'Mushrooms'
  },
  {
    id: 3,
    name: 'Hell'
  },
  {
    id: 4,
    name: "Peperoni"
  },
  {
    id: 5,
    name: 'Mushrooms'
  },
  {
    id: 6,
    name: "Peperoni"
  },
  {
    id: 7,
    name: 'Mushrooms'
  },
  {
    id: 8,
    name: "Peperoni"
  },
  {
    id: 9,
    name: 'Mushrooms'
  },
  {
    id: 10,
    name: "Peperoni"
  },
  {
    id: 11,
    name: 'Mushrooms'
  },
  {
    id: 12,
    name: "Peperoni"
  },
  {
    id: 13,
    name: 'Mushrooms'
  },
  {
    id: 14,
    name: "Peperoni"
  },
  {
    id: 15,
    name: 'Mushrooms'
  },
  {
    id: 16,
    name: "Peperoni"
  },
  {
    id: 17,
    name: 'Mushrooms'
  },
  {
    id: 18,
    name: "Peperoni"
  },
  {
    id: 19,
    name: 'Mushrooms'
  },
  {
    id: 20,
    name: "Peperoni"
  }
]

app.get('/', function (req, res) {
  res.send('Hello API');
})

app.get('/pizzas', async function (req, res) {
  // let page = +req.query.page || 1;
  // let pageSize = +req.query.pageSize || 5;
  // res.send(pizzas.slice(((page - 1) * pageSize), ((page - 1) * pageSize) + pageSize));
  const pizzas = await Pizzas.find({});
  console.log(pizzas);
})

app.get('/pizzas/:id', async function (req, res) {
  console.log(req.params);
  try {
    const pizza = await Pizzas.findById(req.params.id);
    if (!pizza) { res.status(404) };
    res.send(pizza);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

// app.post('/pizzas', function (req, res) {
//   const pizza = new Pizzas({ name: req.body.name, date: new Date() });
//   console.log(1);
//   pizza.save(function (err) {
//     console.log(2);
//     if (err) console.log(err);
//     console.log(4);
//     res.send(pizza);
//   });
//   console.log(3);
// })

app.post('/pizzas', async function (req, res) {
  const pizza = new Pizzas({ name: req.body.name, date: new Date() });
  try {
    await pizza.save();
    res.send(pizza);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.put('/pizzas/:id', async function (req, res) {
  // const pizza = pizzas.find(function (pizza) {
  //   return pizza.id === +req.params.id;
  // });
  // if (!pizza) { return res.sendStatus(404); };
  // pizza.name = req.body.name;
  // res.send(pizza);
  try {
    const pizza = await Pizzas.findById(req.params.id);
    if (!pizza) { res.status(404) };
    pizza.name = req.body.name;
    await pizza.save();
    res.send(pizza);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.delete('/pizzas/:id',async function (req, res) {
  // const doFilter = pizzas.length
  // pizzas = pizzas.filter((pizza) => {
  //   return pizza.id !== +req.params.id;
  // })
  // if (pizzas.length == doFilter) {
  //   return res.sendStatus(404);
  // }
  // res.send(pizzas);
  // try {
  //   const pizza = await Pizzas.findById(req.params.id);
  //   if (!pizza) { res.status(404) };
  //   Pizzas.dropIndex()
  //   pizza.name = req.body.name;
  //   await pizza.save();
  //   res.send(pizza);
  // }
try {
    Pizzas.deleteOne({ "_id": ObjectId(pizza) });
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

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
