package services;

import java.util.List;
import java.util.Optional;

import alpha.com.starmobile.models.User;

public interface UserService {

    public List<User> findAll();

    public Optional<User> findById(Long id);

    Optional<User> findByEmail(String email);

    public User save(User user);

    public void deleteById(Long id);

}
