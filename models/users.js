const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },  
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]
});

const validateUser = (user) => {
    const schema = {
        email: joi.string(),
        password: joi.string()
    };
    return joi.validate(user, schema);
};

const User = mongoose.model('User', userSchema);

exports.User = User;
exports.validate = validateUser;