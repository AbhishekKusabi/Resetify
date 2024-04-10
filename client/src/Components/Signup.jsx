import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
      dob: dob.toString(), // Convert dob to string
      age: parseInt(age),
      address,
      city,
      state,
    };

    Axios.post("http://localhost:3000/auth/signup", userData)
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        // Handle error: display error message to the user
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-columns">
          <div className="form-column">
            <label htmlFor="username">Full Name:</label>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              placeholder="Enter your address"
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <label htmlFor="city">City:</label>
            <input
              type="text"
              placeholder="Enter your city"
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <label htmlFor="state">State:</label>
            <input
              type="text"
              placeholder="Enter your state"
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="form-column">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              autoComplete="off"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              placeholder="Enter your date of birth"
              onChange={(e) => setDob(e.target.value)}
              required
            />

            <label htmlFor="age">Age:</label>
            <input
              type="number"
              placeholder="Enter your age"
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit">Sign Up</button>
        <p>
          Have an Account? <Link to="/login" style={{ color: "#ffffff" }}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
