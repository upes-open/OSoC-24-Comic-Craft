const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    username: { type: String, required: true, unique: true },
});


// Create the model based on the schema
const User = mongoose.model('User', userSchema);
module.exports = User;