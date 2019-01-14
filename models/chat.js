const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    members:[{type:mongoose.Schema.Types.ObjectId ,ref:'user'}],
    messages:[{type:mongoose.Schema.Types.ObjectId ,ref:'message'}]
})


const chat = mongoose.model('chat',chatSchema);

module.exports = {chat}