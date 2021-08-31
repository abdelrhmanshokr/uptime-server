const express = require('express');
const router = express.Router();
const checkPointController = require('../controllers/checkPointController');
const checkPointValidation = require('../UserInputValidation/checkPointValidation');
const checkAuth = require('../middlewares/checkAuth');


router.post('/', checkAuth, checkPointValidation.validate('add_new_checkPoint'), checkPointController.add_new_checkPoint);


router.get('/allCheckPointsForAUser', checkAuth, checkPointController.get_all_check_points_for_a_user);


router.put('/updateACheckPoint/:checkPointId', checkAuth, checkPointValidation.validate('update_a_checkPoint'), checkPointController.update_a_checkPoint);


router.put('/pauseOrUnpauseACheckPoint/:checkPointId', checkAuth, checkPointValidation.validate('pause_or_unpause_a_checkPoint'), checkPointController.pause_or_unpause_a_checkPoint);


router.delete('/deleteACheckPoint/:checkPointId', checkAuth, checkPointValidation.validate('delete_a_checkPoint'), checkPointController.delete_a_checkPoint);


module.exports = router;