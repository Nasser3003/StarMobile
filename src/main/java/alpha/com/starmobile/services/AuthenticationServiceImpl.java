package alpha.com.starmobile.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import alpha.com.starmobile.models.User;
import alpha.com.starmobile.repository.UserRepository;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationServiceImpl(UserRepository userRepository, PasswordEncoder encoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public void registerUser(String firstName, String lastName, String email, String password) {
        if (userRepository.findByEmail(email).isPresent())
            throw new IllegalArgumentException("Email already exists");

        userRepository.save(new User(firstName, lastName, email, encoder.encode(password)));
    }

    @Override
    public void loginUser(String email, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
    }
}