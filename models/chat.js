const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chat:[{type:mongoose.Schema.Types.ObjectId ,ref:'messages'}]
})


const chat = mongoose.model('chat',chatSchema);

module.exports = {chat}