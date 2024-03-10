package alpha.com.starmobile.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import alpha.com.starmobile.models.User;
import alpha.com.starmobile.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private UserRepository repo;

    @Autowired
    public UserServiceImpl(UserRepository repo) {
        this.repo = repo;
    }

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

    @Override
    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repo.findByEmail(username).orElseThrow(() -> {
			throw new UsernameNotFoundException("No user with " + username + " found");
		});
		return user;
    }

    	/**
	 * If any runtime exception occurs in the method, will auto rollback
	 * If it returns normally, it will commit the transaction
	 */
	@Transactional // you're done
	public User register(String username, String password) {
		/**
		 * 1. Ensure the username is not already taken
		 * 1b. If taken, throw some excetpion
		 * 2. Hash the user's password
		 * 3. Persist User to DB
		 */
		Optional<User> optUser = repo.findByEmail(username);
		
		if (optUser.isPresent()) {
			// Throw new exception for our controller to deal with
			// Or RestControllerAdvice
			throw new IllegalArgumentException("Username already taken");
		}
		// Username is not taken
		User user = new User(username, password, "USER");
		return repo.save(user);
	}


}
