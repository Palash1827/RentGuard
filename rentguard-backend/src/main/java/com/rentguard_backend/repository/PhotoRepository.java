package com.rentguard_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.rentguard_backend.model.Photo;

public interface PhotoRepository extends MongoRepository<Photo, String> {
    List<Photo> findByOwnerIdOrderByCreatedAtDesc(String ownerId);
    List<Photo> findByOwnerIdAndPropertyIdOrderByCreatedAtDesc(String ownerId, String propertyId);
    List<Photo> findByOwnerIdAndComplaintIdOrderByCreatedAtDesc(String ownerId, String complaintId);
    Optional<Photo> findByIdAndOwnerId(String id, String ownerId);
}
