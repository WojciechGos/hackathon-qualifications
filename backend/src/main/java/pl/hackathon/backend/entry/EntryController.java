package pl.hackathon.backend.entry;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.hackathon.backend.exception.AuthenticationException;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/entries")
public class EntryController {

    private final EntryService entryService;

    @GetMapping("/{id}")
    public ResponseEntity<Entry> getEntryById(HttpServletRequest request, @PathVariable Long id) {


        if (request.getAttribute("authorities") == null)
            throw new AuthenticationException("You are not authorized to view this entry.");

        String role = request.getAttribute("authorities").toString();
        String email = request.getAttribute("username").toString();


        System.out.println(role);
        System.out.println("ROLE_USER_123124");
        if (role.equals("[ROLE_USER]")) {
            System.out.println("ROLE_USER_ 123");
            Entry entry = entryService.getEntryById(id);
            if (!entry.getUserEmail().equals(email))
                throw new AuthenticationException("You are not authorized to view this entry.");
        }else
            throw new AuthenticationException("You are not authorized to view this entry.");


        return new ResponseEntity<>(entryService.getEntryById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Entry>> getEntries() {
        return new ResponseEntity<>(entryService.getEntries(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Entry> addEntry(HttpServletRequest request, @RequestBody @Valid Entry entry) {
        return new ResponseEntity<>(entryService.addEntry(entry, request.getAttribute("username").toString()), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Entry> updateEntry(@PathVariable("id") Long id, @RequestBody Entry entry) {
        return new ResponseEntity<>(entryService.updateEntry(id, entry), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteEntry(@PathVariable("id") Long id) {
        entryService.deleteEntry(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
