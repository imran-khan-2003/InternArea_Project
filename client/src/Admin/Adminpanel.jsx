import React from 'react'
import { Link } from 'react-router-dom'
import { RiSendPlaneFill } from "react-icons/ri";
import { BsMailbox2Flag } from "react-icons/bs";
function Adminpanel() {
  return (
    <div className="admin-panel-wrap">
      <div className="admin-panel-card">
        <h1>Admin Dashboard</h1>
        <p>Manage listings and applications from one place.</p>

        <div className="admin-panel-grid">
          <Link to={"/applications"} className="admin-panel-item">
            <span className="admin-item-icon">
              <BsMailbox2Flag />
            </span>
            <div>
              <h3>View Applications</h3>
              <p>Review candidate applications and update statuses.</p>
            </div>
          </Link>

          <Link to={"/postJob"} className="admin-panel-item">
            <span className="admin-item-icon">
              <i className="bi bi-briefcase"></i>
            </span>
            <div>
              <h3>Post Job</h3>
              <p>Create and publish full-time or part-time job listings.</p>
            </div>
          </Link>

          <Link to={"/postInternship"} className="admin-panel-item">
            <span className="admin-item-icon">
              <RiSendPlaneFill />
            </span>
            <div>
              <h3>Post Internship</h3>
              <p>Add internship opportunities for students and freshers.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>

  )
}

export default Adminpanel