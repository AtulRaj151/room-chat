const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const adminSchema = new mongoose.Schema({
    _id: {
        type: String,
        default:  () => uuidv4().replace(/\-/g, ""),
    },
        username: String,
        password: String,
},{
    timestamps: true,
    collection: 'admin'
})


module.exports = mongoose.model('Admin', adminSchema);