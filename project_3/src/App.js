import logo from './logo.svg';
import './App.css';
import './Style.css'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React, { useState } from 'react'


//import in pages
import Login from './pages/Login'
import Home from './pages/Home'
import Mouses from './pages/Mouses'
import MouseDetails from './pages/MouseDetails';


function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark flex-shrink-0">
                {/* Container wrapper */}
                <div className="container-fluid">
                    {/* Toggle button */}
                    <button className="navbar-toggler mb-2" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    {/* Collapsible wrapper */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* Navbar brand */}
                        <Link to="/" className="navbar-brand">
                            <img src={require('./images/superior.png')} style={{ height: '4rem', margin: '0 0.25rem' }} alt="Brand Logo" />
                        </Link>
                        {/* Left links */}
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link to="/mouses" className="nav-link active">Shop</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact-us" className="nav-link active">Contact Us</Link>
                            </li>
                        </ul>
                        {/* Left links */}
                    </div>
                    {/* Collapsible wrapper */}

                    {/* Right elements */}
                    
                    {/* Right elements */}
                </div>
                {/* Container wrapper */}
            </nav>
      

      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element = {<Home/>}/>
        <Route path='/mouses' element = {<Mouses/>}/>
        <Route path='/mouses/:mouse_id' element = {<MouseDetails/>}/>

      </Routes>

    </Router>


  );
}

export default App;
