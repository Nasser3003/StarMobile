package alpha.com.starmobile.services;

import alpha.com.starmobile.models.User;
import alpha.com.starmobile.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

@AllArgsConstructor(onConstructor = @__(@Autowired))
@Transactional
public class AuthenticationServiceImp implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authenticationManager;

    @Override
    public void registerUser(String firstName, String lastName, String email, String password) {
        if (userRepository.findByEmail(email).isPresent())
            throw new IllegalArgumentException("Email already exists");

        userRepository.save(new User(firstName, lastName, email, encoder.encode(password)));
    }

    @Override
    public void loginUser(String email, String password) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        User user = userRepository.findByEmail(email).orElse(null);
    }

}