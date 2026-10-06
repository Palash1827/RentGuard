package com.rentguard_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.rentguard_backend.dto.ComplaintRequest;
import com.rentguard_backend.dto.ComplaintUpdateRequest;
import com.rentguard_backend.model.Complaint;
import com.rentguard_backend.security.AuthUser;
import com.rentguard_backend.service.ComplaintService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService service;

    public ComplaintController(ComplaintService service) {
        this.service = service;
    }

    @GetMapping
    public List<Complaint> list(@AuthenticationPrincipal AuthUser user) {
        return service.list(user.getId());
    }

    @GetMapping("/{id}")
    public Complaint get(@AuthenticationPrincipal AuthUser user, @PathVariable String id) {
        return service.get(user.getId(), id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Complaint create(@AuthenticationPrincipal AuthUser user, @Valid @RequestBody ComplaintRequest request) {
        return service.create(user.getId(), request);
    }

    @PutMapping("/{id}")
    public Complaint update(@AuthenticationPrincipal AuthUser user, @PathVariable String id,
                            @Valid @RequestBody ComplaintUpdateRequest request) {
        return service.update(user.getId(), id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@AuthenticationPrincipal AuthUser user, @PathVariable String id) {
        service.delete(user.getId(), id);
    }
}
