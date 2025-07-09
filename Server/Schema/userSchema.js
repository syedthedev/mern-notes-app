import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name : {
        type : mongoose.Schema.Types.String,
        required : true
    },
    email : {
        type : mongoose.Schema.Types.String,
        required : true,
        unique : true
    },
    password : {
        type : mongoose.Schema.Types.String,
        required : true
    },
    createdOn : {
        type : mongoose.Schema.Types.Date,
        default : new Date().getTime()
    }
});

const User = mongoose.model('users',userSchema);
export default User;