package com.rentguard_backend.dto;

import java.math.BigDecimal;

import com.rentguard_backend.model.PaymentStatus;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PaymentRequest(
        @NotBlank @Size(max = 40) String month,
        @NotNull @DecimalMin(value = "0.01", message = "must be greater than 0") BigDecimal amount,
        PaymentStatus status) {
}
