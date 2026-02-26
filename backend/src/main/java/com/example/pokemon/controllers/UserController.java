package com.example.pokemon.controllers;

import com.example.pokemon.DTOs.CreatePokemonRequest;
import com.example.pokemon.DTOs.CreateUserRequest;
import com.example.pokemon.DTOs.LoginRequest;
import com.example.pokemon.DTOs.UserResponse;
import com.example.pokemon.models.Pokemon;
import com.example.pokemon.models.User;
import com.example.pokemon.services.UserService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.findUserById(id);
    }

    @PostMapping("/login")
    public UserResponse login(@RequestBody LoginRequest loginRequest) {
        return userService.login(loginRequest);
    }

    @PostMapping
    public UserResponse createUser(@Validated @RequestBody CreateUserRequest newUserRequest) {
        return userService.addUser(newUserRequest);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @GetMapping("/{id}/favourites")
    public List<Pokemon> getFavouritePokemons(@PathVariable Long id) {
        return userService.findFavouritePokemons(id);
    }

    @PostMapping("/{userId}/favourites")
    public List<Pokemon> addFavouritePokemons(@PathVariable Long userId,
                                              @RequestBody List<CreatePokemonRequest> pokemonRequests) {
        userService.addFavouritePokemons(pokemonRequests, userId);
        // Returns updated list of favourite pokemon
        return userService.findFavouritePokemons(userId);
    }

    @DeleteMapping("/{id}/favourites/{pokemonId}")
    public void deleteFavouritePokemon(@PathVariable Long userId, @RequestBody Pokemon pokemon) {
        userService.deleteFavouritePokemon(pokemon, userId);
    }
}