const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

// Require models
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");

// file uploader - single() pet

const { uploader, cloudinary } = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

router.get("/user/:id/mypet/add", (req, res, next) => {
  const id = req.params.id
  console.log("ID:",id)
  User.findById(id)
    .then((user) => {
      console.log("USER: ", user)
      res.render("pet/add-pet", { user });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/user/:id/mypet/add", uploader.single("pet-picture"), (req, res, next) => {
    const ownerId = req.params.id;
    const imgPath = req.file.path;
   
    const pet = {
      name,
      typeOfPet,
      weight,
      ageYears,
      ageMonths,
      gender,
      breed,
      microchipped,
      spayedOrNeutered,
      houseTrained,
      friendlyWithDogs,
      friendlyWithCats,
      about,
      pottySchedule,
      energy,
      feedingSchedule,
      canBeAlone,
      medication,
      otherCareInfo,
      vetName,
      vetNumber,
      vetStreet,
      vetCity,
      vetState,
      vetZip,
      additionalVetInfo,
      photo,
      owner,
    } = req.body;
    console.log('pet:', pet);

    Pet.create({
      name,
      imgPath,
      typeOfPet,
      weight,
      ageYears,
      ageMonths,
      gender,
      breed,
      microchipped,
      spayedOrNeutered,
      houseTrained,
      friendlyWithDogs,
      friendlyWithCats,
      about,
      pottySchedule,
      energy,
      feedingSchedule,
      canBeAlone,
      medication,
      otherCareInfo,
      vetName,
      vetNumber,
      vetStreet,
      vetCity,
      vetState,
      vetZip,
      additionalVetInfo,
      photo,
      owner,
    })
      .then((pet) => {
        console.log(pet);
       
        User.findByIdAndUpdate(ownerId, { $push: { pets: pet._id}})
        .then((user) => {
          console.log("this is user", user)
          res.redirect(`/user/${ownerId}/mypet/${pet._id}`);
        })
        .catch((err) => {
          console.log(err);
          next(err);
        });
        

      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
);


router.get("/user/:id/mypet/:petId", (req, res, next) => {
  const id = req.params.id;
  const petId = req.params.petId
  console.log(req.params.id);


  Pet.findById(petId)
    .then((pet) => {
      res.render("pet/pet-profile",  { id, pet });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/user/:id/mypet/delete", (req, res, next) => {
  id = req.params.id
  
  Pet.findByIdAndDelete(req.params.id)
    .then((deletedPet) => {
      if (deletedPet.imgPath) {
        // delete the image on cloudinary
        cloudinary.uploader.destroy(deletedPet.publicId);
      }
      res.redirect("/user/${id}");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
