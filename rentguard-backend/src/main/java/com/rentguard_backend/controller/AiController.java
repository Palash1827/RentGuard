package com.rentguard_backend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentguard_backend.dto.ChatRequest;
import com.rentguard_backend.dto.ChatResponse;
import com.rentguard_backend.security.AuthUser;
import com.rentguard_backend.service.AiAssistantService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiAssistantService assistant;

    public AiController(AiAssistantService assistant) {
        this.assistant = assistant;
    }

    @PostMapping("/chat")
    public ChatResponse chat(@AuthenticationPrincipal AuthUser user, @Valid @RequestBody ChatRequest request) {
        return new ChatResponse(assistant.reply(user.getId(), request.message()));
    }
}
