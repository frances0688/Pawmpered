const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

// Require models
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");

// file uploader - single() pet

const { uploader, cloudinary } = require("../config/cloudinary");

router.get("/user/:id/mypet/add", (req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .populate("pets")
    .then((user) => {
      res.render("pet/add-pet", { user });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post(
  "/user/:id/mypet/add",
  uploader.single("pet-picture"),
  (req, res) => {
    const ownerId = req.session.currentUser.id;

    const imgPath = req.file.path;
    const {
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
      owner: ownerId,
    })
      .then((pet) => {
        console.log(pet);
        res.redirect(`/user/${owner}/mypet/${pet._id}`);
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.get("/user/:id/mypet/:id", (req, res, next) => {
  console.log(req.params.id);
  Pet.findByIdAndDelete(req.params.id)
    .then((deletedPet) => {
      if (deletedPet.imgPath) {
        // delete the image on cloudinary
        cloudinary.uploader.destroy(deletedPet.publicId);
      }
      res.redirect("/me");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
