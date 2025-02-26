import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login"; 
import ForgotPassword from "./pages/ForgetPassword";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/order/Orders";

const Layout = ({ children, order }) => {
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
          <Route path="/" element={<Dashboard />}/>
          <Route path="/orders" element={<Orders/>}/>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
