const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const axios = require("axios");
const { response } = require("express");

const app = express();  
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.use(express.static("public"));

//Home route 
app.get("/", function(request, response){
response.render("home",
)
})

//Initial post request route after user enters city name and state code
app.post("/city", function(req,res){

    const options = {
      method: 'GET',
      url: 'https://us-real-estate.p.rapidapi.com/for-sale',
      params: {
          offset: '0', 
          limit: '42', 
          state_code: req.body.stateCode, 
          city: req.body.cityName, 
          sort: 'newest',
                    //optional parameters n/a
          price_min: req.body.minPrice,
          price_max: req.body.maxPrice,
          beds_min: req.body.minNumberOfBedrooms,
          beds_max: req.body.maxNumberOfBedrooms,
          baths_min: req.body.minNumberOfBathrooms,
          baths_max: req.body.maxNumberOfBathrooms
          
        },
      headers: {
        'X-RapidAPI-Key': '996ed940d7msh8951820136e8fb5p13b1abjsnb1a69858ab93',
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {


        let homesForSale = [];

        if(!response.data.data.results){
          res.redirect("/")
        } else{
          for(let i = 0; i < response.data.data.results.length; i++){
            let homeForSale = response.data.data.results[i];
            homesForSale.push(homeForSale)
        }
        }
        res.render("city", {
            cityName: options.params.city,
            stateName: options.params.state_code,
            homesForSale: homesForSale
        })
    }).catch(function (error) {
        console.error(error);
    });

})


//Post request for when user enters their desired filters; rendered in the same format
app.post("/cityfilters", function(req,res){

  const options1 = {
      method: 'GET',
      url: 'https://us-real-estate.p.rapidapi.com/for-sale',
      params: {
          offset: '0',
          limit: '42', 
          state_code: req.body.passedState,
          city: req.body.passedCity, 
          sort: 'newest',
          //optional parameters
          price_min: req.body.minPrice,
          price_max: req.body.maxPrice,
          beds_min: req.body.minNumberOfBedrooms,
          beds_max: req.body.maxNumberOfBedrooms,
          baths_min: req.body.minNumberOfBathrooms,
          baths_max: req.body.maxNumberOfBathrooms
        },
      headers: {
        'X-RapidAPI-Key': '996ed940d7msh8951820136e8fb5p13b1abjsnb1a69858ab93',
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com'
      }
    };

    
    axios.request(options1).then(function (response1) {

        let homesForSale1 = [];
        for(let i = 0; i < response1.data.data.results.length; i++){
          let homeForSale1 = response1.data.data.results[i];
          homesForSale1.push(homeForSale1)
      }
        res.render("cityfilters", {
            cityName: options1.params.city,
            stateName: options1.params.state_code,
            homesForSale1: homesForSale1
        })
    }).catch(function (error) {
        console.error(error);
    });
})

//Post request after user clicks "view more" to see more details on said property
app.post("/property", function(req,res){
  
  const options2 = {
    method: 'GET',
    url: 'https://us-real-estate.p.rapidapi.com/property-detail',
    params: {property_id: req.body.propertyId},
    headers: {
      'X-RapidAPI-Key': '996ed940d7msh8951820136e8fb5p13b1abjsnb1a69858ab93',
      'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com'
    }
  };
  
  axios.request(options2).then(function (response2) {

    //For number of beds, bath, etc.
    let propertyDetails = response2.data.data;

    //To render the initial picture
    let primaryPropertyPhoto= response2.data.data.photos

    //To render the secondary pictures
    let propertyPhotos = [];

    if(!response2.data.data.photos){

    } else{
      for(let i = 1; i < response2.data.data.photos.length; i++){
        let propertyPhoto = response2.data.data.photos[i]
        propertyPhotos.push(propertyPhoto)
     
      }
    }

   let propertyTags = [];
   for(let i = 0; i < response2.data.data.tags.length; i++){
     let propertyTag = response2.data.data.tags[i]
     propertyTags.push(propertyTag)
   }

    res.render("property",{
      propertyDetails: propertyDetails,
      primaryPropertyPhoto: primaryPropertyPhoto,
      propertyPhotos: propertyPhotos,
      propertyTags: propertyTags,

    })

  }).catch(function (error) {
    console.error(error);
  });
})




app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000")
});



