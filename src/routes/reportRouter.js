const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const reportController = require('../controllers/reportController');


router.post('/', reportController.add_a_new_report);
router.get('/', reportController.get_all_reports_for_a_user);


module.exports = router;