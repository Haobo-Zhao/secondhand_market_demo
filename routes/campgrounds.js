var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// auto import index.js inside of the directory, just like express above
var middleware = require("../middleware");

// ================
// CAMPGROUND ROUTE
// ================

// INDEX ROUTE
router.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if (err) {
			console.log("Something was wrong...Sigh");
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		};
	});
});

// NEW ROUTE
// the order of /new and /:id makes the difference between working correctly and not
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

// CREATE ROUTE
router.post("/campgrounds", middleware.isLoggedIn, function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var description = req.body.description;
	var author = {
					id: req.user._id, 
					name: req.user.username
				 };
	var newCampground = {name: name, image: image, price: price, description: description, author: author};

	// campgrounds.push(newCampground);
	Campground.create(newCampground, function(err, newlyCreated){
		if (err) {
			console.log("Sigh...Something went wrong...");
			console.log(err);
		} else { 
			res.redirect("/campgrounds");
		};
	});
});

// SHOW ROUTE
router.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if (err) {
			console.log("Oops, something went wrong...");
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// EDIT ROUTE
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// UPDATE ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
	// If in edit.ejs using name="campground[name]" in each input, then right here just 
	// use campground(which is a object here) as 
	// the newly edit object to pass to 
	var newName = req.body.name;
	var newImage = req.body.image;
	var newPrice = req.body.price;
	var newDescription = req.body.description;
	var newCampground = {name: newName, image: newImage, price: newPrice, description: newDescription};
	Campground.findByIdAndUpdate(req.params.id, newCampground, function(err, newlyEditedCampground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		};
	});
});

// DELETE ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
			// res.redirect("/campgrounds/" + req.params.id);
		} else {
			res.redirect("/campgrounds");
		};
	});
});


module.exports = router;