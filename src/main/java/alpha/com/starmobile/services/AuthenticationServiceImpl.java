package alpha.com.starmobile.services;

import alpha.com.starmobile.dto.LoginDTO;
import alpha.com.starmobile.dto.RegistrationDTO;
import alpha.com.starmobile.models.User;
import alpha.com.starmobile.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class AuthenticationServiceImpl implements AuthenticationService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private final PasswordEncoder encoder;


    @Override
    public Optional<User> login(LoginDTO loginDTO) {
        Optional<User> userOptional = userRepository.findByEmail(loginDTO.email());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(loginDTO.password(), user.getPassword()))
                return userOptional;
        }
        return Optional.empty();
    }

    @Override
    public User register(RegistrationDTO registrationDTO) {
        AuthenticationService.validateEmail(registrationDTO.email());
        User user = new User(registrationDTO.firstName(), registrationDTO.lastName(), registrationDTO.email(),
                encoder.encode(registrationDTO.password()));
        userRepository.save(user);
        user.setPassword("");
        return user;
    }
}

