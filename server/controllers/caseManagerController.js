const CaseManager = require('../models/caseManagerModel');
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.logincaseManager = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const caseManager = await CaseManager.findOne({email: email})
        if (!caseManager) {
            return res.status(400).json({error: "User not found"})
        }
        const isMatch = await caseManager.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({error: "Incorrect password"})
        }
        const token = jwt.sign({
            email: caseManager.email,
            user: "mentor"
        },
        process.env.token

    )
        return res.json({status: 200, token: token})
    } catch(err){
        res.json(500).json({error: "Server error"})
    }
}
exports.createCaseManager = async (req, res) => {
    try {
      const newCaseManager = new CaseManager({email: req.body.email, password: req.body.password});
      await newCaseManager.save();
      res.status(201).json(CaseManager);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
