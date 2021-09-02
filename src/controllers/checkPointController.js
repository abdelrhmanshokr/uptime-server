const CheckPoint = require('../models/checkPointModel');
const User = require('../models/userModel');
const { validationResult } = require('express-validator/check');
const parser = require('url-parse');
const sr = require('server-reachability');
const mailgun = require('mailgun-js');
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });
require('dotenv').config();



exports.add_new_checkPoint = async(req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json(errors.array());
        }

        let parsedUrl = parser(req.body.url, true);
        let host = parsedUrl.url.split('//')[1];
        let checkPointCurrentStatus = await sr.isReachable(host, 80);
        if(checkPointCurrentStatus == false){
            var totalDownCount = 1;
        }else{
            var totalDownCount = 0;
        }
        let newCheckPoint = new CheckPoint({
            name: req.body.name,
            userId: req.user._id,
            tag: req.body.tag,
            webhookUrl: req.body.webhookUrl,
            url: parsedUrl.origin,
            protocol: parsedUrl.protocol,
            path: parsedUrl.pathname,
            port: parsedUrl.port,
            lastCheckStatus: checkPointCurrentStatus,
            lastCheckTime: Date.now(),
            totalDownCount: totalDownCount
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


exports.get_all_check_points_for_a_tag = async(req, res) => {
    try{
        let userCheckPoints = await CheckPoint.find({ tag: req.params.tag, userId: req.user._id });
        if(userCheckPoints.length == 0){
            return res.status(200).json('None of your check points belong to this tag');
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


exports.automatically_check_every_active_checkPoint = async(req, res) => {
    try{
        console.log('automatically');
        let activeCheckPoints = await CheckPoint.find({ active: true });
        for(activeCheckPoint of activeCheckPoints){
            let host = activeCheckPoint.url.split('//')[1];
            let checkPointCurrentStatus = await sr.isReachable(host, 80);
            
            if(activeCheckPoint.lastCheckStatus == checkPointCurrentStatus &&
                checkPointCurrentStatus == true){
                    activeCheckPoint.totalUpTime += Date.now() - activeCheckPoint.lastCheckTime;
                }
            else if(activeCheckPoint.lastCheckStatus == checkPointCurrentStatus &&
                checkPointCurrentStatus == false){
                    activeCheckPoint.totalDownTime += Date.now() - activeCheckPoint.lastCheckTime;
                }
            else if(activeCheckPoint.lastCheckStatus != checkPointCurrentStatus &&
                checkPointCurrentStatus == true){
                    activeCheckPoint.totalDownTime += Date.now() - activeCheckPoint.lastCheckTime;

                    let user = User.findOne({ _id: activeCheckPoint.userId });
                    const data = {
                        from: 'no-reply@corp.com',
                        to: user.email,
                        subject: 'Check point status change notificaiton',
                        html: `<h2> Your check point ${activeCheckPoint.url} has just changed from down to up</h2>`
                    };
                    mg.messages().send(data, (error, body) => {
                        if(error){
                            return res.status(401).json(error.message);
                        }
                        return res.status(200).json('An email was sent please check your inbox');
                    });  
                }
            else if(activeCheckPoint.lastCheckStatus != checkPointCurrentStatus &&
                checkPointCurrentStatus == false){
                    activeCheckPoint.totalUpTime += Date.now() - activeCheckPoint.lastCheckTime;
                    activeCheckPoint.totalDownCount += 1;

                    let user = User.findOne({ _id: activeCheckPoint.userId });
                    const data = {
                        from: 'no-reply@corp.com',
                        to: user.email,
                        subject: 'Check point status change notificaiton',
                        html: `<h2> Your check point ${activeCheckPoint.url} has just changed from up to down</h2>`
                    }; 
                    mg.messages().send(data, (error, body) => {
                        if(error){
                            return res.status(401).json(error.message);
                        }
                        return res.status(200).json('An email was sent please check your inbox');
                    });                     
                }

            activeCheckPoint.lastCheckTime = Date.now();
            activeCheckPoint.lastCheckStatus = checkPointCurrentStatus;
            activeCheckPoint.totalCheckCount += 1;
        }
    }catch(err){
        return res.status(400).json(err.message);
    }
}