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

  exports.addClients = async (req, res) => {
    const { email, clientEmail } = req.body; // Assuming clientId is passed in the request

    try {
        // Find the case manager by email
        const caseManager = await CaseManager.findOne({ email });

        if (!caseManager) {
            return res.status(400).json({ error: "Case Manager not found" });
        }

        // Check if clientId is already in the clients array to avoid duplicates
        if (caseManager.clients.includes(clientEmail)) {
            return res.status(400).json({ error: "Client is already added" });
        }

        // Push the new client ID into the clients array
        caseManager.clients.push(clientEmail);

        // Save the updated case manager document
        await caseManager.save();

        res.status(200).json({ message: "Client added successfully", clients: caseManager.clients });

    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: "Server error" });
    }
  }