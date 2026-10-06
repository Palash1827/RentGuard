package com.rentguard_backend.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentguard_backend.dto.RepairUpdateRequest;
import com.rentguard_backend.model.Repair;
import com.rentguard_backend.security.AuthUser;
import com.rentguard_backend.service.RepairService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/repairs")
public class RepairController {

    private final RepairService service;

    public RepairController(RepairService service) {
        this.service = service;
    }

    @GetMapping
    public List<Repair> list(@AuthenticationPrincipal AuthUser user) {
        return service.list(user.getId());
    }

    @PutMapping("/{id}")
    public Repair update(@AuthenticationPrincipal AuthUser user, @PathVariable String id,
                         @Valid @RequestBody RepairUpdateRequest request) {
        return service.update(user.getId(), id, request);
    }
}
