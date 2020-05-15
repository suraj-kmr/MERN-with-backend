var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var User = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required: true
    },
    address: {
        type : String
    },
    phone: {
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required: true,
    },
    profile_pic:{
        type:String,
    },
    role:{
        type:String,
        required: true,
    }
});

module.exports = mongoose.model('user',User)