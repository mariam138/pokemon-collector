import LoginForm from "../LoginForm/LoginForm";
import "./Login.scss";

const Login = ({ handleLogin, goToDashboard }) => {
  return (
    <div className="login">
      <div className="login__bg" />
      <div className="login__content">
        <img
          className="login__logo"
          src="https://www.freepnglogos.com/uploads/pokemon-logo-text-png-7.png"
          alt="Pokemon Logo"
        />
        <LoginForm handleLogin={handleLogin} goToDashboard={goToDashboard} />
      </div>
    </div>
  );
};

export default Login;
