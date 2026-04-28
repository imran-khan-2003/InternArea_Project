import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./detailApplication.css";

function DeatilApplication() {
  const [data,setData] =useState(null)
  let search=window.location.search;
  const params=new URLSearchParams(search);
const id=params.get("a")
useEffect(()=>{
   const fetchData= async()=>{
  const response=await axios.get(`/api/application/${id}`)

  setData(response.data)
   }
   fetchData()
},[id])
const handleAcceptAndReject= async(id,action)=>{
  try {
    const response=await axios.put(`/api/application/${id}`,{action})
    setData(response.data.data)

  } catch (error) {
    console.log(error)
  }

}
if (!data) {
  return (
    <div className="application-detail-page">
      <div className="application-detail-card">
        <p>Loading application details...</p>
      </div>
    </div>
  );
}

  return (
    <div className="application-detail-page">
      <div className="application-detail-card">
        <div className="application-detail-photo-wrap">
          <img
            alt={data?.user?.name || "Applicant"}
            className="application-detail-photo"
            src={data?.user?.photo}
          />
          <p className={`application-status ${(data?.status || "pending").toLowerCase()}`}>
            {data?.status || "Pending"}
          </p>
        </div>

        <div className="application-detail-content">
          <p className="application-label">Company</p>
          <h2 className="application-company">{data?.company}</h2>

          <p className="application-label">Cover Letter</p>
          <p className="application-cover-letter">{data?.coverLetter}</p>

          <div className="application-meta">
            <p>
              <span>Application Date</span>
              <strong>{new Date(data?.createAt).toLocaleDateString()}</strong>
            </p>
            <p>
              <span>Applied By</span>
              <strong>{data?.user?.name}</strong>
            </p>
          </div>

          <div className="application-admin-actions">
            <button
              className="application-action-btn accept"
              onClick={() => handleAcceptAndReject(data._id, "accepted")}
            >
              Accept
            </button>
            <button
              className="application-action-btn reject"
              onClick={() => handleAcceptAndReject(data._id, "rejected")}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeatilApplication