package pl.hackathon.backend.storage;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.hackathon.backend.entry.Entry;
import pl.hackathon.backend.entry.EntryService;
import pl.hackathon.backend.exception.BadRequestException;
import pl.hackathon.backend.exception.InternalServerErrorException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StorageService {
    private final StorageUtils storageUtils;
    private final EntryService entryService;

    public Entry saveFile(MultipartFile file, Long entryId) {

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !originalFilename.toLowerCase().endsWith(".pdf")) {
            throw new BadRequestException("File must be a .pdf");
        }

        Entry entry = entryService.getEntryById(entryId);
        storageUtils.uploadFileToFileSystem(file, entryId);
        entry.setFileName(file.getOriginalFilename());
        entry.setFilePath(entryId + "/" + file.getOriginalFilename());
        return entryService.updateEntry(entryId, entry);
    }
    public byte[] getFileByEntryId(Long entryId) {
        Entry entry = entryService.getEntryById(entryId);

        return storageUtils.downloadFileFromFileSystem(entry.getFilePath());
    }

    public void deleteFileByEntryId(Long entryId) {
        Entry entry = entryService.getEntryById(entryId);
        storageUtils.deleteFileFromFileSystem(entry.getFilePath());
    }




}
