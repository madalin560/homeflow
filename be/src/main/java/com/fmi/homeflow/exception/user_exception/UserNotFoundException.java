package com.fmi.homeflow.exception.user_exception;

import com.fmi.homeflow.exception.ResourceNotFoundException;

public class UserNotFoundException extends ResourceNotFoundException {

    public UserNotFoundException(String username) {
        super("User with username " + username + " was not found!");
    }

}
