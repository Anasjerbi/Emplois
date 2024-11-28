package com.coderdot.dto;

import com.coderdot.entities.Role;

import lombok.Data;

@Data
public class UserResponse {
    private Long id;

    private String name;

    private Role role;

    private String email;
    private ClasseDTO classe;
}
