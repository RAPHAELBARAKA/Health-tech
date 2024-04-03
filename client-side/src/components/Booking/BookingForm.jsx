import React, { useState } from 'react';
import CompleteBookingForm from '../Booking/CompleteBooking';
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  LinearProgress,
  MenuItem,
} from '@mui/material';

const services = ["Dentist", "General Checkup", "Other Service"];

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    bookFor: "",
    selectedService: "",
    date: "",
    time: "",
    appointmentType: "",
    fullName: "",
    phoneNumber: "",
    gender: "",
    age: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleBookingSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  return (
    <div>
      {step === 1 && (
        <Container maxWidth="sm">
          <Typography variant="h5" gutterBottom>
            Book Appointment (Step 1 of 2)
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
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleBookingSubmit}
            disabled={
              !formData.bookFor ||
              !formData.selectedService ||
              !formData.date ||
              !formData.time ||
              !formData.appointmentType ||
              loading
            }
            sx={{ mb: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              "Next: Complete Booking Details"
            )}
          </Button>
          {loading && <LinearProgress sx={{ mb: 2 }} />}
        </Container>
      )}
      {step === 2 && <CompleteBookingForm initialData={formData} />}
    </div>
  );
};

export default BookingForm;
