const mongoose = require('mongoose');
require('dotenv').config();
//mongoose url
const mongURL_local = process.env.DB_URL_LOCAL;
const mongURL=process.env.DB_URL;
mongoose.connect(mongURL_local, {

});



const db=mongoose.connection;
db.on('connected',()=>{
    console.log("server got connected");
});
db.on('disconnected',()=>{
    console.log("server got disconnected");
});
db.on('error',(err)=>{
    console.error("server got disconnected",err);
});
module.exports = db;
