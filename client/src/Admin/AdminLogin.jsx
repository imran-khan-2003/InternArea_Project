import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

function AdminLogin() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const LoginAdmin = async () => {
    if(username===""||password===""){
      alert("Fill the Blanks")
    }
    else{
      const bodyjson={
            username:username,
            password:password
      }
      axios.post("/api/admin/adminLogin",bodyjson).then((res)=>{
            console.log(res,"data is sent")
            alert("success")
            navigate("/adminpanel");
      }).catch((err)=>{
            console.log(err)
      })
    }
  };
  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Portal</h1>
        <p>Sign in to manage applications, internships, and jobs.</p>

        <div className="admin-login-grid">
          <div className="admin-field">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              id="name"
              name="name"
              placeholder="Enter admin username"
            />
          </div>
          <div className="admin-field">
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              id="pass"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
        </div>

        <button onClick={LoginAdmin} className="bt3">
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
