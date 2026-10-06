package com.rentguard_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.rentguard_backend.model.Payment;

public interface PaymentRepository extends MongoRepository<Payment, String> {
    List<Payment> findByOwnerIdOrderByCreatedAtDesc(String ownerId);
    Optional<Payment> findByIdAndOwnerId(String id, String ownerId);
}
