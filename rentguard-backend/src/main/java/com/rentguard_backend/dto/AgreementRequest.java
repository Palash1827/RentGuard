package com.rentguard_backend.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AgreementRequest(
        @Size(max = 200) String fileName,
        @NotNull @DecimalMin("0") BigDecimal monthlyRent,
        @NotNull @DecimalMin("0") BigDecimal securityDeposit,
        @Size(max = 100) String noticePeriod,
        @Size(max = 300) String maintenanceResponsibility,
        @Size(max = 2000) String summary) {
}
