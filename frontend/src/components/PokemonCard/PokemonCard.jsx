import { use } from "react";
import "./PokemonCard.scss";
import { CheckboxGroup, Checkbox } from "rsuite";
import { useState, useEffect } from "react";

const PokemonCard = ({ pokemon, pokemonArray }) => {

  //const [isChecked, setIsChecked] = useState(!isChecked);

  
  
	const onChangeHandler = (e) => {
		console.log("Selected Pokemon:", pokemon.name);

    setIsChecked(!isChecked);
    pokemon.isChecked = !isChecked;
    console.log(pokemonArray)
    // if (!isChecked) {
    //   pokemonArray.push(pokemon); 
    // } else {
    //   pokemonArray = pokemonArray.filter(p => p.id !== pokemon.id);
    // }
    
    console.log(pokemon)
	};
    

  // useEffect(() => {
  //   if (isChecked) {
  //     pokemonArray.push(pokemon); 
  //   }
  // }, []);
  

	return (
		<section className="pokemon-card">
			<section className="pokemon-card_header">
				<p>{pokemon.id}</p>
				<h1 className="pokemon-card_name">{pokemon.name}</h1>
				<div className="App">
					<Checkbox
						name="Pokemon"
						inline
						onChange={onChangeHandler}
						value={pokemon}>
            
          </Checkbox>
            
				</div>
			</section>
      

			<img
				className="pokemon-card_image"
				src={pokemon.sprites.other["official-artwork"].front_default}
				alt={pokemon.name}
			/>
			<section className="pokemon-card_info">
				<p>
					<strong>
						Ability: {pokemon.abilities[0].ability.name}{" "}
					</strong>
				</p>
        <p>{isChecked ? "Checked" : "Unchecked"}</p>
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
            <strong>Type {oneType.slot}: {oneType.type.name}</strong>
          </p>
        ))}
			</section>
		</section>
	);
};

export default PokemonCard;

