var express = require("express");
var app = express();
var mongoose = require("mongoose");
var body = require("body-parser");
var mo = require("method-override");

//app config

app.set("view engine","ejs");
app.use(body.urlencoded({extended : true }));
app.use(mo("_method"));

//mongoose setup
mongoose.connect("mongodb://localhost:27017/bookapp",{useNewUrlParser : true});

var bookSchema = new mongoose.Schema({
    title : String,
    image : String,
    description : String,
    date : {
             type : Date,
             default : Date.now
    }
});


var book = mongoose.model("book",bookSchema);

// book.create({
//     title : "Mind Power",
//     image : "https://images-na.ssl-images-amazon.com/images/I/51K4qQeoZEL._SX325_BO1,204,203,200_.jpg",
//     description : "Mind Power book"
// });

app.get("/", function(req,res)
{
    res.redirect("/books");
});

//index

app.get("/books", function(req,res)
{
    book.find({}, function(err,showbook)
    {
        if(err)
        {
            console.log(err);
            res.redirect("/books");
        }
        else
        {
           res.render("index", { now : showbook});  
        }
    });
   
});

//new

app.get("/books/new", function(req,res)
{
    res.render("new");
});

//create

app.post("/books", function (req,res)
{
    book.create(req.body.h, function(err,newone)
    {
        if(err)
        {
            console.log(err);
            res.redirect("/new");
        }
        else
        {
          res.redirect("/books");  
        }
    });
    
});

//show
app.get("/books/:id", function(req,res)
{
    book.findById(req.params.id,function (err,showpage)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
             res.render("show", {all: showpage});
        }
    });
});

//edit
app.get("/books/:id/edit", function(req,res)
{
    book.findById(req.params.id, function(err, edited)
    {
        if(err)
        {
           console.log(err);
           res.redirect("/books");
        }
        else
        {
            res.render("edit",{edit:edited});
        }
    });
    
});

//update
app.put("/books/:id", function(req,res)
{
    book.findByIdAndUpdate(req.params.id, req.body.g,function(err, u)
    {
        if(err)
        {
            console.log(err);
            res.redirect("/books");
        }
        else
        {
           res.redirect("/books/" + req.params.id); 
        }
    });
 
});

//delete
app.delete("/books/:id", function(req,res)
{
    book.findByIdAndRemove(req.params.id, function(err,d)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect("/books");
        }
    });
});

app.listen(process.env.PORT,process.env.IP, function(req,res)
{
    console.log("Book app started");
});



// css and bootstrap
// search
// add to cart


//landing page



