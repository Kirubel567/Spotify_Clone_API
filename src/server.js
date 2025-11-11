const express = require('express'); 
const mongoose = require('mongoose'); 
const dotenv = require('dotenv'); 
//load env variables
dotenv.config(); 
//Initialize app
const app = express(); 

//Connect to db 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('database connected successfully'); 
}).catch((err)=>{
    console.log("error connecting to the database", err.message)
})

//start the server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, ()=>{
    console.log("...server connected on port", PORT)
})