// AdminServiceManagementController.js

const AdminServiceManagement = require("../Model/AdminServiceManagement");
exports.addService = async (req, res) => {
  try {
    if (!req.file || !req.body.name) {
      return res.status(400).json({ message: 'Image or name missing' });
    }
    const { name } = req.body; // Extract name from request body
    const imagePath = req.file.path;
    const newService = new AdminServiceManagement({ name, image: imagePath }); // Save name along with image
    await newService.save();
    res.status(200).json({ imagePath, name }); // Send both image path and name in the response
  } catch (error) {
    console.error('Failed to upload service:', error);
    res.status(500).json({ message: 'Failed to upload service' });
  }

  /* kjkj
  */
};


exports.fetchServices = async (req, res) => {
  try {
    const services = await AdminServiceManagement.find();
    console.log('Services:', services);
    res.json({ success: true, services });
  } catch (error) {
    console.error('Failed to fetch services:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch services' });
  }
};
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await AdminServiceManagement.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Failed to delete service:', error);
    res.status(500).json({ success: false, message: 'Failed to delete service' });
  }
};
// AdminServiceManagementController.js

exports.editService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedService = await AdminServiceManagement.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedService) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, service: updatedService });
  } catch (error) {
    console.error('Failed to edit service:', error);
    res.status(500).json({ success: false, message: 'Failed to edit service' });
  }
};
