package alpha.com.starmobile.repository;

import alpha.com.starmobile.models.ENUMS.PlanTypes;
import alpha.com.starmobile.models.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    Optional<Plan> findByPlanType(PlanTypes planType);
}
