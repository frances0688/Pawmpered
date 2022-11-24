const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user"
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    imgPath: {
      type: String,
      default: "https://camo.githubusercontent.com/c6fe2c13c27fe87ac6581b9fe289d2f071bd1b4ef6f3e3c5fc2aba0bbc23fd88/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f372f37632f50726f66696c655f6176617461725f706c616365686f6c6465725f6c617267652e706e67"
    },
    dob: {
      type: Date,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    addressStreet: String,
    addressCity: String, 
    addressState: String,
    addressZip: Number,
    emergencyContactName: String ,
    emergencyContactPhone: String,
    pets: [{
      type: Schema.Types.ObjectId,
      ref: 'Pet'
    }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
