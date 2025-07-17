package ts.example.service.serviceImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ts.example.dto.SchoolDto;
import ts.example.entity.School;
import ts.example.entity.SchoolType;
import ts.example.facade.SchoolFacade;
import ts.example.helper.SchoolSpecification;
import ts.example.repository.SchoolRepository;
import ts.example.service.serviceInterfaces.SchoolService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SchoolServiceI implements SchoolService {

    private final SchoolRepository schoolRepository;
    private final SchoolFacade schoolFacade;

    @Autowired
    public SchoolServiceI(SchoolRepository schoolRepository, SchoolFacade schoolFacade) {
        this.schoolRepository = schoolRepository;
        this.schoolFacade = schoolFacade;
    }

    @Override
    @Transactional
    public SchoolDto addSchool(SchoolDto schoolDto) {
        School newSchool = schoolRepository.save(schoolFacade.convertSchoolDtoToSchool(schoolDto));
        return schoolFacade.convertSchoolToSchoolDto(newSchool);
    }

    @Override
    @Transactional
    public List<SchoolDto> getSchoolList(String region, String type, Boolean isActive) {
        SchoolType schoolType = null;
        if (type != null) {
            schoolType = SchoolType.valueOf(type);
        }
        List<School> schoolList = schoolRepository.findAll(SchoolSpecification.filterByRegionAndSchoolTypeAndActive(region, schoolType, isActive));
        return schoolList.stream()
                .map(schoolFacade::convertSchoolToSchoolDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void setSchoolActiveStatus(Long id, boolean isActive) {
        schoolRepository.setSchoolActiveStatus(isActive, id);
    }

}
