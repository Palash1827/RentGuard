package com.rentguard_backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.rentguard_backend.dto.PaymentRequest;
import com.rentguard_backend.exception.ApiException;
import com.rentguard_backend.model.Payment;
import com.rentguard_backend.model.PaymentStatus;
import com.rentguard_backend.repository.PaymentRepository;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public List<Payment> list(String ownerId) {
        return paymentRepository.findByOwnerIdOrderByCreatedAtDesc(ownerId);
    }

    public Payment create(String ownerId, PaymentRequest r) {
        Payment p = new Payment();
        p.setOwnerId(ownerId);
        p.setMonth(r.month().trim());
        p.setAmount(r.amount());
        p.setStatus(r.status() == null ? PaymentStatus.PAID : r.status());
        return paymentRepository.save(p);
    }

    public void delete(String ownerId, String id) {
        Payment p = paymentRepository.findByIdAndOwnerId(id, ownerId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Payment not found"));
        paymentRepository.delete(p);
    }
}
