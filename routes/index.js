var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// ROOT ROUTE
router.get("/", function(req, res){
	res.redirect("/campgrounds");
});

// ==========
// AUTH ROUTE
// ==========

// SIGN UP ROUTE
router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	var newUserName = new User({username: req.body.username});
	User.register(newUserName, req.body.password, function(err, newUser){
		if (err) {
			console.log(err);
			req.flash("error", err.message);
			// If written as res.render("register");
			// it would take two click of the Sign up button to show an error message.
			res.redirect("/register");
		} else {
			passport.authenticate("local")(req, res, function(){
				req.flash("success", "Succefully sign up!!! Enjoy here my friend" + newUser.username);
				res.redirect("/campgrounds");
			});
		};
	});
});

// LOG IN ROUTE
router.get("/login", function(req, res){
	res.render("login");
});


router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		successFlash: "Welcome to my gallery my dear friend!!!",
		
		failureRedirect: "/login",
		failureFlash: true
	}), function(req, res){
});

// LOG OUT ROUTE
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Succefully logged out!");
	res.redirect("/campgrounds");
});

module.exports = router;