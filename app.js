 var express =  require('express'),
         app = express(),
  bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash       = require("connect-flash"),
     passport = require("passport"),
      LocalStrategy = require("passport-local"),
     methodOverride = require('method-override'),
     Comment = require('./models/comment'),
 Campground = require('./models/campground'),
     User   = require('./models/user'),
     seedDB = require('./seeds')
          
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes   =  require("./routes/index")



//mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
//mongodb://yelpcampbiola:customer24@ds131697.mlab.com:31697/yelpcampbiola
mongoose.connect("mongodb://yelpcampbiola:customer24@ds131697.mlab.com:31697/yelpcampbiola");

app.use(bodyParser.urlencoded({extended: true}));
// make usage of app.css file in public folder possibe
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine"   , "ejs");
app.use(flash());
// seedDB(); 

///////  PASSPORT CONFIG ////////
app.use(require("express-session")({
    secret: 'customer24',
    resave:  false,
    saveUninitialized : false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req , res  , next ){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});



app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes)



//  start the  server


app.listen( 5000 , function () {
console.log("YELP CAMP  SERVER  HAS STARTED at port 5000");
});