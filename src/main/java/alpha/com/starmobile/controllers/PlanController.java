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
@RequestMapping("/plans")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PlanController {

    private PlanService planService;
    private MyService myService;

    @GetMapping
    public ResponseEntity<List<Plan>> getAllPlans() {
        List<Plan> plans = planService.findAll();
        return new ResponseEntity<>(plans, HttpStatus.OK);
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

    @PutMapping("/plans/{planId}")
    public ResponseEntity<?> updatePlan(@PathVariable Long planId, @RequestBody Plan updatedPlan) {
        boolean done = planService.updatePlan(planId, updatedPlan);
        return ResponseEntity.ok(updatedPlan);
    }
//
//    @PostMapping
//    public ResponseEntity<Plan> createPlan(@RequestBody Plan plan) {
//        Plan newPlan = service.save(plan);
//        return new ResponseEntity<>(newPlan, HttpStatus.CREATED);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Plan> updatePlan(@PathVariable("id") Long id, @RequestBody Plan plan) {
//        Plan updatedPlan = service.save(plan);
//        return new ResponseEntity<>(updatedPlan, HttpStatus.OK);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deletePlan(@PathVariable("id") Long id) {
//        service.deleteById(id);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
}
