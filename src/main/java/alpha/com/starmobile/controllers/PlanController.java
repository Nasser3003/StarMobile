package alpha.com.starmobile.controllers;

import alpha.com.starmobile.models.Plan;
import alpha.com.starmobile.services.PlanService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/plan")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PlanController {

    private PlanService service;

    @GetMapping
    public ResponseEntity<List<Plan>> getAllPlans() {
        List<Plan> plans = service.findAll();
        return new ResponseEntity<>(plans, HttpStatus.OK);
    }

    @GetMapping("/{planType}")
    public ResponseEntity<Plan> getPlanByType(@PathVariable("planType") String planType) {
        Optional<Plan> planOptional = service.findByPlanType(planType);
        return planOptional.map(plan -> new ResponseEntity<>(plan, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
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
