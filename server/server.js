require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')



const app = express();

const employerRoutes = require('./routes/employerRoutes');
const clientRoutes = require('./routes/clientRoutes');


app.use(cors());
app.use(express.json());



app.use('/api/employers', employerRoutes);
app.use('/api/client', clientRoutes);


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




// ... other app configurations ...