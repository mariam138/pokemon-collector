import React from 'react';
import './LoginForm.css';
import { useState } from 'react';

const LoginForm = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, name);
    };
    return (
        <div className="addUser">
            <h3>Login</h3>
            <form className="addUserForm">
                <div className="inputGroup">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        autoComplete="off"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <label htmlFor="name">Name:</label>
                    <input
                        type="name"
                        id="name"
                        autoComplete="off"
                        placeholder="Enter your name:"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => handleSubmit(e)}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
