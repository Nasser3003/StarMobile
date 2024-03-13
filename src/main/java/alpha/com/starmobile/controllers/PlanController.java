package alpha.com.starmobile.controllers;

import alpha.com.starmobile.dto.AddOrRemoveLineDTO;
import alpha.com.starmobile.models.Plan;
import alpha.com.starmobile.services.MyService;
import alpha.com.starmobile.services.PlanService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/plan")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PlanController {

    private PlanService planService;
    private MyService myService;

    @GetMapping("/all")
    public ResponseEntity<List<Plan>> getAllPlans() {
        List<Plan> plans = planService.findAll();
        return new ResponseEntity<>(plans, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Plan>> getMyPlans() {
        return new ResponseEntity<>(myService.getUserPlans(), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Plan> addLine(@RequestBody AddOrRemoveLineDTO addOrRemoveLineDTO) {
        Plan updatedPlan = myService.addLine(addOrRemoveLineDTO.planType(), addOrRemoveLineDTO.phoneNumber());
        return new ResponseEntity<>(updatedPlan, HttpStatus.CREATED);
    }

    @PostMapping("/remove")
    public ResponseEntity<Plan> removeLine(@RequestBody AddOrRemoveLineDTO addOrRemoveLineDTO) {
        Plan updatedPlan = myService.removeLine(addOrRemoveLineDTO.planType(), addOrRemoveLineDTO.phoneNumber());
        return new ResponseEntity<>(updatedPlan, HttpStatus.CREATED);
    }
}
