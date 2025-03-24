import React, { useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/forgot-password', { email })
            .then((response) => {
                if (response.status === 200) {
                    setMessage('Password reset email sent! Please check your inbox.');
                } else {
                    setMessage('Error sending email. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('Error sending email. Please try again.');
            });
    };

    return (
        <div className='form-box forgot-password'>
            <form onSubmit={handleSubmit}>
                <h1>Forgot Password</h1>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Send Reset Link</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ForgotPassword;
