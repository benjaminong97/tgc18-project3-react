import React, {useState} from 'react'
import {useNavigate, Link, Navigate} from 'react-router-dom'
import {Form, Container} from 'react-bootstrap'
import axios from 'axios'


const BASE_URL = "https://superior-sensors.herokuapp.com/"


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginFailed, setLoginFailed] = useState(false) 

    const navigate = useNavigate()

    async function login() {
        console.log(email)
        console.log(password)

        if (!email || !password) {
            setLoginFailed(true)
        } else {
            const response = await axios.post((BASE_URL + 'api/users/login'), {
                "email" : email,
                "password": password,
            })

            console.log(response.data)

            if (response.status === 200 && response.data.accessToken) {
                console.log(response.data)
                localStorage.setItem('accessToken', response.data.accessToken)
                localStorage.setItem('refreshToken', response.data.refreshToken)
                localStorage.setItem('user_id', response.data.user_id)
                localStorage.setItem('user_first_name', response.data.user_first_name)
                navigate('/mouses')
                
            } else {
                setLoginFailed(true)
            }
        }

        navigate('/')
        window.location.reload()
    }

    return(
        <React.Fragment>
            <div id="home-bg">
                    <video autoPlay loop muted id='home-video'>
                        <source src={require('../images/razer_ad.mp4')} type='video/mp4' />
                    </video>
                </div>
            <Container>
                <div className="row" id='callout2'>
                    <div className="">
                        <h1 className="text-center page-title-large">Sign In</h1>
                        <p className="text-center page-subtitle">Sign in with your email and password.</p>
                        <Form className="my-4">
                            
                            <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} autocomplete="off" className="form-input bg-transparent rounded-0" placeholder="Email" />
                            
                            <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input bg-transparent rounded-0 mt-3" placeholder="Password" />
                            {loginFailed === true ? <Form.Text style={{color: 'red'}}>Please enter both your email and password.</Form.Text>:null}
                            
                            <div className="d-grid mt-4">
                                <button className="rounded-0 py-2 signin-btn" type="button" onClick={login}>SIGN IN</button>
                            </div>
                            
                        </Form>
                        <p className="mt-4 text-center page-subtitle">Not our registered customer? <Link to="/register">Register here.</Link></p>
                    </div>
                </div>
            </Container>

        </React.Fragment>
    )
}