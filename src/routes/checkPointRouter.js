const express = require('express');
const router = express.Router();
const checkPointController = require('../controllers/checkPointController');
const checkAuth = require('../middlewares/checkAuth');


router.post('/', checkAuth, checkPointController.add_new_checkPoint);


router.get('/allCheckPointsForAUser', checkAuth, checkPointController.get_all_check_points_for_a_user);


router.put('/updateACheckPoint/:checkPointId', checkAuth, checkPointController.update_a_checkPoint);


router.delete('/deleteACheckPoint/:checkPointId', checkAuth, checkPointController.delete_a_check_point);


module.exports = router;