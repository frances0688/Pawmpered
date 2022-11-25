const express = require("express");
const router = express.Router();

// <!--Cloudinary-->
const fileUploader = require("../config/cloudinary");

const mongoose = require("mongoose");

// Require models
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes

// const isLoggedIn = require("../middleware/isLoggedIn")
const isAdmin = require("../middleware/isAdmin")

// Get list of users
router.get("/user/:id/dashboard", isAdmin, (req, res, next) => {
    const id = req.params._id;
    const users = User.find().populate("pets");
    const pets = Pet.find();

    res.render("user/user-list", users)
    
})

// Delete user
router.get('/user/:id/delete', isAdmin, (req, res, next) => {

	const userId = req.params.id
	const query = { _id: userId }

	if (req.session.currentUser.role === 'admin') {
		query.owner = req.session.currentUser._id
	}
	console.log(query)
	User.findOneAndDelete(query)
		.then(() => {
			res.redirect(`/user/${userId}/dashboard`)
		})
		.catch(err => {
			next(err)
		})
});

// Get user details
router.get("/user/:id",(req, res, next) => {
    const id = req.params.id

  User.findById(id)
    .populate("pets")
    .then((user) => {
      res.render("user/user-profile", { user });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Edit user info

router.get("/user/:id/edit", (req, res, next) => {
    const id = req.params.id


  User.findById(id)
    .populate("pets")
    .then((user) => {
      console.log(user);
      res.render("user/edit-user", { user });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.post("/user/:id/edit", (req, res, next) => {
    const id = req.params.id
    const { name, lastName, imgPath, phone, dob, addressStreet, addressCity, addressState, addressZip, emergencyContactName, emergencyContactPhone } = req.body
    console.log("req.body:", req.body)
    const user = {
        name,
        lastName,
        imgPath,
        phone,
        dob,
        addressStreet,
        addressCity,
        addressState,
        addressZip,    
        emergencyContactName,
        emergencyContactPhone
        } 
        console.log("user:", user)
    User.findByIdAndUpdate(id, user, {new:true})
    .then(createdUser => {
        console.log("createdUser:", createdUser)
        res.redirect(`/user/${id}`)
    })
    .catch(err => {
        console.log(err)

    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
