import logo from './logo.svg';
import './App.css';
import {Routes,Route, useNavigate, Navigate} from 'react-router-dom';
import Notfound from './Component/Notfound/Notfound';
import Navbar from './Component/Navbar/Navbar';
import Home from './Component/Home/Home';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  let [userData,setUserData]=useState(null);
  function saveData()
  {
    let encodedData=localStorage.getItem('userToken');
    if(encodedData != undefined)
    {
      let decodedData=jwtDecode(encodedData);
     setUserData(decodedData)
     console.log(decodedData);
    }
    else 
    {
      
        setUserData(null)
        localStorage.removeItem('userToken');
      
    }
  }

  useEffect(() => {
   if(localStorage.getItem('userToken'))
   {
    saveData()
   }
  }, [])
  
  let navigate=useNavigate()
  function logout()
  {
    setUserData(null);
    localStorage.removeItem('userToken');
    navigate('/login')
  }
  
  function ProtectedRoute(props)
  {
    if(localStorage.getItem('userToken')==null)
    {
      return <Navigate to='/login' replace={true}/>
    
    }
    else
    {
      return props.children;
    }
  }
   
  return (
 
    <>
    <Navbar userData={userData} logout={logout}  />
     <Routes>
      <Route path='' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
      <Route path='home' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
      <Route path='register' element={<Register/>}></Route>
      <Route path='login' element={<Login saveData={saveData}/>}></Route>
    <Route path='*' element={<Notfound/>}></Route>
   </Routes>
    


  
    </>
  );
}

export default App;
