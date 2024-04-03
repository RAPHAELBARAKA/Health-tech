import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when the form is submitted
    try {
      const response = await axios.post('http://localhost:3000/password-otp', {
        email
      });
  
      alert(response.data.message);
  
      if (response.status === 200) {
        navigate('/verify-passotp', { state: { email } });
      }
    } catch (error) {
      alert('Password reset failed. Please check your email.');
      console.error('Password Reset Error:', error);
    }
    finally {
      setLoading(false); // Set loading state to false regardless of success or failure
    }
  };
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#DEE1E6' }}>
      <Box sx={{ width: 400, p: 4, borderRadius: 3, bgcolor: 'white', textAlign: 'center',height:'400px' }}>
        <Typography variant='h3' sx={{color:"#c00100",fontWeight:'bold',marginBottom:"20px"}}>TeleAfia</Typography>
        <Typography variant="h5" gutterBottom sx={{fontWeight:'bold',marginBottom:'40px'}}>______Password Reset______</Typography>
        <Typography variant="body1" gutterBottom>Enter your email address to receive a Verification Code</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            sx={{ mt: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2,backgroundColor:'#c00100',marginTop:'20px'}}
          >
            {loading ? 'Loading...' : 'Get code'}
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default ForgotPassword;
