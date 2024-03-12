package alpha.com.starmobile.services;

import java.util.List;
import java.util.Optional;

import alpha.com.starmobile.models.Plan;
import alpha.com.starmobile.models.User;

public interface PlanService {

    List<Plan> findAll();

    Optional<Plan> findByPlanType(String planType);

    Optional<Plan> findPlanById(long id);

    Plan save(Plan plan);

    void deleteById(long id);

}
