const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,  //z automatu mongoose dodaje taki ID!
    // email:String,
    userName:String,
    googleId:String,
    status:{type:Number,default:0}
});
module.exports = mongoose.model('User', userSchema);