const { param } = require('express-validator/check');


exports.validate = (method) => {
    switch (method) {
        case 'add_a_new_report': {
            return [
                param('checkPointId', 'Check point Id not found').trim().not().isInt().not().isEmpty()
            ]
        }
        case 'delete_a_report': {
            return [ 
                param('reportId', 'Check point Id not found').trim().not().isInt().not().isEmpty()
            ]
        } 
    }
}