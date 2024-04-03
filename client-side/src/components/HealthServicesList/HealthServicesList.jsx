import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Box, Typography, Button, IconButton, Avatar, CssBaseline } from '@mui/material';
import { ArrowForward, Notifications } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Notification = ({ message }) => {
  return <div>{message}</div>;
};

const HealthServicesList = () => {
  const navigate = useNavigate();
  const [avatarSrc, setAvatarSrc] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [serviceRequestsData, setServiceRequestsData] = useState([]);

  useEffect(() => {
    fetchHealthServices();
    fetchServiceRequestsData();
  }, []);

  const fetchHealthServices = async () => {
    try {
      const response = await axios.get('http://localhost:3000/fetch-services');
      setFilteredServices(response.data.services);
    } catch (error) {
      console.error('Failed to fetch health services:', error);
    }
  };

  const fetchServiceRequestsData = async () => {
    // Placeholder data - Replace with actual data fetched from your backend API
    const data = [
      { name: 'January', requests: 65 },
      { name: 'February', requests: 59 },
      { name: 'March', requests: 81 },
      { name: 'April', requests: 56 },
      { name: 'May', requests: 40 },
    ];
    setServiceRequestsData(data);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarSrc(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    const filtered = filteredServices.filter(service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc' }}>
      {/* Search Box */}
      <Box className="search-box" style={{ position: 'sticky', top: '0', backgroundColor: '#ffffff', zIndex: '999', padding: '10px', marginBottom: '30px', width: '100%', margin: '0 auto', maxWidth: '1500px', border: '1px solid #ccc', borderRadius: '0px' }}>
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Ensure onChange is updating searchQuery state
              style={{ height: '40px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px', width: '537px' }}
            />
            <Button variant="contained" sx={{ height: '40px', backgroundColor: '#C00100', marginRight:'40px' }} onClick={handleSearch}>Search</Button> {/* Ensure onClick calls handleSearch */}
          </Box>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small" sx={{ color: '#C00100', marginRight: '20px',marginLeft:'100px' }}>
              <Notifications />
            </IconButton>
            <label htmlFor="avatar-input" style={{ marginRight: '0px' }}>
              <Avatar
                alt="User Avatar"
                src={avatarSrc}
                sx={{ cursor: 'pointer' }}
                onClick={() => console.log("Avatar clicked")}
              />
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
            </label>
          </Box>
        </Box>
      </Box>

      <Box style={{ marginBottom: '30px', width: '100%', margin: '0 auto', border: '1px solid #ccc', borderRadius: '0px',marginTop:'20px', maxWidth: '1500px' }}>
        <LineChart
          width={1000}
          height={250}
          data={serviceRequestsData}
          margin={{ top: 5, right: 70, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: 'Month', position: 'insideBottom', dy: 30, color: 'blue' }} />
          <YAxis />
          <Tooltip />
          <Legend align="left" verticalAlign="middle" layout="vertical" />
          <Line type="monotone" dataKey="requests" stroke="#8884d8" />
        </LineChart>
      </Box>

      {/* Health Services List */}
      <List sx={{ display: 'flex', flexWrap: 'wrap', gap: '40px', padding: 0, marginTop: '10px', border: '1px solid #ccc', borderRadius: '0px',width:'100%',maxWidth: '1500px' }}>
        {filteredServices.map((service, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: '280px',
              height: '200px',
              borderRadius: '0px',
              overflow: 'hidden',
              textAlign: 'center',
              marginTop: '10px',
              border: '1px solid #ccc',
              
            }}
          >
            <img src={`http://localhost:3000/${service.image}`} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', color: 'white', backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4))', padding: '8px', borderRadius: '8px 8px 0 0' }}>
              <Typography variant="h6" sx={{ color: 'white' }}>{service.name}</Typography>
            </Box>
            <Button
              onClick={() => handleClick(service.route)}
              sx={{
                width: '40px',
                height: '40px',
                position: 'absolute',
                bottom: '4px',
                right: '4px',
                backgroundColor: 'white',
                color: 'black',
                fontWeight: 'bold',
                transform: 'rotate(-45deg)',
                borderRadius: '50%',
                padding: 0,
                minWidth: 0,
              }}
            >
              <ArrowForward sx={{ fontSize: 20 }} />
            </Button>
          </Box>
        ))}
      </List>

      {/* Notifications */}
      <Box style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
        <ul>
          {notifications.map((notification, index) => (
            <Notification key={index} message={notification.message} />
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default HealthServicesList;