const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v){
                let regularExpression = /[a-z]+/i;
                return v.match(regularExpression);
            },
            message: 'Invalid username please try again'
        }
    }, 
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        // validate: {
        //     validator: function(v){
        //         let regularExpression = '^\S+@\S+$';
        //         return v.match(regularExpression);
        //     },
        //     message: 'Invalid email please try again'
        // }
    }
},{
    timestamps: true
});


const User = mongoose.model('users', userSchema);
module.exports = User;
