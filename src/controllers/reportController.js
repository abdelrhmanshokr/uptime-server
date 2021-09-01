const Report = require('../models/reportsModel');
const isUp = require('is-up');
const isReachable = require('is-reachable');


exports.add_a_new_report = async(req, res) => {
    try{
        // let isitup = await isUp('https://google.com');
        let isitup = await isReachable('https://facebook.com');
        console.log(isitup);
    }catch(err){
        return res.status(400).json(err.message);
    }
}


exports.get_all_reports_for_a_user = async(req, res) => {
    try{

    }catch(err){
        return res.status(400).json(err.message);
    }
}


exports.delete_a_report = async(req, res) => {
    try{

    }catch(err){
        return res.status(400).json(err.message);
    }
}