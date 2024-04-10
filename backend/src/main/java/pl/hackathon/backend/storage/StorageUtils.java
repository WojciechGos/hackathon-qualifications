package pl.hackathon.backend.storage;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.hackathon.backend.exception.InternalServerErrorException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
public class StorageUtils {

    private final String FOLDER_PATH="C:\\Users\\Wojtek\\Desktop\\data\\";
    public String uploadFileToFileSystem(MultipartFile file)  {
        String filePath=FOLDER_PATH+file.getOriginalFilename();

        try {
            file.transferTo(new File(filePath));
        } catch (IOException e) {
            e.printStackTrace();
            throw new InternalServerErrorException("Error while saving file to the file system");
        }
        return file.getOriginalFilename();
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
