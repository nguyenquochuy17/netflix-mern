import React, { useState, useRef } from 'react'
import { useContext } from 'react';
import { login } from '../../authContext/apiCalls';
import { AuthContext } from '../../authContext/AuthContext';
import "./login.scss"
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const { dispatch } = useContext(AuthContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        login({ email, password }, dispatch)
    }
    return (
        <div className='login'>
            <div className="container">
                <form >
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Email or phone number" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="loginButton" onClick={handleSubmit} >Sign In</button>
                    <span>
                        New to Netflix? <b>Sign up now.</b>
                    </span>
                    <small>
                        This page is protected by Google reCAPTCHA to make sure you're not a bot.
                        <b> Learn more</b>
                    </small>
                </form>
            </div>


        </div>
    )
}

export default Login
