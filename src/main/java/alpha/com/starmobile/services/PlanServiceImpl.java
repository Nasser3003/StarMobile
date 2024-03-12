package alpha.com.starmobile.services;

import java.util.List;
import java.util.Optional;

import alpha.com.starmobile.configuration.SecurityConfig;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import alpha.com.starmobile.models.Plan;
import alpha.com.starmobile.models.ENUMS.PlanTypes;
import alpha.com.starmobile.repository.PlanRepository;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PlanServiceImpl implements PlanService {

    private PlanRepository repo;
    private MyService myService;

    @Override
    public List<Plan> findAll() {
        return repo.findAll();
    }

    @Override
    public Optional<Plan> findByPlanType(String planType) {
        return repo.findByPlanType(PlanTypes.valueOf(planType));
    }

    @Override
    public Optional<Plan> findPlanById(long id) {
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
    public void deleteById(long id) {
        repo.deleteById(id);
    }

}
