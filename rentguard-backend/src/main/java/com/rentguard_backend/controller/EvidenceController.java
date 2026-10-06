package com.rentguard_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.rentguard_backend.dto.PhotoResponse;
import com.rentguard_backend.security.AuthUser;
import com.rentguard_backend.service.PhotoService;

/** Evidence = photos/videos attached to a complaint. Bytes are served by GET /api/photos/{id}/content. */
@RestController
@RequestMapping("/api/evidence")
public class EvidenceController {

    private final PhotoService photoService;

    public EvidenceController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public PhotoResponse upload(@AuthenticationPrincipal AuthUser user,
                                @RequestParam("complaintId") String complaintId,
                                @RequestParam("file") MultipartFile file,
                                @RequestParam(value = "title", required = false) String title) {
        return photoService.upload(user.getId(), file, title, null, null, complaintId);
    }

    @GetMapping("/complaint/{complaintId}")
    public List<PhotoResponse> forComplaint(@AuthenticationPrincipal AuthUser user,
                                            @PathVariable String complaintId) {
        return photoService.listByComplaint(user.getId(), complaintId);
    }
}
