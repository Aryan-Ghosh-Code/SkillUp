import React, { useState } from 'react';
import './LoginRegister.css';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const LoginRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [action, setAction] = useState('');

    const handleRegister = () => {
        const userData = {
            name: name,
            email: email,
            role: role,
            password: password
        };
        console.log(JSON.stringify(userData));
    };

    const registerLink = () => {
        setAction(' active');
    };

    const logInLink = () => {
        setAction('');
    };

    return (
        <div className={`wrapper${action}`}>
            <div className='form-box login'>
                <form action="">
                    <h1>LogIn</h1>
                    <div className="input-box">
                        <input type="text" placeholder='E-Mail ID' required />
                        <MdEmail className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required />
                        <FaLock className='icon' />
                    </div>
                    <div className="remember-forgot">
                        <label><input type='checkbox' />Remember me</label>
                        <a href='#'>Forgot Password?</a>
                    </div>
                    <button type='Submit'>LogIn</button>
                    <div className='Register-link'>
                        <p>
                            Don't have an account? <a href='#' onClick={registerLink}>Register</a>
                        </p>
                    </div>
                </form>
            </div>

            <div className='form-box register'>
                <form action="">
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Name' required value={name} onChange={(e) => setName(e.target.value)} />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder='E-Mail ID' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <MdEmail className='icon' />
                    </div>
                    <div className="input-box">
                        <select required value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="" disabled>Select Role</option>
                            <option value="learner">Skill Swapper</option>
                            <option value="mentor">Mentor</option>
                        </select>
                        <IoMdArrowDropdown className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <FaLock className='icon' />
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type='checkbox' required /> I agree to the terms and conditions
                        </label>
                    </div>
                    <button type='button' onClick={handleRegister}>Register</button>
                    <div className='Register-link'>
                        <p>
                            Already have an account? <a href='#' onClick={logInLink}>LogIn</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
