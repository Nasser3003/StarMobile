package services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import alpha.com.starmobile.models.Plan;
import alpha.com.starmobile.models.ENUMS.PlanTypes;
import alpha.com.starmobile.repository.PlanRepository;

public class PlanServiceImpl implements PlanService {

    @Autowired
    private PlanRepository repo;

    @Override
    public List<Plan> findAll() {
        return repo.findAll();
    }

    @Override
    public List<Plan> findAllByPlanType(PlanTypes planType) {
        return repo.findAllByPlanType(planType);
    }

    @Override
    public Optional<Plan> findById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID must not be null");
        }
        return repo.findById(id);
    }

    @Override
    public Plan save(Plan plan) {
        if (plan == null) {
            throw new IllegalArgumentException("Plan must not be null");
        }
        return repo.save(plan);
    }

    @Override
    public void deleteById(Long id) {
        repo.deleteById(id);
    }
}
