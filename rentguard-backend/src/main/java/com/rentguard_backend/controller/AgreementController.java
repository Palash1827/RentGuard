package com.rentguard_backend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentguard_backend.dto.AgreementRequest;
import com.rentguard_backend.model.Agreement;
import com.rentguard_backend.security.AuthUser;
import com.rentguard_backend.service.AgreementService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/agreement")
public class AgreementController {

    private final AgreementService service;

    public AgreementController(AgreementService service) {
        this.service = service;
    }

    /** 404 until the tenant saves an agreement. */
    @GetMapping
    public Agreement get(@AuthenticationPrincipal AuthUser user) {
        return service.get(user.getId());
    }

    @PutMapping
    public Agreement save(@AuthenticationPrincipal AuthUser user, @Valid @RequestBody AgreementRequest request) {
        return service.save(user.getId(), request);
    }
}
