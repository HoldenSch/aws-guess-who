import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation.js';
import axios from 'axios';

function Login () {
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.username === "" && errors.password === "") {
            axios.post('http://localhost:8081/login', values)
            .then(res => {
                if (res.data === "Success") {
                    navigate('/home');
                }
                else {
                    alert('invalid username and/or password')
                }
            })
            .catch(err => console.log(err));
        }
    }

    return (
        <div className='d-flex justify-content-center algin-items-center vh-100'>
            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <div class="mb-3">
                    <input autocomplete="off" autofocus class="form-control mx-auto w-auto" id="username" name="username" 
                    onChange={handleInput} placeholder="Username" type="text"/>
                    {errors.username && <span class='text-danger'> {errors.username}</span>}
                </div>
                <div class="mb-3">
                    <input class="form-control mx-auto w-auto" id="password" name="password" 
                    onChange={handleInput} placeholder="Password" type="password"/>
                    {errors.password && <span class='text-danger'> {errors.password}</span>}
                </div>
                <button class="btn btn-success" type="submit">Log In</button>
                <Link to="/register" class="btn btn-default border">Create Account</Link>
            </form>

        </div>
    )
}

export default Login;