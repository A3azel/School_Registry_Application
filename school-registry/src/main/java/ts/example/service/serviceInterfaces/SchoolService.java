package ts.example.service.serviceInterfaces;

import ts.example.dto.SchoolDto;

import java.util.List;

public interface SchoolService {

    SchoolDto addSchool(SchoolDto schoolDto);
    List<SchoolDto> getSchoolList(String region, String type, Boolean isActive);
    void setSchoolActiveStatus(Long id, boolean isActive);

}
