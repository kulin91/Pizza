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

// router.get("/", function (req, res) {
//   res.send("Hello API");
// });

/**
 * Gel all pizzas
 * @group Pizzas - API Interface for pizzas
 * @route GET /pizzas
 * @param {string} limit.query - limit
 * @param {string} page.query- page number.
 * @returns {Array<Pizza>} 200
 * @returns {Error}  default - Unexpected error
 */
router.get("/pizzas", async function (req, res) {
  // let page = +req.query.page || 1;
  // let pageSize = +req.query.pageSize || 5;
  // res.send(Pizzas.slice(((page - 1) * pageSize), ((page - 1) * pageSize) + pageSize));
  
  // const pageOptions = {
  //   page: parseInt(req.query.page, 10) || 0,
  //   limit: parseInt(req.query.limit, 10) || 10
  // }

  const page =  +req.query.page || 1;
  const limit = +req.query.limit || 10;

  const pizzas = await Pizzas.find()
    .skip(page * limit)
    .limit(limit);
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
  try {
    const pizza = await Pizzas.findById(req.params.id);
    if (!pizza) {
      res.status(404);
    }
    pizza.name = req.body.name;
    await pizza.save();
    res.send(pizza);
  }
  catch (error) {
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
  try {
    const pizza = await Pizzas.findByIdAndDelete(req.params.id);
    if (!pizza) {
      return res.sendStatus(404);
    }
    res.send(pizza);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
