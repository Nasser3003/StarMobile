package alpha.com.starmobile.controllers;

import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import alpha.com.starmobile.models.Line;
import alpha.com.starmobile.services.LineService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/lines")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class LineController {

    private LineService service;

    @GetMapping
    public ResponseEntity<List<Line>> getAllLines() {
        List<Line> lines = service.findAll();
        return new ResponseEntity<>(lines, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Line> getLineById(@PathVariable("id") Long id) {
        Optional<Line> lineOptional = service.findById(id);
        return lineOptional.map(line -> new ResponseEntity<>(line, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{number}")
    public ResponseEntity<Line> getLineByNumber(@PathVariable("number") String number) {
        Optional<Line> lineOptional = service.findByNumber(number);
        return lineOptional.map(line -> new ResponseEntity<>(line, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Line> createLine(@RequestBody Line line) {
        Line newLine = service.save(line);
        return new ResponseEntity<>(newLine, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Line> updateLine(@PathVariable("id") Long id, @RequestBody Line line) {
        Line updatedLine = service.save(line);
        return new ResponseEntity<>(updatedLine, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLine(@PathVariable("id") Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
