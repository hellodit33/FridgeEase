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

module.exports.userFood = (req, res) => {
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, data) => {
    if (!err) res.send(data.usersfood);
    else console.log("ID unknown : " + err);
  });
};

module.exports.getFoodToRecipe = (req, res) => {
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, data) => {
    if (!err) res.send(data.foodToRecipe);
    else console.log("ID unknown : " + err);
  });
};

/**
 *
 * @returns new information about user into db, while onboarding or changing info on profile
 */
module.exports.updateUserAllergy = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          allergy: req.body.allergy,
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

module.exports.updateUserDiet = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          diet: req.body.diet,
        },
      },
      { new: true, upsert: true },
      (err, data) => {
        if (!err) return res.send(data);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.addFoodToRecipe = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    //add to the food list
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          foodToRecipe: [req.body.foodName],
        },
      },
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

module.exports.addFoodToFridge = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    //add to the food list
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          usersfood: {
            foodId: req.body.foodId,
            foodName: req.body.foodName,
            foodCarbon: req.body.foodCarbon,
            foodExpiration: req.body.foodExpiration,
            foodCategory: req.body.foodCategory,
            foodLogo: req.body.foodLogo,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, data) => {
        if (!err) res.status(201).json(data);
        else return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.addShoppingToFridge = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    //add to the food list
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          usersfood: {
            foodName: req.body.foodName,
            foodCarbon: req.body.foodCarbon,
            foodExpiration: req.body.foodExpiration,
            foodCategory: req.body.foodCategory,
            foodLogo: req.body.foodLogo,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, data) => {
        if (!err) res.status(201).json(data);
        else return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.removeShoppingList = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);
  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: { shoppingList: [] } },

      (err, data) => {
        if (!err) res.status(201).json(data);
        else return res.status(400).json(err);
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

      (err, data) => {
        if (!err) res.status(201).json(data);
        else return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.editUserFoodExpiration = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return UserModel.findById(req.params.id, (err, data) => {
      const theFood = data.usersfood.find((food) =>
        food._id.equals(req.body.foodId)
      );

      if (!theFood) return res.status(404).send("Food not found");
      theFood.foodExpirationDate = req.body.foodExpirationDate;

      return data.save((err) => {
        if (!err) return res.status(200).send(data);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editUserFoodQuantity = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return UserModel.findById(req.params.id, (err, data) => {
      const theFood = data.usersfood.find((food) =>
        food._id.equals(req.body.foodId)
      );

      if (!theFood) return res.status(404).send("Food not found");

      theFood.foodQuantity = req.body.foodQuantity;

      return data.save((err) => {
        if (!err) return res.status(200).send(data);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.deleteFoodFromFridge = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          usersfood: {
            _id: req.body.foodId,
          },
        },
      },
      { new: true },
      (err, data) => {
        if (!err) return res.send(data);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteShoppingItem = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          shoppingList: {
            _id: req.body.foodId,
          },
        },
      },
      { new: true },
      (err, data) => {
        if (!err) return res.send(data);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteRecipeFoodFilter = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          foodToRecipe: req.body.foodName,
        },
      },
      { new: true },
      (err, data) => {
        if (!err) return res.send(data);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.addFoodToShoppingList = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    //add to the food list
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        /* $pull: { shoppingList },*/
        $addToSet: {
          shoppingList: {
            foodName: req.body.foodName,
            foodQuantity: req.body.foodQuantity,
          },
        },
      },
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

module.exports.addFavoriteRecipe = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    //add to the food list
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          favoriteRecipe: [req.body.recipeId],
        },
      },
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

module.exports.removeFavoriteRecipe = (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.recipeIdToRemove)
  )
    return res.status(400).send("ID unknown: " + req.params.id);
  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { favoriteRecipe: req.body.recipeIdToRemove } },

      (err, data) => {
        if (!err) res.status(201).json(data);
        else return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.editShoppingQuantity = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return UserModel.findById(req.params.id, (err, data) => {
      const theShoppingItem = data.shoppingList.find((food) =>
        food._id.equals(req.body.foodId)
      );

      if (!theShoppingItem) return res.status(404).send("Food not found");

      theShoppingItem.foodQuantity = req.body.foodQuantity;

      return data.save((err) => {
        if (!err) return res.status(200).send(data);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editShoppingBio = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return UserModel.findById(req.params.id, (err, data) => {
      const theShoppingItem = data.shoppingList.find((food) =>
        food._id.equals(req.body.foodId)
      );

      if (!theShoppingItem) return res.status(404).send("Food not found");

      theShoppingItem.foodBioQuality = req.body.foodBioQuality;

      return data.save((err) => {
        if (!err) return res.status(200).send(data);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
