package com.fmi.homeflow.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "families")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Family {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "name_of_family")
    private String name;

    @OneToMany(mappedBy = "userFamily")
    @JsonIgnore
    private Set<User> membersList;

}
