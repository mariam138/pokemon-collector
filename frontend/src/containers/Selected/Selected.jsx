// import "./Selected.scss";
// import PokemonCard from "../../components/PokemonCard/PokemonCard";
// import { useState } from "react";

// const Selected = ({user}) => {

//   const [favoritedPokemons, setFavouritePokemons] = useState([]);
//     const handleDisplaySelectedPokemons = () => {
//       fetch(`${API_URL}api/users/${user.id}/favourites`)

//         .then((response) => response.json())
//         .then((data) => {
//           console.log(data);
//           // Handle data
//           setFavouritePokemons(data);
//         })
//         .catch((err) => {
//           console.log(err.message);
//         });
//     };

//   return (
//     <div className="Selected">
//       {user && favoritedPokemons ? (
//         favoritedPokemons.map((pokemon) => {
//           return (
//             <PokemonCard
//               pokemonArray={favoritedPokemons}
//               key={pokemon.id}
//               pokemon={pokemon}
//               // onSelectPokemon={handleSelectPokemon}
//               // onUnselectPokemon={handleUnselectPokemon}
//             />
//           );
//         })
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default Selected
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