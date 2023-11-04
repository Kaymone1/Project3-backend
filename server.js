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
const { PORT = 3000 } = process.env

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
// mongoose.connect(DATABASE_URL, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   });
  // Connection Events
  mongoose.connection
    .on("open", () => console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconnected from mongoose"))
    .on("error", (error) => console.log(error));


////////////////////////////////
////////MODELS//////////////////
////////////////////////////////


const weekSchema = new mongoose.Schema({
  nameDay: String,
  description: String,
  imageURL: String
})
const Weekday = mongoose.model("Weekday", weekSchema);


///////////////////////////////
// MIDDLEWARE
////////////////////////////////

// Importing cors/morgans for security API. 

//logging http requests and response in the dev
app.use(morgan("dev"))
// parse incoming json data
app.use(express.json())
// enable custom http methods specified by _method
app.use(methodOverride('_method'))

// // configure cors 
// app.use(corsOptions)



/////////////////////////////
///////////ROUTES////////
//////////////////////////////
app.get("/", (req, res) => {
    res.send("Hello world")
  })



  // READ - Get all weekdays, INDEX ROUTE
router.get('/weekdays', async (req, res) => {
    try {
      const weekdays = await Weekday.find({})
    } catch (error) {
      res.status(400).json(error)
    }
  })

    
// CREATE - Add a new weekday 
router.post('/weekdays', async(req, res) => {
    try {
        const {nameDay, description, imageURL} = req.body
        const newWeekday = await Weekday.create({nameDay, description, imageURL})
    } catch (error) {
        res.status(400).json(error)
    }
})


// READ - get a specific weekday by ID
router.get('/weekdays/:id', async(req, res) => {
    try {
        const weekday = await Weekday.findById(req.params.id)
        if (!weekday) {
            return res.status(404).json({error: 'Weekday not found'})
        }
    }catch(error){
        res.status(400).json(error)
    }
})

// UPDATE - Update a specific weekday by ID
router.put('/weekdays/:id', async (req, res) => {
    try {
      const updatedWeekday = await Weekday.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      if (!updatedWeekday) {
        return res.status(404).json({ error: 'Weekday not found' })
      }
    }  catch (error) {
      res.status(400).json(error)
    }
  })
  
  // DELETE - Delete a specific weekday by ID
  router.delete('/weekdays/:id', async (req, res) => {
    try  {
      const deletedWeekday = await Weekday.findByIdAndRemove(req.params.id)
      if (!deletedWeekday) {
        return res.status(404).json({ error: 'Weekday not found' })
      }
    } catch (error) {
      res.status(400).json(error)
    }
  })
  

    // LISTENER
    app.listen(PORT, () => console.log(`Listening on PORT http://localhost:${PORT}/`));  