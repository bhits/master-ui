package gov.samhsa.c2s.masterui;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConfigRestController {
    @Autowired
    private MasterUIProperties masterUIProperties;

    @RequestMapping(value = "/config", method = RequestMethod.GET)
    public MasterUIProperties getConfig() {
        return masterUIProperties;
    }
}
