package com.example.pokemon.DTOs;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public class CreatePokemonRequest {
    @Positive(message = "ID must be a positive number")
    private Long pokemonId;

    @NotBlank(message = "Name is required")
    private String pokemonName;

    private String ability;
    private Long baseExperience;
    private Long height;
    private Long weight;
    private String typeOne;
    @Nullable
    private String typeTwo;

    public CreatePokemonRequest() {
    }

    public CreatePokemonRequest(Long pokemonId, String pokemonName) {
        this.pokemonId = pokemonId;
        this.pokemonName = pokemonName;
    }

    public Long getPokemonId() {
        return pokemonId;
    }

    public void setPokemonId(Long pokemonId) {
        this.pokemonId = pokemonId;
    }

    public String getPokemonName() {
        return pokemonName;
    }

    public void setPokemonName(String pokemonName) {
        this.pokemonName = pokemonName;
    }

    public String getAbility() {
        return ability;
    }

    public void setAbility(String ability) {
        this.ability = ability;
    }

    public Long getBaseExperience() {
        return baseExperience;
    }

    public void setBaseExperience(Long baseExperience) {
        this.baseExperience = baseExperience;
    }

    public Long getHeight() {
        return height;
    }

    public void setHeight(Long height) {
        this.height = height;
    }

    public String getTypeOne() {
        return typeOne;
    }

    public void setTypeOne(String typeOne) {
        this.typeOne = typeOne;
    }

    public Long getWeight() {
        return weight;
    }

    public void setWeight(Long weight) {
        this.weight = weight;
    }

    public String getTypeTwo() {
        return typeTwo;
    }

    public void setTypeTwo(String typeTwo) {
        this.typeTwo = typeTwo;
    }
}