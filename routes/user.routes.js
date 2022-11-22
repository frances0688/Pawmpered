const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

// Require models
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn")
const isAdmin = require("../middleware/isLoggedIn")

// Get list of users
router.get("/user", isLoggedIn, isAdmin, (req, res, next) => {
    User.find()
    .then(user => {
        res.render("user/user-list", { user })
    })
    .catch(err => {
        console.log(err)
    })
})


// Get user details
router.get("/user/:id", isLoggedIn, (req, res, next) => {
    const loggedInUserId = req.session.currentUser._id
    console.log(loggedInUserId)
    // const id = req.params._id
    User.findById(loggedInUserId)
    .then(user => {
        res.render("user/user-profile", { user })
    })
    .catch(err => {
        console.log(err)
    })
})

// Edit user info
router.get("/user/:id/edit", isLoggedIn, (req, res, next) => {
    const id = req.params.id

    User.findById(id)
    .then(user => {
        res.render("user/edit-user", { user })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/user/:id/edit", isLoggedIn, (req, res, next) => {
    const id = req.params.id
    const { name, lastName, phone, birthdate } = req.body

    const user = {
        email,
        name,
        lastName,
        phone,
        birthdate 
    }

    User.findByIdAndUpdate(id, user)
    .then(createdUser => {
        res.redirect(`/user/${id}`)
    })
    .catch(err => {
        console.log(err)
    })
})





module.exports = router;