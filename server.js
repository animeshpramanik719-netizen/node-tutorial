const express = require("express"); // FIXED: Changed import to require
const app = express();
const connectDB = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body // download body parser npm
const mongoose = require("mongoose");
const Person = require("./person");
require("dotenv").config();
const passport=require('passport');
const LocalStrategy= require('passport-local').Strategy;
const person=require('./person');

connectDB();


 //Middleware function  
 const logrequest=(req, res, next)=>{
    console.log(`${new Date().toLocaleString()} Request Mode to: ${req.originalUrl}`);
    next(); // Call the next middleware function
 }

app.use(logrequest);//use the middleware function

passport.use(new LocalStrategy(async(username, password, done) =>{
  //authenticate the user using the username and password
  try{
    console.log('Received username:', username, password);
    const user= await person.findOne({username: username});
    if(!user)
      return done(null, false,{message: 'Incorrect username '});

const isPasswordMatch=user.password === password ? true : false;
if(!isPasswordMatch){
  return done(null, false);
}else{
  return done(null, false, {message: 'Incorrect password'});
}
  }catch(err){
return done(err);
  }
}))

app.use(passport.initialize());
 
app.get("/", passport.authenticate('local',{session: false}), function(req, res) {
  res.send("Welcome to my hotel... How can i help you ?");
});

//POST route to create a new person
app.post('/person', async (req, res) =>{
   try{
     const data= req.body

//   //create a new person document using the person model
   const newPerson = new Person(data);

//  //save the new person document to the database
  const response = await newPerson.save();
  console.log('data saved');
  res.status(200).json(response)

  }catch(err){
    console.log(err);
     res.status(500).json({error: 'internal server error'});
   }
 });



app.use(logrequest); // Use the middleware function


// Import the router file

const personRouter = require("./personRoutes");
const menuItemRoutes = require("./MenuItemsRoutes");
//use the router for all routes starting with /person
app.use("/person", personRouter);
//use the router for all routnodees starting with /menuItem
app.use("/menuItem", menuItemRoutes);

// start the server
const PORT = process.env.PORT || 6969;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
