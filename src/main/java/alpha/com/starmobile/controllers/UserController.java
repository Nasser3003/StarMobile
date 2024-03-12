package alpha.com.starmobile.controllers;

import alpha.com.starmobile.dto.AddOrRemovePlanDTO;
import alpha.com.starmobile.models.User;
import alpha.com.starmobile.services.MyService;
import alpha.com.starmobile.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/user")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserController {

    private UserService userService;
    private MyService myService;

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<User> getUser() {
        Optional<User> userOptional = userService.getMyUser();
        return userOptional.map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email) {
        Optional<User> userOptional = userService.findByEmail(email);
        return userOptional.map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/add")
    public ResponseEntity<User> addPlan(@RequestBody AddOrRemovePlanDTO addOrRemovePlanDTO) {
        User updatedUser = myService.addPlan(addOrRemovePlanDTO.planType());
        return new ResponseEntity<>(updatedUser, HttpStatus.CREATED);
    }

    @PostMapping("/remove")
    public ResponseEntity<User> removePlan(@RequestBody AddOrRemovePlanDTO addOrRemovePlanDTO) {
        User updatedUser = myService.removePlan(addOrRemovePlanDTO.planType());
        return new ResponseEntity<>(updatedUser, HttpStatus.CREATED);
    }

}