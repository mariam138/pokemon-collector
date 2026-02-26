import LoginForm from './LoginForm';

const Login = ({ handleLogin }) => {
    const loginWithGithub = () => {
        window.location.href =
            'https://pokemon-collector-production-3913.up.railway.app/oauth2/authorization/github';
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Welcome to Pokémon Collector</h1>
            <p>Please login to continue</p>

            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={loginWithGithub}
                    style={{ padding: '10px 20px' }}>
                    Login with GitHub
                </button>
            </div>

            <LoginForm handleLogin={handleLogin} />
        </div>
    );
};

export default Login;
