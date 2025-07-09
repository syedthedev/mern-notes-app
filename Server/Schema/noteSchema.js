import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
    title : {
        type : mongoose.Schema.Types.String,
        required : true
    },
    content : {
        type : mongoose.Schema.Types.String,
        required : true
    },
    isPinned : {
        type : mongoose.Schema.Types.Boolean,
        default : false
    },
    userId : {
        type : mongoose.Schema.Types.String,
        required : true
    },
    createdOn : {
        type : mongoose.Schema.Types.Date,
        default : new Date().getTime()
    }
});

const Note = mongoose.model('notes',noteSchema);
export default Note;