package alpha.com.starmobile.services;

import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import alpha.com.starmobile.models.User;
import alpha.com.starmobile.repository.UserRepository;

@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserServiceImpl implements UserService {

    private UserRepository repo;

    @Override
    public List<User> findAll() {
        return repo.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID must not be null");
        }
        return repo.findById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return repo.findByEmail(email);
    }

    @Override
    public User save(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User must not be null");
        }
        return repo.save(user);
    }

}
