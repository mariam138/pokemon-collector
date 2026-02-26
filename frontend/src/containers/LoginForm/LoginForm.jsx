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
    <div className="login-form">
      <form className="login-form__form">
        <div className="login-form__field">
          <label className="login-form__label" htmlFor="name">
            Name:
          </label>
          <input
            className="login-form__input"
            type="text"
            id="name"
            autoComplete="off"
            placeholder="Enter your name:"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div className="login-form__field">
          <label className="login-form__label" htmlFor="email">
            Email:
          </label>
          <input
            className="login-form__input"
            type="email"
            id="email"
            autoComplete="off"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button
          type="submit"
          className="login-form__button"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
