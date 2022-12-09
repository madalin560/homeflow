package com.fmi.homeflow.exception.user_exception;

import com.fmi.homeflow.exception.ResourceNotFoundException;

import java.util.UUID;

public class FamilyNotFoundException extends ResourceNotFoundException {

    public FamilyNotFoundException(UUID id) {
        super("Family with " + id + " was not found!");
    }

}
