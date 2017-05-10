package com.manager.terminal;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class ClmMain {

    public static void main(String[] args) {
       // Map<String, Object> properties = new HashMap<>();
       // properties.put("spring.mvc.favicon.enabled", false);
       // properties.put("spring.boot.favicon.enabled", false);
       // properties.put("spring.favicon.enabled", false);

        SpringApplicationBuilder springApplicationBuilder = new SpringApplicationBuilder(ClmMain.class);
        springApplicationBuilder
               // .properties(properties)
                .run();


    }
}
