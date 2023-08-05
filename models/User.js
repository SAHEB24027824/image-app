
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
},{ collection : 'users' })

const User = mongoose.models.user || mongoose.model('user', userSchema);


module.exports = User;
