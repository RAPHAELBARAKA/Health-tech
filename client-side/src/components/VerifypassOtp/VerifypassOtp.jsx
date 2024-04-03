import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Link } from '@mui/material';


function VerifypassOtp() {
    const [passOtp, setPassOtp] = useState('');
    const [loadingVerify, setLoadingVerify] = useState(false);
    const [loadingResend, setLoadingResend] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
   
    const email = location.state?.email || '';

    const handleInputChange = (value) => {
        setPassOtp(value);
    };

    const handleVerifyPassOTP = async (e) => {
        e.preventDefault();
        setLoadingVerify(true);

        try {
            const response = await axios.post("http://localhost:3000/verifypassword-otp", { enteredPassOTP: passOtp });

            if (response.status === 200) { 
                alert('OTP verified');
                navigate('/reset-password');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("An error occurred during OTP verification. Please try again later.");
        }
    
        setLoadingVerify(false);
    };

    const handleResendPassOTP = async () => {
        setLoadingResend(true);
        
        try {
            const response = await axios.post("http://localhost:3000/resendpass-otp", { email });

            if (response.status === 200) {
                alert(response.data.message);
            } else {
                alert("Failed to resend OTP. Please try again later.");
            }
        } catch (error) {
            console.error("Error resending OTP:", error);
            alert("An error occurred while resending OTP. Please try again later.");
        }

        setLoadingResend(false);
    };
        
    return (
        <Box sx={{ backgroundColor: '#DEE1E6', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box className='ver2' sx={{ padding: 3, borderRadius: 3, backgroundColor: 'white', textAlign: 'center',width:'400px',height:'500px' }}>
                <Typography variant="h3" color='primary' gutterBottom sx={{ fontWeight: 'bold',color:'#c00100' }}>TeleAfia</Typography>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold',marginBottom:'30px' }}>_____OTP Verification_____</Typography>
                <Typography gutterBottom>A verification code has been sent to <span style={{color:'blue'}}>{email}</span>. If the email address is incorrect, you can go back and change it.</Typography>
                <Typography gutterBottom sx={{marginTop:'20px',marginBottom:'10px'}}>Enter OTP sent to your device here</Typography>
                <form onSubmit={handleVerifyPassOTP}>
                    <TextField
                        label="OTP"
                        variant="outlined"
                        type="text"
                        value={passOtp}
                        onChange={(e) => handleInputChange(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" disabled={loadingVerify} sx={{ mr: 0,backgroundColor:'#c00100' }}>
                        {loadingVerify ? 'Loading...' : 'Verify OTP'}
                    </Button>
                </form>
                <Button onClick={handleResendPassOTP} disabled={loadingResend} sx={{marginTop:'20px',border: '1px solid black',backgroundColor: 'white', }}>
                    {loadingResend ? 'Loading...' : 'Resend OTP'}
                </Button>
            </Box>
        </Box>
    );
}

export default VerifypassOtp;
