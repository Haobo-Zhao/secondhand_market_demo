var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};


middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground){
			if (err) {
				console.log(err);
				req.flash("error", "Campground not found.");
				res.redirect("back");
			} else {
				if (foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "No permission to do that bro!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to login first to do it.");
		res.redirect("back");
	}
};

middlewareObj.checkCommentOwnership = function(req, res, next){
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if (err) {
				console.log(err);
				res.redirect("back");
			} else {
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "No permission to do that.Sigh.");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You have to login first bro.");
		res.redirect("back");
	}
};

middlewareObj.isLoggedIn = function(req, res, next){
	if (req.isAuthenticated()) {
		next();
	} else {
		req.flash("error", "Please login first.");
		res.redirect("/login");
	};
}


module.exports = middlewareObj;