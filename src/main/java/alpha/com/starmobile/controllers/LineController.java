package alpha.com.starmobile.controllers;

import alpha.com.starmobile.dto.AddOrRemoveLineDTO;
import alpha.com.starmobile.models.Line;
import alpha.com.starmobile.models.Plan;
import alpha.com.starmobile.models.User;
import alpha.com.starmobile.services.LineService;
import alpha.com.starmobile.services.MyService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/line")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class LineController {

    private LineService lineService;
    private MyService myService;

    @GetMapping("/all")
    public ResponseEntity<List<Line>> getAllLines() {
        List<Line> lines = lineService.findAll();
        return new ResponseEntity<>(lines, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Line> getLineById(@PathVariable("id") Long id) {
        Optional<Line> lineOptional = lineService.findById(id);
        return lineOptional.map(line -> new ResponseEntity<>(line, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{number}")
    public ResponseEntity<Line> getLineByNumber(@PathVariable("number") long number) {
        Optional<Line> lineOptional = lineService.findByNumber(number);
        return lineOptional.map(line -> new ResponseEntity<>(line, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/add")
    public ResponseEntity<User> addLine(@RequestBody AddOrRemoveLineDTO addOrRemoveLineDTO) {
        User updatedUser = myService.addLine(addOrRemoveLineDTO.planType());
        return new ResponseEntity<>(updatedUser, HttpStatus.CREATED);
    }

    @PostMapping("/remove")
    public ResponseEntity<User> removeLine(@RequestBody AddOrRemoveLineDTO addOrRemoveLineDTO) {
        User updatedUser = myService.removeLine(addOrRemoveLineDTO.planType(), addOrRemoveLineDTO.phoneNumber());
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
}
