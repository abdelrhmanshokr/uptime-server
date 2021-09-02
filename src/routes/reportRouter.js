const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const reportController = require('../controllers/reportController');
const reportValidation = require('../userInputValidation/reportValidation');


router.post('/:checkPointId', checkAuth, reportValidation.validate('add_a_new_report'), reportController.add_a_new_report);
router.get('/', reportController.get_all_reports_for_a_user);
router.delete('/deleteAReport/:reportId', reportValidation.validate('delete_a_report'), reportController.delete_a_report);


module.exports = router;