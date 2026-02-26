    export const getOnlyUrl = (apiData) => {
    return apiData.map((item) => 
        item.url
        );
    };

    export const cleanPokemonData = (pokemonData) => {
        const {name, sprites, abilities, base_experience,height,weight,id,types,..._} = pokemonData
         return {name, sprites, abilities, base_experience,height,weight,id,isChecked: false, types};
        //return pokemonData;
    } //dosnt need to be in this file
    