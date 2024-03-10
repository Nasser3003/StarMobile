package alpha.com.starmobile.controllers;

import alpha.com.starmobile.dto.RegistrationDTO;
import alpha.com.starmobile.models.User;
import alpha.com.starmobile.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@RequestMapping("/auth")
public class AuthController {

    private UserService service;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegistrationDTO registrationDTO) {
        return new ResponseEntity<>(service.register(registrationDTO), HttpStatus.CREATED);
    }

}
