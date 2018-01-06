var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


router.get( "/" , function(req , res){
Campground.find({} , function(err ,  allCampgrounds){
     if (err){
         console.log(err);
     } else{
res.render("campgrounds/index",{ campgrounds : allCampgrounds , currentUser : req.user});
     }
 });

});


router.post("/" , middleware.isLoggedIn , function(req , res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    
    
    
    var newCampground = {name: name , image: image,  description: description ,  author : author}
   // create a new campground and saving to database
    Campground.create(newCampground , function( err , newlyCreated){
        if(err){
            console.log(err);
        } else{// redirect back to campgrounds
            res.redirect("/campgrounds");
        }
    });
     });
    
    





    
      
// NEW ROUTE  
router.get("/new" , middleware.isLoggedIn , function(req ,res){
    res.render("campgrounds/new");
});
    
    
    
    // when u click on the button go to the database and fetch for a unique campground information(comments , image , description) saved in the db with the help of the mongodb Id

router.get("/:id" , function(req , res ){
Campground.findById(req.params.id).populate("comments").exec(function(err , foundCampground){
        if (err){
            console.log(err);
          
        } else {
            console.log(foundCampground);
 res.render("campgrounds/show" , {campground : foundCampground});     
        }
    });
 });
    

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else { 
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});








module.exports = router ;
    
    