const mongoose = require('mongoose');


const reportSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    currentStatus: {
        type: Boolean,
        required: true
    },
    availability: {
        type: Number,
        required: true
    },
    outages: {
        type: Number,
        required: true
    },
    downtime: {
        type: Number,
        required: true
    },
    uptime: {
        type: Number,
        required: true
    },
    responseTime: {
        type: Number,
        required: true
    },
    history: [{
        type: Date,
        required: true
    }]
},{
    timestamps: true
});


const ReportSchema = mongoose.model('reports', reportSchema);
module.exports = ReportSchema;