package pl.hackathon.backend.storage;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.hackathon.backend.entry.Entry;

@RestController
@RequestMapping("api/v1/storage")
@RequiredArgsConstructor
public class StorageController {

    private final StorageService storageService;

    @PostMapping("/{entryId}")
    public ResponseEntity<?> uploadImageToFIleSystem(@PathVariable("entryId") Long entryId ,@RequestParam("pdfFile")MultipartFile file) {
        Entry entry = storageService.saveFile(file, entryId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(entry);
    }

    @GetMapping("/{entryId}")
    public ResponseEntity<byte[]> downloadImageFromFileSystem(@PathVariable Long entryId) {
        byte[] fileData = storageService.getFileByEntryId(entryId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);

        return new ResponseEntity<>(fileData, headers, HttpStatus.OK);
    }

    @DeleteMapping("/{entryId}")
    public ResponseEntity<HttpStatus> deleteImageFromFileSystem(@PathVariable Long entryId) {
        storageService.deleteFileByEntryId(entryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }


}
