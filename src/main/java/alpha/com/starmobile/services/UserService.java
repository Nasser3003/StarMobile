package alpha.com.starmobile.services;

import java.util.List;
import java.util.Optional;

import alpha.com.starmobile.models.User;

public interface UserService {

    List<User> findAll();

    Optional<User> findById(Long id);

    Optional<User> findByEmail(String email);

    User save(User user);

}
