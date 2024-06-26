import React from 'react'
import { Box } from '@mui/system';
import Sidebar from '../../components/SideBar/SideBar'
import BookingForm from '../../components/Booking/BookingForm';




const BookAppointmentPage = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ marginTop: '0px', overflowY: 'auto', height: 'calc(100vh - 48px)', position: 'relative', marginLeft: '0px',width:"1200px"}}>
        <BookingForm />
      </Box>
    </Box>
  );
}

export default BookAppointmentPage
