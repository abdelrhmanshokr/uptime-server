const mongoose = require('mongoose');


const checkPointSchema = new mongoose.Schema({
    userId: {
        type: String
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
    currentStatus: {
        type: Boolean
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