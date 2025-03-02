import React, { useState } from "react";
import "./Authorization.css";
import { loginUser, signupUser } from "../api/auth";

const Authorization = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!isLogin) {
      if (!form.name.trim()) newErrors.name = "Name is required";
      if (!form.surname.trim()) newErrors.surname = "Surname is required";
      if (!form.phone.trim()) newErrors.phone = "Phone number is required";
      if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const userData = isLogin
        ? { email: form.email, password: form.password }
        : {
            firstName: form.name,
            lastName: form.surname,
            email: form.email,
            password: form.password,
            profilePictureUrl: "",
          };

      const response = isLogin ? await loginUser(userData) : await signupUser(userData);
      alert(response.message);
    } catch (error) {
      alert("Error: " + (error.message || "Something went wrong"));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="title">{isLogin ? "Login Form" : "Signup Form"}</h2>
        <div className="toggle-buttons">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
            Signup
          </button>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
              {errors.name && <p className="error-text">{errors.name}</p>}
              <input type="text" name="surname" placeholder="Surname" value={form.surname} onChange={handleChange} required />
              {errors.surname && <p className="error-text">{errors.surname}</p>}
              <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </>
          )}
          <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
          {errors.email && <p className="error-text">{errors.email}</p>}
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          {errors.password && <p className="error-text">{errors.password}</p>}
          {!isLogin && (
            <>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            </>
          )}
          {isLogin && <a href="#" className="forgot-password">Forgot password?</a>}
          <button type="submit" className="submit-btn">{isLogin ? "Login" : "Signup"}</button>
        </form>
        <p className="switch-text">
          {isLogin ? "Not a member? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)} className="switch-link">{isLogin ? "Signup now" : "Login now"}</span>
        </p>
      </div>
    </div>
  );
};

export default Authorization;
