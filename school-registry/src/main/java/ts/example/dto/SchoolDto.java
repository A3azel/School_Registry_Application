package ts.example.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SchoolDto {
    private Long id;
    private String name;
    private String edrpou;
    private String region;
    @JsonProperty("type")
    private String schoolType;
    @JsonProperty("active")
    private boolean isActive;
}
