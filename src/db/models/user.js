const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Task = require('./task')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required",
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Invalid email.");
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Age must be a positive number.");
    }
  },
  password: {
    type: String,
    required: "Password is required.",
    minLength: [6, "Password must be atleast 6 characters long."],
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password"))
        throw new Error('Password can not be "password".');
    }
  }, 
  tokens: [{
      token: {
          type: String,
          required: true
      }
  }],
  avatar: {
    type: Buffer
  }
}, {
    timestamps: true
});


/*
    I------I N                 1 I------I
    I USER I --------------------I TASK I
    I------I                     I------I
*/

//References the user-task relationship, does not create a new field on the User document, tasks are not stored in the database 
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id', //SQL primary key
  foreignField: 'owner' //SQL foreign key, kind of
})

//Accesable on the instance of a model
userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({token})
    await user.save();
    return token;
}

//Renaming the function toJSON overrides the JSON.stringify method
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject(); 
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
}

//Accesable on the model
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to log in.");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to log in: Incorrect password.");
  }

  return user;
};

//Needs to be a standard function
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete tasks when user is deleted
userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({owner: user._id})
  next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;
