package com.fmi.homeflow.service;

import com.fmi.homeflow.exception.user_exception.UserAlreadyExistsException;
import com.fmi.homeflow.exception.user_exception.UserNotFoundException;
import com.fmi.homeflow.model.Role;
import com.fmi.homeflow.model.User;
import com.fmi.homeflow.model.dto.UserDetailsDto;
import com.fmi.homeflow.model.dto.UserDto;
import com.fmi.homeflow.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.URI;

import static com.fmi.homeflow.utility.UserConstants.GET_USER_ROUTE;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User addUser(UserDto userDto) {
        if (userRepository.existsByUsername(userDto.getName())) {
            throw new UserAlreadyExistsException(userDto.getName());
        }

        return userRepository.save(User.builder()
                .username(userDto.getName())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .role(Role.MEMBER)
                .build());
    }

    public URI createUserURI(User user) {
        return URI.create(GET_USER_ROUTE + user.getUsername());
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(username));
    }

    public UserDetailsDto updateUser(User user, UserDetailsDto userDetailsDto) {
        User updatedUser = updateUser(updateUserWithGivenDetails(user, userDetailsDto));
        return UserDetailsDto.builder()
                .name(updatedUser.getUsername())
                .firstName(updatedUser.getFirstName())
                .lastName(updatedUser.getLastName())
                .email(updatedUser.getEmail())
                .phone(updatedUser.getPhone())
                .build();
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(String username) {
        userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(username));
        userRepository.deleteByUsername(username);
    }

    private User updateUserWithGivenDetails(User user, UserDetailsDto userDetailsDto) {
        user.setUsername(userDetailsDto.getName() == null ? user.getUsername() : userDetailsDto.getName());
        user.setFirstName(userDetailsDto.getFirstName() == null ? user.getFirstName() : userDetailsDto.getFirstName());
        user.setLastName(userDetailsDto.getLastName() == null ? user.getLastName() : userDetailsDto.getLastName());
        user.setEmail(userDetailsDto.getEmail() == null ? user.getEmail() : userDetailsDto.getEmail());
        user.setPhone(userDetailsDto.getPhone() == null ? user.getPhone() : userDetailsDto.getPhone());
        return user;
    }

}
