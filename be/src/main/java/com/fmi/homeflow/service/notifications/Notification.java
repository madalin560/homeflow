package com.fmi.homeflow.service.notifications;

import com.fmi.homeflow.model.Task;
import com.fmi.homeflow.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Notification {
    private User user;
    private Task task;
}
