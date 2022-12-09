package com.fmi.homeflow.model.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor()
public class UserDto {

    @NotNull
    @NotBlank
    private String name;

    @NotNull
    @NotBlank
    private String password;

}
