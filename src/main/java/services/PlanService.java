package services;

import java.util.List;

import alpha.com.starmobile.models.Plan;

public interface PlanService {

    public List<Plan> findAll();

    public Plan findById(Long id);

    public Plan save(Plan plan);

}
