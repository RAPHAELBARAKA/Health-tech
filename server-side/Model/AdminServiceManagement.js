const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://health:health@health.8tfdnav.mongodb.net/health?retryWrites=true&w=majority&appName=health')
  .then(() => {
    console.log("Connected to Admin Service Management");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

const serviceSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    } ,
    name: {
      type: String,
      required: true
  }

});

const AdminServiceManagement = mongoose.model('AdminServiceManagement', serviceSchema);

module.exports = AdminServiceManagement;
