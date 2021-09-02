const mongoose = require('mongoose');


const checkPointSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    path: {
        type: String
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
        default: 0
    },
    totalCheckCount: {
        type: Number
    },
    totalDownCount: {
        type: Number
    },
    active: {
        type: Boolean,
        default: 1
    },
    tag: {
        type: String
    },
    webhookUrl: {
        type: String
    }
},{
    timestamps: true 
});


const CheckPoint = mongoose.model('check points', checkPointSchema);
module.exports = CheckPoint;