package ts.example.facade;

import org.springframework.stereotype.Component;
import ts.example.dto.SchoolDto;
import ts.example.entity.School;
import ts.example.entity.SchoolType;

@Component
public class SchoolFacade {

    public SchoolDto convertSchoolToSchoolDto(School school){
        return SchoolDto.builder()
                .id(school.getId())
                .name(school.getName())
                .edrpou(school.getEdrpou())
                .region(school.getRegion())
                .schoolType(school.getType().getSchoolTypeName())
                .isActive(school.isActive())
                .build();
    }

    public School convertSchoolDtoToSchool(SchoolDto schoolDto) {
        School school = new School();
        school.setName(schoolDto.getName());
        school.setRegion(schoolDto.getRegion());
        school.setEdrpou(schoolDto.getEdrpou());
        school.setType(SchoolType.valueOf(schoolDto.getSchoolType()));
        school.setActive(schoolDto.isActive());
        return school;
    }

}
