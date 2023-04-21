const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requried:true,
    },
    email:{
        type:String,
        requried:true,
    },
    picture:{
        type:String,
        requried:true,
    },
    sub:{
        type:String,
        requried:true,
    },

}, {timestamps:true});


const User = mongoose.model("BloggerUser", userSchema);


module.exports = User;