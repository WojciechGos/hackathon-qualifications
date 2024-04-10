package pl.hackathon.backend.entry;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/entries")
public class EntryController {

    private final EntryService entryService;

    @GetMapping("/{id}")
    public ResponseEntity<Entry> getEntryById(@PathVariable Long id) {
        return new ResponseEntity<>(entryService.getEntryById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Entry>> getEntries() {
        return new ResponseEntity<>(entryService.getEntries(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Entry> addEntry(@RequestBody @Valid Entry entry) {
        return new ResponseEntity<>(entryService.addEntry(entry), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Entry>  updateEntry(@PathVariable("id") Long id, @RequestBody @Valid Entry entry) {
        return new ResponseEntity<>(entryService.updateEntry(id,entry), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteEntry(@PathVariable("id") Long id) {
        entryService.deleteEntry(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
