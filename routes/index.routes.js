const express = require('express');
const { single } = require('../config/cloudinary.config');
const router = express.Router();

const fileUploader = require("../config/cloudinary.config");


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router