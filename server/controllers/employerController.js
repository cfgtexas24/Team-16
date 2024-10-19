const Employer = require('../models/employerModel');

// Get all employers
exports.getAllEmployers = async (req, res) => {
  try {
    const employers = await Employer.find();
    res.status(200).json(employers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new employer
exports.createEmployer = async (req, res) => {
  try {
    const newEmployer = new Employer(req.body);
    await newEmployer.save();
    res.status(201).json(newEmployer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllPositions = async (req, res) => {
    try {
      const employer = await Employer.findById(req.params.id).populate('listings');
      if (!employer) {
        return res.status(404).json({ message: 'Employer not found' });
      }
      res.status(200).json(employer.listings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.loginEmployer = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const employer = await Employer.findOne({email: email})
        if (!employer) {
            return res.status(400).json({error: "User not found"})
        }
        const isMatch = await employer.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({error: "Incorrect password"})
        }
        const token = jwt.sign({
            email: employer.email,
            user: "employer"
        },
        process.env.token

    )
        
        
        return res.json({status: 200, token: token})
    } catch(err){
        res.json(500).json({error: "Server error"})
    }
}