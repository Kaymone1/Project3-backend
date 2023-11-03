///////////////////////////////
/////////DEPENDENCIES///////////
////////////////////////////////


// Import & configure dependencies
// configure environoment variable 
require('dotenv').config()
// const bcrypt = require('bcrypt')

// Import the express-session library for handling user sessions
const expressSession = require('express-session')

// Import the express library 
const express = require("express")
const app = express()

// destructure properties from environment variables 
const { PORT = 3000, DATABASE_URL } = process.env

// import the mongoose library for the MongoDB database interaction
const mongoose = require("mongoose")

// import the cors library for 3rd pary 
const cors = require("cors")

const corsOptions = {
    origin: ["http://localhost:3001", "https://roaring-youtiao-db8865.netlify.app"],
    credentials: true, 
  }
  

// import morgon for loggin http requests and responses
const morgan = require("morgan")

// import the method override for handling custom HTTP methods
const methodOverride = require('method-override')

////////////////////////////////
////////DATABASE CONNECTION/////
////////////////////////////////

// connect to the MOngoDB database using Mongoose
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  
  // Connection Events
  mongoose.connection
    .on("open", () => console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconnected from mongoose"))
    .on("error", (error) => console.log(error));