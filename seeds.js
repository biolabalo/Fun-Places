var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {name: "Olumo Rock", image: 'https://guardian.ng/wp-content/uploads/2017/03/Olumo-Rock.jpg', description: "Any visit to the city of Abeokuta would be incomplete without stopping by at the “fortress of Abeokuta”; Olumo Rock. It is no surprise that this rock is located in Abeokuta, as the name “Abeokuta” itself means “under the rock”. Olumo Rock has long served as a rock of offense and a fortress for the people of Egba Land, since the 19th century.  At Olumo Rock, you would be treated to attractions like natural tunnels, unusual trees, natural cantilevers, gardens on the rock, broken pathways, monuments of the belief system of the rock’s primeval settlers, three escalators at the characteristic height of the rock as well as an aerial and atmospheric view of the antique city of Abeokuta, from the apex of the rock. You don’t want to miss these attractions, do you?"},
    
    
    
    {name: "Obudu Mountain Resorts", image: "http://www.informationng.com/wp-content/uploads/2017/03/obudu_ranch-1.jpg", description: "  Our most recommended vacation destination, Obudu Mountain Resort is a splendid resort getaway.Obudu Cattle Ranch Resort is located close to the Cameroon Border in the Northeastern part of Cross River State. The resort features a cable car which gives guests a scenic view of the surrounding, mountains and offers free WiFi to all guests.The spacious rooms are designed with an adjoining sitting area which is fitted with plush sofas. Obudu Cattle Ranch room rate is affordable. Each room features an air conditioner, an ornate lampshade, wall arts, a TV with satellite reception, a worktable/chair, and an en-suite bathroom."}
   
];



      function seedDB(){
    // remove all campgrounds
     Campground.remove({} , function(err){
       if (err){
            console.log(err);
       }
       console.log("removed campgrounds");
        //add a  few  funplaces 
        data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if (err){
            console.log(err)
            } else {
            console.log("added a campground");
               //  create A comment
                Comment.create(
                    {
                        text:"Nice place to be", 
                      author:"Biola Balogun"
                    }, function(err  ,  comment){
                        if (err){
                    console.log(err);
                        } else{
             campground.comments.push(comment);
                        campground.save();
                  console.log(" Created new comment");   
                
                          }
             });
            }

            });
        });
});
   
}





module.exports = seedDB;


 