package com.rentguard_backend.dto;

public record AuthResponse(String token, String tokenType, long expiresInSeconds, UserResponse user) {
    public static AuthResponse bearer(String token, long expiresInSeconds, UserResponse user) {
        return new AuthResponse(token, "Bearer", expiresInSeconds, user);
    }
}
