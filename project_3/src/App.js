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
import Register from './pages/Register'
import { Button, Nav, Navbar, Container } from 'react-bootstrap';
import Cart from './pages/Cart';
import Profile from './pages/Profile';

const BASE_URL = "https://3000-benjaminong-tgc18projec-m60k3wuifkz.ws-us63.gitpod.io/"


function App() {

    const [loggedIn, setLoggedIn] = useState(false)

    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {

        const accessTokenExists = async () => {
            const response = await axios.get(BASE_URL + 'api/users/profile', {
                headers: {
                    authorization: 'Bearer' + accessToken,
                    'id': localStorage.getItem('user_id')
                }
            })

            console.log(response.data.id)
            console.log(localStorage.getItem('user_id'))
            if (response.data.id == localStorage.getItem('user_id')) {
                setLoggedIn(true)
            }
        }

        accessTokenExists()
    }

    return (
        <Router>
            <Navbar variant='dark' bg='dark' expand='lg'>
                {/* Container wrapper */}
                <Container className='m-3'>


                    {/* Navbar brand */}
                    <Link to="/" className="navbar-brand">
                        <img src={require('./images/superior.png')} style={{ height: '4rem', margin: '0 0.25rem' }} alt="Brand Logo" />
                    </Link>
                    
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/mouses" className="nav-link active">Shop</Link>
                        </li>
                        
                    </ul>
                    

                    <div className='justify-content-end'>
                        {loggedIn == true ?
                            <Button className="text-dark btn-light">Welcome, {localStorage.getItem('user_first_name')}</Button> :
                            <p></p>
                        }
                        {loggedIn == true ? 
                        <a href="/profile" role='button'><img src={require('./images/user.png')} style={{ height: '35px' }} className="mx-3" /></a>
                        : 
                        <a href="/login" role='button'><img src={require('./images/user.png')} style={{ height: '35px' }} className="mx-3" /></a>
                        }
                        <a href='/cart' role='button'><img src={require('./images/shopping-cart.png')} style={{ height: '35px' }} /></a>
                    </div>

                   
                </Container>
                
            </Navbar>


            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Home />} />
                <Route path='/mouses' element={<Mouses />} />
                <Route path='/mouses/:mouse_id' element={<MouseDetails />} />
                <Route path='/register' element={<Register />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/profile' element={<Profile/>} />

            </Routes>

        </Router>


    );
}

export default App;
