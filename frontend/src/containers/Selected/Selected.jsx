import "./Selected.scss";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import FavoritedPokemonCard from "../../components/PokemonCard/FavouritePokemonCard";
import { useState, useEffect } from "react";
import { API_URL } from "../../api";

const Selected = ({ user }) => {
  const [favoritedPokemons, setFavouritePokemons] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(`${API_URL}api/users/${user.id}/favourites`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFavouritePokemons(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [user]); // runs when user changes

  return (
    <div className="Selected">
      {user ? (
        favoritedPokemons.length > 0 ? (
          favoritedPokemons.map((pokemon) => (
            <FavoritedPokemonCard pokemon={pokemon}/>
          ))
        ) : (
          <p>No favourites yet.</p>
        )
      ) : (
        <p>Loading user...</p>
      )}
    </div>
  );
};

export default Selected;