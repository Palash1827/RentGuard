package com.rentguard_backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.rentguard_backend.model.Agreement;

public interface AgreementRepository extends MongoRepository<Agreement, String> {
    Optional<Agreement> findByOwnerId(String ownerId);
}
