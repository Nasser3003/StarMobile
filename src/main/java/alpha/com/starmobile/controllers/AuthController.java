package alpha.com.starmobile.controllers;

import alpha.com.starmobile.dto.LoginDTO;
import alpha.com.starmobile.dto.RegistrationDTO;
import alpha.com.starmobile.models.User;
import alpha.com.starmobile.services.AuthenticationServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationServiceImpl authService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegistrationDTO registrationDTO) {
        return new ResponseEntity<>(authService.register(registrationDTO), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginDTO loginDTO) {
        Optional<User> authenticatedUser = authService.login(loginDTO);
        return authenticatedUser.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

}
