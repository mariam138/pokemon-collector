export const getOnlyUrl = (apiData) => {
  return apiData.map((item) => item.url);
};

export const cleanPokemonData = (pokemonData) => {
  const {
    name,
    sprites,
    abilities,
    base_experience,
    height,
    weight,
    id,
    types,
    ..._
  } = pokemonData;
  return {
    name,
    sprites,
    abilities,
    base_experience,
    height,
    weight,
    id,
    isChecked: false,
    types,
  };
  //return pokemonData;
}; //dosnt need to be in this file

export const preparePokemonDataToBackend = (selectedPokemon) => {
  const preparedPokemonArray = selectedPokemon.map((pokemon) => {
    return {
      pokemonId: pokemon.id,
      pokemonName: pokemon.name,
      ability: pokemon.abilities[0].ability.name,
      baseExperience: pokemon.base_experience,
      height: pokemon.height,
      weight: pokemon.weight,
      typeOne: pokemon.types[0].type.name,
      typeTwo: pokemon.types[1] ? pokemon.types[1].type.name : null,
    };
  });
  console.log("preparedPokemonArray:", preparedPokemonArray);
  return preparedPokemonArray;
};

//     {
//     "pokemonId":2,
//     "pokemonName":"ivysaur",
//     "ability": "static",
//     "baseExperience": 142,
//     "height": 10,
//     "weight": 130,
//     "typeOne":"grass",
//     "typeTwo": "poison"
// }
