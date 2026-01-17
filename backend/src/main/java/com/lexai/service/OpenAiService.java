package com.lexai.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class OpenAiService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.model}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    public String summarize(String text) {
        String prompt = "Summarize the following legal document concisely:\n\n" + text;
        return callOpenAi(prompt);
    }

    public String extractClauses(String text) {
        String prompt = "Extract key clauses and potential risks from this legal document. Format as JSON if possible, otherwise list them:\n\n"
                + text;
        return callOpenAi(prompt);
    }

    private String callOpenAi(String prompt) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", model);

            Map<String, String> message = new HashMap<>();
            message.put("role", "user");
            message.put("content", prompt);

            requestBody.put("messages", List.of(message));

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

            // Note: In a real prod env, we should map specific response classes.
            // For now, we return a rough string to demonstrate integration.
            ResponseEntity<Map> response = restTemplate.postForEntity(OPENAI_URL, request, Map.class);

            if (response.getBody() != null && response.getBody().containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> messageObj = (Map<String, Object>) choices.get(0).get("message");
                    return (String) messageObj.get("content");
                }
            }
            return "No response from AI.";

        } catch (Exception e) {
            log.error("Error calling OpenAI API", e);
            return "Error generating insight: " + e.getMessage();
        }
    }
}
