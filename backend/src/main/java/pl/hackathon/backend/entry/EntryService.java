package pl.hackathon.backend.entry;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.hackathon.backend.exception.BadRequestException;
import pl.hackathon.backend.exception.ResourceNotFoundException;
import pl.hackathon.backend.person.Person;
import pl.hackathon.backend.person.PersonService;
import pl.hackathon.backend.storage.StorageUtils;
import pl.hackathon.backend.user.User;
import pl.hackathon.backend.user.UserService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EntryService {

    private final EntryRepository entryRepository;
    private final PersonService personService;
    private final UserService userService;
    private final StorageUtils storageUtils;

    public Entry getEntryById(Long id) {
        return entryRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Entry with id: [%s] not found.".formatted(id)));
    }

    public List<Entry> getEntries() {
        return entryRepository.findAll();
    }

    public Entry getEntryByUserEmail(String email) {
        return entryRepository.findByUserEmail(email).orElseThrow(()-> new ResourceNotFoundException("Entry with email: [%s] not found.".formatted(email)));
    }

    public Entry addEntry(@Valid Entry entry, String email) {

        if(entry.getParticipantNumber() != entry.getParticipantList().size())
            throw new BadRequestException("Participant number must be equal to the number of participants");

        for (Person person : entry.getParticipantList()) {
            personService.addPerson(person);
        }

        User user = userService.getUserByEmail(email);

        entry.setUserEmail(user.getEmail());
        entry.setUserId(user.getId());

        return entryRepository.save(entry);
    }

    public Entry updateEntry(Long id, Entry entry) {
        Entry entryToUpdate = entryRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Entry with id: [%s] not found.".formatted(id)));

        if(entry.getParticipantNumber() != entry.getParticipantList().size())
            throw new BadRequestException("Participant number must be equal to the number of participants");

        if(entry.getTeamName() != null)
            entryToUpdate.setTeamName(entry.getTeamName());
        if(entry.getTeamDescription() != null)
            entryToUpdate.setTeamDescription(entry.getTeamDescription());

        if(entry.getParticipantNumber() > 0 && entry.getParticipantNumber() <= 4)
            entryToUpdate.setParticipantNumber(entry.getParticipantNumber());

        if(entry.getStatus() != null)
            entryToUpdate.setStatus(entry.getStatus());

        System.out.println(entry.getParticipantList());
        if(!entry.getParticipantList().isEmpty()){
            for (Person person : entry.getParticipantList()) {
                personService.addPerson(person);
            }
            entryToUpdate.setParticipantList(entry.getParticipantList());
        }

        return entryRepository.save(entryToUpdate);
    }

    public void deleteEntry(Long id) {
        Entry entry = getEntryById(id);
        storageUtils.deleteFileFromFileSystem(entry.getFilePath());
        entryRepository.deleteById(id);
    }

}
