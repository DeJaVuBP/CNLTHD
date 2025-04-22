package com.sagroup.studentservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors() // bật cors config đã tạo
                .and()
                .authorizeHttpRequests()
                .anyRequest().permitAll(); // tạm thời cho phép tất cả

        return http.build();
    }
}
