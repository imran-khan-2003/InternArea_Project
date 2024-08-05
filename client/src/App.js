import React, { useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Intern from './Components/Internships/Intern';
import JobAvl from './Components/Job/JobAvl';
import JobDetail from './Components/Job/JobDetail';
import InternDetail from "./Components/Internships/InternDetail"
import Register from "./Components/auth/Register"
import { Route,Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser,login,logout}  from './Feature/Userslice';
import { auth } from "./firebase/firebase";
import Profile from './profile/Profile';
import AdminLogin from './Admin/AdminLogin';
import Adminpanel from './Admin/Adminpanel';
import Postinternships from './Admin/Postinternships';
import PostJob from './Admin/PostJob';
import ViewAllApplication from './Admin/ViewAllApplication';
import DetailApplication from './Application/DetailApplication';
import UserApplication from './profile/UserApplication';
import DetailApplicationUser from './Application/DetailApplicationUser';
function App() {
  const user=useSelector(selectUser);
  const dispatch=useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
  
          uid:authUser.uid,
          photo:authUser.photoURL,
          name:authUser.displayName,
          email:authUser.email,
          phoneNumber:authUser.phoneNumber
        }))
      }
        else{
          dispatch(logout())
        }
    })
    },[dispatch] );
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/internships' element={<Intern />} />
        <Route path='/jobs' element={<JobAvl />} />
        <Route path='/job_detail' element={<JobDetail />}/>
        <Route path='/intern_detail' element={<InternDetail />}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/adminLogin' element={<AdminLogin />}/>
        <Route path='/adminpanel' element={<Adminpanel/>}/>
        <Route path='/postInternship' element={<Postinternships />}/>
        <Route path='/postJob' element={<PostJob/>} />
        <Route path='/applications' element={<ViewAllApplication/>}/>
        <Route path='/detailApplication' element={<DetailApplication/>}/>
        <Route  path='/userapplicationDetail' element={<DetailApplicationUser/>}/>
        <Route  path='/userApplication' element={<UserApplication />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;