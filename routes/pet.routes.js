const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

// Require models
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");

// file uploader - single() pet

const fileUploader = require('../config/cloudinary.config');

router.get("/mypet/add", (req, res, next) => {
    const id = req.session.currentUser._id
    User.findById(id)
    .populate("pets")
    .then(user => {
    res.render("pet/add-pet",{user})
    })
  })
  
  router.post("/mypet/add", fileUploader.single("pet-picture"), (req, res) => {
    
    const { name, profilePicture, typeOfPet, weight, age, gender, breed, microchipped, spayedOrNeutered, houseTrained, friendlyWithDogs, friendlyWithCats, about, pottySchedule, energy, feedingSchedule, canBeAlone, medication, otherCareInfo, vetInfo, additionalVetInfo, photo } = req.body
    const imgName = req.file.originalname
    const imgPath = req.file.path
    const publicId = req.file.filename
  
    Pet.create({ name, profilePicture, typeOfPet, weight, age, gender, breed, microchipped, spayedOrNeutered, houseTrained, friendlyWithDogs, friendlyWithCats, about, pottySchedule, energy, feedingSchedule, canBeAlone, medication, otherCareInfo, vetInfo, additionalVetInfo, photo})
      .then(pet => {
        console.log(pet)
        res.redirect("/me")
      })
      .catch(err => {
        next(err)
      })
  })
  
  router.get("/pet/delete/:id", (req, res, next) => {
    Pet.findByIdAndDelete(req.params.id)
      .then(deletedPet => {
        if (deletedPet.imgPath) {
          // delete the image on cloudinary
          cloudinary.uploader.destroy(deletedPet.publicId)
        }
        res.redirect("/me")
      })
      .catch(err => {
        next(err)
      })
  })




module.exports = router;