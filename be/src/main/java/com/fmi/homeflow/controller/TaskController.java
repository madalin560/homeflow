package com.fmi.homeflow.controller;

import com.fmi.homeflow.model.dto.TaskDto;
import com.fmi.homeflow.service.TaskFacade;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

import static com.fmi.homeflow.utility.UserConstants.GET_USER_ROUTE;

@RestController
@RequestMapping("api/task")
@AllArgsConstructor
public class TaskController {

    private final TaskFacade taskFacade;

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable UUID id) {
        return ResponseEntity.ok(taskFacade.getTaskById(id));
    }

    @PreAuthorize("@familyService.memberIsInFamily(principal.username, #task.getFamilyId())")
    @PostMapping
    public ResponseEntity<Void> addTask(@RequestBody TaskDto task) {
        taskFacade.addTask(task);
        return ResponseEntity.created(URI.create(GET_USER_ROUTE + task.getId())).build();
    }

    @PreAuthorize("@familyService.memberIsInFamily(principal.username, #task.getFamilyId())")
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateTask(@PathVariable UUID id, @RequestBody TaskDto task) {
        task.setId(id);
        taskFacade.updateTask(task);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("@familyService.memberIsInFamily(principal.username, @taskService.getTaskById(#id))")
    @PatchMapping("/{id}")
    public ResponseEntity<Void> patchTask(@PathVariable UUID id, @RequestBody TaskDto task) {
        task.setId(id);
        taskFacade.patchTask(task);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("@familyService.memberIsInFamily(principal.username, #id)")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable UUID id) {
        taskFacade.deleteTaskById(id);
        return ResponseEntity.noContent().build();
    }

}
