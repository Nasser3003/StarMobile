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
import java.util.Random;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class MyService {
    private UserRepository userRepository;
    private PlanRepository planRepository;
    private LineRepository lineRepository;
    private DeviceRepository deviceRepository;

    @Transactional
    public User addPlan(String planType) {
        User user = fetchAuthenticatedUser();
        planType = planType.toUpperCase();
        Plan plan = new Plan(PlanTypes.valueOf(planType));

        user.addPlan(plan);
        return user;
    }

    @Transactional
    public User removePlan(String planType) {
        User user = fetchAuthenticatedUser();
        planType = planType.toUpperCase();
        Plan plan = planRepository.findByUserAndPlanType(user, PlanTypes.valueOf(planType))
                .orElseThrow(IllegalAccessError::new);

        user.removePlan(plan);
        planRepository.delete(plan);
        return user;
    }

    @Transactional
    public User addLine(String planType) {
        User user = fetchAuthenticatedUser();
        planType = planType.toUpperCase();
        Plan plan = planRepository.findByUserAndPlanType(user, PlanTypes.valueOf(planType))
                .orElseThrow(IllegalArgumentException::new);

        Line line = new Line();
        line.setNumber(generatePhoneNumber());
        plan.addLine(line);
        return user;
    }

    private String generatePhoneNumber() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        int firstDigit = random.nextInt(8) + 2;
        long restOfTheNumber = (long)(random.nextDouble() * 1000000000L);

        // ensuring the restOfTheNumber is 9 digits. if restOfTheNumber = 123 it will be 000000123
        String formattedRestOfTheNumber = String.format("%09d", restOfTheNumber);

        sb.append(firstDigit).append(formattedRestOfTheNumber);
        return sb.toString();
    }

    @Transactional
    public User removeLine(String planType, String phoneNumber) {
        User user = fetchAuthenticatedUser();
        Plan plan = user.getPlans().stream()
                .filter(p -> p.getPlanType().equals(PlanTypes.valueOf(planType.toUpperCase())))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);

        Line line = lineRepository.findByNumber(phoneNumber)
                .orElseThrow(IllegalArgumentException::new);
        plan.removeLine(line);
        lineRepository.delete(line);
        return user;
    }

    @Transactional
    public User addDevice(String phoneNumber, String brand, String model) {
        Device device = new Device(brand, model);
        Line line = lineRepository.findByNumber(phoneNumber)
                .orElseThrow(() -> new IllegalArgumentException("please create the line first"));
        line.setDevice(device);
        device.setLine(line);
        return fetchAuthenticatedUser();
    }

    @Transactional
    public User removeDevice(String phoneNumber, String brand, String model) {
        Device device = deviceRepository.findDeviceByBrandAndModel(brand, model)
                .orElseThrow(IllegalArgumentException::new);

        Line line = lineRepository.findByNumber(phoneNumber).orElseThrow(IllegalArgumentException::new);
        line.setDevice(null);
        device.setLine(null);
        deviceRepository.delete(device);
        return fetchAuthenticatedUser();
    }

    public List<Plan> getUserPlans() {
        User user = fetchAuthenticatedUser();
        return planRepository.findAllByUser(user);
    }

    private User fetchAuthenticatedUser() {
        String userEmail = SecurityConfig.getAuthenticatedUsername();
        return userRepository.findByEmail(userEmail)
                .orElseThrow(IllegalArgumentException::new);
    }
}
