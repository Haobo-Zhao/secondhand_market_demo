var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var methodOverride = require("method-override");
var flash = require("connect-flash");

// from AuthDemo
var passport = require("passport"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	User = require("./models/user");

// ======================
// passport configuration
// ======================
app.use(require("express-session")({
	secret: "Limits, fears etc., are nothing but illusions",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// other configuration
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// local MongoDB
// mongoose.connect("mongodb://localhost/yelp_camp");
// MongoLab url
// mongodb://haobo:password@ds135912.mlab.com:35912/boston_secondhand_store
// mongoose.connect("mongodb://haobo:password@ds135912.mlab.com:35912/boston_secondhand_store");
var database_url = process.env.BOSTON_SECONDHAND_DATABASE_URL;
mongoose.connect(database_url);

// Seed the initial data
// seedDB();

// This middleware makes currentUser available on every single page
// saving the need to add currentUser manually to every page
app.use(function(req, res, next){
	res.locals.currentUser = req.user;

	// Makes the message in the header.ejs available
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


// ====================
// using express router
// ====================
var indexRoutes = require("./routes/index");
var campgroundsRoutes = require("./routes/campgrounds");
var commentsRoutes = require("./routes/comments");
// There routes MUST be after all the configuration,
// just like when all the complete routes and logic are here.
app.use(indexRoutes);
app.use(commentsRoutes);
app.use(campgroundsRoutes);
// To further shortern the code can do this
// but need to do some change at the top ./routes/comments.ejs
// i.e., change 
// app.use("/", indexRoutes);
// app.use("/campgrounds", campgroundsRoutes);
// app.use("/campgrounds/:id/comment", commentsRoutes);

// 404 error
app.get("*", function(req, res){
	res.render("page404");
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Server is running...");
});


// mongoose schema
// var campgroundSchema = mongoose.Schema({
// 	name: String,
// 	image: String,
// 	description: String
// });

// var Campground = mongoose.model("Campground", campgroundSchema);

// cleaner mode

// Campground.create(
// 	{
// 		name: "lambo3", 
// 		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmNHYBJaZ8A26nyGJXwKNREgigl5FcB5eAhrgn33e8Li934dXT"
// 	}, function(err, campground) {
// 		if (err) {
// 			console.log("Something in the database is not working correctly");
// 		} else {
// 			console.log("Campground saved!!!");
// 			console.log(campground);
// 		};
// 	}
// );

// var campgrounds = [
// 	{name: "lambo1", image: "data:image/jpeg;base64,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"},
// 	{name: "lambo2", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvD1HdP8f-l4pddk251qE6GLmgMWorYSN-pydEuqWoqgo42D4l0Q"},
// 	{name: "lambo3", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmNHYBJaZ8A26nyGJXwKNREgigl5FcB5eAhrgn33e8Li934dXT"},
// ];