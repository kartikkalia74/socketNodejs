const mongoose = require('mongoose');
const uri =`mongodb://admin:1redhat@ds151124.mlab.com:51124/chat`;
mongoose.Promise = global.Promise
mongoose.connect(uri,{useNewUrlParser:true},function(err){
    console.log(err,'connection')
})



module.exports = {mongoose}