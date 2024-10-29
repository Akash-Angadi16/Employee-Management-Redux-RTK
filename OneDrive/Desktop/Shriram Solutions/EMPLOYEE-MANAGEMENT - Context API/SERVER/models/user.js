const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  creator: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
  },
});

// Middleware to update the modifiedAt field before saving
userSchema.pre("save", function (next) {
  this.modifiedAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
