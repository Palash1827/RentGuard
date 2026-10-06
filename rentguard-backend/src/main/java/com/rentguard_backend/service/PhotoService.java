package com.rentguard_backend.service;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.client.gridfs.model.GridFSFile;
import com.rentguard_backend.dto.PhotoResponse;
import com.rentguard_backend.exception.ApiException;
import com.rentguard_backend.model.Photo;
import com.rentguard_backend.repository.ComplaintRepository;
import com.rentguard_backend.repository.PhotoRepository;

@Service
public class PhotoService {

    private static final Set<String> ALLOWED_TYPES =
            Set.of("image/jpeg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif",
                    "video/mp4", "video/quicktime", "video/webm");

    private final PhotoRepository photoRepository;
    private final GridFsTemplate gridFsTemplate;
    private final ComplaintRepository complaintRepository;

    public PhotoService(PhotoRepository photoRepository, GridFsTemplate gridFsTemplate,
                        ComplaintRepository complaintRepository) {
        this.photoRepository = photoRepository;
        this.gridFsTemplate = gridFsTemplate;
        this.complaintRepository = complaintRepository;
    }

    public PhotoResponse upload(String ownerId, MultipartFile file, String title, String description,
                                String propertyId, String complaintId) {
        if (file == null || file.isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "File is required");
        }
        String contentType = file.getContentType() == null ? "" : file.getContentType().toLowerCase();
        if (!ALLOWED_TYPES.contains(contentType)) {
            throw new ApiException(HttpStatus.UNSUPPORTED_MEDIA_TYPE,
                    "Only JPEG, PNG, WEBP, GIF, HEIC images or MP4, MOV, WEBM videos are allowed");
        }
        if (title != null && title.length() > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Title must be at most 100 characters");
        }
        if (description != null && description.length() > 1000) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Description must be at most 1000 characters");
        }

        if (complaintId != null && !complaintId.isBlank()
                && complaintRepository.findByIdAndOwnerId(complaintId, ownerId).isEmpty()) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Complaint not found");
        }

        String fileName = file.getOriginalFilename() == null ? "photo" : file.getOriginalFilename();
        ObjectId gridId;
        try {
            gridId = gridFsTemplate.store(file.getInputStream(), fileName, contentType);
        } catch (IOException e) {
            throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not read uploaded file");
        }

        Photo photo = new Photo();
        photo.setOwnerId(ownerId);
        photo.setGridFsId(gridId.toHexString());
        photo.setFileName(fileName);
        photo.setContentType(contentType);
        photo.setSize(file.getSize());
        photo.setTitle(blankToNull(title));
        photo.setDescription(blankToNull(description));
        photo.setPropertyId(blankToNull(propertyId));
        photo.setComplaintId(blankToNull(complaintId));
        return PhotoResponse.from(photoRepository.save(photo));
    }

    public List<PhotoResponse> list(String ownerId, String propertyId) {
        List<Photo> photos = (propertyId == null || propertyId.isBlank())
                ? photoRepository.findByOwnerIdOrderByCreatedAtDesc(ownerId)
                : photoRepository.findByOwnerIdAndPropertyIdOrderByCreatedAtDesc(ownerId, propertyId);
        return photos.stream().map(PhotoResponse::from).toList();
    }

    public List<PhotoResponse> listByComplaint(String ownerId, String complaintId) {
        return photoRepository.findByOwnerIdAndComplaintIdOrderByCreatedAtDesc(ownerId, complaintId)
                .stream().map(PhotoResponse::from).toList();
    }

    /** Removes every file (GridFS bytes + metadata) attached to a complaint. */
    public void deleteAllForComplaint(String ownerId, String complaintId) {
        for (Photo p : photoRepository.findByOwnerIdAndComplaintIdOrderByCreatedAtDesc(ownerId, complaintId)) {
            gridFsTemplate.delete(idQuery(p.getGridFsId()));
            photoRepository.delete(p);
        }
    }

    public PhotoResponse get(String ownerId, String photoId) {
        return PhotoResponse.from(findOwned(ownerId, photoId));
    }

    /** Holder for streaming an image back to the client. */
    public record PhotoContent(Photo photo, GridFsResource resource) {
    }

    public PhotoContent content(String ownerId, String photoId) {
        Photo photo = findOwned(ownerId, photoId);
        GridFSFile file = gridFsTemplate.findOne(idQuery(photo.getGridFsId()));
        if (file == null) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Photo data not found");
        }
        return new PhotoContent(photo, gridFsTemplate.getResource(file));
    }

    public void delete(String ownerId, String photoId) {
        Photo photo = findOwned(ownerId, photoId);
        gridFsTemplate.delete(idQuery(photo.getGridFsId()));
        photoRepository.delete(photo);
    }

    private Photo findOwned(String ownerId, String photoId) {
        return photoRepository.findByIdAndOwnerId(photoId, ownerId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Photo not found"));
    }

    private Query idQuery(String gridFsId) {
        return Query.query(Criteria.where("_id").is(new ObjectId(gridFsId)));
    }

    private String blankToNull(String s) {
        return (s == null || s.isBlank()) ? null : s.trim();
    }
}
