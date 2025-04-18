import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import './LoginRegister.css';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const { loading, login } = useLogin();

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = { email, password };

        if (rememberMe) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
        }

        await login(loginData);
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
                        Don't have an account?<a href='#' onClick={() => { navigate("/register") }}>Register</a>
                    </p>
                </div>
                <div className='Go-Back-link'>
                    <p>
                        Go Back?<a href='#' onClick={() => { navigate("/") }}>Home</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;