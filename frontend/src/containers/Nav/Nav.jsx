import NavButton from '../../components/NavButton/NavButton';
import './Nav.scss';
import { Link } from 'react-router-dom';

const Nav = ({ user }) => {
    const handleLogout = async () => {
        try {
            await fetch(
                'https://pokemon-collector-production-3913.up.railway.app/oauth2/authorization/logout',
                {
                    method: 'POST',
                    credentials: 'include',
                },
            );
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            // Stay in the app: go to login route and reload to re-check auth
            window.location.hash = '#/';
            window.location.reload();
        }
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
                    <NavButton name="Selected" />
                </Link>

               
                <Link className="Nav_logoutBtn" to="/" >
                    <NavButton  name="Logout" />
                </Link>
            </section>

            <section className="Nav_user">{user && `Hi ${user.name}`}</section>
        </div>
    );
};

export default Nav;
