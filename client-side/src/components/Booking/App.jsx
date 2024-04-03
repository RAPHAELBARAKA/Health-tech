import React, { useState } from 'react';
import BookingForm from './BookingForm';
import CompleteBookingForm from './CompleteBookingForm';

function App() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({});

  const handleBookingSubmit = (data) => {
    setBookingData(data);
    setStep(2);
  };

  return (
    <div>
      {step === 1 && <BookingForm onSubmit={handleBookingSubmit} />}
      {step === 2 && <CompleteBookingForm initialData={bookingData} />}
    </div>
  );
}

export default App;
