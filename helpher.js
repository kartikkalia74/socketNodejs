const {user} = require('./models/user');
const helphers ={};

helphers.chat= function(data,cb){
    user.findOne({name:data.sender},'_id',function(err,sender){
        if(!err){
            user.findOne({name:data.reciever},'_id',function(err,reciever){
                if(!err){
                    console.log(sender,reciever,'senderreciever')
                    cb(sender._id,reciever._id)
                }else{console.log(err)}
            })
        }else{console.log(err)}
    })
   
}

module.exports = helphers;