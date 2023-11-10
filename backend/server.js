const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config()

const cors = require('cors')

app.use(cors());

const userRouter = require('./routes/userRoute');

app.use(express.json())

mongoose.connect(process.env.URI).
then(() => {
    console.log("connected succesfully");

    
app.listen(process.env.PORT || 5000, (error) => {
    if(error) console.log(error);

    console.log("Server is running at", process.env.PORT)
})
}).catch((error) => {
    console.log('error', error)
})

app.use("/api/user", userRouter) // api
