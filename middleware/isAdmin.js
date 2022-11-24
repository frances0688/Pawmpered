module.exports = (req, res, next) => {
    // checks if the user is admin in when trying to access a specific page
    if (req.session.currentUser.role === "admin") {
        next();
    }
    return res.redirect("/user/:id");

  };