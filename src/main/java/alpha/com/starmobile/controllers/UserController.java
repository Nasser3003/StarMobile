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
import alpha.com.starmobile.services.JwtService;
import alpha.com.starmobile.services.UserInfoService;
import alpha.com.starmobile.services.UserService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserController {

    private UserService userService;

    @Autowired
    private UserInfoService userInfoSerice;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager; 
  
    @GetMapping("/auth/welcome") 
    public String welcome() { 
        return "Welcome this endpoint is not secure"; 
    } 
  
    @PostMapping("/auth/addNewUser") 
    public String addNewUser(@RequestBody User user) { 
        return userInfoSerice.addUser(user); 
    } 
  
    @GetMapping("/auth/user/userProfile") 
    @PreAuthorize("hasAuthority('ROLE_USER')") 
    public String userProfile() { 
        return "Welcome to User Profile"; 
    } 
  
    @GetMapping("/auth/admin/adminProfile") 
    @PreAuthorize("hasAuthority('ROLE_ADMIN')") 
    public String adminProfile() { 
        return "Welcome to Admin Profile"; 
    } 


    // Endpoint to retrieve all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Endpoint to retrieve a user by ID
    @GetMapping("/user/id/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        Optional<User> userOptional = userService.findById(id);
        return userOptional.map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Endpoint to retrieve a user by email
    @GetMapping("/user/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email) {
        Optional<User> userOptional = userService.findByEmail(email);
        return userOptional.map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Endpoint to create a new user
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User newUser = userService.save(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
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

        @PostMapping("/auth/generateToken") 
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) { 
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())); 
        if (authentication.isAuthenticated()) { 
            return jwtService.generateToken(authRequest.getUsername()); 
        } else { 
            throw new UsernameNotFoundException("invalid user request !"); 
        } 
    } 
}
