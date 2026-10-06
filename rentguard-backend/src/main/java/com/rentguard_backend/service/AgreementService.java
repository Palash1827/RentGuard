package com.rentguard_backend.service;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.rentguard_backend.dto.AgreementRequest;
import com.rentguard_backend.exception.ApiException;
import com.rentguard_backend.model.Agreement;
import com.rentguard_backend.repository.AgreementRepository;

@Service
public class AgreementService {

    private final AgreementRepository agreementRepository;

    public AgreementService(AgreementRepository agreementRepository) {
        this.agreementRepository = agreementRepository;
    }

    public Agreement get(String ownerId) {
        return agreementRepository.findByOwnerId(ownerId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "No agreement saved yet"));
    }

    public Agreement save(String ownerId, AgreementRequest r) {
        Agreement a = agreementRepository.findByOwnerId(ownerId).orElseGet(Agreement::new);
        a.setOwnerId(ownerId);
        a.setFileName(r.fileName() == null || r.fileName().isBlank() ? "Rental Agreement" : r.fileName().trim());
        a.setMonthlyRent(r.monthlyRent());
        a.setSecurityDeposit(r.securityDeposit());
        a.setNoticePeriod(r.noticePeriod());
        a.setMaintenanceResponsibility(r.maintenanceResponsibility());
        a.setSummary(r.summary());
        a.setUpdatedAt(Instant.now());
        return agreementRepository.save(a);
    }
}
