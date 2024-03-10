package alpha.com.starmobile.services;

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

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class MyService {
    private UserRepository userRepository;
    private PlanRepository planRepository;
    private LineRepository lineRepository;
    private DeviceRepository deviceRepository;

    @Transactional
    public Plan addPlan(String email, String planType) {
        User user = userRepository.findByEmail(email).orElseThrow(IllegalArgumentException::new);
        return null; // planRepository.save();
    }

//    @Transactional
//    public Line addLine(String planType, Line line) {
//        Plan plan = planRepository.findByPlanType(PlanTypes.valueOf(planType)).orElseThrow(IllegalArgumentException::new);
//        line.setPlan(plan);
//        return null;  // lineRepository.save(line);
//    }
//
//    @Transactional
//    public Device addDevice(Long lineId, Device device) {
//        Line line = lineRepository.findByNumber(lineId).orElseThrow();
//        return deviceRepository.save(device);
//    }
}

