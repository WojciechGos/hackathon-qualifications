package pl.hackathon.backend.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.hackathon.backend.exception.InternalServerErrorException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
public class StorageUtils {

    @Value("${backend.file-system.path}")
    private String FOLDER_PATH;
    public void uploadFileToFileSystem(MultipartFile file, Long entryId) {
        try {
            // Create directory if it doesn't exist
            File fileFolder = new File(FOLDER_PATH + entryId);
            if (!fileFolder.exists()) {
                boolean created = fileFolder.mkdir();
                if(!created)
                    throw new InternalServerErrorException("Error while creating directory");
            }

            String filePath = fileFolder.getPath() + File.separator + file.getOriginalFilename();
            file.transferTo(new File(filePath));
        } catch (IOException e) {
            e.printStackTrace();
            throw new InternalServerErrorException("Error while saving file to the file system");
        }
    }
    public byte[] downloadFileFromFileSystem(String filePath) {

        byte[] images = new byte[0];

        try {
            images = Files.readAllBytes(new File(FOLDER_PATH+filePath).toPath());
        } catch (IOException e) {
            throw new InternalServerErrorException("Error while reading file from file system");
        }

        return images;
    }

    public void deleteFileFromFileSystem(String filePath) {
        File file = new File(FOLDER_PATH+filePath);
        if(file.exists()) {
            boolean deleted = file.delete();
            if(!deleted)
                throw new InternalServerErrorException("Error while deleting file from file system");
        }
    }
}
