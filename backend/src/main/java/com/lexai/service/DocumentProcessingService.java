package com.lexai.service;

import com.lexai.entity.Document;
import com.lexai.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
@Slf4j
public class DocumentProcessingService {

    private final DocumentRepository documentRepository;
    private final OpenAiService openAiService;

    @Async
    public void processDocument(Long documentId) {
        log.info("Starting processing for document ID: {}", documentId);

        try {
            Document document = documentRepository.findById(documentId)
                    .orElseThrow(() -> new RuntimeException("Document not found"));

            document.setStatus(Document.ProcessingStatus.PROCESSING);
            documentRepository.save(document);

            // 1. Extract Text (Simulated for now - would use PDFBox/Tika here)
            // Simulating a contract content for the AI to work on:
            String parsedText = "NON-DISCLOSURE AGREEMENT\n\n" +
                    "This Nondisclosure Agreement (the 'Agreement') is entered into by and between [Party A] and [Party B].\n"
                    +
                    "1. Confidential Information. The term 'Confidential Information' means any information disclosed by one party to the other.\n"
                    +
                    "2. Obligations. Receiver shall hold and maintain the Confidential Information in strictest confidence for a period of 2 years.\n"
                    +
                    "3. Termination. This agreement may be terminated with 30 days written notice.\n" +
                    "(Text extracted from file: " + document.getFilename() + ")";

            // 2. AI Analysis
            String summary = openAiService.summarize(parsedText);
            String analysis_clauses = openAiService.extractClauses(parsedText);

            // Combine clauses into extraction result for now (or separate field)
            String fullResult = parsedText + "\n\n--- AI ANALYSIS ---\n" + analysis_clauses;

            document.setExtractionResult(fullResult);
            document.setSummary(summary);
            document.setStatus(Document.ProcessingStatus.COMPLETED);

            documentRepository.save(document);
            log.info("Completed processing for document ID: {}", documentId);

        } catch (Exception e) {
            log.error("Error processing document ID: {}", documentId, e);
            documentRepository.findById(documentId).ifPresent(doc -> {
                doc.setStatus(Document.ProcessingStatus.FAILED);
                documentRepository.save(doc);
            });
        }
    }
}
