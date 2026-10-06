package com.rentguard_backend.dto;

import java.time.LocalDate;

import com.rentguard_backend.model.RepairStatus;

import jakarta.validation.constraints.Size;

public record RepairUpdateRequest(
        @Size(max = 100) String technician,
        LocalDate expectedDate,
        RepairStatus status,
        @Size(max = 1000) String note) {
}
