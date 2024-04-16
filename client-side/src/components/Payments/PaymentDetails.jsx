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
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    fetchPrice(selectedService); // Fetch price when the selected service changes
  }, [selectedService]);

  const fetchPrice = async (selectedService) => {
    try {
      const response = await axios.get(`http://localhost:3000/service-price/${selectedService}`);
      setPrice(response.data.price); // Store only the price value
      setLoading(false); // Update loading state
    } catch (error) {
      console.error('Error fetching price:', error);
      setLoading(false); // Update loading state even if an error occurs
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
            <p style={{ fontSize: "12px", fontWeight: "bold" }}>Price: {loading ? 'Loading...' : (price !== null ? price : 'Price not available')}</p> {/* Display loading or price */}
            <h4>Account Details</h4>
            <p style={{ fontSize: "12px", fontWeight: "bold" }}>
              PayBill : 247247
            </p>
            <p style={{ fontSize: "12px", fontWeight: "bold" }}>
              Account Number : 247247
            </p>

            <TextField
              style={{
                width: "150px",
                padding: "'5px' '0'",
                color: "#c00100",
                borderRadius: "15px",
              }} // Set color to #c00100
              label="Enter Reference Code"
            />

            <Button
              style={{
                backgroundColor: "green",
                color: "black",
                fontSize: "10px",
                width: "175px",
                height: "40px",
                marginTop: "10px",
              }}
            >
              complete transaction
            </Button>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default PaymentDetails;