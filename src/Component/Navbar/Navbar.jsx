import jwtDecode from 'jwt-decode';
import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar(props) {

  return (
    <>
    <nav   className="navbar navbar-expand-lg navbar-dark shadow-5-strong">
  <div   className="container">
    <a   className="navbar-brand"><i  className="fa-solid fa-note-sticky"></i>  Note</a>
    <button   className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span   className="navbar-toggler-icon"></span >
    </button>
    <div   className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul   className="navbar-nav ms-auto mb-2 mb-lg-0">
        
        
       {props.userData? <>
        <li   className="nav-item">
          <button className='btn btn-outline-success rounded-pill mx-2'>Welcome {props.userData.first_name}</button>
       </li>
        <li   className="nav-item">
          <a   className="nav-link" onClick={props.logout}>Logout</a>
        </li>
       </>
        :<>
        <li   className="nav-item">
          <Link   className="nav-link" to='register'>Register</Link  >
        </li>
        <li   className="nav-item">
          <Link   className="nav-link" to='login'>Login</Link >
        </li>
        </>}
      </ul>
     
    </div>
  </div>
</nav>
    </>
  )
}
