package alpha.com.starmobile.services;

import alpha.com.starmobile.configuration.SecurityConfig;
import alpha.com.starmobile.dto.RegistrationDTO;
import alpha.com.starmobile.models.User;
import alpha.com.starmobile.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserServiceImpl implements UserService {

    private UserRepository repo;
    private final PasswordEncoder encoder;

    @Override
    public List<User> findAll() {
        return repo.findAll();
    }

    @Override
    public Optional<User> findById(long id) {
        return repo.findById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return repo.findByEmail(email);
    }

    @Override
    public Optional<User> getMyUser() {
        String userEmail = SecurityConfig.getAuthenticatedUsername();
        return repo.findByEmail(userEmail);
    }

    @Override
    public User register(RegistrationDTO registrationDTO) {
        User user = new User(registrationDTO.firstName(), registrationDTO.lastName(), registrationDTO.email(),
                encoder.encode(registrationDTO.password()));
        repo.save(user);
        user.setPassword("");
        return user;
    }
}
