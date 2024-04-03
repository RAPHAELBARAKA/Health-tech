const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://health:health@health.8tfdnav.mongodb.net/health?retryWrites=true&w=majority&appName=health')
  .then(() => {
    console.log("Connected to User management");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
const newSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    passOtp: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'doctor'],
        default: 'user' // Set default value to 'user'
    }
});

const collection = mongoose.model("collection", newSchema);

module.exports = collection;


