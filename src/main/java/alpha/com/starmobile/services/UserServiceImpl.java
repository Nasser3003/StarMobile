package alpha.com.starmobile.services;

import alpha.com.starmobile.configuration.SecurityConfig;
import alpha.com.starmobile.models.User;
import alpha.com.starmobile.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserServiceImpl implements UserService {

    private UserRepository repo;

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

}
