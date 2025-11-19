const mongoose = require('mongoose'); 

//schema 
const albumSchema = new mongoose.Schema({
    title:{
        type: String, 
        required:[true, 'Album title is required'], 
        trim: true,
    }, 
    artist:{
        type: mongoose.Schema.Types.ObjectId, 
        required: [true, "Artist is required"], 
        ref:'Artist', 
    }, 
    releaseDate:{
        type: Date, 
        default: Date.now(), 
    }, 
    coverImage:{
        type: String,  
        default: 'https://cdn.pixabay.com/photo/2017/10/08/20/37/printer-cd-2831538_1280.png'
    },  
    songs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        }
    ], 
    genre:{
        type: String, 
        trim: true, 
    }, 
    likes:{
        type: Number, 
        default: 0, 
    }, 
    likedAlbums:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Album'
        }
    ], 
    followedArtists:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist'
        }
    ], 
    followedPlaylists:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Playlist'
        }
    ],
}, {
    timestamps: true, 
}); 

//compile to form the model 
const User = mongoose.model('User', albumSchema); 
module.exports = User; 