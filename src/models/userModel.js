import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : 'string',
        required : [true, "Please enter a username"],
        unique : true
    },
    email : {
        type : 'string',
        required : [true, "Please enter a email address"],
         unique : true
    },
    password : {
        type : 'string',
        required : [true, "Please enter a password"],
    },
    isVerrified : {
        type : 'boolean',
        default : false
    },
    isAdmin : {
        type : 'boolean',
        default : false
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String
})

const User = mongoose.models.users|| mongoose.model 
("user", userSchema);

export default User;