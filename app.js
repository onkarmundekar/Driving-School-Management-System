const express   =   require("express");
const app       =   express();
const passport  =   require("passport");
var  User       =   require("./models/user");
var  Sform      =   require("./models/sform");
var  Fform       =   require("./models/fform");
var mongoose    =   require("mongoose");
var LocalStrategy=  require("passport-local").Strategy;
var bodyParser             =    require("body-parser");
var methodOverride         =    require("method-override");


mongoose.connect("mongodb://localhost/dms",{ useNewUrlParser: true });

mongoose.set('useFindAndModify', false);


// Middleware
app.use(bodyParser());

// BODY_PARSER and PUBLIC DIRECTORY

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

// PASSPORT JS CONFIG

app.use(require("express-session")({
    secret:"encode",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

// PASSPORT lOCAL STRATEGY

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
    

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home.ejs");
});

app.get("/dms/loginPage",function(req,res){
    res.render("login");
}); 


app.get("/dms/loginPage/register",function(req,res){
    res.render("register");
}); 
app.get("/dms/about",function(req,res){
    res.render("about");
});
app.get("/dms/contact",function(req,res){
    res.render("contact");
});
app.get("/dms/gallery",function(req,res){
    res.render("gallery");
});
app.get("/dms/services",function(req,res){
    res.render("services");

});
app.get("/dms/loginpage/mainpage",function(req,res){
    res.render("mainpage");
});


app.get("/dms/loginpage/mainpage/roadsigns",function(req,res){
    res.render("roadsigns");
});

app.get("/dms/loginpage/mainpage/trafficrules",function(req,res){
    res.render("trafficrules");
});

app.get("/dms/loginpage/mainpage/mocktest",function(req,res){
    res.render("mocktest");
});
app.get("/dms/loginpage/mainpage/feedback",function(req,res){
    res.render("feedback");

});
app.get("/dms/loginpage/mainpage/studentform",function(req,res){
    res.render("studentform")

});
app.get("/dms/loginpage/mainpage/videos",function(req,res){
    res.render("videos");
});
 

app.use(express.static(__dirname+'/public'));

//LOGIN ROUTE
 app.post('/dms/loginPage',
 passport.authenticate('local', { failureRedirect: '/dms/loginpage'}),
 function(req, res) {
    console.log("Logged in");
    console.log(req.user._id);

    res.redirect("/dms/loginPage/mainpage");

  });




  
 

//SIGNUP ROUTE

app.post("/dms/loginPage/register",function(req,res){
    
    console.log("////////////////////////////");
 
    if(req.body.cpassword == req.body.password){
        User.register(new User({username:req.body.username,email:req.body.email}),req.body.password,function(err, user){
            if(err){
                console.log(req.body);
                console.log(user);
                return res.render("register");
                
            }
            else{
                    passport.authenticate("local")(req,res,function(){
                        console.log("Data inserted");
                        res.redirect("/dms/loginPage");
                    });
                    
                   
                
            }
        
        });
    }
    else{
        res.redirect("/");
    }
  

});

app.post("/dms/loginpage/mainpage/studentform", function(req, res){
    var ame=req.body.Name;
    var ddress=req.body.Address;
    var mail=req.body.email;
    var number=req.body.pnumber;
    var ab=req.body.a;
    var veh=req.body.m;
    var bkt=req.body.bt;
    var crt=req.body.ct;
    var lic=req.body.y;
    var Sfform={
        Name:ame,
        Address:ddress,
        email:mail,
        pnumber:number,
        Gender:ab,
        Vehicle:veh,
        biketype:bkt,
        cartype:crt,
        licence:lic
    }
    Sform.create(Sfform,function(err,abcd){
            if(err){
             
             console.log(err);
            }
            else{
               console.log(abcd);
               res.redirect("/dms/loginpage/mainpage");
              }
             
            });
    
        });        

app.post("/dms/loginpage/mainpage/feedback", function(req, res){
            var usse=req.body.f1;
            var abe=req.body.f2;
            var abc=req.body.f3;
            var abcd=req.body.a;
            var Ffform={
                UseInfuture:usse,
                AttendedBefore:abe,
                recommendtoothers:abc,
                Reason:abcd
            }
            Fform.create(Ffform,function(err,abcde){
                if(err){
                 
                 console.log(err);
                }
                else{
                   console.log(abcde);
                   res.redirect("/dms/loginpage/mainpage");
                  }
                 
                });
        
            });        
    
             
            
        

            
app.listen(3000,function(req,res){
    console.log("Server started at 3000 port");
});