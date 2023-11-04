///////////////////////////////
/////////DEPENDENCIES///////////
////////////////////////////////

// Import & configure dependencies
// configure environment variable 
require('dotenv').config()

// Import the express-session library for handling user sessions
const expressSession = require('express-session')

// Import the express library 
const express = require("express")
const app = express()

// destructure properties from environment variables 
const { PORT, DATABASE_URL } = process.env

// import the mongoose library for the MongoDB database interaction
const mongoose = require("mongoose")

// import the cors library for 3rd pary 
const cors = require("cors")

//waiting for new deployment link to add as second string.
// const corsOptions = {
//     origin: ["http://localhost:3000", "https://roaring-youtiao-db8865.netlify.app"],
//     credentials: true, 
//   }
  

// import morgon for loggin http requests and responses
const morgan = require("morgan")

// import the method override for handling custom HTTP methods
const methodOverride = require('method-override')

////////////////////////////////
////////MODELS//////////////////
////////////////////////////////
const Notes = require('./model/notesTemplate');

///////////////////////////////
// MIDDLEWARE
////////////////////////////////
// this will parse the data create to "req.body object"
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
// Importing cors/morgans for security API. 

//logging http requests and response in the dev
app.use(morgan("dev"))
// parse incoming json data
app.use(express.json())
// enable custom http methods specified by _method
app.use(methodOverride('_method'))

// configure cors 
// app.use(corsOptions)

////////////////////////////////
////////DATABASE CONNECTION/////
////////////////////////////////

// connect to the MOngoDB database using Mongoose
mongoose.connect(DATABASE_URL);
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

//Controllers
const notesController = require('./controller/notes')


//using controller pages app.use
app.use('/notes', notesController)

/////////////////////////////
///////////ROUTES////////
//////////////////////////////

//landing page 
app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: http://localhost:${PORT}`)
})
