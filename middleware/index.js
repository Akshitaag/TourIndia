var Campground=require("../models/campground.js");
var Comment=require("../models/comments.js");
var middlewareobj={};
middlewareobj.isLoggedIn= function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Login First!!");
    res.redirect("/login");
};
middlewareobj.checkCommentOwn =function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,found){
       if(err)
       {
            req.flash("error","Tourist site not found!!");
           res.redirect("/campgrounds");
       }else
       {
            if(found.author.id.equals(req.user._id))
            {
                  return next();
            }else
            {
                 req.flash("error","You are not allowed to do that!!");
                res.redirect("back");
            }
       }
    });
        
    }else
    {
         req.flash("error","You are not allowed to do that!!");
         res.redirect("back");
    }
};
middlewareobj.isAuthorisedUser = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,found){
       if(err)
       {
           req.flash("error","Tourist site not found!!");
           res.redirect("/campgrounds");
       }else
       {
            if(found.author.id.equals(req.user._id))
            {
                  return next();
            }else
            {
                 req.flash("error","You are not allowed to do that!!");
                res.redirect("back");
            }
       }
    });
        
    }else
    {
         req.flash("error","You are not allowed to do that!!");
         res.redirect("back");
    }
};



module.exports= middlewareobj;
