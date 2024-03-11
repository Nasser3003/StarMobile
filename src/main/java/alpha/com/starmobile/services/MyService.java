package alpha.com.starmobile.services;

import alpha.com.starmobile.models.ENUMS.PlanTypes;
import alpha.com.starmobile.models.Line;
import alpha.com.starmobile.models.Plan;
import alpha.com.starmobile.models.User;
import alpha.com.starmobile.repository.DeviceRepository;
import alpha.com.starmobile.repository.LineRepository;
import alpha.com.starmobile.repository.PlanRepository;
import alpha.com.starmobile.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class MyService {
    private UserRepository userRepository;
    private PlanRepository planRepository;
    private LineRepository lineRepository;
    private DeviceRepository deviceRepository;

    @Transactional
    public void addPlan(String planType) {
        String userEmail = "abdo.abdo3003@gmail.com";
//                SecurityConfig.getAuthenticatedUsername();
        User user = userRepository.findByEmail(userEmail).orElseThrow(IllegalArgumentException::new);
        Plan plan = new Plan(PlanTypes.valueOf(planType));

        user.addPlan(plan);
    }
    @Transactional
    public void removePlan(String planType) {
        String userEmail = "abdo.abdo3003@gmail.com";
//        SecurityConfig.getAuthenticatedUsername();
        User user = userRepository.findByEmail(userEmail).orElseThrow(IllegalArgumentException::new);
        Plan plan = planRepository.findByUserAndPlanType(user, PlanTypes.valueOf(planType))
                .orElseThrow(IllegalAccessError::new);

        user.removePlan(plan);
        planRepository.deletePlanById(plan.getId());

    }

    @Transactional
    public void addLine(String planType, String phoneNumber) {
        String userEmail = "abdo.abdo3003@gmail.com";
//        SecurityConfig.getAuthenticatedUsername();
        User user = userRepository.findByEmail(userEmail).orElseThrow(IllegalArgumentException::new);
        Plan plan = planRepository.findByUserAndPlanType(user, PlanTypes.valueOf(planType)).orElseThrow(IllegalArgumentException::new);
        Line line = new Line(phoneNumber, plan);
        plan.addLine(line);
    }

    @Transactional
    public void removeLine(String planType, String phoneNumber) {
        String userEmail = "abdo.abdo3003@gmail.com";
//        SecurityConfig.getAuthenticatedUsername();
        User user = userRepository.findByEmail(userEmail).orElseThrow(IllegalArgumentException::new);
        Plan plan = user.getPlans().stream()
                .filter(p -> p.getPlanType().equals(PlanTypes.valueOf(planType)))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);

        Line line = lineRepository.findByNumber(phoneNumber)
                .orElseThrow(IllegalArgumentException::new);
        plan.removeLine(line);
        lineRepository.deleteLineById(line.getId());
    }


//    @Transactional
//    public Device addDevice(Long lineId, Device device) {
//        Line line = lineRepository.findByNumber(lineId).orElseThrow();
//        return deviceRepository.save(device);
//    }
}

