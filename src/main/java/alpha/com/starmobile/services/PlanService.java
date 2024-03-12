package alpha.com.starmobile.services;

import java.util.List;
import java.util.Optional;

import alpha.com.starmobile.models.Plan;
import alpha.com.starmobile.models.ENUMS.PlanTypes;

public interface PlanService {

    List<Plan> findAll();

    Optional<Plan> findByPlanType(String planType);

    Plan save(Plan plan);
  
    void deleteById(long id);

}
