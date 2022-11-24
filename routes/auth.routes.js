const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const {uploader, cloudinary} = require('../config/cloudinary');


// GET /auth/signup
router.get("/auth/signup", isLoggedOut, (req, res, next) => {
  res.render("auth/signup");
});

// POST /auth/signup
router.post("/auth/signup", isLoggedOut, (req, res, next) => {
  const { 
    email, 
    password, 
    name, 
    lastName, 
    phone, 
    dob,
    imgPath,
    addressStreet,
    addressCity,
    addressState,
    addressZip,    
    emergencyContactName,
    emergencyContactPhone 
  } = req.body;

    // Check that all fields are provided
    if (email === "" || password === "" || name === "" || lastName === "" || phone === "" || dob === "") {
      res.status(400).render("auth/signup", {
        errorMessage:
          "All fields are mandatory. Please provide required information.",
      });

      return;
    }

    if (password.length < 8) {
      res.status(400).render("auth/signup", {
        errorMessage: "Your password needs to be at least 8 characters long.",
      });

      return;
    }

  // Create a new user - start by checking if they already have an account and, if not, hash the password
  User.findOne({ email })
      .then(userFromDB => {
      // if there is a user
        if (userFromDB !== null) {
          res.render("auth/signup", { errorMessage: "An account exists with the email provided" })
          return
        } else {
          const salt = bcrypt.genSaltSync(saltRounds)
				  const hash = bcrypt.hashSync(password, salt)
            // Create a user and save it in the database
            User.create({ 
              email: email,
              password: hash,
              name: name,
              lastName: lastName,
              phone: phone,
              dob: dob,
              imgPath,
              addressStreet,
              addressCity,
              addressState,
              addressZip,    
              emergencyContactName,
              emergencyContactPhone
            })
            
            .then((createdUser) => {
              res.redirect("/auth/login");
            })
            .catch((error) => {
              if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render("auth/signup", { errorMessage: error.message });
              } else if (error.code === 11000) {
                res.status(500).render("auth/signup", {
                  errorMessage:
                    "Email needs to be unique. Provide a valid email.",
                });
              } else {
                next(error);
              }
            });
      }
    })
});

// GET /auth/login
router.get("/auth/login", isLoggedOut, (req, res, next) => {
  res.render("auth/login");
});

// POST /auth/login
router.post("/auth/login", isLoggedOut, (req, res, next) => {
  const { email, password } = req.body;
  // Check that email and password are provided
  if ( email === "" || password === "") {
    res.status(400).render("auth/login", {
      errorMessage:
        "All fields are mandatory. Please provide email and password.",
    });

    return;
  }
  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 8) {
    return res.status(400).render("auth/login", {
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  // Search the database for a user with the email submitted in the form
  User.findOne({email})
      .then(userFromDB => {
        // If the user isn't found, send an error message that user provided wrong credentials
        if (userFromDB === null) {
          res
          .status(400)
          .render("auth/login", { errorMessage: "User does not exist." })
          return
        }
        if (bcrypt.compareSync(password, userFromDB.password)) {
          // Add the user object to the session object
          req.session.currentUser = userFromDB;
          // Remove the password field
          delete req.session.currentUser.password;
          res.redirect(`/user/${userFromDB._id}`)
        } else {
          // password is not correct
          res
            .status(400)
            .render("auth/login", { errorMessage: "Wrong credentials." });
            return;
        }
      })
      .catch((err) => next(err));  
    });


// GET /auth/logout
router.get("/auth/logout", isLoggedIn, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).render("auth/logout", { errorMessage: err.message });
      return;
    }

    res.redirect("/");
  });
});

module.exports = router;
