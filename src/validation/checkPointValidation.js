const { body, param } = require('express-validator/check');


exports.validate = (method) => {
    switch (method){
        case 'add_new_checkPoint': {
            return [
                body('name', 'Name is required, And it can not start with an integer').trim().not().isInt().not().isEmpty(),
                body('url', 'Url is required').trim().not().isInt().not().isEmpty()
            ]
        }
        case 'update_a_checkPoint': {
            return [
                param('checkPointId', 'Check point Id is required').trim().not().isEmpty()
            ]
        }
        case 'delete_a_checkPoint': {
            return [
                param('checkPointId', 'Check point Id is required').trim().not().isEmpty()
            ]
        }
        case 'switch_a_checkPoint': {
            return [
                param('checkPointId', 'Check point Id is required').trim().not().isEmpty()
            ]
        }
    }
}