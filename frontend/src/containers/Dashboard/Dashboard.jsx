import PokemonButtons from '../../components/PokemonButtons/PokemonButtons';
import { useState } from 'react';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import './Dashboard.scss';

const Dashboard = ({ pokemonData }) => {
    const [selectedPokemon, setSelectedPokemon] = useState([]);
    console.log(selectedPokemon);
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
    };

    const handleUnselectPokemon = (pokemon) => {
        setSelectedPokemon(selectedPokemon.filter((p) => p.id !== pokemon.id));
    };

    return (
        <div className="Dashboard">
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
