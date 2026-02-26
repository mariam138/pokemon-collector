import React from "react";
import "./LoginForm.scss";
import { useState } from "react";

const LoginForm = ({ handleLogin, goToDashboard }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    goToDashboard();
    e.preventDefault();
    handleLogin(email, name);
  };
  return (
    <div className="login">
      <h3 className="login__title">Login</h3>

      <form className="login__form">
        <div className="login__group">
          <label className="login__label" htmlFor="email">
            Email:
          </label>
          <input
            className="login__input"
            type="email"
            id="email"
            autoComplete="off"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
          <label className="login__label" htmlFor="name">
            Name:
          </label>
          <input
            className="login__input"
            type="text"
            id="name"
            autoComplete="off"
            placeholder="Enter your name:"
            value={name}
            onChange={handleNameChange}
          />
          <button
            type="submit"
            className="login__button"
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
