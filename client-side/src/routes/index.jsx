import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/ClientPages/LandingPage";
import LoginPage from "../pages/UserPages/LoginPage";
import ResetPasswordPage from "../pages/UserPages/ResetPasswordPage";
import VerifyOTPPage from "../pages/UserPages/VerifyOTPPage";
import DashboardPage from "../pages/ClientPages/DashboardPage";
import RegisterPage from "../pages/UserPages/RegisterPage";
import MedicalServicesPage from "../pages/ClientPages/MedicalServicesPage";
import SpecialistsPage from "../pages/ClientPages/SpecialistsPage";
import MyHealthRecordsPage from "../pages/ClientPages/MyhealthRecordsPage";
import MyAppointmentsPage from "../pages/ClientPages/MyAppoitmentsPage";
import PaymentsPage from "../pages/ClientPages/PaymentsPage";
import CustomerCarePage from "../pages/ClientPages/CustomerCarePage";
import TeleclinicsPage from "../pages/ClientPages/TeleclinicsPage";
import OtherServicesPage from "../pages/ClientPages/OtherServicesPage";
import ForgotPasswordPage from "../pages/UserPages/ForgotPasswordPage";
import ModernLabPage from "../pages/ClientPages/ModernLabPage";
import VerifypassOtpPage from '../pages/UserPages/VerifypassOtpPage'
import BookAppointmentPage from "../pages/ClientPages/BookAppointmentPage";
import AdminDashboardPage from "../pages/AdminPages/AdminDashboardPage";
import AdminBookingPage from "../pages/AdminPages/AdminBookingPage";
import DoctorRegistrationPage from '../pages/AdminPages/DoctorRegistrationPage'
import DoctorDashboardPage from "../pages/DoctorPages/DoctorDashboardPage";
import DoctorAppointmentPage from "../pages/DoctorPages/DoctorAppointmentPage";
import DoctorServicesPage from '../pages/AdminPages/AdminServicesPage'
import AdminServicesPage from "../pages/AdminPages/AdminServicesPage";
import ServicePaymentManagementpage from "../pages/AdminPages/ServicePaymentManagementpage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/medical-services" element={<MedicalServicesPage />} />
        <Route path="/specialists" element={<SpecialistsPage />} />
        <Route path="/health-records" element={<MyHealthRecordsPage />} />
        <Route path="/appointments" element={<MyAppointmentsPage />} />
        <Route path="/teleclinics" element={<TeleclinicsPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/customer-care" element={< CustomerCarePage />} />
        <Route path="/other-services" element={< OtherServicesPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/modern-lab" element={<ModernLabPage />} />
        <Route path="/verify-passotp" element={< VerifypassOtpPage />} />
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/admin-dash" element={<AdminDashboardPage />} />
        <Route path="/admin-bookings" element={<AdminBookingPage />} />
        <Route path="/register-user" element={<DoctorRegistrationPage />} />
        <Route path="/doctor-dash" element={<DoctorDashboardPage />} />
        <Route path="/doctor-appointment" element={<DoctorAppointmentPage />} />
        <Route path="/doctor-servicemanagement" element={<DoctorServicesPage />} />
        <Route path="/admin-servicemanagement" element={<AdminServicesPage />} />
        <Route path="/servicepayment" element={<ServicePaymentManagementpage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
