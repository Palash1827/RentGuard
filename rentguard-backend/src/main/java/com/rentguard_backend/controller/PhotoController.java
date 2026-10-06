package com.rentguard_backend.controller;

import java.util.List;

import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import com.rentguard_backend.dto.PhotoResponse;
import com.rentguard_backend.security.AuthUser;
import com.rentguard_backend.service.PhotoService;

@RestController
@RequestMapping("/api/photos")
public class PhotoController {

    private final PhotoService photoService;

    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public PhotoResponse upload(@AuthenticationPrincipal AuthUser user,
                                @RequestParam("file") MultipartFile file,
                                @RequestParam(value = "title", required = false) String title,
                                @RequestParam(value = "description", required = false) String description,
                                @RequestParam(value = "propertyId", required = false) String propertyId) {
        return photoService.upload(user.getId(), file, title, description, propertyId, null);
    }

    @GetMapping
    public List<PhotoResponse> list(@AuthenticationPrincipal AuthUser user,
                                    @RequestParam(value = "propertyId", required = false) String propertyId) {
        return photoService.list(user.getId(), propertyId);
    }

    @GetMapping("/{id}")
    public PhotoResponse get(@AuthenticationPrincipal AuthUser user, @PathVariable String id) {
        return photoService.get(user.getId(), id);
    }

    /** Streams the image bytes. Requires the Authorization header. */
    @GetMapping("/{id}/content")
    public ResponseEntity<Resource> content(@AuthenticationPrincipal AuthUser user, @PathVariable String id) {
        PhotoService.PhotoContent c = photoService.content(user.getId(), id);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(c.photo().getContentType()))
                .contentLength(c.photo().getSize())
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"photo\"")
                .cacheControl(CacheControl.noStore())
                .body(c.resource());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@AuthenticationPrincipal AuthUser user, @PathVariable String id) {
        photoService.delete(user.getId(), id);
    }
}
