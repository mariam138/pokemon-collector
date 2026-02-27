import NavButton from "../../components/NavButton/NavButton";
import "./Nav.scss";
import { Link } from "react-router-dom";

const Nav = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
    window.location.hash = "#/";
    window.location.reload();
  };

  return (
    <div className="Nav">
      <section className="Nav_logo">
        <img
          className="Nav_img"
          src="https://www.freepnglogos.com/uploads/pokemon-logo-text-png-7.png"
          alt="Pokemon Logo"
        />
      </section>

      <section className="Nav_menu">
        <Link to="/dashboard">
          <NavButton name="Dashboard" />
        </Link>

        <Link to="/selected">
          <NavButton name="Collected" />
        </Link>

    
        <NavButton name="Logout" onClick={handleLogout} />
      </section>

      <section className="Nav_user">{user && `Hi ${user.name}!`}</section>
    </div>
  );
};

export default Nav;
