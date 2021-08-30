const { body } = require('express-validator/check');


exports.validate = (method) => {
    switch (method){
        case 'add_new_checkPoint': {
            return [
                body('name', 'Name is required').trim().not().isEmpty(),
                body('url', 'Url is required').trim().not().isEmpty()
            ]
        }
        case 'update_a_checkPoint': {
            return [
                params('checkPointId', 'Check point Id is required').trim().not().isEmpty()
            ]
        }
        case 'delete_a_checkPoint': {
            return [
                params('checkPointId', 'Check point Id is required').trim().not().isEmpty()
            ]
        }
    }
}