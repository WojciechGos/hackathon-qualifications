package pl.hackathon.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import pl.hackathon.backend.jwt.JWTAuthenticationEntryPoint;
import pl.hackathon.backend.jwt.JWTAuthenticationFilter;
import pl.hackathon.backend.user.UserService;

import java.util.Arrays;



@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Value("${backend.security.allowed.origins}")
    private String allowedOrigins;

    private final AuthenticationProvider authenticationProvider;
    private final JWTAuthenticationFilter jwtAuthenticationFilter;
    private final JWTAuthenticationEntryPoint jwtAuthenticationEntryPoint;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors
                        .configurationSource(request -> {
                            CorsConfiguration corsConfig = new CorsConfiguration();
                            corsConfig.setAllowedOrigins(Arrays.asList(allowedOrigins));
                            corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                            corsConfig.setAllowedHeaders(Arrays.asList("*"));
                            corsConfig.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));
                            corsConfig.setMaxAge(3600L);
                            return corsConfig;
                        })
                )
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers(HttpMethod.POST, "/api/v1/sign-in").permitAll();
                    auth.requestMatchers(HttpMethod.POST, "/api/v1/sign-up").permitAll();

                    auth.requestMatchers(HttpMethod.POST, "/api/v1/entries").hasAnyRole("USER", "ADMIN");
                    auth.requestMatchers(HttpMethod.PATCH, "/api/v1/entries/**").hasAnyRole("USER", "ADMIN", "JURY");
                    auth.requestMatchers(HttpMethod.DELETE, "/api/v1/entries/**").hasAnyRole("USER", "ADMIN");
                    auth.requestMatchers(HttpMethod.GET, "/api/v1/entries/**").hasAnyRole("USER", "ADMIN", "JURY");

                    auth.requestMatchers(HttpMethod.GET, "/api/v1/storage/**").hasAnyRole("USER", "ADMIN", "JURY");
                    auth.requestMatchers(HttpMethod.POST, "/api/v1/storage/**").hasAnyRole("USER", "ADMIN");
                    auth.requestMatchers(HttpMethod.DELETE, "/api/v1/storage/**").hasAnyRole("USER", "ADMIN");

                    auth.requestMatchers(HttpMethod.PATCH, "/api/v1/persons/**").hasAnyRole("USER", "ADMIN");

                    auth.requestMatchers(HttpMethod.PATCH, "/api/v1/users/**").hasAnyRole("USER", "ADMIN");
                    auth.requestMatchers(HttpMethod.GET, "/api/v1/users/**").hasAnyRole("USER", "ADMIN");
                    auth.requestMatchers(HttpMethod.DELETE, "/api/v1/users/**").hasAnyRole("USER", "ADMIN");

                    auth.anyRequest().authenticated();
                })
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthenticationEntryPoint))
                .build();
    }





}