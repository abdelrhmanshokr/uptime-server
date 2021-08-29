const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


module.exports = async(req, res, next) => {
    try{
        const token = req.headers.authorization.replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const user = await User.findOne({ _id: decodedToken._id });

        if(!user) throw new Error('Unauthorized access');

        req.user = user;
        next();
    }catch(err){
        return res.status(401).json('Unauthorized access');
    }
}