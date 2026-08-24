const mongoose = require('mongoose');

const patientSchema = new moongoose.Schema({
    user: {
        type: moonoose.Schema.Types.ObjecttID,
        ref: "User",
        required: true,
        unique: true
    },
    name: {
        Type: String,
        required: true 
    },
    phoneno: {
        Type: Number,
        required: true
    },
    gender: {
        Type: String,
        enun: ["Male","Female"]
    },
    age: Number,
    address: String,
    
                

},{timestamps: true});

module.exports = mongoose.model("Patient", patientSchema)