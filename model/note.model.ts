import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },  
} , {timestamps : true})

const Note = mongoose.model("Note" , NoteSchema);
export default Note;