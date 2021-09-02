const express = require('express');
const router = express.Router();
const checkPointController = require('../controllers/checkPointController');
const checkPointValidation = require('../userInputValidation/checkPointValidation');
const checkAuth = require('../middlewares/checkAuth');


router.post('/', checkAuth, checkPointValidation.validate('add_new_checkPoint'), checkPointController.add_new_checkPoint);


router.get('/allCheckPointsForAUser', checkAuth, checkPointController.get_all_check_points_for_a_user);


router.get('/allCheckPointsForATag', checkAuth, checkPointValidation.validate('get_all_check_points_for_a_tag'), checkPointController.get_all_check_points_for_a_tag);


router.put('/updateACheckPoint/:checkPointId', checkAuth, checkPointValidation.validate('update_a_checkPoint'), checkPointController.update_a_checkPoint);


router.put('/pauseOrUnpauseACheckPoint/:checkPointId', checkAuth, checkPointValidation.validate('pause_or_unpause_a_checkPoint'), checkPointController.pause_or_unpause_a_checkPoint);


router.delete('/deleteACheckPoint/:checkPointId', checkAuth, checkPointValidation.validate('delete_a_checkPoint'), checkPointController.delete_a_checkPoint);

// this end point needs to always run when the server is up 
router.post('/checkEveryActiveCheckPoint', checkPointController.automatically_check_every_active_checkPoint);


module.exports = router;