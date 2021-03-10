const router = require("express").Router();
const Pizzas = require('./db');

router.get("/", function (req, res) {
  res.send("Hello API");
});

router.get("/pizzas", async function (req, res) {
  const pizzas = await Pizzas.find({});
  res.send(pizzas);
});

router.get("/pizzas/:id", async function (req, res) {
  console.log(req.params);
  try {
    const pizza = await Pizzas.findById(req.params.id);
    if (!pizza) {
      res.status(404);
    }
    res.send(pizza);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

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

router.post("/pizzas", async function (req, res) {
  const pizza = new Pizzas({ name: req.body.name, date: new Date() });
  try {
    await pizza.save();
    res.send(pizza);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/pizzas/:id", async function (req, res) {
  // const pizza = pizzas.find(function (pizza) {
  //   return pizza.id === +req.params.id;
  // });
  // if (!pizza) { return res.sendStatus(404); };
  // pizza.name = req.body.name;
  // res.send(pizza);
  try {
    const pizza = await Pizzas.findById(req.params.id);
    if (!pizza) {
      res.status(404);
    }
    pizza.name = req.body.name;
    await pizza.save();
    res.send(pizza);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete("/pizzas/:id", async function (req, res) {
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
    Pizzas.deleteOne({ _id: ObjectId(pizza) });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
