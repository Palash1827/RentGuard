package com.rentguard_backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.rentguard_backend.dto.RepairUpdateRequest;
import com.rentguard_backend.exception.ApiException;
import com.rentguard_backend.model.Repair;
import com.rentguard_backend.repository.RepairRepository;

@Service
public class RepairService {

    private final RepairRepository repairRepository;

    public RepairService(RepairRepository repairRepository) {
        this.repairRepository = repairRepository;
    }

    public List<Repair> list(String ownerId) {
        return repairRepository.findByOwnerIdOrderByCreatedAtDesc(ownerId);
    }

    public Repair update(String ownerId, String id, RepairUpdateRequest r) {
        Repair repair = repairRepository.findByIdAndOwnerId(id, ownerId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Repair not found"));
        if (r.technician() != null) repair.setTechnician(r.technician().isBlank() ? null : r.technician().trim());
        if (r.expectedDate() != null) repair.setExpectedDate(r.expectedDate());
        if (r.status() != null) repair.setStatus(r.status());
        if (r.note() != null) repair.setNote(r.note().isBlank() ? null : r.note().trim());
        return repairRepository.save(repair);
    }
}
