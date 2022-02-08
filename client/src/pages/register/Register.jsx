import React, { useState, useRef } from 'react'
import "./register.scss"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const history = useNavigate()
    const emailRef = useRef()
    const passwordRef = useRef()
    const userNameRef = useRef()
    const handleClick = () => {
        setEmail(emailRef.current.value)
    }
    const handleFinish = async (e) => {
        e.preventDefault()
        setUsername(userNameRef.current.value)
        setPassword(passwordRef.current.value)
        try {
            await axios.post("/api/auth/register", { username, email, password })
            history("/login")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='register'>
            <div className="top">
                <div className="wrapper">
                    <img className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt="" />
                    <Link to="/login">
                        <button className="loginButton">Sign In </button>
                    </Link>
                </div>
            </div>
            <div className="container">
                <h1>
                    Unlimited movies, TV shows, and more.

                </h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>
                    Ready to watch? enter your email to create or restart your memebership
                </p>
                {!email ?
                    (<div className="input">
                        <input type="email" placeholder="Email address" ref={emailRef} />
                        <button className='registerButton' onClick={handleClick}>Get Started</button>
                    </div>) :
                    (<form className='input'>
                        <input type="text" placeholder="Your name" ref={userNameRef} />
                        <input type="password" placeholder="Enter password" ref={passwordRef} />
                        <button className='registerButton' onClick={handleFinish}>Start</button>
                    </form>)


                }


            </div>


        </div >
    )
}

export default Register
