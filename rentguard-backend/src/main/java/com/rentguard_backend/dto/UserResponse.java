package com.rentguard_backend.dto;

import com.rentguard_backend.model.User;

public record UserResponse(String id, String name, String email) {
    public static UserResponse from(User u) {
        return new UserResponse(u.getId(), u.getName(), u.getEmail());
    }
}
