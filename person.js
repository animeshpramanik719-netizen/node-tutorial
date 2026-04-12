const mongoose = require('mongoose');
  //Define the schema for the Person 
  const PersonSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true,
        
    },
    email:{
        type: String,
        required: true,
        unique: true

    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    }
  })


  //Creare the model for the preson schema and  export it
  const person = mongoose.model('Person', PersonSchema);
  module.exports = person;