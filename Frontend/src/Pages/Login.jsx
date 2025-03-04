import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import axios from "axios";
import backgroundImage from "../assets/Background.png";

// ✅ Import auth utilities
import { setTokenWithExpiry } from "../utils/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Improved validation logic
  const validateInput = () => {
    const isEmail = validator.isEmail(emailOrPhone);
    const isPhone = validator.isMobilePhone(emailOrPhone, "en-IN");

    return {
      email: isEmail || isPhone ? "" : "Invalid email or phone format",
      password: password.length >= 6 ? "" : "Password must be at least 6 characters",
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate inputs
    const newErrors = validateInput();
    setErrors(newErrors);
    if (newErrors.email || newErrors.password) return;
  
    setLoading(true);
    setApiError("");
  
    try {
      const response = await axios.post("http://localhost:4000/api/v1/login", {
        emailOrPhone,
        password,
      });
  
      const { token, user } = response.data;
  
      if (!token || !user) {
        throw new Error("Invalid response from server");
      }
  
      // ✅ Store token and user data securely
      setTokenWithExpiry(token, user);
  
      // ✅ Store user ID separately in localStorage
      localStorage.setItem("userId", user.id);
      console.log("User ID:", user.id);
  
      navigate("/");
  
      console.log("API Response Data:", response.data);
    } catch (error) {
      setApiError(error.response?.data?.message || "Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div
      className="flex justify-center items-center w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-center mb-4 text-blue-600">
          <span className="text-gray-800">Title</span>Pro
        </h3>

        {/* ✅ Show API error if exists */}
        {apiError && (
          <div className="bg-red-100 text-red-700 text-center py-2 mb-3 rounded">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* ✅ Email/Phone Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter email or phone number"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* ✅ Password Input */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full p-3 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute top-3 right-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </span>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* ✅ Forgot Password */}
          <div className="text-right mb-4">
            <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </span>
          </div>

          {/* ✅ Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
