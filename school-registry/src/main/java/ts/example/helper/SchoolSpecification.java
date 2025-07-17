package ts.example.helper;

import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import ts.example.entity.School;
import ts.example.entity.SchoolType;

import java.util.ArrayList;
import java.util.List;


public class SchoolSpecification {

    public static Specification<School> filterByRegionAndSchoolTypeAndActive(String region, SchoolType schoolType, Boolean isActive) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (region != null) {
                predicates.add(cb.equal(root.get("region"), region));
            }
            if (schoolType != null) {
                predicates.add(cb.equal(root.get("type"), schoolType));
            }
            if (isActive != null) {
                predicates.add(cb.equal(root.get("isActive"), isActive));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

}
