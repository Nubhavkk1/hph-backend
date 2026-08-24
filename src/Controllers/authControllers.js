const User = require("../Models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async(req, res) => {
    try{
    const {username, password, role} = req.body;

    const allowedRoles = ["patient"];
    if(!allowedRoles.includes(role)){
        return res.status(403).json({message: `Registration is only allowed for patients, login for physiotherapist and admin`});
    }

    const hashedPasswod = await bcrypt.hash(password, 10);

    const newUser = new User({username, password: hashedPasswod, role});
    await newUser.save();
    res.status(201).json({message: `User registered with ${username}`});
    }catch (err) {
        console.error(err);
         res.status(500).json({message: err.message});
    }
};

const login = async(req, res) => {
    try{
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if(!user){
        return res.status(404).json({message: `User with ${username} not found`});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch){
        return res.status(400).json({messgae: `Invalid credentials`})
    }
    const token = jwt.sign(
        {id: user._id, role: user.role},process.env.JWT_SECRET,
        {expiresIn: "1hr"}
    );

    res.status(200).json({token});

    }catch(err){
         console.error(err);
         res.status(500).json({message: err.message});
    }
};

module.exports = {
    register,
    login
}