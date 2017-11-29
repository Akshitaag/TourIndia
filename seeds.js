var mongoose= require("mongoose");
var Campground=require("./models/campground.js");
var Comment=require("./models/comments.js");
var data=[
     { 
         name:" Camp Room on the Roof – Dehradun",
         image: "http://www.thetopcamp.com/camps-retreats/images/camp-room-on-the-roof-viraatkhai.jpg" ,
        info:"A more than perfect camp for the adventure enthusiasts, the Camp Room on the Roof is situated 25 km from Chakrata, a quaint town near Dehradun. This camp is actually located on the step farms obviously giving it a mind-blowing view. From the campsite, you can enjoy the view of the Virratkhai Valley. Setting up base here, you can head off to pursue activities like mountaineering, mountain biking, or rafting in the pristine Yamuna River. The surrounding view will calm the vistas of your mind."
         
     },
    { 
        name: "Tsomoriri Camp – Ladakh" ,
        image:"http://offbeatescapes.com/wp-content/uploads/2013/07/Tsomoriri-2.jpg",
        info:"Tsomoriri Lake is the highest lake in the world and located in Ladakh. Camping here is the experience of a lifetime. The lake is completely frozen during the winters and is an excitingly unique thing to witness."
        
    },
    {
        name: "Camp Exotica – Kullu" ,
        image:"http://campexotica.com/images/gallery/image_04_b.jpg", 
        info:"The Camp Exotica is a perfect weekend getaway option located in Kullu in the Manali district of Himachal Pradesh. The accommodation provided is world class and the tents simply leave you connecting with nature like never before"
        
    }
    
    ]
function seedDB(){
   Campground.remove({},function(err){
    if(err)
    {
        console.log(err);
    }
    else
    {
       console.log("removed all campgrounds"); 
    }
}); 
    data.forEach(function(campground){
         Campground.create(campground,function(err,camp){
            if(err)
            {
                console.log(err);
            }else
            {
                console.log(camp);
                Comment.create(
                    {
                        text:"wonderful place it is",
                        author:"Dobby"
                    },function(err,comment){
                        if(err)
                        {
                            console.log(err);
                        }else
                        {
                            camp.comments.push(comment);
                            camp.save();
                            console.log("comment created");
                        }
                    });
            }
         });
        
    });
   
}
module.exports= seedDB;
