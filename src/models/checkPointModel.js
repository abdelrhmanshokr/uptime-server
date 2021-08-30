const mongoose = require('mongoose');


const checkPointSchema = new mongoose.Schema({
    userId: {
        type: String
    },
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
    },
    lastCheckStatus: {
        type: Boolean
    },
    lastCheckTime: {
        type: Date
    },
    totalUpTime: {
        type: Number,
        default: 0
    },
    totalDownTime: {
        type: Number,
        defualt: 0
    },
    currentStatus: {
        type: Boolean
    }
},{
    timestamps: true 
});


const CheckPoint = mongoose.model('check point', checkPointSchema);
module.exports = CheckPoint;