package com.lexai.service;

import com.lexai.entity.Document;
import com.lexai.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final StorageService storageService;

    private final DocumentProcessingService documentProcessingService;

    public Document uploadDocument(MultipartFile file) throws IOException {
        String path = storageService.store(file);

        Document document = new Document();
        document.setFilename(file.getOriginalFilename());
        document.setContentType(file.getContentType());
        document.setSize(file.getSize());
        document.setStoragePath(path);
        document.setStatus(Document.ProcessingStatus.PENDING);

        Document savedDoc = documentRepository.save(document);

        // Trigger async processing
        documentProcessingService.processDocument(savedDoc.getId());

        return savedDoc;
    }

    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public Document getDocument(Long id) {
        return documentRepository.findById(id).orElseThrow(() -> new RuntimeException("Document not found"));
    }
}
