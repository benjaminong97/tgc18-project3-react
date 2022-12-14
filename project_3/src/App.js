import logo from './logo.svg';
import './App.css';
import './Style.css'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"


import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'


//import in pages
import Login from './pages/Login'
import Home from './pages/Home'
import Mouses from './pages/Mouses'
import MouseDetails from './pages/MouseDetails';
import Register from './pages/Register'
import { Button, Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import Cart from './pages/Cart';
import Profile from './pages/Profile';

const BASE_URL = "https://superior-sensors.herokuapp.com/"


function App() {

    const navigate = useNavigate
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

    const logout = async () => {
        console.log('logging out')
        const response = await axios.post(BASE_URL + 'api/users/logout', {
            'refreshToken': localStorage.getItem('refreshToken')
        })

        if (response.data) {
            localStorage.clear()
        }


        window.location.reload()
    }

    return (
        <Router>
            <Navbar variant='dark' bg='dark' expand='lg' className='container-fluid'>

                {/* <Container className='m-3'> */}


                {/* Navbar brand */}
                <Link to="/" className="navbar-brand mx-3">
                    <img src={require('./images/superior.png')} style={{ height: '4rem', margin: '0 0.25rem' }} alt="Brand Logo" />
                </Link>
                <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/mouses" className="nav-link active">Shop</Link>
                        </li>

                    </ul>

                <Navbar.Toggle aria-controls="basic-navbar-nav" className='mx-2' />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    


                    <div className='mx-3'>
                        {loggedIn == true ?
                            <React.Fragment>
                                <Button className="text-dark btn-light">Welcome, {localStorage.getItem('user_first_name')}</Button>

                            </React.Fragment> :
                            <p></p>
                        }
                        {loggedIn == true ?
                            <React.Fragment>
                                <a href="/profile" role='button'><img src={require('./images/user.png')} style={{ height: '35px' }} className="mx-3" /></a>

                            </React.Fragment>
                            :
                            <a href="/login" role='button'><img src={require('./images/user.png')} style={{ height: '35px' }} className="mx-3" /></a>
                        }
                        {loggedIn == true ?
                            <React.Fragment>
                                <a href='/cart' role='button'><img src={require('./images/shopping-cart.png')} style={{ height: '35px' }} /></a>
                                <a role='button' onClick={logout} ><img src={require('./images/exit.png')} style={{ height: '35px' }} className='mx-3' /></a>
                            </React.Fragment>
                            :
                            <a href='/cart' role='button'><img src={require('./images/shopping-cart.png')} style={{ height: '35px' }} /></a>
                        }

                    </div>
                </Navbar.Collapse>



                {/* </Container> */}

            </Navbar>


            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Home />} />
                <Route path='/mouses' element={<Mouses />} />
                <Route path='/mouses/:mouse_id' element={<MouseDetails />} />
                <Route path='/register' element={<Register />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/profile' element={<Profile />} />

            </Routes>

        </Router>


    );
}

export default App;
