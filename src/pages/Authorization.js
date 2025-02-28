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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isLogin ? await loginUser(form) : await signupUser(form);
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
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
              <input type="text" name="surname" placeholder="Surname" value={form.surname} onChange={handleChange} required />
              <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
            </>
          )}
          <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          {!isLogin && <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />}
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
