var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

// var data = [
// 	{
// 		name: "Dream Car 1",
// 		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNXxMYPiE6F_3-LMTBhWqesDt32TBHl4FCYVVIjnQmTJ_Tz5MT",
// 		description: '"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."'
// 	},
// 	{	name: "Dream Car 2",
// 		image: "http://images.hgmsites.net/med/2017-lamborghini-aventador_100580862_m.jpg",
// 		description: '"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."'
// 	},
// 	{	name: "Dream Car 3",
// 		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8auhWUJnX8ZT7DkaM2z7KisMQpH6eHFWCZJql7SInkbDuALkF",
// 		description: '"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."'
// 	},
// 	{	name: "Dream Car 4",
// 		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgJWbkWqBxW5UTv8q20SRrr0EOoSykYYD0HqTvGZJc4ff2B4Jc",
// 		description: '"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."'
// 	}
// ];



function seedDB() {
	Campground.remove({}, function(err){
		// if (err) {
		// 	console.log("Fail to empty the database...");
		// 	console.log(err);
		// } else {
		// 	console.log("Emptied the database...");
		// 	data.forEach(function(seed){
		// 		Campground.create(seed, function(err, newCampground){
		// 			if (err) {
		// 				console.log("Fail to create new data for seeding...");
		// 				console.log(err);
		// 			} else {
		// 				console.log("Created new data for seeding and creating a new comment...");
		// 				Comment.create({
		// 					text: "What a car!!! But I confirm there was a murder happening in it days ago.",
		// 					author:"Holmes"
		// 				}, function(err, newComment){
		// 					if (err) {
		// 						console.log("Fail to add a comment...");
		// 						console.log(err);
		// 					} else {
		// 						console.log("Added a new comment...");
		// 						newCampground.comments.push(newComment);
		// 						newCampground.save();
		// 					};
		// 				});
		// 			};
		// 		});
		// 	});
		// };
	});
};

module.exports = seedDB;