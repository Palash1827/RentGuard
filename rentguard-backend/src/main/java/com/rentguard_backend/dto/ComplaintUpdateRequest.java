package com.rentguard_backend.dto;

import com.rentguard_backend.model.ComplaintStatus;
import com.rentguard_backend.model.Priority;

import jakarta.validation.constraints.Size;

/** Partial update: any null field is left unchanged. */
public record ComplaintUpdateRequest(
        @Size(max = 150) String title,
        @Size(max = 50) String category,
        @Size(max = 150) String location,
        Priority priority,
        ComplaintStatus status,
        @Size(max = 2000) String description) {
}
