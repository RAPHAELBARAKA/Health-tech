// PaymentController.js
const ServicePayment = require("../Model/Payment");

exports.servicePrice = async (req, res) => {
  try {
    if (!req.body.price || !req.body.selectedService) {
      return res.status(400).json({ message: 'Name or price missing' });
    }
    const { selectedService, price } = req.body;
    const newPrice = new ServicePayment({ selectedService, price });
    await newPrice.save();
    res.status(200).json({ selectedService, price });
  } catch (error) {
    console.error('Failed to add price:', error);
    res.status(500).json({ message: 'Failed to add price' });
  }
};
exports.getServicePrice = async (req, res) => {
  try {
    const { selectedService } = req.params;
    const servicePayment = await ServicePayment.findOne({ selectedService });
    if (!servicePayment) {
      return res.status(404).json({ message: 'Service price not found' });
    }
    res.status(200).json({ price: servicePayment.price });
  } catch (error) {
    console.error('Failed to fetch service price:', error);
    res.status(500).json({ message: 'Failed to fetch service price' });
  }
};