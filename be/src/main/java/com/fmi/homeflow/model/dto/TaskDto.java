package com.fmi.homeflow.model.dto;

import com.fmi.homeflow.model.State;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@Builder
public class TaskDto {

    private UUID id;

    private String name;

    private State state;

    private UUID familyId;

    private String assigneeName;

}
