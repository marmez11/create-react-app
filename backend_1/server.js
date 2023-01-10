///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
const { PORT = 3000 } = process.env;
const { response } = require("express");
// import express
const express = require("express");
// create application object
const app = express();
/// import mongoose
const mongoose = require("mongoose")
// import other middleware
const cors = require("cors")
const morgan = require("morgan")

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  // Connection Events
mongoose.connection
.on("open", ()=> {console.log("you are connected to mongoose")})
.on("close", ()=> {console.log("you are disconnected from mongoose")})
.on("error", (error)=>{console.log(error)})

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

///////////////////////////////
// MODELS
////////////////////////////////
const peopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
})

const People = model("People", peopleSchema)


////////////////////////
// ROUTES
/////////////////////////
app.get("/", (req, res)=>{
    res.send("Hello world")
})
// PEOPLE INDEX ROUTE
app.get("/people", async(req, res)=>{
    try {
        res.json(await People.find({}))
    }
    catch(error){
        res.status(400).json(error);
    }
})

// PEOPLE CREATE ROUTE
app.post("/people", async (req, res) => {
    try {
      // send all people
      res.json(await People.create(req.body));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

// PEOPLE Update ROUTE
app.put("/people/:id", async (req, res) => {
    try {
      // send all people
      res.json(
        await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // PEOPLE Delete ROUTE
  app.delete("/people/:id", async (req, res) => {
    try {
      // send all people
      res.json(await People.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // PEOPLE INDEX ROUTE
  app.get("/people/:id", async (req, res) => {
      try {
        // send all people
        res.json(await People.findById(req.params.id));
      } catch (error) {
        //send error
        res.status(400).json(error);
      }
    });
  

/////////////////
// LISTENER
/////////////////
app.listen(PORT, (req, res)=>{
    res.send(`The port we are listening to is ${PORT}`)
})
