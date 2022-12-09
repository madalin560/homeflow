package com.fmi.homeflow.controller;

import com.fmi.homeflow.model.Family;
import com.fmi.homeflow.service.FamilyService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

import static com.fmi.homeflow.utility.UserConstants.GET_USER_ROUTE;

@RestController
@RequestMapping("api/family")
@AllArgsConstructor
public class FamilyController {

    private final FamilyService familyService;

    @PreAuthorize("@familyService.memberIsInFamily(principal.username, #id)")
    @GetMapping("/{id}")
    public ResponseEntity<Family> getFamilyById(@PathVariable UUID id) {
        return ResponseEntity.ok(familyService.getFamilyById(id));
    }

    @PostMapping
    public ResponseEntity<Void> createFamily(@RequestBody Family family) {
        Family serviceFamily = familyService.createFamily(family.getName(), family.getMembersList());
        return ResponseEntity.created(URI.create(GET_USER_ROUTE + serviceFamily.getId())).build();
    }

    @PreAuthorize("@familyService.memberIsInFamily(principal.username, #familyId)")
    @PutMapping("/add/{familyId}/{username}")
    public ResponseEntity<Void> addToFamily(@PathVariable UUID familyId, @PathVariable String username) {
        familyService.addMemberToFamily(username, familyId);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("@familyService.memberIsInFamily(principal.username, #familyId) and @familyService.memberIsInFamily(#username, #familyId)")
    @DeleteMapping("/delete/{familyId}/{username}")
    public ResponseEntity<Void> removeFromFamily(@PathVariable UUID familyId, @PathVariable String username) {
        familyService.removeMemberFromFamily(username, familyId);
        return ResponseEntity.noContent().build();
    }


    @PreAuthorize("@familyService.memberIsInFamily(principal.username, #id)")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFamily(@PathVariable UUID id) {
        familyService.deleteFamily(id);
        return ResponseEntity.noContent().build();
    }
}
