package alpha.com.starmobile.controllers;

import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import alpha.com.starmobile.models.AuthRequest;
import alpha.com.starmobile.models.User;
import alpha.com.starmobile.services.AuthenticationService;
import alpha.com.starmobile.services.JwtService;
import alpha.com.starmobile.services.UserInfoService;
import alpha.com.starmobile.services.UserService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth")

public class UserController {

    private final UserService userService;
    private final UserInfoService userInfoService;
    private final JwtService jwtService;
    private final AuthenticationService authService;

    @Autowired
    public UserController(UserService userService, UserInfoService userInfoService, JwtService jwtService, AuthenticationService authService) {
        this.userService = userService;
        this.userInfoService = userInfoService;
        this.jwtService = jwtService;
        this.authService = authService;
    }    
  
    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome, this endpoint is not secure";
    }

    @PostMapping("/addNewUser")
    public ResponseEntity<String> addNewUser(@RequestBody User user) {
        String message = userInfoService.addUser(user);
        return ResponseEntity.ok(message);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest authRequest) {
        String token = authenticateAndGetToken(authRequest);
        return ResponseEntity.ok(token);
    }

    @GetMapping("/userProfile")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<User> userProfile(@RequestParam("email") String email) {
        Optional<User> userOptional = userService.findByEmail(email);
        return userOptional.map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/getAllUsers")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // // Endpoint to update an existing user
    // @PutMapping("/{id}")
    // public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @RequestBody User user) {
    //     user.setId(id); // Ensure the ID matches the path variable
    //     User updatedUser = userService.save(user);
    //     return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    // }

    // // Endpoint to delete a user
    // @DeleteMapping("/{id}")
    // public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
    //     userService.deleteById(id);
    //     return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    // }

    @PostMapping("/generateToken")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        try {
            // username is the email
            String username = authRequest.getUsername();
            userInfoService.loadUserByUsername(username); // This will throw exception if user not found
            return jwtService.generateToken(username);
        } catch (UsernameNotFoundException ex) {
            throw new RuntimeException("Invalid username or password", ex);
        }
    }
}
