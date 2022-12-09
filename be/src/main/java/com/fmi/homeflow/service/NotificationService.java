package com.fmi.homeflow.service;

import com.fmi.homeflow.model.Task;
import com.fmi.homeflow.model.User;
import com.fmi.homeflow.service.notifications.EmailNotifier;
import com.fmi.homeflow.service.notifications.Notification;
import com.fmi.homeflow.service.notifications.Observer;
import com.fmi.homeflow.service.notifications.SMSNotifier;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
@AllArgsConstructor
public class NotificationService {

    List<Observer> observers;

    @PostConstruct
    public void init() {
        addObserver(new EmailNotifier());
        addObserver(new SMSNotifier());
    }

    public void notifyUser(User user, Task task) {
        observers.forEach(observer -> observer.update(new Notification(user, task)));
    }

    public synchronized void addObserver(Observer observer) {
        observers.add(observer);
    }

    public synchronized void removeObserver(Observer observer) {
        observers.remove(observer);
    }
}
