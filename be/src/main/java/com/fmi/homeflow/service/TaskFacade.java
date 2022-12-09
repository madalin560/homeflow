package com.fmi.homeflow.service;


import com.fmi.homeflow.model.Family;
import com.fmi.homeflow.model.Task;
import com.fmi.homeflow.model.User;
import com.fmi.homeflow.model.dto.TaskDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class TaskFacade {

    private final TaskService taskService;
    private final FamilyService familyService;
    private final UserService userService;


    public TaskDto getTaskById(UUID id) {
        Task task = taskService.getTaskById(id);
        return TaskDto.builder()
                .id(task.getId())
                .name(task.getName())
                .state(task.getState())
                .assigneeName(task.getAssignee().getUsername())
                .familyId(task.getFamily().getId())
                .build();
    }

    private Task DtoToTask(TaskDto task) {
        Family family = familyService.getFamilyById(task.getFamilyId());
        User user = null;
        if (task.getAssigneeName() != null) {
            user = userService.getUserByUsername(task.getAssigneeName());
        }
        return Task.builder()
                .id(task.getId())
                .name(task.getName())
                .state(task.getState())
                .assignee(user)
                .family(family)
                .build();
    }

    public void addTask(TaskDto taskDto) {
        Task task = DtoToTask(taskDto);
        taskService.addTask(task);

    }

    public void updateTask(TaskDto taskDto) {
        Task task = DtoToTask(taskDto);
        taskService.updateTask(task);
    }

    public void patchTask(TaskDto taskDto) {
        Task task = DtoToTask(taskDto);
        taskService.patchTask(task);
    }

    public void deleteTaskById(UUID id) {
        taskService.deleteTaskById(id);
    }

}
