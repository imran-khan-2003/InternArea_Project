import React, { useEffect, useState } from 'react'
import logo from "../../Assets/logo.png"
import './Sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUser } from '../../Feature/Userslice';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");
  const [profileImageError, setProfileImageError] = useState(false);
  const navigate=useNavigate()
  const user=useSelector(selectUser)

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  useEffect(() => {
    setProfileImageError(false);
  }, [user?.photo]);

  const logoutFunction=()=>{
    signOut(auth)
    navigate("/")
    closeSidebar()
  }

  const handleMobileSearch = () => {
    const value = mobileSearch.trim();
    if (!value) return;
    navigate(`/internships?q=${encodeURIComponent(value)}`);
    setMobileSearch("");
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleMobileSearch();
    }
  };

  return (

    <>
      <div className="App2">
        <div className="mobile-topbar">
          <button type="button" className="open-btn" onClick={openSidebar} aria-label="Open menu">
            <i className="bi bi-list"></i>
          </button>

          <Link to="/" className="mobile-logo" onClick={closeSidebar}>
            <img src={logo} alt="InternArea" id='nav2-img'/>
          </Link>

          <div className="mobile-actions">
            {!user && (
              <Link to="/register" className="mobile-mini-btn">Register</Link>
            )}
          </div>
        </div>

        <div className="search2">
          <button type='button' className='mobile-search-trigger' onClick={handleMobileSearch} aria-label="Search internships">
            <i className="bi bi-search"></i>
          </button>
          <input
            type="search"
            placeholder='Search internships...'
            value={mobileSearch}
            onChange={(e)=>setMobileSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
      </div>

      <div
        className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`}
      />

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button
          type="button"
          className="sidebar-close-icon-btn"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        >
          ×
        </button>

        <div className="sidebar-scroll">
          {user ? (
            <div className="sidebar-profile">
              <Link to={"/profile"}>
                {user?.photo && !profileImageError ? (
                  <img
                    className='sidebar-avatar'
                    src={user.photo}
                    alt={user?.name || "Profile"}
                    onError={() => setProfileImageError(true)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className='sidebar-avatar sidebar-avatar-fallback'>
                    {(user?.name || "U").charAt(0).toUpperCase()}
                  </div>
                )}
              </Link>
              <p className='text-center'>Hi, <span>{user?.name || "User"}</span></p>
            </div>
          ) : (
            <div className="sidebar-card">
              <h4>Welcome to InternArea</h4>
              <p>Login or register to track applications and profile updates.</p>
            </div>
          )}

          <nav className="sidebar-links">
            <Link to="/internships">Internships</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/">Home</Link>
            <Link to="/adminLogin">Admin Login</Link>
          </nav>

          {user ? (
            <div className="sidebar-card sidebar-actions">
              <Link to={"/userapplication"}>My Applications</Link>
              <Link to={"/profile"}>View Profile</Link>
              <button className='sidebar-logout-btn' onClick={logoutFunction}>Logout <i className="bi bi-box-arrow-right"></i></button>
            </div>
          ) : (
            <div className="sidebar-card sidebar-actions">
              <Link to={"/register"}>Register as Student</Link>
              <Link to={"/register"}>Register as Employer</Link>
            </div>
          )}

          <p className='sidebar-hire-text'>Hire Talent</p>
        </div>
      </div>
    </>
    
  )
}

export default Sidebar