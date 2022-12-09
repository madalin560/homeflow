package com.fmi.homeflow.service;

import com.fmi.homeflow.exception.InvalidDataException;
import com.fmi.homeflow.exception.user_exception.FamilyNotFoundException;
import com.fmi.homeflow.model.Family;
import com.fmi.homeflow.model.User;
import com.fmi.homeflow.repository.FamilyRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@AllArgsConstructor
public class FamilyService {

    private final FamilyRepository familyRepository;
    private final UserService userService;

    public Family createFamily(String name, Set<User> members) {
        Family family = Family.builder().name(name).membersList(members).build();
        return familyRepository.save(family);
    }

    public Family getFamilyById(UUID id) {
        Optional<Family> familyOptional = familyRepository.findById(id);
        if (familyOptional.isEmpty()) {
            throw new FamilyNotFoundException(id);
        }
        return familyOptional.get();
    }


    public void addMemberToFamily(String username, UUID familyId) {
        User user = userService.getUserByUsername(username);
        Family family = getFamilyById(familyId);
        user.setUserFamily(family);
        userService.updateUser(user);
    }

    /**
     * Removes user from family, by using username and familyId.
     * Throws {@link InvalidDataException} if given familyId is different from the one of the user.
     *
     * @param username name used by the user on the platform, used to identify him for removal.
     * @param familyId id of the family from which we want to remove the given user by username.
     */
    public void removeMemberFromFamily(String username, UUID familyId) {
        User user = userService.getUserByUsername(username);

        if (user.getUserFamily().getId().equals(familyId)) {
            throw new InvalidDataException("familyId");
        }

        user.setUserFamily(null);
        userService.updateUser(user);
    }

    public boolean memberIsInFamily(User user, UUID familyId) {
        User familyMember = userService.getUserByUsername(user.getUsername());
        return familyMember.getUserFamily().getId().equals(familyId);
    }

    public boolean memberIsInFamily(String username, UUID familyId) {
        User user = userService.getUserByUsername(username);
        return user.getUserFamily().getId().equals(familyId);
    }

    public void deleteFamily(UUID id) {
        familyRepository.deleteById(id);
    }
}
