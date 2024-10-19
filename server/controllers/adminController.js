const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.loginAdmin = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const admin = await Admin.findOne({email: email})
        if (!admin) {
            return res.status(400).json({error: "User not found"})
        }
        const isMatch = await admin.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({error: "Incorrect password"})
        }
        const token = jwt.sign({
            email: admin.email,
            user: "admin"
        },
        process.env.token

    )
        return res.json({status: 200, token: token})
    } catch(err){
        res.json(500).json({error: "Server error"})
    }
}