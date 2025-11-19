const mongoose = require('mongoose'); 

//schema 
const playlistSchema = new mongoose.Schema({
    name:{
        type: String, 
        required:[true, 'playlist name is required'], 
        trim: true,
    }, 
    description:{
        type: String, 
        trim: true,  
    }, 
    coverImage:{
        type: String,  
        default: 'https://cdn.pixabay.com/photo/2022/04/10/16/33/man-7123760_1280.png'
    }, 
    creator:{
        type: mongoose.Schema.Types.ObjectId,  
        ref: "User",
        required: [true, "Creator is required"],   
    }, 
    songs:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Song", 
        }
    ], 
    isPublic:{
        type: Boolean, 
        default: false,  
    }, 
    followers:{
        type: Number, 
        default: 0,  
    }, 
    collaborators:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
        }
    ], 
}, {
    timestamps: true, 
}); 

//compile to form the model 
const Playlist = mongoose.model('Playlist', playlistSchema); 
module.exports = Playlist; 