import React, { useState } from "react";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import backgroundImage from "../assets/Background.png";
import { useNavigate } from "react-router-dom";
import validator from "validator"; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: validator.isEmail(email) ? "" : "Invalid email format",
      password: validator.isLength(password, { min: 6 })
        ? ""
        : "Password must be at least 6 characters",
    };

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      console.log("Logging in...");
      navigate("/")
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
          height: "350px",
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

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="text-danger small">{errors.email}</div>}
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
              {errors.password && <div className="text-danger small">{errors.password}</div>}
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

            <Button className="w-100" variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
