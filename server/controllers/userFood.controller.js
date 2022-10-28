const UserFoodModel = require("../models/userFood.model");
const ObjectID = require("mongoose").Types.ObjectId;

/*module.exports.readUserFood = (req, res) => {
  UserFoodModel.find((err, data) => {
    if (!err) res.send(data);
    else console.log("error to get data: " + err);
  });
};

module.exports.createUserFood = async (req, res) => {
  const newPost = new UserFoodModel({
    title: req.body.title,
    carbon: req.body.carbon,
    category: req.body.category,
    expiration: req.body.expiration,
    logo: req.body.logo,
    quantity: req.body.quantity,
    id: req.body.id,
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send("new error");
  }
};*/

module.exports.addFoodToUserFridge = (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.foodIdToAd)
  )
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    //add to the follower list
    UserFoodModel.create(
      { $addToSet: { userfood: req.body.foodIdToAdd } },
      { new: true, upsert: true },
      (err, data) => {
        if (!err) res.status(201).json(data);
        else return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
