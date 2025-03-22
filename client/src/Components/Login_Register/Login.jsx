import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import './LoginRegister.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const loginData = { email, password };

        if (rememberMe) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
        }

        axios.post('http://localhost:5000/api/auth/login', loginData)
            .then((response) => {
                if (response.status === 200) {
                    alert('Login successful!');
                    console.log(response.body);
                } else {
                    alert('Invalid credentials. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error during login. Please try again.');
            });
    };

    const handleForgotPassword = () => {

        alert('Redirecting to forgot password page...');
    };

    return (
        <div className='form-box login'>
            <form onSubmit={handleLogin}>
                <h1>LogIn</h1>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder='E-Mail ID'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <MdEmail className='icon' />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className='icon' />
                </div>
                <div className="remember-forgot">
                    <label>
                        <input
                            type='checkbox'
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />{" "}
                        Remember me
                    </label>
                    <a href='#' onClick={handleForgotPassword}>
                        Forgot Password?
                    </a>
                </div>
                <button type='submit'>LogIn</button>
                <div className='Register-link'>
                    <p>
                        Don't have an account?{" "}
                        <button type="button" onClick={() => { navigate("/register")}}>
                            Register
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
