const express = require("express");
const router = express.Router();

// <!--Cloudinary--> 
const fileUploader = require('../config/cloudinary.config');

const mongoose = require("mongoose");

// Require models
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn")
// const isAdmin = require("../middleware/isLoggedIn")

// Get list of users
// router.get("/users", isLoggedIn, isAdmin, (req, res, next) => {
//     User.find()
//     .then(user => {
//         res.render("user/user-list", { user })
//     })
//     .catch(err => {
//         console.log(err)
//     })
// })


// Get user details
router.get("/me", isLoggedIn, (req, res, next) => {
    const loggedInUser = req.session.currentUser
    res.render("user/user-profile", { user: loggedInUser })
})

// Edit user info
router.get("/me/edit", isLoggedIn, (req, res, next) => {
    const loggedInUser = req.session.currentUser
    res.render("user/edit-user", { user: loggedInUser })
})

router.post("/me/edit", isLoggedIn, (req, res, next) => {
    const id = req.session.currentUser._id
    const { name, lastName, profilePic, phone, dob, addressStreet, addressCity, addressState, addressZip, emergencyContactName, emergencyContactPhone } = req.body

    const user = {
        name,
        lastName,
        profilePic,
        phone,
        dob,
        address: {
            street: addressStreet,
            city: addressCity,
            state: addressState,
            zip: addressZip
        },
        emergencyContact: {
            name: emergencyContactName,
            phone: emergencyContactPhone
        } 
    }

    User.findByIdAndUpdate(id, user)
    .then(createdUser => {
        req.session.currentUser = createdUser;
          // Remove the password field
          delete req.session.currentUser.password;
        res.redirect("/me")
    })
    .catch(err => {
        console.log(err)
    })
})





module.exports = router;