const Report = require('../models/reportsModel');
const CheckPoint = require('../models/checkPointModel');
const { validationResult } = require('express-validator/check');
const sr = require('server-reachability');


exports.add_a_new_report = async(req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json(errors.array());
        }

        let checkPoint = await CheckPoint.findOne({ userId: req.user._id, _id: req.params.checkPointId });
        if(!checkPoint){
            return res.status(404).json('No such check point');
        }else{
            let currentStatus = await sr.isReachable(checkPoint.url, 80);
            let availability = (1 - (checkPoint.totalDownCount / checkPoint.totalCheckCount)) * 100;
            let newReport = new Report({
                userId: req.user._id,
                checkPointId: checkPoint._id,
                currentStatus: currentStatus, 
                availability: availability,
                outages: checkPoint.totalDownCount,
                downTime: checkPoint.totalDownTime,
                upTime: checkPoint.totalUpTime
            });

            await newReport.save();
            return res.status(201).json('New report had been added successfully');
        }
    }catch(err){
        return res.status(400).json(err.message);
    }
}


exports.get_all_reports_for_a_user = async(req, res) => {
    try{
        let allUserReports = await Report.find({ userId: req.user._id });
        if(allUserReports.length() == 0){
            return res.status(404).json('You do not have any reports yet');
        }else{
            return res.status(200).json(allUserReports);
        }
    }catch(err){
        return res.status(400).json(err.message);
    }
}


exports.delete_a_report = async(req, res) => {
    try{
        let deletedReport = await Report.findByIdAndDelete({ userId: req.user._id, _id: req.params.reportId});
        if(!deletedReport){
            return res.status(404).json('No such report');
        }else{
            return res.status(200).json('report deleted successfully');
        }
    }catch(err){
        return res.status(400).json(err.message);
    }
}