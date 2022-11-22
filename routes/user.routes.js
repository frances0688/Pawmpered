const express = require("express");
const router = express.Router();

// <!--Cloudinary-->
// const User = require('../models/User.model');
 
// const fileUploader = require('../config/cloudinary.config');

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
    const { name, lastName, phone, birthdate } = req.body

    const user = {
        name,
        lastName,
        phone,
        birthdate 
    }

    User.findByIdAndUpdate(id, user)
    .then(createdUser => {
        res.redirect(`/me`)
    })
    .catch(err => {
        console.log(err)
    })
})





module.exports = router;