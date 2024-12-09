const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    subscription:{
        type:String,
        enum:['Base','Premium','Premium plus'],
        default:'Base'
    }
});


userSchema.pre('save',async function(next){
    const user = this;
    // if(!(user.isModified('password')))return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashpwd = await bcrypt.hash(user.password,salt);
        user.password= hashpwd;
        next();
    } catch (err) {
        return next(err);
    }
    });
    userSchema.methods.comparePassword = async function(pwd){
        try {
            const isMatch = await bcrypt.compare(pwd,this.password);
            return isMatch;
        } catch (err) {
            throw err;
        }
    }

const User = mongoose.model('User',userSchema);
module.exports = User;