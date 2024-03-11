package alpha.com.starmobile.services;

import alpha.com.starmobile.configuration.SecurityConfig;
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

import java.io.FileNotFoundException;
import java.util.List;

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
    public void addLine(String planType, Line line) {
        Plan plan = planRepository.findByPlanType(PlanTypes.valueOf(planType)).orElseThrow(IllegalArgumentException::new);

    }

//    @Transactional
//    public Device addDevice(Long lineId, Device device) {
//        Line line = lineRepository.findByNumber(lineId).orElseThrow();
//        return deviceRepository.save(device);
//    }
}

