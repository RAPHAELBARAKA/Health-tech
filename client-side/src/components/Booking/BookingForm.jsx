import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, LinearProgress, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import PaymentDetails from '../Payments/PaymentDetails';

const services = ["Dentist", "General Checkup", "Other Service"];

const CompleteBookingForm = () => {
  const [formData, setFormData] = useState({
    bookFor: "",
    selectedService: "",
    date: "",
    time: "",
    appointmentType: "",
    fullName: "",
    phoneNumber: "",
    gender: "male",
    idNumber: "",
    age: ""
  });
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [proceedToPayment, setProceedToPayment] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(true); // Track whether to show the booking form

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/${formData.idNumber}/appointments`);
      console.log(response)
      setAppointments(response.data);
      setIsFetched(true);
      setProceedToPayment(true);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/book-appointment', formData);
      setLoading(false);
      alert("Booking submitted successfully!");
      fetchAppointments();
      // Hide the booking form after submission
      setShowBookingForm(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleProceedToPayment = () => {
    setShowPaymentDetails(true);
  };

  return (
    <Container sx={{ display: "flex" }}>
      {showBookingForm && ( // Only display booking form if showBookingForm is true
        <Container sx={{ width: "600px" }}>
          <Typography variant="h6" gutterBottom>
            Book Appointment 
          </Typography>
          <TextField
            select
            label="Book for"
            value={formData.bookFor}
            onChange={handleChange}
            name="bookFor"
            fullWidth
            variant="outlined"
            sx={{ mb: 2, textAlign: "left" }}
          >
            <MenuItem value="myself">Myself</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </TextField>
          <TextField
            select
            label="Select service"
            value={formData.selectedService}
            onChange={handleChange}
            name="selectedService"
            fullWidth
            variant="outlined"
            sx={{ mb: 2, textAlign: "left" }}
          >
            {services.map((service) => (
              <MenuItem key={service} value={service}>
                {service}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Appointment type"
            value={formData.appointmentType}
            onChange={handleChange}
            name="appointmentType"
            fullWidth
            variant="outlined"
            sx={{ mb: 2, textAlign: "left" }}
          >
            <MenuItem value="physical">Physical</MenuItem>
            <MenuItem value="virtual">Virtual</MenuItem>
          </TextField>
          <TextField
            type="date"
            label="Select date"
            value={formData.date}
            onChange={handleChange}
            name="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            type="time"
            label="Select time"
            value={formData.time}
            onChange={handleChange}
            name="time"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            name="fullName"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Gender"
            value={formData.gender}
            onChange={handleChange}
            name="gender"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
          <TextField
            label="Id Number"
            value={formData.idNumber}
            onChange={handleChange}
            name="idNumber"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            type="number"
            label="Age"
            value={formData.age}
            onChange={handleChange}
            name="age"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mb: 2 }}
          >
            {loading ? "Submitting..." : "Submit Appointment"}
          </Button>
        </Container>
      )}
      {isFetched && !showPaymentDetails && !showBookingForm && (
        <Container>
          <Typography variant="h6" gutterBottom>
            Your Booked Appointments
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Appointment Type</TableCell>
                  <TableCell>Booked For</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {appointments && (
  <TableRow key={appointments._id}>
    <TableCell>{appointments.fullName}</TableCell>
    <TableCell>{appointments.phoneNumber}</TableCell>
    <TableCell>{appointments.gender}</TableCell>
    <TableCell>{appointments.age}</TableCell>
    <TableCell>{appointments.date}</TableCell>
    <TableCell>{appointments.time}</TableCell>
    <TableCell>{appointments.selectedService}</TableCell>
    <TableCell>{appointments.appointmentType}</TableCell>
    <TableCell>{appointments.bookFor}</TableCell>
  </TableRow>
         )}
              </TableBody>
            </Table>
          </TableContainer>
          {loading && <LinearProgress sx={{ mb: 2 }} />}
          {proceedToPayment && !showPaymentDetails && ( // Conditionally render proceed to payment button
            <Button
              variant="contained"
              color="secondary"
              onClick={handleProceedToPayment}
              sx={{ mb: 2, ml: 2 }}
            >
              Proceed to Payment
            </Button>
          )}
        </Container>
      )}
      {showPaymentDetails && (
        <PaymentDetails
          selectedService={formData.selectedService}
        />
      )}
    </Container>
  );
};

export default CompleteBookingForm;