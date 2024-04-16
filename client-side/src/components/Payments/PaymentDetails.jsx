import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function PaymentDetails({ selectedService }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#c00100",
      },
    },
  });

  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  
  useEffect(() => {
    fetchPrice(selectedService);
  }, [selectedService]);

  const fetchPrice = async (selectedService) => {
    try {
      const response = await axios.get(`http://localhost:3000/service-price/${selectedService}`);
      setPrice(response.data.price);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching price:', error);
      setLoading(false);
    }
  };

  const initiatePayment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/initiate-payment', {
        phoneNumber,
        amount: price
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          marginTop: "60px",
          marginLeft: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            backgroundColor: "#D9D9D9",
            borderRadius: "15px",
            padding: "20px",
            width: "250px",
            height: "450px",
            textAlign: "center",
          }}
        >
          <CardContent>
            <h4
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "15px",
                paddingTop: "5px",
                borderBottom: "1px solid black",
              }}
            >
              Billing Information
            </h4>
            <h4>Service-Consultation</h4>
            <p style={{ fontSize: "12px", fontWeight: "bold" }}>Selected Service: {selectedService}</p>
            <p style={{ fontSize: "12px", fontWeight: "bold" }}>Price: {loading ? 'Loading...' : (price !== null ? price : 'Price not available')}</p>

            <TextField
              style={{
                width: "150px",
                padding: "'5px' '0'",
                color: "#c00100",
                borderRadius: "15px",
              }}
              label="Enter Mpesa-phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <Button
              onClick={initiatePayment}
              style={{
                backgroundColor: "green",
                color: "black",
                fontSize: "10px",
                width: "175px",
                height: "40px",
                marginTop: "10px",
              }}
            >
              Complete Transaction
            </Button>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default PaymentDetails;
