package com.fmi.homeflow.service.notifications;

import com.fmi.homeflow.model.Task;

import java.util.Optional;

public interface Observer {
    void update(Notification notification);

    default Optional<String> textFromTask(Task task) {
        if (task == null) {
            return Optional.empty();
        }
        if (task.getName() == null) {
            return Optional.empty();
        }
        if (task.getState() == null) {
            return Optional.empty();
        }
        StringBuffer text = new StringBuffer();
        text.append("Task ");
        text.append(task.getName());
        text.append(" was appointed to you\n");
        text.append("State: ");
        text.append(task.getState().toString());
        text.append("\n HomeFlow");
        return Optional.of(text.toString());
    }
}
