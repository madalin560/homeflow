package com.fmi.homeflow.service;

import com.fmi.homeflow.exception.InvalidDataException;
import com.fmi.homeflow.exception.user_exception.TaskNotFoundException;
import com.fmi.homeflow.model.Family;
import com.fmi.homeflow.model.Task;
import com.fmi.homeflow.model.User;
import com.fmi.homeflow.repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final FamilyService familyService;
    private final NotificationService notificationService;

    public Task getTaskById(UUID id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    public void deleteTaskById(UUID id) {
        taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
        taskRepository.deleteById(id);
    }

    public void addTask(Task task) {
        if (validateTask(task)) {
            Task savedTask = taskRepository.save(task);
            if (savedTask.getAssignee() != null) {
                notificationService.notifyUser(task.getAssignee(), task);
            }
        }
    }

    /**
     * Validates a task
     * <ul>
     *     <li>The task is present in a family (a task is created within a family)</li>
     *     <li>If the task is assigned to someone, verify that the that user is a member of that family</li>
     * </ul>
     *
     * @param task the task to validate
     * @return <ul><li>true if it's valid</li>
     *         <li>false if it's not</li></ul>
     * @throws InvalidDataException if the task has no family assigned.
     */
    public boolean validateTask(Task task) {
        Family family = task.getFamily();
        if (family == null) {
            throw new InvalidDataException();
        }
        if (task.getAssignee() != null) {
            User user = task.getAssignee();
            boolean isInFamily = familyService.memberIsInFamily(user, family.getId());
            if (!isInFamily) {
                throw new InvalidDataException();
            }
        }
        return true;
    }

    /**
     * Calls the notification service if the task have the assignee changed
     *
     * @param previousTask previous task
     * @param currentTask  the task to be saved
     */
    public void notifyIfNeeded(Task previousTask, Task currentTask) {
        if (previousTask.getAssignee() != null && !previousTask.getAssignee().equals(currentTask.getAssignee())) {
            notificationService.notifyUser(currentTask.getAssignee(), currentTask);
        }
    }

    public void updateTask(Task task) {
        Task previousTask = getTaskById(task.getId());
        if (validateTask(task)) {
            taskRepository.save(task);
            notifyIfNeeded(previousTask, task);
        }
    }

    public void patchTask(Task task) {
        Task existingTask = getTaskById(task.getId());
        boolean changedAssignee = false;
        if (task.getName() != null) {
            existingTask.setName(task.getName());
        }
        if (task.getState() != null) {
            existingTask.setState(task.getState());
        }
        if (task.getAssignee() != null) {
            changedAssignee = task.getAssignee().equals(existingTask.getAssignee());
            existingTask.setAssignee(task.getAssignee());
        }
        if (validateTask(existingTask)) {
            taskRepository.save(existingTask);
            if (changedAssignee && existingTask.getAssignee() != null) {
                notificationService.notifyUser(existingTask.getAssignee(), existingTask);
            }
        }
    }
}