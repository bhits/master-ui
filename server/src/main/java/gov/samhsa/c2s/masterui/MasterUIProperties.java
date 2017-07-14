package gov.samhsa.c2s.masterui;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.nio.charset.StandardCharsets;

@Component
@ConfigurationProperties(prefix = "c2s.master-ui")
@Data
public class MasterUIProperties {
    @NotNull
    @Valid
    private Branding branding;

    @Data
    public static class Branding {
        @NotEmpty
        private String name;

        @NotEmpty
        private String initials;

        @NotEmpty
        private String smallLogo;

        @NotEmpty
        private String mediumLogo;

        @NotEmpty
        private String largeLogo;
    }
}
