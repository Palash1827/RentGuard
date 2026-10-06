package com.rentguard_backend.dto;

import com.rentguard_backend.model.Priority;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ComplaintRequest(
        @NotBlank @Size(max = 150) String title,
        @NotBlank @Size(max = 50) String category,
        @Size(max = 150) String location,
        Priority priority,
        @NotBlank @Size(max = 2000) String description) {
}
