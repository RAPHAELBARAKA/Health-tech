const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://health:health@health.8tfdnav.mongodb.net/health?retryWrites=true&w=majority&appName=health')
  .then(() => {
    console.log("Connected to Booking appointment");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

const appointmentSchema = new mongoose.Schema({
  bookFor: { type: String, required: true },
  selectedService: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },      
  appointmentType: { type: String, required: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, required: true },
  idNumber: { type: String, required: true },      
  age: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Declined'], default: 'Pending' },
  createdAt: { 
    type: Date, 
    default: Date.now // Use the server's current time
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
