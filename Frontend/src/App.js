import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Common/Navbar";
import HomePage from "./Pages/Dashboards";
import Contacts from "./Pages/Contacts";
import ContactTypeList from "./Components/Core/Admin/ContactType/ContactTypeTable";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/admin/contact-type" element={<ContactTypeList />} /> {/* Added this route */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
