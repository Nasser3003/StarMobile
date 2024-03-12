package alpha.com.starmobile.services;

import alpha.com.starmobile.configuration.SecurityConfig;
import alpha.com.starmobile.models.Device;
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
        planRepository.delete(plan);
    }

    @Transactional
    public Plan addLine(String planType, String phoneNumber) {
//        String userEmail = "abdo.abdo3003@gmail.com";
        String userEmail = SecurityConfig.getAuthenticatedUsername();
        User user = userRepository.findByEmail(userEmail).orElseThrow(IllegalArgumentException::new);
        Plan plan = planRepository.findByUserAndPlanType(user, PlanTypes.valueOf(planType)).orElseThrow(IllegalArgumentException::new);
        Line line = new Line(phoneNumber, plan);
        plan.addLine(line);
        return plan;
    }

    @Transactional
    public Plan removeLine(String planType, String phoneNumber) {
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
        lineRepository.delete(line);
        return plan;
    }

    @Transactional
    public void addDevice(String phoneNumber, String brand, String model) {
        Device device = new Device(brand, model);
        Line line = lineRepository.findByNumber(phoneNumber).orElseThrow(IllegalArgumentException::new);
        line.setDevice(device);
        device.setLine(line);
    }
    @Transactional
    public void removeDevice(String phoneNumber, String brand, String model) {
        Device device = deviceRepository.findDeviceByBrandAndModel(brand, model)
                .orElseThrow(IllegalArgumentException::new);

        Line line = lineRepository.findByNumber(phoneNumber).orElseThrow(IllegalArgumentException::new);
        line.setDevice(null);
        device.setLine(null);
        deviceRepository.delete(device);
    }

    public List<Plan> getUserPlans() {
        String userEmail = "abdo.abdo3003@gmail.com";
//        SecurityConfig.getAuthenticatedUsername();
        User user = userRepository.findByEmail(userEmail).orElseThrow(IllegalArgumentException::new);
        return planRepository.findAllByUser(user);
    }
}

