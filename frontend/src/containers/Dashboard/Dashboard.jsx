import { preparePokemonDataToBackend } from "../../functions";
import { useEffect, useState } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import "./Dashboard.scss";
import { API_URL } from "../../api";

const Dashboard = ({ pokemonData, user }) => {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  console.log("this is an array of selected pokemon:", selectedPokemon);
  const [favouritePokemons, setFavouritePokemons] = useState([]);

  // Add a key on pokemon object to identify the pokemon which are already in the favourites list
  // setFavouritePokemons(
  //   fetch(`${API_URL}api/users/${user.id}/favourites`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setFavouritePokemons(data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     }),
  // );
  useEffect(() => {
    if (!user) return; // Prevent crash if user is null

    fetch(`${API_URL}api/users/${user.id}/favourites`)
      .then((response) => response.json())
      .then((data) => {
        console.log("favourites from backend:", data);
        setFavouritePokemons(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [user]);

  const updatedPokemonData = pokemonData?.map((pokemon) => {
    return {
      ...pokemon,
      isFavourite: favouritePokemons.some((fav) => fav.id === pokemon.id),
    };
  });

  // Create a submit button to send the selected pokemons to the backend
  // you need to then trigger a refresh of the dashboard to show the new favourites
  // Do API call to favouritePokemons endpoint to check which pokemons are already in the favourites list
  // url/api/users/{userId}/favourites
  // Render the pokemons cards with the checkbox checked if the pokemon is in the favourites list

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon((prev) => {
      const updated = [...prev, pokemon];
      preparePokemonDataToBackend(updated);
      return updated;
    });
  };

  const handleUnselectPokemon = (pokemon) => {
    setSelectedPokemon(selectedPokemon.filter((p) => p.id !== pokemon.id));
  };

  const handleSubmitSelectedPokemons = () => {
    fetch(`${API_URL}api/users/${user.id}/favourites`, {
      method: "POST",
      body: JSON.stringify(preparePokemonDataToBackend(selectedPokemon)),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        // After POST, fetch updated favourites
        return fetch(`${API_URL}api/users/${user.id}/favourites`);
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("updated favourites:", data);
        setFavouritePokemons(data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    setSelectedPokemon([]);
  };

  return (
    <div className="Dashboard">
      <div>
        {user && (
          <button
            className="Dashboard_button"
            onClick={handleSubmitSelectedPokemons}
          >
            Submit {selectedPokemon.length} Selected Pokemons
          </button>
        )}
      </div>
      <div className="Dashboard">
        {updatedPokemonData ? (
          updatedPokemonData.map((pokemon) => {
            return (
              <PokemonCard
                pokemonArray={updatedPokemonData}
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
    </div>
  );
};

export default Dashboard;
