import React, { useEffect, useState } from "react";
import "./job.css";
// import JobData from "../Data/JobsDataAvl";
import compLogo from "../../Assets/netflix.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function JobAvl() {
  const [serachCategory, setSearchCategory] = useState("");
  const [searchLoaction, setSearchLocation] = useState("");
  const [filterJob, setFilterJob] = useState([]);
  const [isDivVisible, setDivVisible] = useState(false);
  const location = useLocation();
  const showDiv = () => {
    setDivVisible(true);
  };
  const hideDiv = () => {
    setDivVisible(false);
  };
  const handleCategoryChange = (e) => {
    const categoryValue = e.target.value;
    setSearchCategory(categoryValue);
  };

  const handleCategoryLocationChange = (e) => {
    const loactionValue = e.target.value;
    setSearchLocation(loactionValue);
  };

  const clearAllFilters = () => {
    setSearchCategory("");
    setSearchLocation("");
    setFilterJob(JobData);
  };
  const[JobData,setJobData]=useState([]);
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await axios.get(`/api/job`)
        setJobData(response.data)
      }catch(error){
        console.log(error)
      }
    }
    fetchData()
   },[])

  const filterJobs = (category, location) => {
    const filterData = JobData.filter(
      (Job) =>
        (
          Job.category?.toLowerCase().includes(category.toLowerCase()) ||
          Job.title?.toLowerCase().includes(category.toLowerCase()) ||
          Job.company?.toLowerCase().includes(category.toLowerCase())
        ) &&
        Job.location?.toLowerCase().includes(location.toLowerCase())
    );
    setFilterJob(filterData);
  };
  useEffect(() => {
    filterJobs(serachCategory, searchLoaction);
  }, [searchLoaction, serachCategory, JobData]);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q") || "";
    setSearchCategory(query);
  }, [location.search]);

  return (
    <>
      <div className="flex internship-filter">
        <div className="first-int mb-14">
          <div className="filter-section w-1/6">
            <p id="filter-ico" className=" text-center">
              <i onClick={showDiv} class="bi bi-funnel  text-blue-400"></i>{" "}
              Filter
            </p>
            <div className="fill flex flex-col ml-2">
              <label htmlFor="pro">Profile</label>
              <input
                type="text"
                id="pro"
                value={serachCategory}
                onChange={handleCategoryChange}
                className="profile border-2 mr-3 w-full"
                placeholder="Profile manager"
              />
              <label htmlFor="loc">Location</label>
              <input
                type="text"
                id="loc"
                value={searchLoaction}
                onChange={handleCategoryLocationChange}
                className="location border-2  -ml-8 w-full"
                placeholder="Mumbai"
              />
            </div>
            <div className=" preferences mt-8 flex flex-col">
              <div className="flex mt-3 ml-3 mr-3">
                <input
                  type="checkbox"
                  name="wfh"
                  id="whf"
                  className="mr-2 ml-3"
                />
                <label htmlFor="wfh">Work From home</label>
              </div>
              <div className="flex mt-3 ml-3 mr-3">
                <input
                  type="checkbox"
                  name="pt"
                  id="whf"
                  className="mr-2 ml-3"
                />
                <label htmlFor="pt">Part-time</label>
              </div>
              <p>Annual Salary (in Lakhs) (₹)</p>
              <input type="range" name="" id="" />
              <p className="mt-2 ml-3 mr-3">
                0 2L &nbsp; 4L &nbsp; 6L &nbsp; 8L &nbsp; 10L
              </p>
            </div>

            <p className=" mt-5 text-blue-400">
              View more filters <i class="bi bi-chevron-down"></i>
            </p>
            <button type="button" onClick={clearAllFilters} className="justify-end flex text-blue-400 mr-3 clear-filter-btn">
              Clear all
            </button>
          </div>
          <div className="search-2">
            <div className="search-container">
              <label htmlFor="ex">Experience</label>
              <input type="text" id="ex" placeholder="eg. 0-1 year" />
              <div className="search-icon">
                <i class="bi bi-search"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="all-internships">
          <div className="show show2  flex justify-center">
            <p
              className="filterico text-center"
              onClick={showDiv}
            >
              Filter<i class="bi bi-funnel  text-blue-400"></i>
            </p>
            <p className=" font-bold text-lg text-center ml-8">
              {filterJob.length} Total Jobs
            </p>
          </div>

          {filterJob.map((data, index) => (
            <div key={data._id || index} className="job-result-card shadow-lg rounded-lg bg-white m-7 " id="display">
              <div className="job-card-inner m-4">
                <p className="mb-4 mt-3" id="boxer">
                  {" "}
                  <i className="bi bi-arrow-up-right text-blue-500"></i>{" "}
                  Actively Hiring
                </p>
                <div className="job-logo-row flex justify-end">
                  <img src={compLogo} className="w-14" alt="" />
                </div>
                <div className="all-ele job-main">
                  <div className="job-title text-lg text-black m-2 mt-7 font-bold">
                    {data.title}
                  </div>
                  <div className="info job-company-block">
                    <p className="text-sm text-slate-300 font-bold">
                      {data.company}
                    </p>
                    <p className=" mt-2">{data.location}</p>
                  </div>
                  <div className="job-meta flex text-sm justify-between">
                    <p className="job-meta-item mt-3">
                      {" "}
                      <i class="bi bi-play-circle-fill"></i> Start Date <br />{" "}
                      {data.StartDate}
                    </p>

                    <p className="job-meta-item mt-3">
                      {" "}
                      <i class="bi bi-calendar-check-fill"></i> Experience{" "}
                      <br />
                      {data.Experience}
                    </p>

                    <p className="job-meta-item mt-3">
                      {" "}
                      <i class="bi bi-cash"></i> Salary <br /> {data.CTC}
                    </p>
                  </div>
                </div>
                <span className="job-type-pill bg-slate-200 text-slate-400 w-20 rounded-sm text-center">
                  Job
                </span>
                <br />
                <span className="job-date-pill">
                  <i class="bi bi-stopwatch text-green-300"></i>23/11/2065
                </span>
                <div className="job-action-row flex justify-end" id="hr">
                  <Link to={`/job_detail?q=${data._id}`}><button
                    id="viewButtons"
                    className="job-view-btn bg-transparent text-blue-500"
                  >
                    View In Detail
                  </button></Link>
                </div>
              </div>
            </div>
          ))}

          {filterJob.length === 0 && (
            <div className="empty-list-card">
              <h3>No jobs found</h3>
              <p>Try a different profile or location, or clear all filters.</p>
              <button type="button" onClick={clearAllFilters}>Reset filters</button>
            </div>
          )}

        </div>
      
      </div>
      {
  isDivVisible &&(
    <>
    <div className="first2-int mb-14">
  <div className="filter-section w-1/6">
      <button id='close-btn' onClick={hideDiv}><i class=" text-3xl bi bi-x"></i></button>
<p className='text-center'><i class="bi bi-funnel  text-blue-400"></i> Filter</p>
<div className='fill flex flex-col ml-2'>
<label htmlFor="pro">Profile</label>
<input type="text" id='pro'  value={serachCategory} onChange={handleCategoryChange} className='profile border-2 mr-3 w-full' placeholder='Profile manager'/>
<label htmlFor="loc">Location</label>
<input type="text" id='loc'  value={searchLoaction}  onChange={handleCategoryLocationChange} className='location border-2 mt-10  -ml-8 w-full' placeholder='Mumbai'/>
</div>
<div className=" preferences mt-8 flex flex-col">
<div className="flex mt-3 ml-3 mr-3">
  <input type="checkbox" name="wfh" id="whf"  className='mr-2 ml-3'/>
  <label htmlFor="wfh">Work From home</label>
</div>
<div className="flex mt-3 ml-3 mr-3">
<input type="checkbox" name="pt" id="whf"  className='mr-2 ml-3'/>
  <label htmlFor="pt">Part-time</label>
</div>
<p> Annual salary (in lakhs)</p>
<input type="range" name="" id="" />
<p className='mt-2 ml-3 mr-3'>0  2K  &nbsp;  4k  &nbsp;  6K &nbsp;  8k   &nbsp; 10K</p>
</div>

<p className= ' mt-5 text-blue-400'>View more filters <i class="bi bi-chevron-down"></i></p>
<button type='button' onClick={clearAllFilters} className='justify-end flex text-blue-400 mr-3 clear-filter-btn'>Clear all</button>
</div>
<div className="search-2"><div className="search-container">
  <label htmlFor="ex ">Experince</label>
  <input type="text" id='ex' placeholder='eg. 0-1 year' />
  <div className="search-icon">
  <i class="bi bi-search"></i>
  </div>
  </div></div>
  </div>
    </>
  )
}
    </>
  );
}

export default JobAvl;
