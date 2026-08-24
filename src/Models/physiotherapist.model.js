const mongoose = require('mongoose')

const physioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: user,
        required: true,
        unique: true
    },
    name: {
        Type: String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model("Physiotherapist", physioSchema);