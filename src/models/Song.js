const mongoose = require('mongoose'); 

//schema 
const songSchema = new mongoose.Schema({
    title:{
        type: String, 
        required:[true, 'Song title is required'], 
        trim: true,
    }, 
    artist:{
        type: mongoose.Schema.Types.ObjectId,  
        ref: "Artist", 
        required:[true, 'Artist is required'], 
    }, 
    album:{
        type: mongoose.Schema.Types.ObjectId,  
        ref: "Album",  
    }, 
    duration:{
        type: Number, 
        required:[true, 'Song duration is required'], 
    }, 
    audioUrl:{
        type: String, 
        required:[true, 'Audio is required'], 
    }, 
    coverImage:{
        type: String,  
        default: 'https://cdn.pixabay.com/photo/2022/04/10/16/33/man-7123760_1280.png'
    },  
    releasedDate:{
        type: Date, 
        default: Date.now(),  
    }, 
    genre:{
            type: String,
            trim: true, 
    }, 
    plays:{
        type: Number, 
        default: 0, 
    }, 
    likes:{
            type: Number, 
            default: 0, 
    },
    isExplicit:{
            type: Boolean, 
            default: false, 
    },  
    featuredArtists:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Artist", 
        }
    ], 
}, {
    timestamps: true, 
}); 

//compile to form the model 
const Song = mongoose.model('Song', songSchema); 
module.exports = Song; 