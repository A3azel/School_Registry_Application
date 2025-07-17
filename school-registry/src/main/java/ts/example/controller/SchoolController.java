package ts.example.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ts.example.dto.SchoolDto;
import ts.example.service.serviceImplementation.SchoolServiceI;

import java.util.List;

@RestController
@RequestMapping("/schools")
@RequiredArgsConstructor
public class SchoolController {

    private final SchoolServiceI schoolService;

    @GetMapping
    public List<SchoolDto> getSchoolList(
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Boolean isActive
    ) {
        return schoolService.getSchoolList(region, type, isActive);
    }

    @PostMapping
    public ResponseEntity<SchoolDto> createSchool(@RequestBody SchoolDto school) {
        SchoolDto createdSchool = schoolService.addSchool(school);
        return ResponseEntity.ok(createdSchool);
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateSchool(@PathVariable Long id) {
        schoolService.setSchoolActiveStatus(id, false);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity<Void> activateSchool(@PathVariable Long id) {
        schoolService.setSchoolActiveStatus(id, true);
        return ResponseEntity.noContent().build();
    }

}
