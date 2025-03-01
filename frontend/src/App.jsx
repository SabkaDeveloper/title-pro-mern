import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Navbar from "./components/Navbar";
import Login from "./pages/Login"; 
import ForgotPassword from "./pages/ForgetPassword";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/order/Orders";
import ContactList from "./pages/Contact/ContactList";
import AdminDashboard from "./pages/admin/Admin";
import DeleteContact from "./pages/Contact/DeleteContact";
import ContactTypeList from "./pages/admin/ContactTypeTable";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && <Navbar />} 
      <div className="container mt-4">{children}</div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/deleted-contacts" element={<DeleteContact />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/contact-type" element={<ContactTypeList />} />
        </Routes>
      </Layout>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </Router>
  );
};

export default App;
