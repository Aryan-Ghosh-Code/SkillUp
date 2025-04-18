import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import './LoginRegister.css';
import { useNavigate } from 'react-router-dom';
import useRegister from '../../hooks/useRegister';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const { loading, register } = useRegister();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

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
        console.log(userData)
        await register(userData);
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
                        <option value="SkillSwapper">Skill Swapper</option>
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
                        Already have an account?<a href='#' onClick={() => { navigate("/login") }}>LogIn</a>
                        {/* <button type="button" onClick={ () => {navigate("/login")}}>
                LogIn
            </button> */}
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

export default Register;
