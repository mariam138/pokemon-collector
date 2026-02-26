import './PokemonCard.scss';
import { Checkbox } from 'rsuite';
import { useState } from 'react';

// When a user selects a pokemon -> we want to add that pokemon object to the pokemon array (state)
// We update the favourites pokemons array on the backend when the user  clicks on a Confirm button

const PokemonCard = ({ pokemon, onSelectPokemon, onUnselectPokemon }) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleTickCheckboxChange = () => {
        console.log(isChecked);
        if (!isChecked) {
            onSelectPokemon(pokemon);
            setIsChecked(true);
        } else {
            setIsChecked(false);
            onUnselectPokemon(pokemon);
        }
    };

    return (
      <div className="pokemon-card">
        <section className="pokemon-card_header">
          <p className="pokemon-card_id">{pokemon.id}</p>
          <h1 className="pokemon-card_name">{pokemon.name}</h1>
          <Checkbox
            className="pokemon-card_checkbox"
            name="Pokemon"
            checked={pokemon.isFavourite}
            onChange={handleTickCheckboxChange}
            value={pokemon}
          ></Checkbox>
        </section>

        <img
          className="pokemon-card_image"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={pokemon.name}
        />

        <section className="pokemon-card_info">
          <p>
            <strong>Ability: {pokemon.abilities[0].ability.name} </strong>
          </p>

          <p>
            <strong>Base Experience : {pokemon.base_experience}</strong>
          </p>
          <p>
            <strong>Height: {pokemon.height}</strong>
          </p>
          <p>
            <strong>Weight: {pokemon.weight}kg</strong>
          </p>
          {pokemon.types.map((oneType) => (
            <p key={oneType.type.name}>
              <strong>
                Type {oneType.slot}: {oneType.type.name}
              </strong>
            </p>
          ))}
        </section>
      </div>
    );
};

export default PokemonCard;
