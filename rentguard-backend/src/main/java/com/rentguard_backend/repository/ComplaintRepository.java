package com.rentguard_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.rentguard_backend.model.Complaint;

public interface ComplaintRepository extends MongoRepository<Complaint, String> {
    List<Complaint> findByOwnerIdOrderByCreatedAtDesc(String ownerId);
    Optional<Complaint> findByIdAndOwnerId(String id, String ownerId);
}
