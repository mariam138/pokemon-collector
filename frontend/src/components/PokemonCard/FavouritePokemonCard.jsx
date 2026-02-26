import "./PokemonCard.scss";
import { Checkbox } from "rsuite";
import { useState } from "react";

// When a user selects a pokemon -> we want to add that pokemon object to the pokemon array (state)
// We update the favourites pokemons array on the backend when the user  clicks on a Confirm button

const FavoritedPokemonCard = ({ pokemon  }) => {

  return (
    <div className="pokemon-card">
      <section className="pokemon-card_header">
        <p className="pokemon-card_id">{pokemon.id}</p>
        <h1 className="pokemon-card_name">{pokemon.name}</h1>
      </section>

      <img
        className="pokemon-card_image"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        alt={pokemon.name}
      />

      <section className="pokemon-card_info">
        <p>
          <strong>Ability: {pokemon.ability} </strong>
        </p>

        <p>
          <strong>Base Experience : {pokemon.baseExperience}</strong>
        </p>
        <p>
          <strong>Height: {pokemon.height / 10}m</strong>
        </p>
        <p>
          <strong>Weight: {pokemon.weight}kg</strong>
        </p>
        <p>
          <strong>Type 1: {pokemon.typeOne}</strong>
        </p>
        {pokemon.typeTwo && (
          <p>
            <strong>typeTwo: {pokemon.typeTwo}</strong>
          </p>
        )}
        {/* {pokemon.types.map((oneType) => (
          <p key={oneType.type.name}>
            <strong>
              Type {oneType.slot}: {oneType.type.name}
            </strong>
          </p>
        ))} */}
      </section>
    </div>
  );
};

export default FavoritedPokemonCard;
