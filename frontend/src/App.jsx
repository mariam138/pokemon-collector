import './App.css';
import Nav from './containers/Nav/Nav';
import Dashboard from './containers/Dashboard/Dashboard';
import Selected from './containers/Selected/Selected';
import Login from './containers/Login/Login';
import { getOnlyUrl, cleanPokemonData } from './functions';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
    const [user, setUser] = useState(null);
    const allPokemonDataUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    const [pokemonData, setPokemonData] = useState([]);

    const API_URL =
        'https://pokemon-collector-backend-production-4148.up.railway.app/';

    const handleLogin = async (email, name) => {
        const response = await fetch(`${API_URL}api/users/login`, {
            method: 'POST',
            body: JSON.stringify({ email: email, name: name }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        const data = await response.json();
        console.log(data);
        setUser(data);
    };

    useEffect(() => {
        const getPokemons = async () => {
            const response = await fetch(allPokemonDataUrl);
            const pokemonData = await response.json();
            const data = pokemonData.results;

            const pokemonDataUrls = getOnlyUrl(data);

            const pokemonDataArray = await Promise.all(
                pokemonDataUrls.map(async (url) => {
                    const response = await fetch(url);
                    const pokemonData = await response.json();
                    return cleanPokemonData(pokemonData);
                }),
            );

            setPokemonData(pokemonDataArray);
        };

        getPokemons();
    }, []);

    return (
        <main className="main">
            {user && <Nav />}

            {/* Once user is logged in, they see the dashboard */}
            {/* If user is not logged in, they see the login page */}
            {/* Add correct logout process -> remove user from state */}

            <Routes>
                <Route path="/" element={<Login handleLogin={handleLogin} />} />
                <Route
                    path="/dashboard"
                    element={<Dashboard pokemonData={pokemonData} />}
                />
                <Route path="/selected" element={<Selected />} />
                <Route path="*" element={<Login />} />
            </Routes>
        </main>
    );
}

export default App;
