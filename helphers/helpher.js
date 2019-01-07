const {user} = require('../models/user');



const helpher={};



helpher.newUser=function(data,cb){
        let newUser =new user(data)
            newUser.save()
            .then((result)=>cb(result))
            .catch(err=>console.log(err))
}
helpher.userMessage =(sender,reciever,message)=>{
    
}

module.exports = helpher;