import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password
      });
 
      alert(response.data.message);
  
      if (response.status === 200) {
        if (response.data.isAdmin) {
          navigate('/admin-dash');
        } else if (response.data.isDoctor) {
          navigate('/doctor-dash'); // Assuming doctor dashboard route is '/doctor-dash'
        } else {
          if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
            localStorage.setItem('rememberedPassword', password);
          } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
          }
          navigate('/dashboard');
        }
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
      console.error('Login Error:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor:'grey'
      }}
    >
    
        <Box
          sx={{
            width: 400,
            p: 4,
            borderRadius: 3,
            bgcolor: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ color: 'brown', fontWeight: 'bold', marginBottom: 4 }}>TeleAfia</Typography>
          <Typography variant="h5" gutterBottom sx={{ marginBottom: '35px', fontWeight: 'bold' }}>_______Login______</Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="outlined"
                placeholder='Enter your email'
                required
                fullWidth
              /><br /><br />
            </div>
            <div>
              <TextField
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="outlined"
                placeholder='Enter your password'
                required
                fullWidth
              /><br /><br />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                inputProps={{ 'aria-label': 'Remember me' }}
              />
              <Typography>Remember me</Typography>
              <Link to='/forgot-password'style={{ cursor: 'pointer', marginLeft: 'auto', color: '#c00100' }} >Forgot password?</Link>
            </div>
            <br />
            <Button type='submit' variant="contained" sx={{ backgroundColor: 'brown', width: '300px' }}>Login</Button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form><br />
          <div>
            <Link to='/register' style={{ textDecoration: 'none', color: '#c00100' }}> Don't have an account? Sign Up </Link>
          </div>
        </Box>
    
    </Box>
  );
}

export default Login;
