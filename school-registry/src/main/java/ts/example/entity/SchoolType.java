package ts.example.entity;

public enum SchoolType {
    GYMNASIUM("Gymnasium"), LYCEUM("Lyceum"), SECONDARY_SCHOOL("Secondary school");

    private final String schoolTypeName;

    SchoolType(String schoolTypeName) {
        this.schoolTypeName = schoolTypeName;
    }

    public String getSchoolTypeName(){
        return schoolTypeName;
    }

}
