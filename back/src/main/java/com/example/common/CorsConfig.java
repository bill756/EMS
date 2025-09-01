package com.example.common;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter(){
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration CorsConfiguration = new CorsConfiguration();
        CorsConfiguration.addAllowedOrigin("*");
        CorsConfiguration.addAllowedHeader("*");
        CorsConfiguration.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", CorsConfiguration);
        return new CorsFilter(source);

    }
}
