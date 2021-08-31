const CheckPoint = require('../models/checkPointModel');
const { validationResult } = require('express-validator/check');
const parser = require('url-parse');


exports.add_new_checkPoint = async(req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json(errors.array());
        }

        let parsedUrl = parser(req.body.url, true);
        let newCheckPoint = new CheckPoint({
            name: req.body.name,
            userId: req.user._id,
            tag: req.body.tag,
            webhookUrl: req.body.webhookUrl,
            url: parsedUrl.origin,
            protocol: parsedUrl.protocol,
            path: parsedUrl.pathname,
            port: parsedUrl.port
        });
        await newCheckPoint.save();
        return res.status(201).json('New check has been added');
    }catch(err){
        return res.status(400).json(err.message);
    }
}


exports.get_all_check_points_for_a_user = async(req, res) => {
    try{
        let userCheckPoints = await CheckPoint.find({ userId: req.user._id });
        if(userCheckPoints.length == 0){
            return res.status(200).json('This user did not add any check points yet');
        }else{
            return res.status(200).json(userCheckPoints);
        }
    }catch(err){
        return res.status(400).json(err.message);
    }
}


exports.update_a_checkPoint = async(req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json(errors.array());
        }

        let userCheckPoint = await CheckPoint.findOne({ userId: req.user._id, _id: req.params.checkPointId });
        if(!userCheckPoint){
            return res.status(404).json('No such check point');
        }else{
           userCheckPoint.url = req.body.name,
           userCheckPoint.name = req.body.url,
           userCheckPoint.tag = req.body.tag,
           userCheckPoint.webhookUrl = req.body.webhookUrl
        }
        await userCheckPoint.save();
        let updatedUserCheckPoint = await CheckPoint.findOne({ userId: req.user._id, _id: req.params.checkPointId });
        return res.status(200).json('Check point updated successfully');
    }catch(err){
        return res.status(500).json(err.message);
    }
}


exports.delete_a_checkPoint = async(req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json(errors.array());
        }
        let deletedCheckPoint = await CheckPoint.findByIdAndDelete({ _id: req.params.checkPointId });
        return res.status(200).json('Check point deleted successfully');
    }catch(err){
        return res.status(500).json(err.message);
    }
}


exports.pause_or_unpause_a_checkPoint = async(req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json(errors.array());
        }

        let userCheckPoint = await CheckPoint.findOne({ userId: req.user._id, _id: req.params.checkPointId });
        if(!userCheckPoint){
            return res.status(404).json('No such check point');
        }else{
            userCheckPoint.active = !userCheckPoint.active;
            await userCheckPoint.save();
            return res.status(200).json('Check point updated successfully');
        }
    }catch(err){
        return res.status(500).json(err.message);
    }
}