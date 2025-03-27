import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from 'axios';
import './LoginRegister.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();
    const API_URL=import.meta.env.VITE_API_URL;

    const isGmailFormat = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
    };

    const isPasswordStrong = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

const handleRegister = (e) => {
    e.preventDefault();

    if (!isGmailFormat(email)) {
        alert('Please enter a valid Gmail address.');
        return;
    }

    if (!isPasswordStrong(password)) {
        alert('Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.');
        return;
    }

    if (!agree) {
        alert('Please agree to the terms and conditions.');
        return;
    }

    const userData = {
        name,
        email,
        role,
        password,
    };

    axios.post(`${API_URL}/api/auth/register`, userData)
        .then((response) => {
        if (response.status === 201) {
            alert('Registration successful!');
            console.log(userData);
        } else {
            alert('Registration failed. Please try again.');
        }
        })
        .catch((error) => {
        console.error('Error during registration:', error);
        alert('Error during registration. Please try again.');
        });
    };

    return (
    <div className='form-box register'>
        <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <div className="input-box">
            <input
            type="text"
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
            <FaUser className='icon' />
        </div>
        <div className="input-box">
            <input
            type="email"
            placeholder='E-Mail ID (Gmail Only)'
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
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
            />{" "}
            I agree to the terms and conditions
            </label>
        </div>
        <button type='submit'>Register</button>
        <div className='Register-link'>
            <p>
            Already have an account?<a href='#' onClick={() => { navigate("/login")}}>LogIn</a>
            {/* <button type="button" onClick={ () => {navigate("/login")}}>
                LogIn
            </button> */}
            </p>
        </div>
        </form>
    </div>
    );
};

export default Register;
