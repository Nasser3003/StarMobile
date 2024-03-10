package alpha.com.starmobile.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;


@Configuration
public class SecurityConfig {
    @Bean // Annotation indicating spring to create a bean from the return
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.httpBasic(Customizer.withDefaults());

        http.csrf(csrf -> csrf.disable());

        http.authorizeHttpRequests(requests -> {
            // GET requests to /user or /user/something
            requests.requestMatchers(HttpMethod.POST, "/register").permitAll();
            requests.requestMatchers("/user/**", "/user").hasAnyRole("ADMIN");
            requests.anyRequest().authenticated();
        })          
        .exceptionHandling(configurer -> configurer
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .csrf(csrf -> csrf.disable()); // Disable CSRF protection
        return http.build();
        
    }
    
}
