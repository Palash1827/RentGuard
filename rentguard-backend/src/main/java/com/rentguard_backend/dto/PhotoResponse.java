package com.rentguard_backend.dto;

import java.time.Instant;

import com.rentguard_backend.model.Photo;

public record PhotoResponse(
        String id,
        String title,
        String description,
        String propertyId,
        String complaintId,
        String fileName,
        String contentType,
        long size,
        Instant createdAt,
        String url) {

    public static PhotoResponse from(Photo p) {
        return new PhotoResponse(p.getId(), p.getTitle(), p.getDescription(), p.getPropertyId(), p.getComplaintId(),
                p.getFileName(), p.getContentType(), p.getSize(), p.getCreatedAt(),
                "/api/photos/" + p.getId() + "/content");
    }
}
