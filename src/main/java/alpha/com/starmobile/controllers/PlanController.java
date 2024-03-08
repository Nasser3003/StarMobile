package alpha.com.starmobile.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import alpha.com.starmobile.models.Plan;
import alpha.com.starmobile.services.PlanService;

@RestController
@RequestMapping("/plans")
public class PlanController {
    @Autowired
    private PlanService planService;


    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    // Endpoint to retrieve all plans
    @GetMapping
    public ResponseEntity<List<Plan>> getAllPlans() {
        List<Plan> plans = planService.findAll();
        return new ResponseEntity<>(plans, HttpStatus.OK);
    }

    // Endpoint to retrieve a plan by ID
    @GetMapping("/{id}")
    public ResponseEntity<Plan> getPlanById(@PathVariable("id") Long id) {
        Optional<Plan> planOptional = planService.findById(id);
        return planOptional.map(plan -> new ResponseEntity<>(plan, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Endpoint to create a new plan
    @PostMapping
    public ResponseEntity<Plan> createPlan(@RequestBody Plan plan) {
        Plan newPlan = planService.save(plan);
        return new ResponseEntity<>(newPlan, HttpStatus.CREATED);
    }

    // Endpoint to update an existing plan
    @PutMapping("/{id}")
    public ResponseEntity<Plan> updatePlan(@PathVariable("id") Long id, @RequestBody Plan plan) {
        plan.setId(id); // Ensure the ID matches the path variable
        Plan updatedPlan = planService.save(plan);
        return new ResponseEntity<>(updatedPlan, HttpStatus.OK);
    }

    // Endpoint to delete a plan
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable("id") Long id) {
        planService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

