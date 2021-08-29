const mongoose = require("mongoose");
require('dotenv').config();


async function dbConnect(){
    try{
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING,
            { 
                useNewUrlParser:true,
                useUnifiedTopology: true
            });
            console.log("database connected successfully");
    }catch(err){
        console.log('Error', err.message);
    }
    
}


module.exports = dbConnect;



