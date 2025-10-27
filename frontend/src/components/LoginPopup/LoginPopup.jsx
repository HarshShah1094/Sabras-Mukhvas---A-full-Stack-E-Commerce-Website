import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    broj: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const endpoint = currentState === "Login" ? "/api/user/login" : "/api/user/register";
    try {
      const response = await axios.post(`${url}${endpoint}`, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Logged in successfully!");
        setShowLogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <form onSubmit={onLogin}>
          <h3>{currentState === "Login" ? "Login Here" : "Register Here"}</h3>
  
          {currentState === "Register" && (
            <>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={data.name}
                onChange={onChangeHandler}
              />
            </>
          )}
  
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={onChangeHandler}
          />
  
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={onChangeHandler}
          />
  
          <button type="submit">{currentState === "Login" ? "Log In" : "Register"}</button>
  
          <p style={{ marginTop: "20px" }}>
            {currentState === "Login" ? (
              <span onClick={() => setCurrentState("Register")}>
                Don't have an account? Register
              </span>
            ) : (
              <span onClick={() => setCurrentState("Login")}>
                Already have an account? Login
              </span>
            )}
          </p>
        </form>
      </div>
    </div>
  );
  
  
};

export default LoginPopup;
