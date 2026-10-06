package com.rentguard_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.rentguard_backend.model.Repair;

public interface RepairRepository extends MongoRepository<Repair, String> {
    List<Repair> findByOwnerIdOrderByCreatedAtDesc(String ownerId);
    Optional<Repair> findByIdAndOwnerId(String id, String ownerId);
    Optional<Repair> findByComplaintId(String complaintId);
    void deleteByComplaintId(String complaintId);
}
