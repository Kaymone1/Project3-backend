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

// import the cors library for 3rd party (not sure if cors is needed)
const cors = require("cors")

//waiting for new deployment link to add as second string. not sure if this is needed
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
const NotesTemplateSchema = new mongoose.Schema({
  name: { 
      type: String, 
      required: true
  },
  date: Date,
  comment: { type: String,
  },
});

const Notes = mongoose.model('Notes', NotesTemplateSchema); 

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
app.use(corsOptions)

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

/////////////////////////////
///////////ROUTES////////
//////////////////////////////

//test route
app.get('/', (req, res) => {
  res.send('hello world')
})

// Notes INDEX ROUTE
app.get("/notes", async (req, res) => {
  try {
      // send all Notes 
      res.json(await Notes.find({}))
  } catch (error) {
      // send error
      res.status(400).json(error)
  }
})

// Notes CREATE ROUTE 
app.post("/notes", async (req, res) => {
  try {
      // create a person 
      res.json(await Notes.create(req.body))
  } catch (error) {
      // send error
      res.status(400).json(error)
  }
})

// Notes UPDATE ROUTE 
app.put("/notes/:id", async (req, res) => {
  try {
      res.json(await Notes.findByIdAndUpdate(req.params.id, req.body, {new: true}))
  } catch (error) {
      res.status(400).json(error)
  }
})

// Notes DESTROY ROUTE 
app.delete("/notes/:id", async (req, res) => {
  try {
      res.json(await Notes.findByIdAndRemove(req.params.id))
  } catch (error) {
      res.send(400).json(error)        
  }
})



app.listen(PORT, () => {
  console.log(`Server is listening on PORT: http://localhost:${PORT}`)
})
