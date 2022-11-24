const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const petSchema = new Schema({
    name: String,
    imgPath: {
        type:String,
        default:'https://www.petcloud.com.au/img/pet_placeholder.png',
    },
    typeOfPet: {
        type: String,
        enum: ['dog','cat', 'other'],
    },
    weight: Number,    
    ageYears: Number,
    ageMonths: Number,
    gender: {
        type: String,
        enum: ['male','female'],
    }, 
    breed: String,
    microchipped: Boolean,
    spayedOrNeutered: Boolean,
    houseTrained:{
        type: String,
        enum: ['yes', 'no', 'unsure', 'depends'],
    },
    friendlyWithDogs: Boolean,
    friendlyWithCats: Boolean,
    about: String,
    pottySchedule: {
        type: String,
        enum: ['every hour', 'every 2 hours', 'every 4 hours', 'every 8 hours', 'custom'],
    },
    energy: {
        type: String,
        enum: ['high', 'moderate', 'low'],
    },
    feedingSchedule: {
        type: String,
        enum: ['morning', 'twice a day', 'custom'],
    }, 
    canBeAlone: {
        type: String,
        enum: ['less than 1 hour', '1 - 4 hours', '4 - 8 hours', 'custom'],
    }, 
    medication: String,
    otherCareInfo: String,
    vetName: String,
    vetNumber: Number,
    vetStreet: String,
    vetCity: String,
    vetState: String,
    vetZip: Number,
    additionalVetInfo: String,
    photo: [String],
    active: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: String,
        required: true
    }
});

const Pet = model("Pet", petSchema);

module.exports = Pet;
