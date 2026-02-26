import './App.css';
import Nav from './containers/Nav/Nav';
import Dashboard from './containers/Dashboard/Dashboard';
import Selected from './containers/Selected/Selected';
import Login from './containers/Login/Login';
import { getOnlyUrl, cleanPokemonData } from './functions';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
    const allPokemonDataUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    const [pokemonData, setPokemonData] = useState([]);

    const API_URL =
        'https://pokemon-collector-backend-production-4148.up.railway.app/';

    const handleLogin = async (email, name) => {
        const response = await fetch(`${API_URL}api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name }),
        });
        const data = await response.json();
        console.log(data);
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
            <Nav />

            {/* Clarify Login pgae and landing page */}
            {/* user arrive on URL/ and see login buttons */}
            {/* Once logged in user sees dashboard */}
            {/* Fix the Auth logic to provide correct URL build up for this flow */}

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
