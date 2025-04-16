import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import './LoginRegister.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowDropdown } from "react-icons/io";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const API_URL=import.meta.env.VITE_API_URL;

    const handleLogin = (e) => {
        e.preventDefault();

        const loginData = { email, password, role };

        if (rememberMe) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('role', role);
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            localStorage.removeItem('role');
        }

        axios.post(`${API_URL}/api/auth/login`, loginData)
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

        navigate('/forgot-password');

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
            <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            >
            <option value="" disabled>Select Role</option>
            <option value="Skill Swapper">Skill Swapper</option>
            <option value="Mentor">Mentor</option>
            </select>
            <IoMdArrowDropdown className='icon' />
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
                        Remember Me
                    </label>
                    <a href='#' onClick={handleForgotPassword}>
                        Forgot Password?
                    </a>
                </div>
                <button type='submit'>LogIn</button>
                <div className='Register-link'>
                    <p>
                        Don't have an account?<a href='#' onClick={() => { navigate("/register")}}>Register</a>
                    </p>
                </div>
                <div className='Go-Back-link'>
                    <p>
                        Go Back?<a href='#' onClick={() => { navigate("/")}}>Home</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
