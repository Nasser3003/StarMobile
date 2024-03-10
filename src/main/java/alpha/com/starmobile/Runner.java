package alpha.com.starmobile;

import alpha.com.starmobile.models.User;
import alpha.com.starmobile.repository.DeviceRepository;
import alpha.com.starmobile.repository.LineRepository;
import alpha.com.starmobile.repository.PlanRepository;
import alpha.com.starmobile.repository.UserRepository;
import alpha.com.starmobile.services.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.beans.Encoder;

@NoArgsConstructor
@AllArgsConstructor(onConstructor = @__(@Autowired))
@Component
public class Runner implements CommandLineRunner {
    private UserService userService;
    private DeviceService deviceService;
    private LineService lineService;
    private PlanService planService;


    @Override
    public void run(String... args) {
        if (userService.findByEmail("abdo.abdo3003@gmail.com").isEmpty()) {
            User user = new User("Nasser", "Abdrabbo", "abdo.abdo3003@gmail.com",)
            authenticationService.register("bot1@gmail.com", "bot1", 10000L);
            authenticationService.register("bot2@gmail.com", "bot2", 10000L);

        }

        engine.addPlayer(playerService.getPlayerByEmail("bot1@gmail.com"));
        engine.addPlayer(playerService.getPlayerByEmail("bot2@gmail.com"));

        Casino casino = casinoService.getCasinoByName("Casino 1");
        engine.setCasino(casino);

        engine.start();
    }
}
