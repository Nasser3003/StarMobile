package alpha.com.starmobile.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import alpha.com.starmobile.models.Line;
import alpha.com.starmobile.services.LineService;

@RestController
@RequestMapping("/line")
public class LineController {

    @Autowired
    private LineService service;

    public LineController(LineService lineService) {
        this.service = lineService;
    }

    // Endpoint to retrieve all lines
    @GetMapping
    public ResponseEntity<List<Line>> getAllLines() {
        List<Line> lines = service.findAll();
        return new ResponseEntity<>(lines, HttpStatus.OK);
    }

    // Endpoint to retrieve a line by ID
    @GetMapping("/{id}")
    public ResponseEntity<Line> getLineById(@PathVariable("id") Long id) {
        Optional<Line> lineOptional = service.findById(id);
        return lineOptional.map(line -> new ResponseEntity<>(line, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Endpoint to retrieve a line by number
    @GetMapping("/{number}")
    public ResponseEntity<Line> getLineByNumber(@RequestParam("number") String number) {
        Optional<Line> lineOptional = service.findByNumber(number);
        return lineOptional.map(line -> new ResponseEntity<>(line, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Endpoint to create a new line
    @PostMapping
    public ResponseEntity<Line> createLine(@RequestBody Line line) {
        Line newLine = service.save(line);
        return new ResponseEntity<>(newLine, HttpStatus.CREATED);
    }

    // Endpoint to update an existing line
    @PutMapping("/{id}")
    public ResponseEntity<Line> updateLine(@PathVariable("id") Long id, @RequestBody Line line) {
        line.setId(id); // Ensure the ID matches the path variable
        Line updatedLine = service.save(line);
        return new ResponseEntity<>(updatedLine, HttpStatus.OK);
    }

    // Endpoint to delete a line
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLine(@PathVariable("id") Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
