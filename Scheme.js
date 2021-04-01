const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const userShceme = new Scheme({
    name : String
},{
    versionKey : false
});

module.exports.User = mongoose.model("User", userShceme);