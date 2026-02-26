import LoginForm from "../LoginForm/LoginForm";
import "./Login.scss";

const Login = ({ handleLogin, goToDashboard }) => {
  return (
    <>
      {/* <div className="login-page__background"></div> */}
      <div className="login-page">
        <img
          className="login-page__logo"
          src="https://www.freepnglogos.com/uploads/pokemon-logo-text-png-7.png"
          alt="Pokemon Logo"
        />
        <LoginForm handleLogin={handleLogin} goToDashboard={goToDashboard} />
      </div>
    </>
  );
};

export default Login;
