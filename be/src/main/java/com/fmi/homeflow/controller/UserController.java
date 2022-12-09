package com.fmi.homeflow.controller;

import com.fmi.homeflow.model.dto.UserDetailsDto;
import com.fmi.homeflow.model.dto.UserDto;
import com.fmi.homeflow.service.UserFacade;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
@AllArgsConstructor
class UserController {

    private final UserFacade userFacade;

    @GetMapping(value = "/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDetailsDto> getUser(@PathVariable String username) {
        return ResponseEntity.ok(userFacade.getUserByUsername(username));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> addUser(@RequestBody UserDto user) {
        return ResponseEntity.created(userFacade.addUser(user)).build();
    }

    @PreAuthorize("principal.username == #username")
    @PutMapping(value = "/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDetailsDto> updateUser(
            @PathVariable String username,
            @RequestBody UserDetailsDto userDetailsDto
    ) {
        return ResponseEntity.ok(userFacade.updateUser(username, userDetailsDto));
    }

    @PreAuthorize("principal.username == #username")
    @DeleteMapping(value = "/delete/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        userFacade.deleteUser(username);
        return ResponseEntity.noContent().build();
    }
}
