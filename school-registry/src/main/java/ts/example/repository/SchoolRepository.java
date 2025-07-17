package ts.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ts.example.entity.School;

@Repository
public interface SchoolRepository extends JpaRepository<School, Long>, JpaSpecificationExecutor<School> {

    @Modifying
    @Query(value = "UPDATE school SET is_active = :isActive WHERE id = :id", nativeQuery = true)
    void setSchoolActiveStatus(@Param("isActive") boolean isActive, @Param("id") Long id);

}
