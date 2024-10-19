const Client = require('../models/clientModel');
const jwt = require('jsonwebtoken')
require('dotenv').config()
// Create a new employer
exports.createClient = async (req, res) => {
    try {
      const newClient = new Client({email: req.body.email, password: req.body.password});
      await newClient.save();
      res.status(201).json(newClient);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


  exports.loginClient = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const client = await Client.findOne({email: email})
        console.log(client)
        if (!client) {
            return res.status(400).json({error: "User not found"})
        }
        const isMatch = await client.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({error: "Incorrect password"})
        }
        const token = jwt.sign({
            email: client.email,
            password: client.password
        },
        process.env.token

    )
        
        
        return res.json({status: 200, token: token})
    } catch(err){
        res.json(500).json({error: "Server error"})
    }
}
  