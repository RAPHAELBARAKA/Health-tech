// AppointmentController.js
const Appointment = require("../Model/Appointment");

exports.bookAppointment= async (req, res) => {
    try {
      const { selectedService, date, time, appointmentType, bookFor, fullName, phoneNumber, gender, idNumber, age } = req.body;

      const newAppointment = new Appointment({
        selectedService,
        date,
        time,
        appointmentType,
        bookFor,
        fullName,
        phoneNumber,
        gender,
        idNumber,
        age
      });

      await newAppointment.save();

      res.status(201).json({ message: 'Appointment booked successfully', createdAt: newAppointment.createdAt });
    } catch (error) {
      console.error('Error booking appointment:', error);
      res.status(500).json({ message: 'An error occurred while booking appointment' });
    }
  }
  exports.getUserAppointments = async (req, res) => {
    try {
      const { idNumber } = req.params;
  
      // Find the most recent appointment based on the idNumber used for booking
      const appointment = await Appointment.findOne({ idNumber }).sort({ createdAt: -1 }).limit(1);
      
      if (!appointment) {
        return res.status(404).json({ message: 'No appointments found for the provided idNumber' });
      }
  
      res.status(200).json(appointment);
    } catch (error) {
      console.error('Error fetching appointment:', error);
      res.status(500).json({ message: 'An error occurred while fetching appointment' });
    }
  };
  
exports.getAdminAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'An error occurred while fetching appointments' });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'An error occurred while deleting appointment' });
  }
};

exports.approveAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndUpdate(id, { status: 'Approved' });
    res.status(200).json({ message: 'Appointment approved successfully' });
  } catch (error) {
    console.error('Error approving appointment:', error);
    res.status(500).json({ message: 'An error occurred while approving appointment' });
  }
};

exports.declineAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndUpdate(id, { status: 'Declined' });
    res.status(200).json({ message: 'Appointment declined successfully' });
  } catch (error) {
    console.error('Error declining appointment:', error);
    res.status(500).json({ message: 'An error occurred while declining appointment' });
  }
};