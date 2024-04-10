import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Annapurna Magadum",
    age: "21",
    gender: "female",
    location: "Sahyadri Nagar, Belagavi",
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/auth/update-profile", formData);
      setEditing(false); // Update editing state after successful save
    } catch (error) {
      console.error("Error saving profile:", error);
      // Handle error, display message to the user, etc.
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3000/auth/verify").then((res) => {
      if (!res.data.status) {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="container">
      <div className="profile">
        <div className="profile-photo">
        <img src="./profile_image.jpg" alt="profile pic" />
        </div>
        <div className="profile-info">
          {editing ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
              <button onClick={handleSubmit}>Save</button>
            </>
          ) : (
            <>
              <h2>{formData.name}</h2>
              <table>
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>{formData.name}</td>
                  </tr>
                  <tr>
                    <td>Age:</td>
                    <td>{formData.age}</td>
                  </tr>
                  <tr>
                    <td>Gender:</td>
                    <td>{formData.gender}</td>
                  </tr>
                  <tr>
                    <td>Location:</td>
                    <td>{formData.location}</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
      <div className="profile-info">
        <h1>{formData.name}</h1>
        <p>
          <strong>INVESTIGATION:</strong> The patient is currently suffering
          from a high fever...
        </p>
        <div className="btn-container">
          <button className="btn" onClick={handleEdit}>
            Edit
          </button>
          <br /><br />
          <button className="btn" onClick={handleSubmit}>
            Save
          </button>
          <br />
          <br />
          <button className="btn" onClick={() => navigate("/")}>
            Home Page
          </button>
        </div>
      </div>
    
    </div>
    
  );
};

export default Dashboard;
