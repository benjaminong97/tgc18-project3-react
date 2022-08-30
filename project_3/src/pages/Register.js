import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
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

        if (registerForm.confirm_password != registerForm.password){
            setInvalidCPassword(true)
        }

        if (invalidCPassword === false && invalidEmail === false && invalidFName === false && invalidLName === false && invalidPassword === false) {
            const response = await axios.post(BASE_URL + "/api/users/register, registerForm")

            alert('Account Created!')
            navigate('/login')
        }
    }


    return(
        <React.Fragment>
            <div className="container">
                <div>
                    <div>
                        <h2 >Create Account</h2>
                        <p>Please fill in the form below</p>
                        <Form className='my-3'>
                            <Form.Control type="text" name='first_name' value={registerForm.first_name} onChange={updateFormField}
                            placeholder='First Name'/>
                            {invalidFName === true ? <Form.Text className="danger">Please enter a first name</Form.Text>: null}

                            <Form.Control type='text' name='last_name' value={registerForm.last_name} onChange={updateFormField}
                            placeholder='Last Name'/>
                            {invalidLName === true ? <Form.Text className="danger">Please enter a last name</Form.Text>: null}

                            <Form.Control type='email' name='email' value={registerForm.email} onChange={updateFormField}
                            placeholder='Email'/>
                            {invalidEmail === true ? <Form.Text className="danger">Please enter a valid email</Form.Text>: null}

                            <Form.Control type="password" name='password' value={registerForm.password} onChange={updateFormField}
                            placeholder="Password"/>
                            {invalidPassword === true ? <Form.Text className="danger">
                                Please enter a valid password, password must be at least 6 characters long and must not exceed 24 characters
                            </Form.Text>: null}

                            <Form.Control type="password" name="confirm_password" value={registerForm.confirm_password} onChange={updateFormField}
                            placeholder="Re-enter password"/>
                            {invalidCPassword === true ? <Form.Text className="danger">Passwords must match</Form.Text>: null}

                            <Button className="btn-secondary btn-fluid" onClick={register}>Register</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}