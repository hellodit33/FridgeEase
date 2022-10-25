//const { check, validationResult } = require("express-validator");

const router = require("express").Router();
const fridgeController = require("../controllers/fridge.controller");

/*
const validate = [
  check("title")
    .isLength({ min: 3, max: 25 })
    .withMessage("Title should be between 3 to 25 characters"),
  check("category")
    .isLength({ min: 3, max: 25 })
    .withMessage("Category should be between 3 to 25 characters"),
  check("quantity")
    .isLength({ min: 1, max: 50 })
    .withMessage("Quantity should be between 3 to 25 characters"),
  check("carbon")
    .isLength({ min: 1, max: 50 })
    .withMessage("Carbon footprint should be between 3 to 25 characters"),
  check("carbon")
    .isNumeric()
    .withMessage("the carbon footprint should be a number"),
  check("expiration")
    .isLength({ min: 1, max: 50 })
    .withMessage("Expiration should be between 3 to 25 characters"),
];*/

router.get("/", fridgeController.readFood);

/*router.post("/", validate, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }
  const fridge = new Fridge({
    title: req.body.title,
    carbon: req.body.carbon,
    quantity: req.body.quantity,
    expiration: req.body.expiration,
    category: req.body.category,
  });

  fridge
    .save()
    .then((result) => {
      res.send({
        message: "Fridge Data Created Successfully",
        data: result,
      });
    })
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  const fridgeId = req.params.id;

  Fridge.findById(fridgeId)
    .then((fridge) => {
      res.send(fridge);
    })
    .catch((err) => console.log(err));
});

router.put("/:id", validate, (req, res) => {
  const fridgeId = req.params.id;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }
  Fridge.findById(fridgeId)
    .then((fridge) => {
      fridge.title = req.body.title;
      fridge.category = req.body.category;
      fridge.carbon = req.body.carbon;
      fridge.expiration = req.body.expiration;
      fridge.quantity = req.body.quantity;

      return fridge.save();
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  const fridgeId = req.params.id;
  Fridge.findByIdAndRemove(fridgeId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});*/

module.exports = router;
