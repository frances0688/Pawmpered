const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

// Require models
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");

// Get user details
router.get("/:id", (req, res) => {
    const id = req.params.id

    User.findById(id)
    .then(user => {
        res.render("user/profile", { user })
    })
    .catch(err => {
        console.log(err)
    })
})

// Edit user info
router.get("/:id/edit", (req, res) => {
    const id = req.params.id

    User.findById(id)
    .then(user => {
        res.render("user/edit-user", { user })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/:id/edit", (req, res) => {
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
        res.redirect(`/${id}`)
    })
    .catch(err => {
        console.log(err)
    })
})





module.exports = router;