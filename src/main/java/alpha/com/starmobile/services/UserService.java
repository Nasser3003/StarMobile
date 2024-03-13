package alpha.com.starmobile.services;

import alpha.com.starmobile.dto.RegistrationDTO;
import alpha.com.starmobile.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> findAll();

    Optional<User> findById(long id);

    Optional<User> findByEmail(String email);

    User register(RegistrationDTO registrationDTO);

    Optional<User> getMyUser();

}
