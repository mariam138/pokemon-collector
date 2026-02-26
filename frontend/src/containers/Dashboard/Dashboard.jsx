import PokemonButtons from "../../components/PokemonButtons/PokemonButtons";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { getOnlyUrl } from "../../functions";
import "./Dashboard.scss";
import { useState } from "react";



const Dashboard = ({pokemonData}) => {
  
  let pokemonArray = [];
  if (pokemonData) {
    pokemonData.forEach(pokemon => {
      if (pokemon.isChecked) {  
        pokemonArray.push(pokemon);
      } 
    })
  };
  
  

  return (
    <div className="Dashboard">
        {pokemonData? pokemonData.map((pokemon) => {
          return <PokemonCard pokemonArray={pokemonArray} key={pokemon.id} pokemon={pokemon}/>
        }) : <p>Loading...</p>}
    </div>
  )
}

export default Dashboard
