const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://health:health@health.8tfdnav.mongodb.net/health?retryWrites=true&w=majority&appName=health')
  .then(() => {
    console.log("Connected to Payment");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
  
const paymentSchema = new mongoose.Schema({
    selectedService: {
        type: String,
        required: true
    } ,
    price: {
      type: Number,
      required: true
  }

});

const ServicePayment = mongoose.model('ServicePayment', paymentSchema);

module.exports = ServicePayment;
