
import {preparePokemonDataToBackend} from "../../functions";
import { useState } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import "./Dashboard.scss";
import { API_URL } from "../../api";
const Dashboard = ({ pokemonData, user }) => {
const [selectedPokemon, setSelectedPokemon] = useState([]);
console.log("this is an array of selected pokemon:", selectedPokemon);
const [favouritePokemons, setFavouritePokemons] = useState([]);

  // Add a key on pokemon object to identify the pokemon which are already in the favourites list

  const updatedPokemonData = pokemonData.map((pokemon) => {
    return {
      ...pokemon,
      isFavourite: favouritePokemons.includes(pokemon.id),
    };
  });

  // Create a submit button to send the selected pokemons to the backend
  // you need to then trigger a refresh of the dashboard to show the new favourites
  // Do API call to favouritePokemons endpoint to check which pokemons are already in the favourites list
  // Render the pokemons cards with the checkbox checked if the pokemon is in the favourites list



  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon([...selectedPokemon, pokemon]);
    console.log("user:", user);
    preparePokemonDataToBackend( selectedPokemon);
  };

  const handleUnselectPokemon = (pokemon) => {
    setSelectedPokemon(selectedPokemon.filter((p) => p.id !== pokemon.id));
  };

  //"https://pokemon-collector-backend-production-4148.up.railway.app/api/users/1/favourites"
  //"https://pokemon-collector-backend-production-4148.up.railway.app/api/users/1/favourites
  //  "https://pokemon-collector-backend-production-4148.up.railway.app/


  const handleSubmitSelectedPokemons = () => {
    fetch(`${API_URL}api/users/${user.id}/favourites`, {
      method: "POST",
      body: JSON.stringify(
        preparePokemonDataToBackend(selectedPokemon)
      ),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle data
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="Dashboard">
      {user && <button onClick={handleSubmitSelectedPokemons}>Submit {selectedPokemon.length} Selected Pokemons</button>}
      {pokemonData ? (
        pokemonData.map((pokemon) => {
          return (
            <PokemonCard
              pokemonArray={pokemonData}
              key={pokemon.id}
              pokemon={pokemon}
              onSelectPokemon={handleSelectPokemon}
              onUnselectPokemon={handleUnselectPokemon}
            />
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
