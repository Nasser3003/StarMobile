package alpha.com.starmobile.services;

import alpha.com.starmobile.dto.LoginDTO;
import alpha.com.starmobile.dto.RegistrationDTO;
import alpha.com.starmobile.models.User;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public interface AuthenticationService {
    Optional<User> login(LoginDTO loginDTO);

    User register(RegistrationDTO registrationDTO);

    static void validateEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        if (!matcher.matches()) {
            throw new IllegalArgumentException("Invalid email format");
        }
    }
}
