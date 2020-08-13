const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    salt: String,
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (plainPassword) {
  this._password = plainPassword;
  this.salt = uuidv4();
  this.hashedPassword = this.securePassword(plainPassword);
});

userSchema.methods = {
  checkAdmin() {
    return this.isAdmin;
  },
  authenticate(password) {
    return this.securePassword(password) === this.hashedPassword;
  },
  securePassword(plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto
        .createHash("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = mongoose.model("User", userSchema);
