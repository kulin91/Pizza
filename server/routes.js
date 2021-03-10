const router = require("express").Router();
const Pizzas = require("./db");

/**
 * @typedef Pizza
 * @property {string} _id
 * @property {string} name - Pizza name
 * @property {string} date - Date in ISO 8601 format
 * @property {number} __v
 */

/**
 * @typedef CreateOrUpdatePizzaContract
 * @property {string} name.required - Pizza name
 */

router.get("/", function (req, res) {
  res.send("Hello API");
});

/**
 * Gel all pizzas
 * @group Pizzas - API Interface for pizzas
 * @route GET /pizzas
 * @returns {Array<Pizza>} 200
 * @returns {Error}  default - Unexpected error
 */
router.get("/pizzas", async function (req, res) {
  const pizzas = await Pizzas.find({});
  res.send(pizzas);
});

/**
 * Get pizza by id
 * @group Pizzas - API Interface for pizzas
 * @route GET /pizzas/{id}
 * @param {string} id.path.required
 * @property {string} id
 * @returns {Pizza} 200
 * @returns {Error}  default - Unexpected error
 */
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

/**
 * Create pizza
 * @group Pizzas - API Interface for pizzas
 * @route POST /pizzas
 * @param {CreateOrUpdatePizzaContract.model} pizza.body.required - The new pizza
 * @returns {Pizza} 200 - Pizza
 * @returns {Error}  default - Unexpected error
 */
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

/**
 * Update pizza by id
 * @group Pizzas - API Interface for pizzas
 * @route PUT /pizzas/{id}
 * @param {string} id.path.required
 * @param {CreateOrUpdatePizzaContract.model} pizza.body.required - The new pizza
 * @property {string} id
 * @returns {Pizza} 200 - Pizza
 * @returns {Error}  default - Unexpected error
 */
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

/**
 * Delete pizza by id
 * @group Pizzas - API Interface for pizzas
 * @route DELETE /pizzas/{id}
 * @param {string} id.path.required
 * @property {string} id
 * @returns {void} 200
 * @returns {Error}  default - Unexpected error
 */
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
