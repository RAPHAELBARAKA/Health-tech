import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; // Import Typography component
import { Link } from 'react-router-dom';

function DoctorDashboard() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom> {/* Use Typography component with variant */}
        Doctor Dashboard
      </Typography>
      <Button
        component={Link}
        to="/doctor-appointment"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Appointments
      </Button>
    </Box>
  );
}

export default DoctorDashboard;
