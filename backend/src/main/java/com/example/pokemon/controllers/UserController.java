package com.example.pokemon.controllers;

import com.example.pokemon.DTOs.CreatePokemonRequest;
import com.example.pokemon.DTOs.CreateUserRequest;
import com.example.pokemon.DTOs.LoginRequest;
import com.example.pokemon.DTOs.UpdateUserRequest;
import com.example.pokemon.DTOs.UserResponse;
import com.example.pokemon.models.Pokemon;
import com.example.pokemon.models.User;
import com.example.pokemon.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
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

    // @GetMapping("/me/favourites")
    // public ResponseEntity<List<Long>> getMyFavourites(@AuthenticationPrincipal
    // OAuth2User principal) {
    // if (principal == null) {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    // }
    // return ResponseEntity.ok(userService.getMyFavouritePokemonIds(principal));
    // }
    @GetMapping("/{id}/favourites")
    public List<Pokemon> getFavouritePokemons(@PathVariable Long id) {
        return userService.findFavouritePokemons(id);
    }
    //
    // @PostMapping("/me/favourites/{pokemonId}")
    // public ResponseEntity<Void> addMyFavourite(
    // @AuthenticationPrincipal OAuth2User principal,
    // @PathVariable Long pokemonId
    // ) {
    // if (principal == null) {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    // }
    // userService.addMyFavouritePokemon(principal, pokemonId);
    // return ResponseEntity.ok().build();
    // }

    @PostMapping("/{userId}/favourites")
    public List<Pokemon> addFavouritePokemons(@PathVariable Long userId,
            @RequestBody List<CreatePokemonRequest> pokemonRequests) {
        userService.addFavouritePokemons(pokemonRequests, userId);
        // Returns updated list of favourite pokemon
        return userService.findFavouritePokemons(userId);
    }
    //
    // @DeleteMapping("/me/favourites/{pokemonId}")
    // public ResponseEntity<Void> removeMyFavourite(
    // @AuthenticationPrincipal OAuth2User principal,
    // @PathVariable Long pokemonId
    // ) {
    // if (principal == null) {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    // }
    // userService.removeMyFavouritePokemon(principal, pokemonId);
    // return ResponseEntity.noContent().build();
    // }

    @DeleteMapping("/{id}/favourites/{pokemonId}")
    public void deleteFavouritePokemon(@PathVariable Long userId, @RequestBody Pokemon pokemon) {
        userService.deleteFavouritePokemon(pokemon, userId);
    }

    // @GetMapping("/me")
    // public ResponseEntity<UserResponse> getMe(@AuthenticationPrincipal OAuth2User
    // principal) {
    // if (principal == null) {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    // }
    // return ResponseEntity.ok(userService.getOrCreateFromOAuth(principal));
    // }
    //
    // @PutMapping("/me")
    // public ResponseEntity<UserResponse> updateMe(
    // @AuthenticationPrincipal OAuth2User principal,
    // @Valid @RequestBody UpdateUserRequest request
    // ) {
    // if (principal == null) {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    // }
    // return ResponseEntity.ok(userService.updateMyName(principal, request));
    // }
    //
    // @DeleteMapping("/me")
    // public ResponseEntity<Void> deleteMe(@AuthenticationPrincipal OAuth2User
    // principal) {
    // if (principal == null) {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    // }
    // userService.deleteMe(principal);
    // return ResponseEntity.noContent().build();
    // }
    //
    // @GetMapping("/me/favourites")
    // public ResponseEntity<List<Long>> getMyFavourites(@AuthenticationPrincipal
    // OAuth2User principal) {
    // if (principal == null) {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    // }
    // return ResponseEntity.ok(userService.getMyFavouritePokemonIds(principal));
    // }
    //
    // @PostMapping("/me/favourites/{pokemonId}")
    // public ResponseEntity<Void> addMyFavourite(
    // @AuthenticationPrincipal OAuth2User principal,
    // @PathVariable Long pokemonId
    // ) {
    // if (principal == null) {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    // }
    // userService.addMyFavouritePokemon(principal, pokemonId);
    // return ResponseEntity.ok().build();
    // }
    //
    // @DeleteMapping("/me/favourites/{pokemonId}")
    // public ResponseEntity<Void> removeMyFavourite(
    // @AuthenticationPrincipal OAuth2User principal,
    // @PathVariable Long pokemonId
    // ) {
    // if (principal == null) {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    // }
    // userService.removeMyFavouritePokemon(principal, pokemonId);
    // return ResponseEntity.noContent().build();
    // }
}