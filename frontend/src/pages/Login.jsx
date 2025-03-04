import React, { useState } from "react";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import backgroundImage from "../assets/Background.png";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import axios from "axios";

// Add this utility function at the top
const setTokenWithExpiry = (token, user) => {
  const now = new Date();
  const item = {
    token: token,
    user: user,
    expiry: now.getTime() + 24 * 60 * 60 * 1000, // 24 hours from now
  };
  localStorage.setItem('token', JSON.stringify(item));
};

const Login = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [apiError, setApiError] = useState(""); // To show API error if login fails
  const [loading, setLoading] = useState(false); // To show loading state when calling API

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {
      email: validator.isEmail(emailOrPhone) ? "" : "Invalid email format",
      password: validator.isLength(password, { min: 6 })
        ? ""
        : "Password must be at least 6 characters",
    };
  
    setErrors(newErrors);
  
    if (newErrors.email || newErrors.password) {
      return;
    }
  
    setLoading(true);
    setApiError("");
  
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/Login",
        {
          emailOrPhone,
          password,
        }
      );
  
      console.log("API Response Data:", response.data);
  
      const { token, user } = response.data;
  
      // Store token with expiration
      setTokenWithExpiry(token, user);
      
      // Store user ID separately if needed
      localStorage.setItem('userId', user.id);
  
      navigate("/");
    } catch (error) {
      console.error("Login failed", error.response?.data?.message || error.message);
      setApiError(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        overflow: "hidden",
      }}
    >
      <Card
        style={{
          width: "500px",
          height: "380px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-69px)",
        }}
      >
        <Card.Body>
          <h3 className="text-center mb-4">
            <span style={{ color: "#007bff" }}>Title</span>Pro
          </h3>

          {apiError && (
            <div className="alert alert-danger text-center">{apiError}</div>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
              {errors.email && (
                <div className="text-danger small">{errors.email}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <InputGroup className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="position-absolute"
                  style={{
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#6c757d",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </span>
              </InputGroup>
              {errors.password && (
                <div className="text-danger small">{errors.password}</div>
              )}
            </Form.Group>

            <div className="text-end mb-3">
              <span
                className="text-primary text-decoration-none"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </span>
            </div>

            <Button
              className="w-100"
              variant="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

// Add these utility functions that you can use across your app
export const getToken = () => {
  const tokenString = localStorage.getItem('token');
  if (!tokenString) {
    return null;
  }

  try {
    const item = JSON.parse(tokenString);
    const now = new Date();
    
    // Check if the token has expired
    if (now.getTime() > item.expiry) {
      // Token has expired, remove it
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      return null;
    }
    
    return item.token;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  return getToken() !== null;
};

export const clearToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};

export default Login;