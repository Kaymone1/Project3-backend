///////////////////////////////
/////////DEPENDENCIES///////////
////////////////////////////////
// configure environment variable 
require('dotenv').config()

// Import & configure dependencies
// Import the express library 
const express = require("express")
const app = express()

// destructure properties from environment variables 
const { DATABASE_URL, PORT = 4000 } = process.env

// import the mongoose library for the MongoDB database interaction
const mongoose = require("mongoose")

// import the cors library for 3rd party (not sure if cors is needed)
const cors = require("cors")

// import morgon for loggin http requests and responses
const morgan = require("morgan")

////////////////////////////////
////////DATABASE CONNECTION/////
////////////////////////////////

// connect to the MOngoDB database using Mongoose
mongoose.connect(DATABASE_URL);
// Connection Events
const db = mongoose.connection
// optional create status messages to check mongo connection 
db.on('error', (err) => { console.log('ERROR: ' , err)})
db.on('connected', () => { console.log('mongo connected')})
db.on('disconnected', () => { console.log('mongo disconnected')})


////////MODELS//////////////////
////////////////////////////////
const NotesTemplateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Notes = mongoose.model('Notes', NotesTemplateSchema); 


///////////////////////////////
// MIDDLEWARE
////////////////////////////////

// Importing cors/morgans for security API. 
app.use(cors())
//logging http requests and response in the dev
app.use(morgan("dev"))

app.use(express.json())

/////////////////////////////
///////////ROUTES////////
//////////////////////////////
////////////////////////////////

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

////////////////////////////////
// LISTENER 
////////////////////////////////

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: http://localhost:${PORT}`)
})
