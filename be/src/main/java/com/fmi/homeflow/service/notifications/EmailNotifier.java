package com.fmi.homeflow.service.notifications;


import com.fmi.homeflow.model.User;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessagePreparator;

import javax.mail.*;
import javax.mail.internet.MimeMessage;
import java.util.Optional;
import java.util.Properties;

public class EmailNotifier implements Observer {

    Session session;
    private static final String TITLE = "HomeFlow";
    private static final String FROM_MAIL = "7fivwlats@relay.firefox.com";

    public EmailNotifier() {
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp-relay.sendinblue.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        Authenticator auth = new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(FROM_MAIL, "NKs8Mc1DQ52OyEUT");
            }
        };
        session = Session.getInstance(props, auth);
    }

    @Override
    public void update(Notification notification) {
        Optional<String> emailToOptional = getEmailTo(notification);
        if (emailToOptional.isEmpty()) {
            return;
        }
        String emailTo = emailToOptional.get();

        Optional<String> messageOptional = textFromTask(notification.getTask());
        if (messageOptional.isEmpty()) {
            return;
        }
        String message = messageOptional.get();

        try {
            MimeMessage msg = new MimeMessage(session);
            msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
            msg.addHeader("format", "flowed");
            msg.addHeader("Content-Transfer-Encoding", "8bit");
            msg.setFrom(FROM_MAIL);
            msg.setSubject(TITLE, "UTF-8");
            msg.setText(message, "UTF-8");
            msg.setRecipients(Message.RecipientType.TO, emailTo);

            Transport.send(msg);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    private Optional<String> getEmailTo(Notification notification) {
        if (notification == null) {
            return Optional.empty();
        }
        User user = notification.getUser();
        if (user == null) {
            return Optional.empty();
        }
        String emailTo = user.getEmail();
        if (emailTo == null) {
            return Optional.empty();
        }
        return Optional.of(emailTo);
    }
}
