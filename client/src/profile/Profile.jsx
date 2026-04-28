import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../Feature/Userslice'
import { Link } from 'react-router-dom'

function Profile() {
    const user=useSelector(selectUser)
    const [imageError, setImageError] = useState(false)
  return (
    <div className="profile-wrap">
      <div className="profile-card-main">
        <div className="profile-photo-wrap">
          {user?.photo && !imageError ? (
            <img
              src={user?.photo}
              alt={user?.name || "User"}
              className='profile-photo-main'
              onError={() => setImageError(true)}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className='profile-photo-main profile-photo-fallback'>
              {(user?.name || "U").charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className='profile-main-content'>
          <h2>{user?.name || "InternArea User"}</h2>
          <p className="profile-email">{user?.email || "No email available"}</p>

          <div className='profile-meta-grid'>
            <div>
              <span>UID</span>
              <strong>{user?.uid || "-"}</strong>
            </div>
            <div>
              <span>Phone</span>
              <strong>{user?.phoneNumber || "Not provided"}</strong>
            </div>
          </div>

          <div className='profile-action-row'>
            <Link to="/userApplication" className='profile-action-btn'>
              View Applications
            </Link>
          </div>
        </div>
      </div>
    </div>
   
  )
}

export default Profile