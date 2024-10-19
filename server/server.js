require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());


// Listen for requests
app.listen(process.env.PORT, () => {
    console.log(`Connected to DB and Listening on port ${process.env.PORT}`)
})


// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected.");
    })
    .catch((error) => {
        console.error(error)
    })
