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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class AuthenticationService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private final PasswordEncoder encoder;


    public Optional<User> login(LoginDTO loginDTO) {
        Optional<User> userOptional = userRepository.findByEmail(loginDTO.email());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(loginDTO.password(), user.getPassword()))
                return userOptional;
        }
        return Optional.empty();
    }

    public User register(RegistrationDTO registrationDTO) {
        validateEmail(registrationDTO.email());
        User user = new User(registrationDTO.firstName(), registrationDTO.lastName(), registrationDTO.email(),
                encoder.encode(registrationDTO.password()));
        userRepository.save(user);
        user.setPassword("");
        return user;
    }

    private void validateEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        if (!matcher.matches()) {
            throw new IllegalArgumentException("Invalid email format");
        }
    }
}

