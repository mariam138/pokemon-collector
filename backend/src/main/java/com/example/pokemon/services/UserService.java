package com.example.pokemon.services;

import com.example.pokemon.DTOs.UpdateUserRequest;
import com.example.pokemon.DTOs.UserResponse;
import com.example.pokemon.models.Pokemon;
import com.example.pokemon.models.User;
import com.example.pokemon.repositories.PokemonRepository;
import com.example.pokemon.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;

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
        if (userRepo.findByEmail(newUserRequest.getEmail())) {
            throw new IllegalArgumentException("Email already in use: " + newUserRequest.getEmail());
        }
        User user = new User();
        user.setName(newUserRequest.getName());
        user.setEmail(newUserRequest.getEmail());
        User saved = userRepo.save(user);
        return mapToResponse(saved);
    }

    //READ on GET request
    public User findUserById(Long id) {
        return userRepo.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format(
                        "User with ID: %d, was not found", id
                )));
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
//    private User getMe(OAuth2User principal) {
//        if (principal == null) {
//            throw new IllegalStateException("Not authenticated.");
//        }
//
//        String email = principal.getAttribute("email");
//        if (email == null || email.isBlank()) {
//            throw new IllegalStateException("OAuth login did not provide an email address.");
//        }
//
//        return userRepo.findByEmail(email)
//                .orElseThrow(() -> new EntityNotFoundException("User not found for email: " + email));
//    }
//
//    public UserResponse getOrCreateFromOAuth(OAuth2User principal) {
//        if (principal == null) {
//            throw new IllegalStateException("Not authenticated.");
//        }
//
//        String email = principal.getAttribute("email");
//        String name = principal.getAttribute("name");
//
//        if (email == null || email.isBlank()) {
//            throw new IllegalStateException("OAuth login did not provide an email address.");
//        }
//
//        User user = userRepo.findByEmail(email).orElseGet(() -> {
//            User newUser = new User();
//            newUser.setEmail(email);
//            newUser.setName((name != null && !name.isBlank()) ? name : "Unknown");
//            return userRepo.save(newUser);
//        });
//
//        return mapToResponse(user);
//    }
//
//    public UserResponse updateMyName(OAuth2User principal, UpdateUserRequest request) {
//        if (request == null || request.getName() == null || request.getName().isBlank()) {
//            throw new IllegalArgumentException("Name must not be blank.");
//        }
//
//        User user = getMe(principal);
//        user.setName(request.getName().trim());
//        return mapToResponse(userRepo.save(user));
//    }
//
//    public void deleteMe(OAuth2User principal) {
//        User user = getMe(principal);
//        userRepo.delete(user);
//    }
//
//    public List<Long> getMyFavouritePokemonIds(OAuth2User principal) {
//        User user = getMe(principal);
//        return user.getFavouritePokemons()
//                .stream()
//                .map(Pokemon::getId)
//                .toList();
//    }

    public List<Pokemon> findFavouritePokemons(Long id) {
        User user = userRepo.findById(id).orElseThrow(() -> new EntityNotFoundException(String.format(
                "User with ID: %d, was not found", id)));
        return user.getFavouritePokemons().stream().toList();
    }
//
//    public void addMyFavouritePokemon(OAuth2User principal, Long pokemonId) {
//        if (pokemonId == null || pokemonId <= 0) {
//            throw new IllegalArgumentException("pokemonId must be positive.");
//        }
//
//        User user = getMe(principal);
//
//        Pokemon pokemon = pokemonRepo.findById(pokemonId)
//                .orElseThrow(() -> new EntityNotFoundException("Pokemon not found: " + pokemonId));
//
//        boolean alreadyFavourite = user.getFavouritePokemons()
//                .stream()
//                .anyMatch(p -> p.getId().equals(pokemonId));
//
//        if (!alreadyFavourite) {
//            user.getFavouritePokemons().add(pokemon);
//            userRepo.save(user);
//        }
//    }

    public void addFavouritePokemons(Pokemon pokemon, Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new EntityNotFoundException(String.format(
                "User with ID: %d, was not found", userId)));

        // Save pokemon if it doesn't already exist
        if (pokemon.getId() != null && !pokemonRepo.existsById(pokemon.getId())) {
            pokemonRepo.save(pokemon);
        }

        // Add pokemon to user's favourites
        user.getFavouritePokemons().add(pokemon);
        userRepo.save(user);
    }
//
//    public void removeMyFavouritePokemon(OAuth2User principal, Long pokemonId) {
//        if (pokemonId == null || pokemonId <= 0) {
//            throw new IllegalArgumentException("pokemonId must be positive.");
//        }
//
//        User user = getMe(principal);
//
//        boolean removed = user.getFavouritePokemons()
//                .removeIf(p -> p.getId().equals(pokemonId));
//
//        if (removed) {
//            userRepo.save(user);
//        }
//    }

    public void deleteFavouritePokemon(Pokemon pokemon, Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new EntityNotFoundException(String.format(
                "User with ID: %d, was not found", userId)));

        boolean removed = user.getFavouritePokemons().removeIf(p -> p.getId().equals(pokemon.getId()));
        if (removed) {
            userRepo.save(user);
        }

    }
}