require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());


// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});