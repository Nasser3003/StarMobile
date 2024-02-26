package alpha.com.starmobile.repository;

import alpha.com.starmobile.models.ENUMS.PlanTypes;
import alpha.com.starmobile.models.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findAllByPlanType(PlanTypes planType);

}
