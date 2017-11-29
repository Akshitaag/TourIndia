var express=require("express");
var app=express();
var bodyParser=require('body-parser');
var mongoose=require("mongoose");
var seedDB=require("./seeds.js");
var Campground=require("./models/campground");
var Comment=require("./models/comments.js");
var User=require("./models/user.js");
var passport=require("passport");
var methodOverride= require("method-override");
var LocalStrategy=require("passport-local");
var campgroundRoute=require("./routes/campgrounds.js");
var commentRoute=require("./routes/comments.js");
var indexRoute=require("./routes/index.js");
var flash=require("connect-flash");
//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://user:password@ds125016.mlab.com:25016/adventuretour");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//seedDB();
//mongodb://user:password@ds125016.mlab.com:25016/adventuretour
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "First project",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.errmessage= req.flash("error");
   res.locals.sucmessage= req.flash("success");
   next();
});

app.use( campgroundRoute);
app.use( commentRoute);
app.use(indexRoute);

app.listen(3000, 'localhost',function(){
  console.log("server on duty, mallady");
});