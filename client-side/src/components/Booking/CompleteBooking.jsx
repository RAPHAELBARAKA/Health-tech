import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  LinearProgress,
  MenuItem,
} from '@mui/material';

const CompleteBookingForm = ({ initialData, onComplete }) => {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/book-appointment', formData);
      setLoading(false);
      //onComplete(formData); // Callback function to completion
      alert("Booking submitted successfully!");
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Complete Appointment Details (Step 2 of 2)
      </Typography>
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
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          "Submit Appointment"
        )}
      </Button>
      {loading && <LinearProgress sx={{ mb: 2 }} />}
    </Container>
  );
};

export default CompleteBookingForm;
