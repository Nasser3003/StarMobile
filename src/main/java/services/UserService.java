package services;

import java.util.List;

import alpha.com.starmobile.models.User;

public interface UserService {

    public List<User> findAll();

    public User findById(Long id);

    public User save(User user);

}
