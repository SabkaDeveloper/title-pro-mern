// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; 
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login"; 
// import ForgotPassword from "./pages/ForgetPassword";
// import Dashboard from "./pages/Dashboard";
// import Orders from "./pages/order/Orders";
// import ContactList from "./pages/Contact/ContactList";
// import AdminDashboard from "./pages/admin/Admin";
// import DeleteContact from "./pages/Contact/DeleteContact";
// import ContactTypeList from "./pages/admin/ContactTypeTable";
// import OrderEntry from "./pages/order/OrderEntry";

// const Layout = ({ children }) => {
//   const location = useLocation();

//   return (
//     <>
//       {location.pathname !== "/login" && <Navbar />} 
//       <div className="container mt-4">{children}</div>
//     </>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/order-entry" element={<OrderEntry />} />
//           <Route path="/order-entry/:id" element={<OrderEntry />} />
//           <Route path="/contacts" element={<ContactList />} />
//           <Route path="/deleted-contacts" element={<DeleteContact />} />
//           <Route path="/admin" element={<AdminDashboard />} />
//           <Route path="/contact-type" element={<ContactTypeList />} />
//         </Routes>
//       </Layout>

//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
//     </Router>
//   );
// };
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import OrderEntry from "./pages/order/OrderEntry";

// Layout with Navbar - always shown
const Layout = ({ children }) => (
  <>
    <Navbar />
    <div className="container mt-4">
      {children}
    </div>
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Always accessible routes (no auth check) */}
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/orders" element={<Layout><Orders /></Layout>} />
        <Route path="/order-entry" element={<Layout><OrderEntry /></Layout>} />
        <Route path="/order-entry/:id" element={<Layout><OrderEntry /></Layout>} />
        <Route path="/contacts" element={<Layout><ContactList /></Layout>} />
        <Route path="/deleted-contacts" element={<Layout><DeleteContact /></Layout>} />
        <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
        <Route path="/contact-type" element={<Layout><ContactTypeList /></Layout>} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </Router>
  );
};

export default App;

