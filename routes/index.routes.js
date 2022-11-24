const express = require('express');
const { single } = require('../config/cloudinary');
const router = express.Router();

const fileUploader = require("../config/cloudinary");


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router