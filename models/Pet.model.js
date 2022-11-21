const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const PetSchema = new Schema({
    name: String,
    profilePicture: Image,
    typeOfPet: {
        cat: String,
        dog: String,
    },
    weight: Number,    
    age: Number,
    birthdate: Date,
    gender: String,
    breed: String,
});

const User = model("Pet", userSchema);

module.exports = Pet;
