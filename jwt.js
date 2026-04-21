const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next)  =>{

    // Extract the jwt token from the request header
    const hatoken = req.header.authorization.split(' ')[1];
if(!token) return res.status(401).json({error: 'Unauthorized'});

try{
    // Verify the token
    const decoded = jwt.verify(token, process.env,JWT_SECRET);

    // Attach user info to the request object
    req.user = decoded;
    next();
}catch(err){
    console.log(err);
    res.status(401).json({error: 'Invalid token'});

}
}
// Funcation to generate a jwt token
const generateToken =(userData) =>{
    // Generate a token with user data and secret key
    return jwt.sign(userData, process.env.JWT_SECRET)
}

module.exports = {jwtAuthMiddleware, generateToken};