const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define Schema
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  age: {
    type: Number
  },

  work: {
    type: String,
    enum: ['chef', 'waiter', 'manager'],
    required: true
  },

  mobile: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  address: {
    type: String
  },

  salary: {
    type: Number,
    required: true
  },

  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
});


// Hash Password Before Save
PersonSchema.pre('save', async function () {
  const person = this;

  if (!person.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(person.password, salt);

  person.password = hashedPassword;
});


// Compare Password
PersonSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


// Create Model
const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;