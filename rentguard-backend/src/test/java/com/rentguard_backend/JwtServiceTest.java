package com.rentguard_backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

import com.rentguard_backend.security.JwtService;

class JwtServiceTest {

    private static final String SECRET = "unit-test-secret-that-is-long-enough-123";

    @Test
    void roundTripsEmail() {
        JwtService jwt = new JwtService(SECRET, 5);
        String token = jwt.generateToken("a@b.com");
        assertEquals("a@b.com", jwt.extractEmail(token).orElseThrow());
    }

    @Test
    void rejectsTamperedToken() {
        JwtService jwt = new JwtService(SECRET, 5);
        assertTrue(jwt.extractEmail(jwt.generateToken("a@b.com") + "x").isEmpty());
    }

    @Test
    void rejectsTokenFromOtherSecret() {
        String token = new JwtService("another-secret-that-is-long-enough-456", 5).generateToken("a@b.com");
        assertTrue(new JwtService(SECRET, 5).extractEmail(token).isEmpty());
    }

    @Test
    void rejectsShortSecret() {
        assertThrows(IllegalStateException.class, () -> new JwtService("short", 5));
    }
}
