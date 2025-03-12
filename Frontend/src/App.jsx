import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Navbar from "./components/Navbar";
import Login from "./pages/Login"; 
import ForgotPassword from "./pages/ForgetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Orders from "./pages/order/Orders";
import ContactList from "./pages/Contact/ContactList";
import AdminDashboard from "./pages/admin/Admin";
import DeleteContact from "./pages/Contact/DeleteContact";
import ContactTypeList from "./pages/admin/ContactTypeTable";
import OrderEntryForm from "./pages/order/OrderEntry";
import OrderSummary from "./pages/order/OrderSummary";
import OrderTaskPage from "./pages/order/tasks/OrderTaskPage";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar />} 
      <div className="container mt-4">{children}</div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order-entry" element={<OrderEntryForm />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/order-task" element={<OrderTaskPage />} />
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/deleted-contacts" element={<DeleteContact />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/contact-type" element={<ContactTypeList />} />
        </Routes>
      </Layout>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </Router>
  );
};

export default App;
