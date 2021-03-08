const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:<admin>@cluster0.ellqg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

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

app.get('/pizzas', function (req, res) {
  let page = +req.query.page || 1;
  let pageSize = +req.query.pageSize || 5;
  res.send(pizzas.slice(((page - 1) * pageSize), ((page - 1) * pageSize) + pageSize));
})

app.get('/pizzas/:id', function (req, res) {
  console.log(req.params);
  const pizza = pizzas.find(function (pizza) {
    return pizza.id === +req.params.id;
  });
  if (!pizza) { res.status(404) };
  res.send(pizza);
})

app.post('/pizzas', function (req, res) {
  const pizza = {
    id: pizzas.length + 1,
    name: req.body.name
  };
  pizzas.push(pizza);
  res.send(pizza);
})

app.put('/pizzas/:id', function (req, res) {
  const pizza = pizzas.find(function (pizza) {
    return pizza.id === +req.params.id;
  });
  if (!pizza) { return res.sendStatus(404); };
  pizza.name = req.body.name;
  res.send(pizza);
})

app.get('/pizzas', function (req, res) {
  const pizza = pizzas.find(function (pizza) {
    return pizza.id === +req.params.id;
  })
});

app.delete('/pizzas/:id', function (req, res) {
  const doFilter = pizzas.length
  pizzas = pizzas.filter((pizza) => {
    return pizza.id !== +req.params.id;
  })
  if (pizzas.length == doFilter) {
    return res.sendStatus(404);
  }
  res.send(pizzas);
})

client.connect(err => {
  app.listen(3012, function () {
  console.log('API app started');
  })
});


