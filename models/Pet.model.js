const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const petSchema = new Schema({
    name: String,
    profilePicture: String,
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

const Pet = model("Pet", petSchema);

module.exports = Pet;
