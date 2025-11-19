const mongoose = require('mongoose'); 

//schema 
const userSchema = new mongoose.Schema({
    name:{
        type: String, 
        required:[true, 'Name is required'], 
        trim: true,
    }, 
    email:{
        type: String, 
        required:[true, 'Email is required'], 
        trim: true,
    }, 
    password:{
        type: String, 
        required:[true, 'Password is required'], 
        minlength:[6, 'Password must  be at least 6 characters']
    }, 
    profilePicture:{
        type: String,  
        default: 'https://cdn.pixabay.com/photo/2013/07/13/12/46/user-160319_1280.png'
    }, 
    isAdmin:{
        type: Boolean,  
        default: false, 
    }, 
    likedSongs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        }
    ], 
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
const User = mongoose.model('User', userSchema); 
module.exports = User; 