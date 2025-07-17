package ts.example.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "school")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class School implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "school_name")
    private String name;

    @Column(name = "edrpou", unique = true)
    private String edrpou;

    @Column(name = "region")
    private String region;

    @Column(name = "school_type")
    @Enumerated(EnumType.STRING)
    private SchoolType type;

    @Column(name = "is_active")
    private boolean isActive;

}
