var express = require('express');
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");




 


// get  comment route : shows a form /////////
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});
////////////  end of  comment routes (form)






//////////////// post comment route : -> 4 things are done  ////////////////

router.post("/" ,middleware.isLoggedIn   ,function(req , res){
     // 1 -> look up a campground by Id   
  Campground.findById(req.params.id , function(err , campground) {
       if (err){
           // if there is an error console.log the error and  redirect 
            console.log(err);  
            res.redirect("/campgrounds");
            
  //         res.redirect("/campgrounds");
 //     at the else statment we ACHIEVE  the remaining 3 things      
            } else {
           //  (  2 -> create a comment  with input from  comment[author] , comment[text]   from     comment/new.ejs )
       Comment.create(req.body.Comment, function( err , comment){
        if(err){
            console.log(err);
        } else {
            
// (this where associate the comment just created with the campground found by unique id ) read page 18 0f jotted paper to comprehend d code above and below
   
 //  add username and id to comment
           comment.author.id = req.user._id;
               comment.author.username = req.user.username;  
    //   save comment  
             comment.save();
            
            campground.comments.push(comment);
            campground.save();
   req.flash("success" , "Successfully added comment");        
            res.redirect('/campgrounds/' + campground._id ); 
        }
     });   
    }
});
});



// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back"); 
      } else {
          res.redirect("/campgrounds/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
 req.flash("Success" ,"Comment Deleted");          
res.redirect("/campgrounds/" + req.params.id);
       }
    });
});







module.exports = router;

