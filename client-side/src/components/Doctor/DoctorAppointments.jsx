import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin-appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleApproveAppointment = async (id) => {
    try {
      await axios.put(`http://localhost:3000/approve-appointment/${id}`);
      fetchAppointments(); // Fetch appointments after approving to update the statuses
    } catch (error) {
      console.error('Error approving appointment:', error);
    }
  };

  const handleDeclineAppointment = async (id) => {
    try {
      await axios.put(`http://localhost:3000/decline-appointment/${id}`);
      fetchAppointments(); // Fetch appointments after declining to update the statuses
    } catch (error) {
      console.error('Error declining appointment:', error);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'blue', fontWeight: 'bold' }}> Appointments</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        {appointments.length === 0 ? (
          <Typography>No appointments found.</Typography>
        ) : (
          <table style={{ borderCollapse: 'collapse', border: '1px solid black', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Book For</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Selected Service</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Time</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Appointment Type</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Full Name</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Phone Number</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Gender</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Age</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment._id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.bookFor}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.selectedService}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.date}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.time}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.appointmentType}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.fullName}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.phoneNumber}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.gender}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.age}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.status}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {appointment.status === 'Pending' && (
                      <>
                        <Button variant="contained" color="primary" onClick={() => handleApproveAppointment(appointment._id)}>Approve</Button>
                        <Button variant="contained" color="warning" onClick={() => handleDeclineAppointment(appointment._id)}>Decline</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Box>
    </Box>
  );
}

export default DoctorAppointments;
