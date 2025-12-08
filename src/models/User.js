const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt')
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

// hash password before saving using the pre hook middle ware of mongodb
userSchema.pre('save', async function(next){
    // only hash a password if it's not modified 
    if(!this.isModified("password")){
        next(); 
    }
    // hash the password 
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt); 
    next(); 
})
//compile to form the model 
const User = mongoose.model('User', userSchema); 
module.exports = User; 