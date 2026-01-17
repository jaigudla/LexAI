package com.lexai.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class LocalStorageService implements StorageService {

    private final Path rootLocation = Paths.get("uploads");

    public LocalStorageService() throws IOException {
        Files.createDirectories(rootLocation);
    }

    @Override
    public String store(MultipartFile file) throws IOException {
        String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path destinationFile = this.rootLocation.resolve(Paths.get(filename)).normalize().toAbsolutePath();

        try (var inputStream = file.getInputStream()) {
            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
        }

        return filename;
    }

    @Override
    public byte[] load(String path) throws IOException {
        Path file = rootLocation.resolve(path);
        return Files.readAllBytes(file);
    }
}
