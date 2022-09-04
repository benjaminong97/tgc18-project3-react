import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Container } from 'react-bootstrap';
import { useState } from "react"
import axios from 'axios'

const BASE_URL = 'https://superior-sensors.herokuapp.com'

export default function Register() {
    const navigate = useNavigate()

    const [registerForm, setRegisterForm] = useState({
        'first_name': '',
        'last_name': '',
        'email': '',
        'password': '',
        'confirm_password': ''
    })

    const [invalidFName, setInvalidFName] = useState(false)
    const [invalidLName, setInvalidLName] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [invalidCPassword, setInvalidCPassword] = useState(false)

    const updateFormField = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
        })
    }

    const register = async () => {


        setInvalidCPassword(false)
        setInvalidEmail(false)
        setInvalidFName(false)
        setInvalidLName(false)
        setInvalidPassword(false)


        if (registerForm.first_name === '') {
            setInvalidFName(true)
        }

        if (registerForm.last_name === '') {
            setInvalidLName(true)
        }

        if (registerForm.email === "" || !registerForm.email.includes('@') || !registerForm.email.includes('.')) {
            setInvalidEmail(true)
        }

        if (registerForm.password === "" || registerForm.password.length < 7 || registerForm.password.length > 24) {
            setInvalidPassword(true)
        }

        if (registerForm.confirm_password != registerForm.password) {
            setInvalidCPassword(true)
        }

        if (invalidCPassword === false && invalidEmail === false && invalidFName === false && invalidLName === false && invalidPassword === false) {
            console.log(registerForm)
            const response = await axios.post(BASE_URL + "/api/users/register", registerForm)
            console.log('registration complete')

            alert('Account Created!')
            navigate('/login')
        }
    }


    return (
        <React.Fragment>
            <Container>
                <div className='row'>
                    <div className="form mx-auto col-md-4 mt-4">
                        <h2 className="text-center page-title-large">Create Account</h2>
                        <p className="text-center page-subtitle">Please fill in the form below</p>
                        <Form className='my-3'>
                            <Form.Control type="text" name='first_name' value={registerForm.first_name} onChange={updateFormField}
                                placeholder='First Name' className='form-input bg-transparent rounded-0' />
                            {invalidFName === true ? <Form.Text className="danger">Please enter a first name</Form.Text> : null}

                            <Form.Control type='text' name='last_name' value={registerForm.last_name} onChange={updateFormField}
                                placeholder='Last Name' className='mt-3 form-input bg-transparent rounded-0' />
                            {invalidLName === true ? <Form.Text className="danger">Please enter a last name</Form.Text> : null}

                            <Form.Control type='email' name='email' value={registerForm.email} onChange={updateFormField}
                                placeholder='Email' className='mt-3 form-input bg-transparent rounded-0' />
                            {invalidEmail === true ? <Form.Text className="danger">Please enter a valid email</Form.Text> : null}

                            <Form.Control type="password" name='password' value={registerForm.password} onChange={updateFormField}
                                placeholder="Password" className='mt-3 form-input bg-transparent rounded-0' />
                            {invalidPassword === true ? <Form.Text className="danger">
                                Please enter a valid password, password must be at least 6 characters long and must not exceed 24 characters
                            </Form.Text> : null}

                            <Form.Control type="password" name="confirm_password" value={registerForm.confirm_password} onChange={updateFormField}
                                placeholder="Re-enter password" className='mt-3 form-input bg-transparent rounded-0' />
                            {invalidCPassword === true ? <Form.Text className="danger">Passwords must match</Form.Text> : null}

                            <div className='d-grid mt-4'>
                                <button className="rounded-0 signin-btn" onClick={register}>Register</button>
                            </div>

                        </Form>
                    </div>
                </div>
            </Container>
        </React.Fragment>
    )
}