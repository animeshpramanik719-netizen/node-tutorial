const express = require('express'); // FIXED: Changed import to require
const app = express();
const db = require('./db'); 
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body // download body parser npm 
const mongoose= require('mongoose');

app.get('/', (req, res) => {
  res.send('Welcome to my hotel... How can i help you ?');
});

//POST route to create a new person
app.post('/person', async (req, res) =>{
  try{
    const data= req.body
  
  //create a new person document using the person model
  const newPerson = new person(data);
 
 //save the new person document to the database  
 const response = await newPerson.save();
 console.log('data saved');
 res.status(200).json(response)

  }catch(err){
    console.log(err);
    res.status(500).json({error: 'internal server error'});
  }
});

// Import the router file

const personRouter = require('./personRoutes');
const menuItemRoutes = require('./MenuItemsRoutes');
//use the router for all routes starting with /person
app.use('/person', personRouter); 
//use the router for all routes starting with /menuItem
app.use('/menuItem', menuItemRoutes); 

// start the server
app.listen(6969, () => {
  console.log('Server is running on http://localhost:6969');
});
