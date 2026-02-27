import "./App.css";
import Nav from "./containers/Nav/Nav";
import Dashboard from "./containers/Dashboard/Dashboard";
import Selected from "./containers/Selected/Selected";
import Login from "./containers/Login/Login";
import { getOnlyUrl, cleanPokemonData } from "./functions";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "./api";

function App() {
  const [user, setUser] = useState(null);
  const allPokemonDataUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

  const [pokemonData, setPokemonData] = useState([]);

  const handleLogin = async (email, name) => {
    const response = await fetch(`${API_URL}api/users/login`, {
      method: "POST",
      body: JSON.stringify({ email: email, name: name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to login");
    }
    const data = await response.json();

    if (data) {
      setUser(data);
    }
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
  }, [user]);

  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const goBackToLogin = () => {
    navigate("/");
  };

  return (
    <main className="main">
      {user ? (
        <Nav
          setUser={setUser}
          user={user}
          goBackToLogin={goBackToLogin}
          goToDashboard={goToDashboard}
        />
      ) : (
        ""
      )}

      {/* Once user is logged in, they see the dashboard */}
      {/* If user is not logged in, they see the login page */}
      {/* Add correct logout process -> remove user from state */}

      <Routes>
        <Route
          path="/"
          element={
            <Login goToDashboard={goToDashboard} handleLogin={handleLogin} />
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard pokemonData={pokemonData} user={user} />}
        />
        <Route path="/selected" element={<Selected user={user} />} />
        <Route
          path="*"
          element={
            <Login goToDashboard={goToDashboard} handleLogin={handleLogin} />
          }
        />
      </Routes>
    </main>
  );
}

export default App;
