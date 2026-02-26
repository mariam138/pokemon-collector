package com.example.pokemon.services;

import com.example.pokemon.DTOs.CreatePokemonRequest;
import com.example.pokemon.DTOs.CreateUserRequest;
import com.example.pokemon.DTOs.LoginRequest;
import com.example.pokemon.DTOs.UserResponse;
import com.example.pokemon.models.Pokemon;
import com.example.pokemon.models.User;
import com.example.pokemon.repositories.PokemonRepository;
import com.example.pokemon.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepo;
    private final PokemonRepository pokemonRepo;

    public UserService(UserRepository userRepo, PokemonRepository pokemonRepo) {
        this.userRepo = userRepo;
        this.pokemonRepo = pokemonRepo;
    }

    private UserResponse mapToResponse(User user) {
        return new UserResponse(user.getId(), user.getName(), user.getEmail());
    }

    // Create new user on POST request
    public UserResponse addUser(CreateUserRequest newUserRequest) {
        if (userRepo.findByEmail(newUserRequest.getEmail()) != null) {
            throw new IllegalArgumentException("Email already in use: " + newUserRequest.getEmail());
        }
        User user = new User();
        user.setName(newUserRequest.getName());
        user.setEmail(newUserRequest.getEmail());
        User saved = userRepo.save(user);
        return mapToResponse(saved);
    }

    public UserResponse login(LoginRequest loginRequest) {
        if (loginRequest == null || loginRequest.getEmail() == null || loginRequest.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email must not be blank.");
        }

        User user = userRepo.findByEmail(loginRequest.getEmail());
        if (user == null) {
            user = new User();
            user.setEmail(loginRequest.getEmail());

            String name = loginRequest.getName();
            user.setName(name != null && !name.isBlank() ? name : "Unknown");

            user = userRepo.save(user);
        }

        return mapToResponse(user);
    }

    // READ on GET request
    public User findUserById(Long id) {
        return userRepo.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format(
                        "User with ID: %d, was not found", id)));
    }

    // GET all users
    public List<UserResponse> findAllUsers() {
        return userRepo.findAll().stream().map(this::mapToResponse).toList();
    }

    // DELETE user by id
    public void deleteUser(Long id) {
        if (!userRepo.existsById(id)) {
            throw new EntityNotFoundException(String.format(
                    "User with ID: %d, was not found", id));
        }
        userRepo.deleteById(id);
    }

    public List<Pokemon> findFavouritePokemons(Long id) {
        User user = userRepo.findById(id).orElseThrow(() -> new EntityNotFoundException(String.format(
                "User with ID: %d, was not found", id)));
        return user.getFavouritePokemons().stream().toList();
    }

    @Transactional
    public void addFavouritePokemons(List<CreatePokemonRequest> pokemonRequests, Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("User with ID: %d, was not found", userId)));

        // Get existing favourite Pokemon IDs
        Set<Long> existingPokemonIds = user.getFavouritePokemons()
                .stream()
                .map(Pokemon::getId)
                .collect(Collectors.toSet());

        // Remove duplicates inside request list
        Set<Long> seenIds = new HashSet<>();

        for (CreatePokemonRequest req : pokemonRequests) {

            Long pokemonId = req.getPokemonId();

            // Skip duplicate in same request
            if (!seenIds.add(pokemonId)) continue;

            // Skip if user already has it
            if (existingPokemonIds.contains(pokemonId)) continue;

            // Check if Pokémon already exists in DB
            Pokemon pokemon = pokemonRepo.findById(pokemonId)
                    .orElseGet(() -> {
                        Pokemon newPokemon = new Pokemon();
                        newPokemon.setId(req.getPokemonId());
                        newPokemon.setName(req.getPokemonName());
                        newPokemon.setAbility(req.getAbility());
                        newPokemon.setBaseExperience(req.getBaseExperience());
                        newPokemon.setHeight(req.getHeight());
                        newPokemon.setWeight(req.getWeight());
                        newPokemon.setTypeOne(req.getTypeOne());
                        newPokemon.setTypeTwo(req.getTypeTwo());
                        return pokemonRepo.save(newPokemon);
                    });

            user.getFavouritePokemons().add(pokemon);
        }
        userRepo.save(user);
    }

    public void deleteFavouritePokemon(Pokemon pokemon, Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new EntityNotFoundException(String.format(
                "User with ID: %d, was not found", userId)));

        boolean removed = user.getFavouritePokemons().removeIf(p -> p.getId().equals(pokemon.getId()));
        if (removed) {
            userRepo.save(user);
        }

    }
}