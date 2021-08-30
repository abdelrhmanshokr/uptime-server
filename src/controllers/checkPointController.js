const CheckPoint = require('../models/checkPointModel');
const isReachable = require('is-reachable');

exports.add_new_checkPoint = async(req, res) => {
    try{
        let newCheckPoint = new CheckPoint({
            name: req.body.name,
            url: req.body.url,
            protocol: req.body.protocol,
            userId: req.user._id
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
        let userCheckPoint = await CheckPoint.findOne({ userId: req.user._id, _id: req.params.checkPointId });
        if(!userCheckPoint){
            return res.status(404).json('No such check point');
        }else{
           userCheckPoint.url = req.body.name,
           userCheckPoint.name = req.body.url 
        }
        await userCheckPoint.save();
        let updatedUserCheckPoint = await CheckPoint.findOne({ userId: req.user._id, _id: req.params.checkPointId });
        console.log(updatedUserCheckPoint);
        return res.status(200).json('Check point updated successfully');
    }catch(err){
        return res.status(500).json(err.message);
    }
}


exports.delete_a_check_point = async(req, res) => {
    try{
        let deletedCheckPoint = await CheckPoint.findByIdAndDelete({ _id: req.params.checkPointId });
        return res.status(200).json('Check point deleted successfully');
    }catch(err){
        return res.status(500).json(err.message);
    }
}