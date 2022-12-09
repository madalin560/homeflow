package com.fmi.homeflow.service;

import com.fmi.homeflow.exception.user_exception.UserAlreadyExistsException;
import com.fmi.homeflow.model.User;
import com.fmi.homeflow.model.dto.UserDetailsDto;
import com.fmi.homeflow.model.dto.UserDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.URI;

@Service
@AllArgsConstructor
public class UserFacade {

    private final UserService userService;

    public UserDetailsDto getUserByUsername(String username) {
        User user = userService.getUserByUsername(username);
        return UserDetailsDto.builder()
                .name(user.getUsername())
                .email(user.getEmail())
                .build();
    }

    public URI addUser(UserDto user) {
        User newUser = userService.addUser(user);
        return userService.createUserURI(newUser);
    }

    public UserDetailsDto updateUser(String username, UserDetailsDto userDetailsDto) {
        User existingUser = userService.getUserByUsername(username);

        if (username.equals(existingUser.getUsername())) {
            throw new UserAlreadyExistsException(username);
        }

        return userService.updateUser(existingUser, userDetailsDto);
    }

    public void deleteUser(String username) {
        userService.deleteUser(username);
    }

}
