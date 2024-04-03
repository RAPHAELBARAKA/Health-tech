const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const app = express();

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


// Import controllers
const UserController = require('./Controller/UserController');
const AppointmentController = require('./Controller/AppointmentController');
const AdminServiceManagementController = require('./Controller/AdminServiceManagementController');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Initialize session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));


// User routes
app.post("/", UserController.registerUser);
app.post("/verify-otp",UserController.verifyOtp);
app.post("/resend-otp",UserController.resendOtp);
app.post("/login", UserController.loginUser);
app.post("/password-otp", UserController.sendPasswordOTP);
app.post("/verifypassword-otp", UserController.verifyPasswordOTP);
app.post("/resendpass-otp", UserController.resendPasswordOTP);
app.post("/resetpassword", UserController.resetPassword);

app.post('/book-appointment', AppointmentController.bookAppointment);
app.get('/admin-appointments', AppointmentController.getAdminAppointments);
app.put('/approve-appointment/:id', AppointmentController.approveAppointment);
app.put('/decline-appointment/:id', AppointmentController.declineAppointment);

// Admin Service Management routes
app.post('/add-service', upload.single('image'), AdminServiceManagementController.addService); // Use upload middleware
app.get('/fetch-services', AdminServiceManagementController.fetchServices);
app.delete('/delete-service/:id', AdminServiceManagementController.deleteService);
app.put('/edit-service/:id', AdminServiceManagementController.editService);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
