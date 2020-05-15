var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Setting = new Schema({
    privacy_policy: {
        type:String
    },
    terms_and_condition: {
        type:String
    },
    about_us: {
        type:String
    }
})

module.exports = mongoose.model('setting', Setting );