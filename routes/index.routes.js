const express = require('express');
const { single } = require('../config/cloudinary.config');
const router = express.Router();

const fileUploader = require("../config/cloudinary.config");


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// file uploader - single() pet

router.get("/pet/add", (req, res, next) => {
  res.render("pet-add")
})

router.post("/pet", fileUploader.single("pet-picture"), (req, res) => {
  
  const { Name, Typeofpet, Weight, Age, Birthdate, Gender, Breed } = req.body
  const imgName = req.file.originalname
  const imgPath = req.file.path
  const publicId = req.file.filename

  Pet.create({ Name, Typeofpet, Weight, Age, Birthdate, Gender, Breed, imageUrl: req.file.path })
    .then(pet => {
      console.log(pet)
      res.redirect("/")
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
      res.redirect("/")
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router