//user controller requiremments
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

/**
 *
 * @desc getAllUsers finds all users
 */

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

/**
 *
 * @returns userInfo for the profile
 */
module.exports.userInfo = (req, res) => {
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, data) => {
    if (!err) res.send(data);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

/**
 *
 * @returns new information about user into db, while onboarding or changing info on profile
 */
module.exports.updateUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, data) => {
        if (!err) return res.send(data);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.addFoodToFridge = (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.foodIdToAdd)
  )
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    //add to the food list
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { usersfood: req.body.foodIdToAdd } },
      { new: true, upsert: true },
      (err, data) => {
        if (!err) res.status(201).json(data);
        else return res.status(400).json(err);
        console.log("hello");
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.removeFoodFromFridge = (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.foodIdToRemove)
  )
    return res.status(400).send("ID unknown: " + req.params.id);
  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { usersfood: req.body.foodIdToRemove } },
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
