const mongoose = require('mongoose');


const checkPointSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    }, 
    url: {
        type: String,
        require: true,
        trim: true
    },
    protocol: {
        type: String,
        trim: true
    }
},{
    timestamps: true
    
});