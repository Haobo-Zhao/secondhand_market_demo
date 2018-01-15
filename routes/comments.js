var express = require("express");
var middleware = require("../middleware");


// If do the change in app.js from app.use(commentRoutes)
//  							to app.use("/campgrounds/:id/comment", commentsRoutes); 
// do the change on the following line
// var router = express.Router({mergeParams: true});
var router = express.Router();


var Campground = require("../models/campground");
var Comment = require("../models/comment");

// =============
// COMMENT ROUTE
// =============

// NEW ROUTE
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log("Fail to load the form to add a comment");
			console.log(err)
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

// CREATE ROUTE
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log("Fail to add a new comment to " + req.params.id);
			console.log(err);
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if (err) {
					console.log(err);
				} else {
					// Before push the comment (with only text in it),
					// add the id and name of the user that made the comment
					comment.author.id = req.user._id;
					comment.author.name = req.user.username;
					comment.save();
					
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + req.params.id);
				}
			});
		}
	});
});

// EDIT ROUTE
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
});

// UPDATE ROUTE
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, newlyEditedComment){
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY ROUTE
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
})


module.exports = router;