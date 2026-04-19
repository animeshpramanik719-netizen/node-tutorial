const mongoose = require('mongoose');
//bcrypt added for password hasing
const bcrypt = require('bcrypt');
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
    },
    username:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    }
  });

  PersonSchema.pre('save', async function(next){
    const person =this;

    // Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();
try{
    //hash password generating a salt and hash the password before saving
const salt= await bcrypt.genSalt(10);

//hash password
const hashedPassword = await bcrypt.hash(person.password, salt);

//Overwrite the plain text password with the hashed one
person.password= hashedPassword;
next();
}catch(err){
    return next(err);
}
  });

  PersonSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //use the bcrypt compare 
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;

    }catch(err){

        throw err;
    }
  }


  //Creare the model for the preson schema and  export it
  const person = mongoose.model('Person', PersonSchema);
  module.exports = person;