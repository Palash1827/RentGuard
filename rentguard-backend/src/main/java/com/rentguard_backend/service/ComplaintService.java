package com.rentguard_backend.service;

import java.time.Instant;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.rentguard_backend.dto.ComplaintRequest;
import com.rentguard_backend.dto.ComplaintUpdateRequest;
import com.rentguard_backend.exception.ApiException;
import com.rentguard_backend.model.Complaint;
import com.rentguard_backend.model.ComplaintStatus;
import com.rentguard_backend.model.Priority;
import com.rentguard_backend.model.Repair;
import com.rentguard_backend.model.RepairStatus;
import com.rentguard_backend.repository.ComplaintRepository;
import com.rentguard_backend.repository.RepairRepository;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final RepairRepository repairRepository;
    private final PhotoService photoService;

    public ComplaintService(ComplaintRepository complaintRepository, RepairRepository repairRepository,
                            PhotoService photoService) {
        this.complaintRepository = complaintRepository;
        this.repairRepository = repairRepository;
        this.photoService = photoService;
    }

    public Complaint create(String ownerId, ComplaintRequest r) {
        Complaint c = new Complaint();
        c.setOwnerId(ownerId);
        c.setTitle(r.title().trim());
        c.setCategory(r.category().trim());
        c.setLocation(r.location() == null || r.location().isBlank() ? "My Rental" : r.location().trim());
        c.setPriority(r.priority() == null ? Priority.MEDIUM : r.priority());
        c.setDescription(r.description().trim());
        c = complaintRepository.save(c);

        Repair repair = new Repair();
        repair.setOwnerId(ownerId);
        repair.setComplaintId(c.getId());
        repair.setIssueTitle(c.getTitle());
        repairRepository.save(repair);
        return c;
    }

    public List<Complaint> list(String ownerId) {
        return complaintRepository.findByOwnerIdOrderByCreatedAtDesc(ownerId);
    }

    public Complaint get(String ownerId, String id) {
        return complaintRepository.findByIdAndOwnerId(id, ownerId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Complaint not found"));
    }

    public Complaint update(String ownerId, String id, ComplaintUpdateRequest r) {
        Complaint c = get(ownerId, id);
        if (r.title() != null && !r.title().isBlank()) c.setTitle(r.title().trim());
        if (r.category() != null && !r.category().isBlank()) c.setCategory(r.category().trim());
        if (r.location() != null && !r.location().isBlank()) c.setLocation(r.location().trim());
        if (r.description() != null && !r.description().isBlank()) c.setDescription(r.description().trim());
        if (r.priority() != null) c.setPriority(r.priority());
        if (r.status() != null) c.setStatus(r.status());
        c.setUpdatedAt(Instant.now());
        c = complaintRepository.save(c);

        // keep the linked repair record in sync
        final Complaint saved = c;
        repairRepository.findByComplaintId(id).ifPresent(repair -> {
            repair.setIssueTitle(saved.getTitle());
            repair.setStatus(toRepairStatus(saved.getStatus()));
            repairRepository.save(repair);
        });
        return c;
    }

    public void delete(String ownerId, String id) {
        Complaint c = get(ownerId, id);
        photoService.deleteAllForComplaint(ownerId, id);
        repairRepository.deleteByComplaintId(id);
        complaintRepository.delete(c);
    }

    private RepairStatus toRepairStatus(ComplaintStatus s) {
        return switch (s) {
            case OPEN -> RepairStatus.PENDING;
            case IN_PROGRESS -> RepairStatus.IN_PROGRESS;
            case RESOLVED -> RepairStatus.COMPLETED;
        };
    }
}
