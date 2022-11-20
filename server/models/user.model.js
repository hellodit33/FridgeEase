const mongoose = require("mongoose");
//library to validate emails
const { isEmail } = require("validator");
//const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },

    diet: String,
    allergy: [String],
    foodToRecipe: [String],
    shoppingList: [String],
    shoppingList2: {
      type: [
        {
          foodName: String,
          foodQuantity: String,
        },
      ],
    },
    favoriteRecipe: [String],
    usersfood: {
      type: [
        {
          foodId: Number,
          foodName: String,
          foodCarbon: String,
          foodExpiration: Number,
          foodExpirationDate: String,
          foodCategory: String,
          foodLogo: String,
          foodQuantity: String,
          timestamp: Number,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

//this password crypting function is played before saving into db so that the password gets crypted before getting into db
userSchema.pre("save", async function (next) {
  // const salt = await bcrypt.genSalt();
  // this.password = await bcrypt.hash(this.password, salt);
  next();
});

//checking if user wrote the write info when trying to sign in
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    // const auth = await bcrypt.compare(password, user.password);
    // if (auth) {
    return user;
    //  }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
