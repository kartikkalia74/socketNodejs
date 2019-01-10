const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
sender:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
message:{type:String,required:true},
reciever:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
time:{type:Date,default:Date.now().toString()}
})

const message = mongoose.model('message',messageSchema);

module.exports = {message};

