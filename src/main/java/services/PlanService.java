package services;

import java.util.List;
import java.util.Optional;

import alpha.com.starmobile.models.Plan;
import alpha.com.starmobile.models.ENUMS.PlanTypes;

public interface PlanService {

    public List<Plan> findAll();

    public List<Plan> findAllByPlanType(PlanTypes planType);

    public Optional<Plan> findById(Long id);

    public Plan save(Plan plan);

    public void deleteById(Long id);

}
