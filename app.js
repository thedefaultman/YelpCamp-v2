const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose')


mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

//Schem Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

let Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create({
//     name: "Granite Hill", 
//     image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
//     description: "This is a huge granite hill, No bathroom, No water. Beautifull granite"},
//     function (err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Newly Created Campgorund");
//         console.log(campground);
//     }
// })

//landing page route
app.get("/", function (req, res) {  
    res.render("landing")
})

//campgrounds page route
//INDEX ROUTE
app.get("/campgrounds", function (req, res) {  
    //get all campground from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds})
        }
      })
})


//post route
//CREATE - add new campground to DB
app.post("/campgrounds", function (req, res) {  
    //get data from form and add to camps array
    let name = req.body.name
    let image = req.body.image
    let desc = req.body.description
    let newCampground = {name: name, image: image, description: desc}
    //Create a new campground and save to database
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect to camps page
            res.redirect("/campgrounds")
        }
      })
})

//NEW - show form to create new campground
app.get("/campgrounds/new", function (req, res) {  
    res.render("new.ejs")
})

//SHOW - shows more info about the one campground
app.get("/campgrounds/:id", function (req, res) {
    //find the with provided ID
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground})
        }
      })
  })


app.listen(3000, function () {  
    console.log("YELPCAMP SERVER HAS STARTED");
})