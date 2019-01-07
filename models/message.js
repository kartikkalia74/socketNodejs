const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
sender:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
message:{type:String,required:true},
user:{type:mongoose.Schema.Types.ObjectId, ref:'user'}
})

const message = mongoose.model('message',messageSchema);

module.exports = {message}