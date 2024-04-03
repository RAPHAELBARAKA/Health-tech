// AppointmentController.js

const Appointment = require("../Model/Appointment");

exports.bookAppointment = async (req, res) => {
  try {
    // Destructure the data from the request body
    const { bookFor, selectedService, date, time, appointmentType, fullName, phoneNumber, gender, age } = req.body;

    // Create a new appointment instance
    const newAppointment = new Appointment({
      bookFor,
      selectedService,
      date,
      time,
      appointmentType,
      fullName,
      phoneNumber,
      gender,
      age
    });

    // Save the appointment to the database
    await newAppointment.save();

    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'An error occurred while booking appointment' });
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

