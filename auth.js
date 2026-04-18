const passport=require('passport');
const LocalStrategy= require('passport-local').Strategy;
const person=require('./person');

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
module.exports= passport; // Export configured passport