const {user} = require('../models/user');



const helpher={};

helpher.userList =function(){
    return  user.find({})
     .then((result)=>result)
     .catch((err)=>console.log(err))
}

helpher.newUser=function(data,cb){
        let newUser =new user(data)
            newUser.save()
            .then((result)=>cb(result))
            .catch(err=>console.log(err))
}
helpher.userMessage =(sender,message,reciever)=>{
    
}

module.exports = helpher;